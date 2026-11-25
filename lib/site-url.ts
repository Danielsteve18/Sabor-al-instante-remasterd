/**
 * URL pública base para enlaces que se generan en el servidor (correos de Supabase).
 * No se deriva del header Host: detrás de Vercel no es confiable y puede filtrar
 * el dominio equivocado en el correo de confirmación.
 */
export function getSiteUrl(): string {
  const configurada = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (configurada) return configurada.replace(/\/+$/, "");

  // Vercel expone VERCEL_URL sin esquema; sirve también para previews.
  const vercel = process.env.VERCEL_URL?.trim();
  if (vercel) return `https://${vercel.replace(/\/+$/, "")}`;

  if (process.env.NODE_ENV !== "production") return "http://localhost:3000";

  // Producción: dominio canónico, para no volver a enviar localhost si falta la variable.
  return "https://sabor-al-instante-remasterd.vercel.app";
}
