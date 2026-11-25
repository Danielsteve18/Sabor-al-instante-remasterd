"use server";

import { createClient } from "@/lib/supabase/server";

export type RegistroState = {
  /** La cuenta se creó. */
  ok?: boolean;
  /** Supabase pide confirmar el correo antes de iniciar sesión. */
  needsConfirmation?: boolean;
  /** Error general. */
  message?: string;
  /** Errores por campo. */
  errors?: {
    full_name?: string;
    email?: string;
    password?: string;
    confirm?: string;
  };
  /** Lo escrito (sin contraseñas). */
  values?: { full_name: string; email: string };
} | null;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MIN_PASSWORD = 8;

export async function registrar(
  _prev: RegistroState,
  formData: FormData,
): Promise<RegistroState> {
  const full_name = String(formData.get("full_name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  const password = String(formData.get("password") ?? "");
  const confirm = String(formData.get("confirm") ?? "");
  const values = { full_name, email };

  const errors: NonNullable<RegistroState>["errors"] = {};
  if (full_name.length < 2) errors.full_name = "Escribe tu nombre completo";
  if (!EMAIL_RE.test(email)) {
    errors.email = "Escribe un correo válido, por ejemplo nombre@correo.com";
  }
  if (password.length < MIN_PASSWORD) {
    errors.password = `La contraseña debe tener al menos ${MIN_PASSWORD} caracteres`;
  }
  if (confirm !== password) errors.confirm = "Las contraseñas no coinciden";
  if (Object.keys(errors).length) return { errors, values };

  const supabase = await createClient();
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: { data: { full_name } },
  });

  if (error) {
    switch (error.code) {
      case "user_already_exists":
      case "email_exists":
        return { values, errors: { email: "Este correo ya está registrado" } };
      case "weak_password":
        return {
          values,
          errors: { password: "La contraseña es muy débil. Usa una más larga y variada" },
        };
      case "over_email_send_rate_limit":
        return {
          values,
          message: "Se enviaron demasiados correos. Intenta de nuevo en unos minutos.",
        };
      default:
        return { values, message: "No pudimos crear tu cuenta. Intenta de nuevo." };
    }
  }

  // Con "Confirm email" activo, Supabase no da error si el correo ya existe:
  // devuelve un usuario sin identidades.
  if (data.user && data.user.identities?.length === 0) {
    return { values, errors: { email: "Este correo ya está registrado" } };
  }

  // Sin sesión = hay que confirmar el correo antes de iniciar sesión.
  return { ok: true, needsConfirmation: !data.session };
}
