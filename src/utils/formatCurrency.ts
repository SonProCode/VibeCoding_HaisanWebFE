export const formatCurrency = (
  value: number,
  locale = "vi-VN",
  currency = "VND"
) =>
  new Intl.NumberFormat(locale, { style: "currency", currency }).format(value);
