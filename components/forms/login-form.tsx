"use client";

import { useActionState } from "react";
import { login } from "@/app/(auth)/login/actions";
import { AuthAlert } from "@/components/auth/AuthAlert";
import { AuthField } from "@/components/auth/AuthField";
import { AuthSubmit } from "@/components/auth/AuthSubmit";

export function LoginForm() {
  const [state, formAction, pending] = useActionState(login, null);

  return (
    <form action={formAction} noValidate>
      {/* Durante el envío se bloquean los campos para evitar dobles clics */}
      <fieldset
        disabled={pending}
        className="m-0 flex min-w-0 flex-col gap-5 border-0 p-0"
      >
        {state?.message && <AuthAlert type="error">{state.message}</AuthAlert>}

        <AuthField
          id="email"
          name="email"
          label="Correo electrónico"
          type="email"
          icon="mail"
          placeholder="correo@ejemplo.com"
          autoComplete="email"
          defaultValue={state?.values?.email}
          error={state?.errors?.email}
        />
        <AuthField
          id="password"
          name="password"
          label="Contraseña"
          type="password"
          icon="lock"
          placeholder="Ingresa tu contraseña"
          autoComplete="current-password"
          error={state?.errors?.password}
        />

        <AuthSubmit
          pending={pending}
          label="Iniciar sesión"
          pendingLabel="Entrando…"
        />
      </fieldset>
    </form>
  );
}
