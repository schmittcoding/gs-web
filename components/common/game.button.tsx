"use client";

import { cn } from "@/lib/utils";
import { IconLoader2 } from "@tabler/icons-react";
import { cva, VariantProps } from "class-variance-authority";
import { useEffect, useRef } from "react";
import { Button } from "../ui/button";

type GameButtonProps = React.ComponentProps<typeof Button> & {
  loading?: boolean;
};

const gameButtonVariants = cva(
  "h-[unset] relative inline-flex items-center gap-2 py-3 px-6 text-base border-none cursor-pointer outline-none whitespace-nowrap shape-main hover:bg-primary/90",
  {
    variants: {
      size: {
        xs: "text-sm h-9 px-4.5 gap-1.5 [&_svg:not([class*='size-'])]:size-3",
        sm: "text-sm gap-1.5 [&_svg:not([class*='size-'])]:size-4",
        lg: "[&_svg:not([class*='size-'])]:size-6",
      },
    },
  },
);

export default function GameButton({
  children,
  className,
  disabled,
  loading,
  size = "lg",
  ...props
}: GameButtonProps & VariantProps<typeof gameButtonVariants>) {
  const ref = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (el && !el.style.minWidth) {
      el.style.minWidth = `${el.offsetWidth}px`;
    }
  }, []);

  return (
    <Button
      ref={ref}
      className={cn(gameButtonVariants({ size, className }))}
      disabled={disabled || loading}
      {...props}
    >
      {loading && <IconLoader2 className="animate-spin" />}
      {children}
    </Button>
  );
}
