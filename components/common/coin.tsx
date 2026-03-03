import { formatCurrency } from "@/lib/formatters";
import { cn } from "@/lib/utils";
import { cva, VariantProps } from "class-variance-authority";
import { IconGameCoin, IconMileageCoin } from "../icons";

type CoinVariant = "rcoin" | "mcoin";

type CoinProps = React.ComponentProps<typeof IconGameCoin> & {
  variant?: CoinVariant;
  value: number;
};

const coinVariants = cva("flex items-center gap-2 text-base", {
  variants: {
    size: {
      sm: "text-xs [&_svg:not([class*='size-'])]:size-4",
      lg: "[&_svg:not([class*='size-'])]:size-6",
    },
  },
});

export default function Coin({
  className,
  size = "sm",
  variant = "rcoin",
  value,
  ...props
}: CoinProps & VariantProps<typeof coinVariants>) {
  const Icon = variant === "rcoin" ? IconGameCoin : IconMileageCoin;

  return (
    <p className={cn(coinVariants({ size, className }))}>
      <Icon title={variant === "rcoin" ? "R-Coin" : "Mileage"} {...props} />
      <span>{formatCurrency(value)}</span>
    </p>
  );
}
