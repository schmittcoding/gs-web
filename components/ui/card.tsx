import * as React from "react";

import { cn } from "@/lib/utils";
import { cva, VariantProps } from "class-variance-authority";

const cardVariants = cva(
  "shape-main group relative border border-gray-800 aspect-auto size-full overflow-hidden p-px before:absolute before:-inset-1 before:bg-linear-to-tr before:via-50% before:via-transparent before:shadow-[0_0_0_20px_var(--background)] before:-z-1 after:absolute after:-inset-1 after:bg-linear-to-tr after:via-50% after:via-transparent after:shadow-[0_0_0_20px_var(--background)] after:-z-1 after:blur-xl",
  {
    variants: {
      variant: {
        default:
          "before:from-gray-500 after:from-gray-600 before:to-gray-600/50 after:to-gray-400/50",
        primary:
          "before:from-primary after:from-primary before:to-primary/30 after:to-primary/30",
        destructive:
          "before:from-destructive after:from-destructive before:to-destructive/30 after:to-destructive/30",
        accent:
          "before:from-accent/70 after:from-accent/70 before:to-accent/30 after:to-accent/30",
      },
    },
  },
);

type CardProps = React.ComponentProps<"div"> &
  VariantProps<typeof cardVariants> & { size?: "default" | "sm" };

function Card({
  children,
  className,
  size = "default",
  variant = "default",
  ...props
}: CardProps) {
  return (
    <div
      data-slot="card"
      data-size={size}
      data-variant={variant}
      className={cn(cardVariants({ variant, className }))}
      {...props}
    >
      <div
        data-slot="card-wrapper"
        className="size-full shape-main overflow-hidden bg-gray-950 flex flex-col"
      >
        {children}
      </div>
    </div>
  );
}

function CardHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-header"
      className={cn(
        "px-4 py-2.5 bg-gray-900 overflow-hidden group-data-[size=sm]/card:px-3 group-data-[size=sm]/card:[.border-b]:pb-3 group/card-header @container/card-header grid auto-rows-min items-start has-data-[slot=card-action]:grid-cols-[1fr_auto] has-data-[slot=card-description]:grid-rows-[auto_auto]",
        className,
      )}
      {...props}
    />
  );
}

function CardTitle({ className, ...props }: React.ComponentProps<"p">) {
  return (
    <p
      data-slot="card-title"
      className={cn(
        "text-sm leading-snug font-medium group-data-[size=sm]/card:text-sm has-[svg]:flex has-[svg]:gap-1.5",
        className,
      )}
      {...props}
    />
  );
}

function CardDescription({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-description"
      className={cn("text-muted-foreground text-xs", className)}
      {...props}
    />
  );
}

function CardAction({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-action"
      className={cn(
        "col-start-2 row-span-2 row-start-1 self-start justify-self-end",
        className,
      )}
      {...props}
    />
  );
}

function CardContent({ className, ...props }: React.ComponentProps<"section">) {
  return (
    <section
      data-slot="card-content"
      className={cn(
        "relative px-4 flex-1 group-data-[size=sm]/card:px-3",
        className,
      )}
      {...props}
    />
  );
}

function CardFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-footer"
      className={cn(
        "bg-gray-900/30 border-t border-gray-900 px-4 py-2 group-data-[size=sm]/card:p-3 flex items-center",
        className,
      )}
      {...props}
    />
  );
}

export {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
};
