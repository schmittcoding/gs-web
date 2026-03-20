import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

type StatCardProps = {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  description?: string;
  accentColor?: string;
  className?: string;
};

function StatCard({
  icon,
  label,
  value,
  description,
  accentColor = "text-primary",
  className,
}: StatCardProps) {
  return (
    <Card
      className={cn(
        "col-span-1 md:col-span-1 lg:col-span-2 relative group h-max",
        className,
      )}
    >
      {/* Subtle hover glow */}
      <div className="absolute inset-0 bg-linear-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      <CardContent className="relative flex items-center gap-4 p-4">
        <div className={cn("shrink-0", accentColor)}>{icon}</div>
        <div className="min-w-0 flex-1">
          <p className="text-[10px] font-semibold uppercase tracking-widest text-gray-500">
            {label}
          </p>
          <p className="text-2xl font-black leading-tight tabular-nums">
            {value}
          </p>
          {description && (
            <p className="text-xs text-gray-500 truncate">{description}</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

function StatCardSkeleton() {
  return (
    <div className="col-span-1 md:col-span-1 lg:col-span-2 relative overflow-hidden shape-main border border-gray-800 bg-gray-950">
      <div className="flex items-center gap-4 p-4">
        <div className="size-6 rounded bg-gray-800 animate-pulse" />
        <div className="space-y-2 flex-1">
          <div className="h-2.5 w-16 rounded bg-gray-800 animate-pulse" />
          <div className="h-7 w-12 rounded bg-gray-800 animate-pulse" />
        </div>
      </div>
    </div>
  );
}

export { StatCard, StatCardSkeleton };
