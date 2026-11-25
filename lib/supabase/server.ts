import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { cache } from "react";
import { redirect } from "next/navigation";

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

/**
 * Usuario actual, validado con Supabase (getUser verifica el token; no basta con leer la cookie).
 * `cache` hace que se consulte una sola vez por petición aunque varios componentes lo pidan.
 */
export const getSessionUser = cache(async () => {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user;
});

/** Perfil del usuario actual (nombre y rol) desde la tabla profiles, o null sin sesión. */
export const getProfile = cache(async () => {
  const user = await getSessionUser();
  if (!user) return null;

  const supabase = await createClient();
  const { data } = await supabase
    .from("profiles")
    .select("id, full_name, role")
    .eq("id", user.id)
    .single();
  return data as { id: string; full_name: string | null; role: "cliente" | "admin" } | null;
});

/** Exige sesión: si no hay, redirige a /login conservando el destino. */
export async function requireUser(destino: string) {
  const user = await getSessionUser();
  if (!user) redirect(`/login?next=${encodeURIComponent(destino)}`);
  return user;
}

/** Exige rol admin: sin sesión va a /login; con sesión pero sin permiso va al inicio. */
export async function requireAdmin(destino: string) {
  await requireUser(destino);
  const profile = await getProfile();
  if (profile?.role !== "admin") redirect("/");
  return profile;
}
