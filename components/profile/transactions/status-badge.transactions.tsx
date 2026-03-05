import { Badge } from "@/components/ui/badge";
import { TRANSACTION_STATUS_MAP } from "./constants.transactions";

export default function TransactionStatusBadge({ status }: { status: number }) {
  const mapped = TRANSACTION_STATUS_MAP[status] ?? {
    label: "Other",
    variant: "outline" as const,
  };
  return <Badge variant={mapped.variant}>{mapped.label}</Badge>;
}
