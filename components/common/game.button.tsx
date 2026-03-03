import { cn } from "@/lib/utils";
import { cva, VariantProps } from "class-variance-authority";
import { Button } from "../ui/button";

type GameButtonProps = React.ComponentProps<typeof Button>;

const gameButtonVariants = cva(
  "h-[unset] relative inline-flex items-center gap-2 py-3 px-6 text-base border-none cursor-pointer outline-none whitespace-nowrap shape-main hover:bg-primary/90",
  {
    variants: {
      size: {
        sm: "text-sm gap-1.5 [&_svg:not([class*='size-'])]:size-4",
        lg: "[&_svg:not([class*='size-'])]:size-6",
      },
    },
  },
);

export default function GameButton({
  className,
  size = "lg",
  ...props
}: GameButtonProps & VariantProps<typeof gameButtonVariants>) {
  return (
    <Button
      className={cn(gameButtonVariants({ size, className }))}
      {...props}
    />
  );
}
