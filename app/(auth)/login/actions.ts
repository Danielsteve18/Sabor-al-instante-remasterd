"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export type LoginState = {
  /** Error general (credenciales incorrectas, correo sin confirmar, etc.). */
  message?: string;
  /** Errores por campo. */
  errors?: { email?: string; password?: string };
  /** Lo escrito, para no obligar a volver a teclear el correo. */
  values?: { email: string };
} | null;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function login(
  _prev: LoginState,
  formData: FormData,
): Promise<LoginState> {
  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  const password = String(formData.get("password") ?? "");

  const errors: NonNullable<LoginState>["errors"] = {};
  if (!EMAIL_RE.test(email)) {
    errors.email = "Escribe un correo válido, por ejemplo nombre@correo.com";
  }
  if (!password) errors.password = "Escribe tu contraseña";
  if (errors.email || errors.password) return { errors, values: { email } };

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    return {
      values: { email },
      message:
        error.code === "email_not_confirmed"
          ? "Confirma tu correo antes de iniciar sesión."
          : "Correo o contraseña incorrectos.",
    };
  }

  redirect("/");
}
