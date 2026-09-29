import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

// BoldKit (neubrutalism, Tailwind v4 + shadcn/ui) is consumed as source files
// under src/ui, installed from https://boldkit.dev/r/<name>.json. Those files
// import through the "@/..." alias, which is what the registry emits.
//
// base is "/" because this is a user site: the repo is tidarsentausa.github.io,
// served from the domain root. A project repo would need "/<repo>/" instead.
export default defineConfig({
  base: "/",
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
