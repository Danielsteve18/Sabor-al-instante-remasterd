"use client";

import { useActionState } from "react";
import { iniciarSesion, type LoginState } from "@/app/(auth)/login/actions";

const inputClass =
  "rounded-md border border-input bg-background px-3 py-2 text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring aria-invalid:border-destructive";

export function LoginForm({ next }: { next: string }) {
  const [state, formAction, pending] = useActionState<LoginState, FormData>(
    iniciarSesion,
    null,
  );
  const fe = state?.fieldErrors;

  return (
    <form action={formAction} noValidate className="flex flex-col gap-4">
      <input type="hidden" name="next" value={next} />

      <div className="flex flex-col gap-1">
        <label htmlFor="email" className="text-foreground">Correo electrónico</label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          defaultValue={state?.email}
          aria-invalid={fe?.email ? true : undefined}
          aria-describedby={fe?.email ? "email-error" : undefined}
          className={inputClass}
        />
        {fe?.email && <p id="email-error" className="text-sm text-destructive">{fe.email}</p>}
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="password" className="text-foreground">Contraseña</label>
        <input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          aria-invalid={fe?.password ? true : undefined}
          aria-describedby={fe?.password ? "password-error" : undefined}
          className={inputClass}
        />
        {fe?.password && <p id="password-error" className="text-sm text-destructive">{fe.password}</p>}
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
        {pending ? "Entrando…" : "Iniciar sesión"}
      </button>
    </form>
  );
}
