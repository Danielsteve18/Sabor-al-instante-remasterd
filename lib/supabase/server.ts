import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

function getCredentials() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !anonKey) {
    throw new Error(
      "Faltan NEXT_PUBLIC_SUPABASE_URL o NEXT_PUBLIC_SUPABASE_ANON_KEY. Copia .env.example a .env.local.",
    );
  }

  return { url, anonKey };
}

/** Cliente de Supabase para Server Components, Server Actions y route handlers. */
export async function createClient() {
  const cookieStore = await cookies();
  const { url, anonKey } = getCredentials();

  return createServerClient(url, anonKey, {
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
          // En un Server Component no se pueden escribir cookies;
          // la renovación de sesión se hará en proxy.ts (SAB-16).
        }
      },
    },
  });
}
