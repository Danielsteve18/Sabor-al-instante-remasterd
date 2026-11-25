import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

/**
 * Cliente de Supabase para el SERVIDOR (Server Components, Server Actions y
 * Route Handlers).
 *
 * Lee y refresca la sesión desde las cookies de la petición. En Next 16
 * `cookies()` es asíncrono, por eso la función también lo es: recuerda
 * `await createClient()`.
 */
export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) => {
              cookieStore.set(name, value, options);
            });
          } catch {
            // Se llamó desde un Server Component: no se pueden escribir
            // cookies al renderizar. Se puede ignorar si hay middleware/proxy
            // que refresca la sesión (ver ELE-16).
          }
        },
      },
    },
  );
}
