/**
 * Formato de precio del catálogo.
 * Se conserva USD con dos decimales, de acuerdo con los valores de referencia
 * del catálogo (por ejemplo, $16.00). Las tarjetas reutilizan esta función
 * para evitar diferencias entre componentes.
 */
const formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

export function formatPrice(value: number): string {
  return formatter.format(value);
}
