import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium ring-offset-background transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 font-display",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90 hover:scale-105",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border border-border bg-transparent hover:bg-muted hover:text-foreground",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-muted hover:text-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        hero: "bg-primary text-primary-foreground font-semibold hover:scale-105 shadow-[0_0_60px_hsl(24_95%_60%_/_0.3)] hover:shadow-[0_0_80px_hsl(24_95%_60%_/_0.4)]",
        "outline-glow": "border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground hover:shadow-[0_0_60px_hsl(24_95%_60%_/_0.3)]",
        glass: "bg-card/80 backdrop-blur-xl border border-border/50 text-foreground hover:bg-muted/60",
        uiux: "bg-[hsl(var(--uiux))]/20 text-[hsl(var(--uiux))] border border-[hsl(var(--uiux))]/30 hover:bg-[hsl(var(--uiux))] hover:text-background",
        graphic: "bg-[hsl(var(--graphic))]/20 text-[hsl(var(--graphic))] border border-[hsl(var(--graphic))]/30 hover:bg-[hsl(var(--graphic))] hover:text-background",
        video: "bg-[hsl(var(--video))]/20 text-[hsl(var(--video))] border border-[hsl(var(--video))]/30 hover:bg-[hsl(var(--video))] hover:text-background",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-12 px-8 text-base",
        xl: "h-14 px-10 text-lg",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
