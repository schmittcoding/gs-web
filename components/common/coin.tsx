/* eslint-disable @next/next/no-img-element */
import { formatCurrency } from "@/lib/formatters";
import { cn } from "@/lib/utils";
import { cva, VariantProps } from "class-variance-authority";

type CoinVariant = "rcoin" | "mcoin";

type CoinProps = React.ComponentProps<"div"> & {
  variant?: CoinVariant;
  value: number;
  prevValue?: number;
};

const coinVariants = cva("flex items-center gap-2 text-base", {
  variants: {
    size: {
      sm: "text-xs [&_img:not([class*='size-'])]:size-4",
      lg: "[&_img:not([class*='size-'])]:size-6",
    },
  },
});

export default function Coin({
  className,
  prevValue,
  size = "sm",
  variant = "rcoin",
  value,
}: CoinProps & VariantProps<typeof coinVariants>) {
  return (
    <div data-slot="coin" className={cn(coinVariants({ size, className }))}>
      <img
        alt={variant === "rcoin" ? "R-Coin" : "Mileage"}
        data-slot="coin-icon"
        src={`/icons/${variant === "rcoin" ? "coin" : "mileage"}.svg`}
      />
      <span className="font-medium" data-slot="coin-value">
        {formatCurrency(value)}
      </span>
      {typeof prevValue === "number" && prevValue > 0 && (
        <span
          className="text-muted-foreground line-through"
          data-slot="prev-value"
        >
          {formatCurrency(prevValue)}
        </span>
      )}
    </div>
  );
}
