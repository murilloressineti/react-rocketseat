export function formatCurrencyToCents(value: string) {
  const normalizedValue = value.replace(".", "").replace(",", ".");

  return Math.round(Number(normalizedValue) * 100);
}
