"use client";

import { useActionState } from "react";
import { registrar, type RegistroState } from "@/app/(auth)/registro/actions";
import { AuthAlert } from "@/components/auth/AuthAlert";
import { AuthField } from "@/components/auth/AuthField";
import { AuthSubmit } from "@/components/auth/AuthSubmit";

export function RegistroForm() {
  const [state, formAction, pending] = useActionState<RegistroState, FormData>(
    registrar,
    null,
  );

  if (state?.ok) {
    return (
      <AuthAlert type="success" title="¡Listo!">
        {state.needsConfirmation
          ? "Cuenta creada. Revisa tu correo para confirmarla antes de iniciar sesión."
          : "Cuenta creada. Ya puedes iniciar sesión."}
      </AuthAlert>
    );
  }

  const fe = state?.fieldErrors;

  return (
    // noValidate: la validación la hace el servidor y sus mensajes se ven en la página.
    <form action={formAction} noValidate className="flex flex-col gap-4">
      <AuthField
        id="full_name"
        name="full_name"
        label="Nombre completo"
        type="text"
        icon="user"
        placeholder="Tu nombre y apellido"
        autoComplete="name"
        defaultValue={state?.values?.full_name}
        error={fe?.full_name}
      />

      <AuthField
        id="email"
        name="email"
        label="Correo electrónico"
        type="email"
        icon="mail"
        placeholder="tu@correo.com"
        autoComplete="email"
        defaultValue={state?.values?.email}
        error={fe?.email}
      />

      <AuthField
        id="password"
        name="password"
        label="Contraseña"
        type="password"
        icon="lock"
        placeholder="Mínimo 8 caracteres"
        autoComplete="new-password"
        error={fe?.password}
        help={fe?.password ? undefined : "Mínimo 8 caracteres, con letras y números."}
      />

      {state?.error && <AuthAlert type="error">{state.error}</AuthAlert>}

      <AuthSubmit pending={pending} label="Crear cuenta" pendingLabel="Creando cuenta…" />
    </form>
  );
}
