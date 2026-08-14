import { Slot } from "@radix-ui/react-slot";
import type { VariantProps } from "class-variance-authority";
import type * as React from "react";
import { buttonVariants } from "@/lib/button-variants";
import { cn } from "@/lib/utils";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = ({
  className,
  variant,
  size,
  asChild = false,
  ref,
  ...props
}: ButtonProps & { ref?: React.RefObject<HTMLButtonElement | null> }) => {
  const Comp = asChild ? Slot : "button";
  return (
    <Comp
      className={cn(buttonVariants({ className, size, variant }))}
      ref={ref}
      {...props}
    />
  );
};
Button.displayName = "Button";

export { Button };
