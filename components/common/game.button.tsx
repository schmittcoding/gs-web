"use client";

import { IconLoader2 } from "@tabler/icons-react";
import { useEffect, useRef } from "react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";

type GameButtonProps = React.ComponentProps<typeof Button> & {
  loading?: boolean;
};

export default function GameButton({
  children,
  disabled,
  loading,
  size = "lg",
  asChild,
  ...props
}: GameButtonProps) {
  const ref = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (el && !el.style.minWidth) {
      el.style.minWidth = `${el.offsetWidth}px`;
    }
  }, []);

  return (
    <Button ref={ref} disabled={disabled || loading} size={size} {...props}>
      {asChild ? (
        children
      ) : (
        <>
          {loading && <IconLoader2 className="animate-spin" />}
          {children}
        </>
      )}
    </Button>
  );
}
