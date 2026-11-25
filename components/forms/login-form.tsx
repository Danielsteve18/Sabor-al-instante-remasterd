"use client";

import { useActionState } from "react";
import { iniciarSesion, type LoginState } from "@/app/(auth)/login/actions";
import { AuthAlert } from "@/components/auth/AuthAlert";
import { AuthField } from "@/components/auth/AuthField";
import { AuthSubmit } from "@/components/auth/AuthSubmit";

export function LoginForm({ next }: { next: string }) {
  const [state, formAction, pending] = useActionState<LoginState, FormData>(
    iniciarSesion,
    null,
  );
  const fe = state?.fieldErrors;

  return (
    // noValidate: la validación la hace el servidor y sus mensajes se ven en la página.
    <form action={formAction} noValidate className="flex flex-col gap-4">
      {/* El action valida que sea una ruta interna antes de redirigir. */}
      <input type="hidden" name="next" value={next} />

      <AuthField
        id="email"
        name="email"
        label="Correo electrónico"
        type="email"
        icon="mail"
        placeholder="tu@correo.com"
        autoComplete="email"
        defaultValue={state?.email}
        error={fe?.email}
      />

      <AuthField
        id="password"
        name="password"
        label="Contraseña"
        type="password"
        icon="lock"
        placeholder="Tu contraseña"
        autoComplete="current-password"
        error={fe?.password}
      />

      {state?.error && <AuthAlert type="error">{state.error}</AuthAlert>}

      <AuthSubmit pending={pending} label="Iniciar sesión" pendingLabel="Entrando…" />
    </form>
  );
}
