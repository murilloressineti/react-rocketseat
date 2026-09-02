export function formatCurrency(valueInCents: number) {
  const valueInReais = valueInCents / 100;

  return valueInReais.toLocaleString("pt-BR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}
