"use client";

import { useActionState } from "react";
import { registrar, type RegistroState } from "@/app/(auth)/registro/actions";

const inputClass =
  "rounded-md border border-input bg-background px-3 py-2 text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring aria-invalid:border-destructive";

export function RegistroForm() {
  const [state, formAction, pending] = useActionState<RegistroState, FormData>(
    registrar,
    null,
  );

  if (state?.ok) {
    return (
      <p role="status" className="rounded-md bg-card p-4 text-card-foreground">
        {state.needsConfirmation
          ? "Cuenta creada. Revisa tu correo para confirmarla antes de iniciar sesión."
          : "Cuenta creada. Ya puedes iniciar sesión."}
      </p>
    );
  }

  const fe = state?.fieldErrors;

  return (
    // noValidate: la validación la hace el servidor y sus mensajes se ven en la página.
    <form action={formAction} noValidate className="flex flex-col gap-4">
      <div className="flex flex-col gap-1">
        <label htmlFor="full_name" className="text-foreground">Nombre completo</label>
        <input
          id="full_name"
          name="full_name"
          type="text"
          autoComplete="name"
          defaultValue={state?.values?.full_name}
          aria-invalid={fe?.full_name ? true : undefined}
          aria-describedby={fe?.full_name ? "full_name-error" : undefined}
          className={inputClass}
        />
        {fe?.full_name && (
          <p id="full_name-error" className="text-sm text-destructive">{fe.full_name}</p>
        )}
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="email" className="text-foreground">Correo electrónico</label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          defaultValue={state?.values?.email}
          aria-invalid={fe?.email ? true : undefined}
          aria-describedby={fe?.email ? "email-error" : undefined}
          className={inputClass}
        />
        {fe?.email && (
          <p id="email-error" className="text-sm text-destructive">{fe.email}</p>
        )}
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="password" className="text-foreground">Contraseña</label>
        <input
          id="password"
          name="password"
          type="password"
          autoComplete="new-password"
          aria-invalid={fe?.password ? true : undefined}
          aria-describedby="password-help"
          className={inputClass}
        />
        <p id="password-help" className={`text-sm ${fe?.password ? "text-destructive" : "text-muted-foreground"}`}>
          {fe?.password ?? "Mínimo 8 caracteres, con letras y números."}
        </p>
      </div>

      {state?.error && (
        <p role="alert" className="rounded-md border border-destructive p-3 text-sm text-destructive">
          {state.error}
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="rounded-md bg-primary px-4 py-2 font-semibold text-primary-foreground disabled:opacity-60"
      >
        {pending ? "Creando cuenta…" : "Crear cuenta"}
      </button>
    </form>
  );
}
