"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

type Campo = "email" | "password";

export type LoginState = {
  error?: string;
  fieldErrors?: Partial<Record<Campo, string>>;
  email?: string;
} | null;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Solo acepta rutas internas (evita redirigir a otro sitio). */
function destinoSeguro(valor: FormDataEntryValue | null): string {
  const ruta = typeof valor === "string" ? valor : "";
  const esInterna = ruta.startsWith("/") && !ruta.startsWith("//") && !ruta.startsWith("/\\");
  return esInterna ? ruta : "/";
}

export async function iniciarSesion(
  _prev: LoginState,
  formData: FormData,
): Promise<LoginState> {
  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  const password = String(formData.get("password") ?? "");
  const destino = destinoSeguro(formData.get("next"));

  const fieldErrors: Partial<Record<Campo, string>> = {};
  if (!EMAIL_RE.test(email)) fieldErrors.email = "Escribe un correo válido.";
  if (!password) fieldErrors.password = "Escribe tu contraseña.";
  if (Object.keys(fieldErrors).length > 0) return { fieldErrors, email };

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    switch (error.code) {
      case "invalid_credentials":
        // No se dice cuál dato falló, para no revelar qué correos existen.
        return { error: "Correo o contraseña incorrectos.", email };
      case "email_not_confirmed":
        return { error: "Debes confirmar tu correo antes de iniciar sesión. Revisa tu bandeja de entrada.", email };
      case "over_request_rate_limit":
        return { error: "Demasiados intentos. Espera unos minutos e inténtalo de nuevo.", email };
      default:
        console.error("Error en signInWithPassword:", error.code, error.message);
        return { error: "No pudimos iniciar sesión. Intenta de nuevo.", email };
    }
  }

  // La sesión queda guardada en cookies; se refresca todo el árbol de páginas.
  revalidatePath("/", "layout");
  redirect(destino);
}

export async function cerrarSesion() {
  const supabase = await createClient();
  await supabase.auth.signOut(); // Borra las cookies de sesión.
  revalidatePath("/", "layout");
  redirect("/login?sesion=cerrada");
}
