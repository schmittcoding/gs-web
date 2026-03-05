export const TRANSACTION_TYPE_MAP: Record<
  number,
  {
    label: string;
    currency: string;
  }
> = {
  1: { label: "GCash", currency: "PHP" },
  2: { label: "PayPal", currency: "USD" },
  3: { label: "Wise", currency: "USD" },
  4: { label: "PayMongo", currency: "PHP" },
};

export const TRANSACTION_STATUS_MAP: Record<
  number,
  {
    label: string;
    variant: "default" | "secondary" | "destructive" | "outline";
  }
> = {
  0: { label: "Pending", variant: "outline" },
  1: { label: "Approved", variant: "default" },
  2: { label: "Denied", variant: "destructive" },
  3: { label: "Cancelled", variant: "secondary" },
};
