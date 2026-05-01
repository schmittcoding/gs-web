import { cva, type VariantProps } from "class-variance-authority";
import { Slot } from "radix-ui";
import * as React from "react";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/40 aria-invalid:border-destructive/50 rounded-lg border border-transparent bg-clip-padding text-base font-medium focus-visible:ring-1 aria-invalid:ring-3 [&_svg:not([class*='size-'])]:size-4 inline-flex items-center justify-center whitespace-nowrap transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none shrink-0 [&_svg]:shrink-0 outline-none group/button select-none relative not-disabled:cursor-pointer shape-main",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground [a]:hover:bg-primary/80 hover:bg-primary/80 before:absolute before:bottom-0 before:left-0 before:size-2 before:border-b-2 before:border-l-2 before:border-primary after:absolute after:top-0 after:right-0 after:size-2 after:border-t-2 after:border-r-2 after:border-primary",
        outline:
          "border-gray-700 bg-transparent hover:bg-gray-800 hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground before:absolute before:bottom-[-1] before:left-[-1] before:size-2 before:border-b-1 before:border-l-1 before:border-gray-700 after:absolute after:top-[-1] after:right-[-1] after:size-2 after:border-t-1 after:border-r-1 after:border-gray-700",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80 aria-expanded:bg-secondary aria-expanded:text-secondary-foreground  before:absolute before:bottom-0 before:left-0 before:size-2 before:border-b-2 before:border-l-2 before:border-secondary after:absolute after:top-0 after:right-0 after:size-2 after:border-t-2 after:border-r-2 after:border-secondary",
        ghost:
          "hover:bg-secondary/80 hover:text-secondary-foreground aria-expanded:bg-secondary aria-expanded:text-secondary-foreground",
        destructive:
          "bg-destructive/20 hover:bg-destructive/30 focus-visible:ring-destructive/40 text-destructive focus-visible:border-destructive/40",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default:
          "h-10 text-sm gap-2 px-5 has-data-[icon=inline-end]:pr-3 has-data-[icon=inline-start]:pl-3",
        xs: "h-7.5 gap-1.5 px-4 text-xs in-data-[slot=button-group]:rounded-lg has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*='size-'])]:size-3",
        sm: "h-8.5 gap-1.5 px-4 text-sm in-data-[slot=button-group]:rounded-lg has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2 [&_svg:not([class*='size-'])]:size-4",
        lg: "h-12 gap-2 px-6 has-data-[icon=inline-end]:pr-4 has-data-[icon=inline-start]:pl-4 [&_svg:not([class*='size-'])]:size-5",
        icon: "size-10 [&_svg:not([class*='size-'])]:size-6.5",
        "icon-xs":
          "size-7 in-data-[slot=button-group]:rounded-lg [&_svg:not([class*='size-'])]:size-4",
        "icon-sm":
          "size-8.5 in-data-[slot=button-group]:rounded-lg [&_svg:not([class*='size-'])]:size-5",
        "icon-lg": "size-12 [&_svg:not([class*='size-'])]:size-8",
      },
    },
    compoundVariants: [
      {
        variant: "ghost",
        size: ["icon", "icon-xs", "icon-sm", "icon-lg"],
        className: "hover:bg-transparent text-foreground hover:text-accent",
      },
    ],
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

function Button({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot.Root : "button";

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
