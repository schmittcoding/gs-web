import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CreatorSummary } from "@/types/creator";
import { formatCurrency } from "@/lib/formatters";
import { IconHash, IconTrophy, IconUsers } from "@tabler/icons-react";

type SummaryCardProps = {
  summary: CreatorSummary;
};

export function StreamerSummaryCard({ summary }: SummaryCardProps) {
  return (
    <Card variant="primary">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wider">
          <IconTrophy className="size-4 text-primary" />
          Streamer Dashboard
        </CardTitle>
      </CardHeader>
      <CardContent className="py-4 grid grid-cols-3 gap-4">
        <div className="space-y-1">
          <p className="text-[10px] font-semibold uppercase tracking-widest text-gray-500 flex items-center gap-1">
            <IconHash className="size-3" />
            Streamer Code
          </p>
          <p className="font-black text-lg tracking-widest text-primary">
            {summary.creator_code}
          </p>
        </div>
        <div className="space-y-1">
          <p className="text-[10px] font-semibold uppercase tracking-widest text-gray-500 flex items-center gap-1">
            <IconUsers className="size-3" />
            Supporters
          </p>
          <p className="font-black text-lg tabular-nums text-foreground">
            {summary.total_supporters.toLocaleString()}
          </p>
        </div>
        <div className="space-y-1">
          <p className="text-[10px] font-semibold uppercase tracking-widest text-gray-500 flex items-center gap-1">
            <IconTrophy className="size-3" />
            Total Earned
          </p>
          <p className="font-black text-lg tabular-nums text-accent">
            {formatCurrency(summary.total_earned)}
          </p>
        </div>
      </CardContent>
      <div className="absolute bottom-0 left-0 h-0.5 w-1/3 bg-linear-to-r from-primary to-transparent" />
    </Card>
  );
}
