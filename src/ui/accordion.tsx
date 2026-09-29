import * as React from 'react'
import * as AccordionPrimitive from '@radix-ui/react-accordion'
import { cn } from '@/lib/utils'

const Accordion = AccordionPrimitive.Root

/* NOTE (local edit): the upstream registry version renders its own ChevronDown
   as the trigger's last child, and rotates it with `[&[data-state=open]>svg]`.
   Experience places its own chevron inside the period row so the header can
   stack on narrow screens, so both were removed from here — a chevron injected
   at this level would land after that row rather than inside it, and the
   `>svg` selector would no longer reach it. Re-copying this file from the
   registry reintroduces both. */

const AccordionItem = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>
>(({ className, ...props }, ref) => (
  <AccordionPrimitive.Item
    ref={ref}
    className={cn('border-3 border-foreground border-b-0 last:border-b-3 shadow-[4px_4px_0px_hsl(var(--shadow-color))]', className)}
    {...props}
  />
))
AccordionItem.displayName = 'AccordionItem'

const AccordionTrigger = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Header className="flex items-stretch">
    <AccordionPrimitive.Trigger
      ref={ref}
      className={cn(
        'flex flex-1 items-center justify-between bg-background py-4 px-4 font-bold uppercase tracking-wide transition duration-200 hover:bg-muted [&[data-state=open]]:bg-accent',
        className
      )}
      {...props}
    >
      {children}
    </AccordionPrimitive.Trigger>
  </AccordionPrimitive.Header>
))
AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName

const AccordionContent = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Content
    ref={ref}
    className="overflow-hidden text-sm transition data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down border-t-3 border-foreground"
    {...props}
  >
    {/* `bg-background`, and it is load-bearing.

       The trigger carries its own background, but the panel did not — so when
       a row was open, the body text sat directly on whatever was behind the
       accordion. On the Experience section that is the section's 60px grid
       pattern, which showed through the panel and cut across the description
       and the bullets. The text was still technically legible, but the
       pattern running under it read as a rendering fault rather than as the
       texture it was.

       The panel is opaque rather than translucent on purpose: a semi-opaque
       fill would still let the grid ghost through, just fainter, which is the
       same problem with less contrast.

       It is `bg-background` to match the trigger's resting fill, so an open
       row reads as one continuous card with a border between the two halves
       rather than as a header sitting on a differently-coloured panel. */}
    <div className={cn('bg-background p-4', className)}>{children}</div>
  </AccordionPrimitive.Content>
))
AccordionContent.displayName = AccordionPrimitive.Content.displayName

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent }
