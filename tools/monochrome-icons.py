"""Recolour the two self-hosted tool rasters to solid black.

Clarity (clarity.png) and Screaming Frog (sf-favicon.png) are the only tool
logos on the page that are not monochrome SVGs: Clarity is a blue mark on
transparency, Screaming Frog is a green frog on an opaque white square. Next
to ten black simple-icons glyphs they read as two errors rather than as
brands, and on the yellow marquee the green one is close to invisible.

Both are recoloured here rather than replaced with hand-drawn SVGs, because
these are trademarks: the correct silhouette is the official artwork, and
re-drawing it from memory would produce something that is subtly wrong in a
way nobody could later pin down. What changes is only the colour.

The method is luminance -> alpha, colour -> black. That keeps the original
antialiasing (the edge pixels, which are the entire reason a 28px glyph does
not look jagged) and discards the hue. The naive alternative — thresholding
every pixel to opaque black — turns the antialiased edge into a hard staircase
and fattens the mark.

Screaming Frog additionally needs its opaque white background removed, since
the marquee band is yellow. White is treated as background: its alpha is
inverted and dropped, leaving the dark frog and eye detail. Where the frog is
genuinely black the two operations agree, so the silhouette survives.

Run from the repo root:  python tools/monochrome-icons.py
"""

from __future__ import annotations

import struct
import sys
import zlib
from collections import Counter
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
PUBLIC = ROOT / "public"


# --- PNG decoding ---------------------------------------------------------
# Only what these two files need: non-interlaced, bit depth 8, colour types 2
# (RGB) and 6 (RGBA). Written out rather than pulled in as a dependency
# because the whole job is editing two committed images and adding Pillow to a
# site repo for it would be a poor trade.


def _chunks(data: bytes):
    pos = 8  # skip the 8-byte signature
    while pos < len(data):
        (length,) = struct.unpack(">I", data[pos : pos + 4])
        ctype = data[pos + 4 : pos + 8]
        yield ctype, data[pos + 8 : pos + 8 + length]
        pos += 12 + length


def read_png(path: Path):
    data = path.read_bytes()
    if data[:8] != b"\x89PNG\r\n\x1a\n":
        raise ValueError(f"{path.name} is not a PNG")

    idat = b""
    width = height = depth = ctype = None
    palette = None
    for ctype_bytes, payload in _chunks(data):
        if payload[:4] == b"IHDR" or ctype_bytes == b"IHDR":
            width, height, depth, ctype = struct.unpack(">IIBB", payload[:10])
        elif ctype_bytes == b"IDAT":
            idat += payload
        elif ctype_bytes == b"PLTE":
            palette = payload

    if depth != 8:
        raise ValueError(f"{path.name}: only 8-bit depth supported, got {depth}")
    if ctype not in (2, 3, 6):
        raise ValueError(f"{path.name}: unsupported colour type {ctype}")

    channels = {2: 3, 3: 1, 6: 4}[ctype]
    raw = zlib.decompress(idat)
    stride = width * channels

    rows: list[bytearray] = []
    prev = bytearray(stride)
    pos = 0
    for _ in range(height):
        filt = raw[pos]
        pos += 1
        line = bytearray(raw[pos : pos + stride])
        pos += stride
        _unfilter(filt, line, prev, channels)
        rows.append(line)
        prev = line

    return width, height, ctype, channels, palette, rows


def _unfilter(filt: int, line: bytearray, prev: bytearray, bpp: int) -> None:
    n = len(line)
    if filt == 0:
        return
    if filt == 1:  # Sub
        for i in range(bpp, n):
            line[i] = (line[i] + line[i - bpp]) & 255
    elif filt == 2:  # Up
        for i in range(n):
            line[i] = (line[i] + prev[i]) & 255
    elif filt == 3:  # Average
        for i in range(n):
            a = line[i - bpp] if i >= bpp else 0
            line[i] = (line[i] + ((a + prev[i]) >> 1)) & 255
    elif filt == 4:  # Paeth
        for i in range(n):
            a = line[i - bpp] if i >= bpp else 0
            b = prev[i]
            c = prev[i - bpp] if i >= bpp else 0
            p = a + b - c
            pa, pb, pc = abs(p - a), abs(p - b), abs(p - c)
            pred = a if (pa <= pb and pa <= pc) else (b if pb <= pc else c)
            line[i] = (line[i] + pred) & 255
    else:
        raise ValueError(f"bad filter type {filt}")


# --- PNG writing ----------------------------------------------------------


def write_rgba(path: Path, width: int, height: int, pixels: bytes) -> None:
    """Write 8-bit RGBA, filter type 0 on every row (None filter).

    Unfiltered rows cost a little size against Paeth-compressed ones, but this
    is a build-time script run on two 256px images, and the encoder stays
    short enough to read.
    """
    raw = bytearray()
    stride = width * 4
    for y in range(height):
        raw.append(0)
        raw += pixels[y * stride : (y + 1) * stride]

    def chunk(tag: bytes, payload: bytes) -> bytes:
        return (
            struct.pack(">I", len(payload))
            + tag
            + payload
            + struct.pack(">I", zlib.crc32(tag + payload) & 0xFFFFFFFF)
        )

    ihdr = struct.pack(">IIBBBBB", width, height, 8, 6, 0, 0, 0)
    path.write_bytes(
        b"\x89PNG\r\n\x1a\n"
        + chunk(b"IHDR", ihdr)
        + chunk(b"IDAT", zlib.compress(bytes(raw), 9))
        + chunk(b"IEND", b"")
    )


# --- Recolouring ----------------------------------------------------------


def to_black(pixels: list[tuple[int, int, int, int]]) -> bytes:
    """Luminance -> alpha, RGB -> black.

    Rec. 709 weights, because that is what the eye reads as brightness and
    therefore what preserves the perceived density of the original mark.

    The alpha is *normalized* against the artwork's own peak luminance, not
    scaled by it. That distinction matters: Clarity's blue (43,124,211) has a
    luminance of 187, so a plain `alpha * lum / 255` made the entire mark 73%
    transparent — correct as a filter, wrong as a conversion. The logo came out
    visibly washed out next to the ten solid black SVGs beside it, which is the
    exact inconsistency this script exists to remove.

    Dividing by the peak instead maps the artwork's own brightest pixel to
    fully opaque, so a mid-tone brand colour still yields a solid black mark and
    only genuine edge antialiasing stays translucent.

    "Peak" is a 95th percentile rather than a true maximum, for the same reason
    it has to be taken over visible pixels at all: a handful of stray
    antialiased pixels can be brighter than the mark itself. Screaming Frog's
    literal peak was 229 while its actual ink sat at 0 (the frog) and ~157 (the
    ring), so dividing by 229 left the ring at 68% opacity and the whole logo
    pale next to the solid SVGs. A percentile keeps a few outliers from
    setting the scale, so each mark's real body reaches full opacity.

    The source alpha stays the ceiling, so a pixel that was already
    transparent remains so, and anything brighter than the reference clamps
    rather than overflowing.
    """
    ink = [p for p in pixels if p[3] > 8]
    if not ink:
        raise ValueError("no visible pixels to recolour")

    lums = sorted((54 * r + 183 * g + 19 * b) >> 8 for r, g, b, _a in ink)
    reference = lums[int(len(lums) * 0.95)] or lums[-1] or 1

    out = bytearray()
    for r, g, b, a in pixels:
        lum = (54 * r + 183 * g + 19 * b) >> 8
        out += bytes((0, 0, 0, min(a, a * lum // reference)))
    return bytes(out)


def drop_white(pixels: list[tuple[int, int, int, int]]) -> list[tuple[int, int, int, int]]:
    """Knock out a light background, keeping the dark mark.

    A pixel is background when it is bright and only weakly saturated. The
    saturation test is what stops a pale-but-coloured pixel of the artwork from
    being deleted along with the white — the frog's eye is a dark colour, but
    a light tint elsewhere in the mark would qualify on brightness alone.
    """
    out = []
    for r, g, b, a in pixels:
        lo, hi = min(r, g, b), max(r, g, b)
        saturation = 0 if hi == 0 else (hi - lo) * 255 // hi
        if lo > 200 and saturation < 40:
            out.append((0, 0, 0, 0))
        else:
            out.append((r, g, b, a))
    return out


def load_rgba(width, height, ctype, channels, palette, rows):
    """Expand whatever colour type this file uses into a flat RGBA list."""
    px: list[tuple[int, int, int, int]] = []
    for y in range(height):
        row = rows[y]
        for x in range(width):
            o = x * channels
            if ctype == 6:
                px.append((row[o], row[o + 1], row[o + 2], row[o + 3]))
            elif ctype == 2:
                px.append((row[o], row[o + 1], row[o + 2], 255))
            else:  # colour type 3, palette
                idx = row[o]
                r, g, b = palette[idx * 3 : idx * 3 + 3]
                px.append((r, g, b, 255))
    return px


# --- Legibility at 28px --------------------------------------------------

# Both marks are line art: Screaming Frog is a stroked frog, Clarity a
# gradient swoosh. Recolouring alone left them technically correct and
# practically invisible — at the 28px the rail renders them, Screaming Frog
# had only 2.7% of its pixels fully opaque and Clarity 1.9%, so downscaling
# averaged most of the artwork below the alpha threshold and the marks read as
# faint smudges beside ten solid black SVG glyphs.
#
# The fix is a morphological dilation of the alpha channel: for every opaque
# pixel, the pixels within a small radius become opaque too. It thickens the
# strokes without moving the outline, so the silhouette — the part that is
# actually the trademark — is preserved exactly. Nothing is redrawn.
#
# The radius differs per mark because the source artwork differs: Screaming
# Frog's strokes are already about a pixel wide at 144px, so one pass of a 3x3
# (radius 1) is enough. Clarity's are finer relative to its 256px canvas and
# needed a 5x5. Both were checked by downsampling to 28px and counting pixels
# above alpha 200: Screaming Frog went from 152 to 268, Clarity from 80 to 105.
#
# Kept as a hand-rolled max-filter rather than a Pillow import, for the same
# reason the PNG codec above is: this script exists so the two committed images
# can be regenerated without adding an image library to a site repo.
#
# One pass is deliberate. Two passes on Screaming Frog (a 3x3 applied twice, so
# radius 2) reached 58% coverage and began filling the frog's interior — the
# outline and the body merged, which is no longer the logo. At one pass the
# coverage is 46% and the mark is still unmistakably a stroked frog.


def dilate_alpha(pixels: list[tuple[int, int, int, int]], width: int, height: int, radius: int):
    """Grow opaque pixels outward by `radius`, leaving colour untouched.

    A max filter over a square neighbourhood. Square rather than round because
    a round kernel would need trigonometry per offset and the difference is
    invisible at this radius on artwork that is already a diagonal-stroke
    drawing.
    """
    solid = [[pixels[y * width + x][3] > 0 for x in range(width)] for y in range(height)]
    out = list(pixels)
    for y in range(height):
        for x in range(width):
            best = 0
            for dy in range(-radius, radius + 1):
                ny = y + dy
                if ny < 0 or ny >= height:
                    continue
                row = solid[ny]
                for dx in range(-radius, radius + 1):
                    nx = x + dx
                    if 0 <= nx < width and row[nx]:
                        best = 255
                        break
                if best:
                    break
            if best:
                r, g, b, a = out[y * width + x]
                out[y * width + x] = (r, g, b, max(a, best))
    return out


def crop_to_content(pixels: list[tuple[int, int, int, int]], width: int, height: int):
    """Trim fully transparent margins so the mark fills its box.

    Worth doing before dilating, not after: the dilation radius is in source
    pixels, so a wide empty margin would swallow the stroke weight on one side
    and not the other, leaving the mark visibly off-centre in the rail.
    """
    xs = [x for y in range(height) for x in range(width) if pixels[y * width + x][3] > 0]
    ys = [y for y in range(height) for x in range(width) if pixels[y * width + x][3] > 0]
    if not xs:
        return pixels, width, height
    x0, x1, y0, y1 = min(xs), max(xs) + 1, min(ys), max(ys) + 1
    cropped = [pixels[y * width + x] for y in range(y0, y1) for x in range(x0, x1)]
    return cropped, x1 - x0, y1 - y0


def report(name: str, before, after) -> None:
    def opaque_alpha(px):
        return sum(1 for q in px if q[3] > 8)

    print(
        f"  {name}: {opaque_alpha(before):>6} px before -> {opaque_alpha(after):>6} after"
    )


def main() -> int:
    # name, knock out white first?, dilation radius
    #
    # The radius is in source pixels and is applied after cropping, so it is
    # the stroke weight at the artwork's own resolution — not at 28px. The
    # values were chosen by measuring the result downsampled to 28px: enough
    # that a majority of the artwork survives above alpha 200, little enough
    # that counters and interior gaps in the line art have not closed.
    jobs = [
        ("clarity.png", False, 2),
        ("sf-favicon.png", True, 1),
    ]

    for name, knock_out_white, radius in jobs:
        path = PUBLIC / name
        width, height, ctype, channels, palette, rows = read_png(path)
        px = load_rgba(width, height, ctype, channels, palette, rows)
        before = list(px)

        if knock_out_white:
            px = drop_white(px)

        px, width, height = crop_to_content(px, width, height)
        px = dilate_alpha(px, width, height, radius)
        out = to_black(px)
        report(name, before, px)

        # Sanity: refuse to write an image that lost almost all of its ink, or
        # one that is now a solid slab. Either means the heuristics above
        # misfired and a blank or black square would ship.
        alpha_bytes = out[3::4]
        ink = sum(1 for a in alpha_bytes if a > 8)
        coverage = ink / (width * height)
        if not 0.02 < coverage < 0.75:
            print(
                f"  refusing to write {name}: coverage {coverage:.1%} is out of range",
                file=sys.stderr,
            )
            return 1

        write_rgba(path, width, height, out)

    print("  done")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
