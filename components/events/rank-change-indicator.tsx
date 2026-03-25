import { cn } from "@/lib/utils";
import { IconArrowDown, IconArrowUp, IconMinus } from "@tabler/icons-react";

type RankChangeIndicatorProps = {
  change: number | null;
  className?: string;
};

export function RankChangeIndicator({
  change,
  className,
}: RankChangeIndicatorProps) {
  if (change === null || change === 0) {
    return (
      <span
        className={cn(
          "inline-flex items-center gap-0.5 text-xs text-gray-500",
          className,
        )}
      >
        <IconMinus className="size-3" />
      </span>
    );
  }

  if (change > 0) {
    return (
      <span
        className={cn(
          "inline-flex items-center gap-0.5 text-xs text-green-400",
          className,
        )}
      >
        <IconArrowUp className="size-3" />
        {change}
      </span>
    );
  }

  return (
    <span
      className={cn(
        "inline-flex items-center gap-0.5 text-xs text-red-400",
        className,
      )}
    >
      <IconArrowDown className="size-3" />
      {Math.abs(change)}
    </span>
  );
}
