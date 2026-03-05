export function formatCurrency(
  value: number,
  decimals = 0,
  currency?: string,
): string {
  return new Intl.NumberFormat("en-US", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
    ...(typeof currency === "string" ? { style: "currency", currency } : {}),
  }).format(value);
}

export function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}
