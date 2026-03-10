import { formatCurrency } from "@/lib/formatters";
import { cn } from "@/lib/utils";
import { cva, VariantProps } from "class-variance-authority";
import { IconGameCoin, IconMileageCoin } from "../icons";

type CoinVariant = "rcoin" | "mcoin";

type CoinProps = React.ComponentProps<typeof IconGameCoin> & {
  variant?: CoinVariant;
  value: number;
  prevValue?: number;
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
  prevValue,
  size = "sm",
  variant = "rcoin",
  value,
  ...props
}: CoinProps & VariantProps<typeof coinVariants>) {
  const Icon = variant === "rcoin" ? IconGameCoin : IconMileageCoin;

  return (
    <p data-slot="coin" className={cn(coinVariants({ size, className }))}>
      <Icon
        data-slot="coin-icon"
        title={variant === "rcoin" ? "R-Coin" : "Mileage"}
        {...props}
      />
      <span data-slot="coin-value">{formatCurrency(value)}</span>
      {typeof prevValue === "number" && prevValue > 0 && (
        <span
          className="text-muted-foreground line-through"
          data-slot="prev-value"
        >
          {formatCurrency(prevValue)}
        </span>
      )}
    </p>
  );
}
