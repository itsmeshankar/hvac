import type React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva("focus-ring inline-flex min-h-11 items-center justify-center gap-2 rounded-brand px-5 py-3 text-sm font-semibold transition duration-brand disabled:pointer-events-none disabled:opacity-50", {
  variants: {
    variant: {
      primary: "bg-orange-500 text-white shadow-soft hover:bg-orange-600",
      secondary: "bg-navy-900 text-white hover:bg-navy-800",
      outline: "border border-graphite-100 bg-white text-navy-900 hover:border-orange-500 hover:text-orange-600",
      ghost: "text-navy-900 hover:bg-graphite-50"
    },
    size: { default: "min-h-11 px-5", sm: "min-h-9 px-3 text-xs", lg: "min-h-12 px-6 text-base" }
  },
  defaultVariants: { variant: "primary", size: "default" }
});

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & VariantProps<typeof buttonVariants> & { asChild?: boolean };

export function Button({ className, variant, size, asChild = false, ...props }: ButtonProps) {
  const Comp = asChild ? Slot : "button";
  return <Comp className={cn(buttonVariants({ variant, size, className }))} {...props} />;
}

