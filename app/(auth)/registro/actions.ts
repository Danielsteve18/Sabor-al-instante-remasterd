"use server";

import { createClient } from "@/lib/supabase/server";
import { getSiteUrl } from "@/lib/site-url";

type Campo = "full_name" | "email" | "password";

export type RegistroState = {
  ok?: boolean;
  needsConfirmation?: boolean;
  error?: string;
  fieldErrors?: Partial<Record<Campo, string>>;
  values?: { full_name: string; email: string };
} | null;

const MIN_PASSWORD = 8;
const MAX_NOMBRE = 80;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const NOMBRE_RE = /^[A-Za-zÁÉÍÓÚÜÑáéíóúüñ' .-]+$/;

export async function registrar(
  _prev: RegistroState,
  formData: FormData,
): Promise<RegistroState> {
  const fullName = String(formData.get("full_name") ?? "").trim().replace(/\s+/g, " ");
  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  const password = String(formData.get("password") ?? "");
  const values = { full_name: fullName, email };

  // 1. Validación en servidor (nunca se confía solo en el navegador).
  const fieldErrors: Partial<Record<Campo, string>> = {};

  if (fullName.length < 3) {
    fieldErrors.full_name = "Escribe tu nombre completo (mínimo 3 caracteres).";
  } else if (fullName.length > MAX_NOMBRE) {
    fieldErrors.full_name = `El nombre no puede pasar de ${MAX_NOMBRE} caracteres.`;
  } else if (!NOMBRE_RE.test(fullName)) {
    fieldErrors.full_name = "El nombre solo puede tener letras, espacios, puntos, apóstrofos y guiones.";
  }

  if (!EMAIL_RE.test(email)) {
    fieldErrors.email = "Escribe un correo válido, por ejemplo nombre@correo.com.";
  }

  if (password.length < MIN_PASSWORD) {
    fieldErrors.password = `La contraseña debe tener al menos ${MIN_PASSWORD} caracteres.`;
  } else if (!/[A-Za-z]/.test(password) || !/\d/.test(password)) {
    fieldErrors.password = "La contraseña debe combinar letras y números.";
  }

  if (Object.keys(fieldErrors).length > 0) {
    return { fieldErrors, values };
  }

  // 2. Crear el usuario. El trigger handle_new_user crea su fila en profiles
  //    con role = 'cliente' (el rol nunca viene del formulario).
  const supabase = await createClient();
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { full_name: fullName },
      emailRedirectTo: `${getSiteUrl()}/auth/callback`,
    },
  });

  if (error) {
    switch (error.code) {
      case "user_already_exists":
      case "email_exists":
        return { fieldErrors: { email: "Este correo ya está registrado." }, values };
      case "email_address_invalid":
        return { fieldErrors: { email: "Ese correo no es válido. Usa uno real." }, values };
      case "weak_password":
        return { fieldErrors: { password: "La contraseña es muy débil. Usa una más larga y variada." }, values };
      case "over_email_send_rate_limit":
        return { error: "Se enviaron demasiados correos. Intenta de nuevo en unos minutos.", values };
      default:
        console.error("Error en signUp:", error.code, error.message);
        return { error: "No pudimos crear tu cuenta. Intenta de nuevo.", values };
    }
  }

  // Con "Confirm email" activo, Supabase no devuelve error si el correo ya existe:
  // devuelve un usuario sin identidades.
  if (data.user && data.user.identities?.length === 0) {
    return { fieldErrors: { email: "Este correo ya está registrado." }, values };
  }

  // Sin sesión = el usuario debe confirmar su correo antes de iniciar sesión.
  return { ok: true, needsConfirmation: !data.session };
}
