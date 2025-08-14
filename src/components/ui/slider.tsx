import * as React from "react"
import * as SliderPrimitive from "@radix-ui/react-slider"

import { cn } from "@/lib/utils"

const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>
>(({ className, ...props }, ref) => (
  <SliderPrimitive.Root
    ref={ref}
    className={cn(
      "relative flex w-full touch-none select-none items-center",
      className
    )}
    {...props}
  >
    {/* Custom Track */}
    <div className="relative w-full h-2 rounded-full bg-[#f7f8fa] dark:bg-[#19232a] border border-primary/30 overflow-hidden">
      {/* Custom Filled Range */}
      <SliderPrimitive.Range asChild>
        <div className="h-2 rounded-full bg-primary" style={{ width: `var(--radix-slider-range-end, 0%)` }} />
      </SliderPrimitive.Range>
    </div>
    {/* Thumb */}
    <SliderPrimitive.Thumb className="block h-5 w-5 rounded-full border-2 border-primary bg-background ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50" />
  </SliderPrimitive.Root>
))
Slider.displayName = SliderPrimitive.Root.displayName

export { Slider }
