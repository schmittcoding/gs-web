export const STATE_LABELS: Record<string, string> = {
  sold: "Sold Out",
  "limit-reached": "Limit Reached",
};

export const PURCHASE_LIMIT_LABELS = {
  Lifetime: "Account Lifetime",
  Yearly: "Annual Limit",
  Monthly: "Monthly Limit",
  Daily: "Daily Limit",
} as const;
