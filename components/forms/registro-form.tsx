"use client";

import { useActionState } from "react";
import Link from "next/link";
import { registrar, type RegistroState } from "@/app/(auth)/registro/actions";
import { AuthAlert } from "@/components/auth/AuthAlert";
import { AuthField } from "@/components/auth/AuthField";
import { AuthSubmit } from "@/components/auth/AuthSubmit";
import { Icon } from "@/components/auth/AuthIcons";

export function RegistroForm() {
  const [state, formAction, pending] = useActionState<RegistroState, FormData>(
    registrar,
    null,
  );

  // Cuenta creada: se reemplaza el formulario por el mensaje de éxito
  if (state?.ok) {
    return (
      <div className="flex flex-col gap-5">
        <AuthAlert type="success" title="¡Cuenta creada!">
          {state.needsConfirmation
            ? "Revisa tu correo para confirmarla antes de iniciar sesión."
            : "Ya puedes iniciar sesión."}
        </AuthAlert>
        <Link
          href="/login"
          className="flex w-full items-center justify-center gap-[10px] rounded-xl bg-gradient-to-br from-[#8fae56] to-[#7a9c48] p-[15px] text-[1.05rem] font-bold text-white no-underline shadow-[0_4px_15px_rgba(143,174,86,0.3)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_6px_20px_rgba(143,174,86,0.4)]"
        >
          Ir a iniciar sesión
          <Icon name="arrow-right" className="h-5 w-5" />
        </Link>
      </div>
    );
  }

  return (
    <form action={formAction} noValidate>
      <fieldset
        disabled={pending}
        className="m-0 flex min-w-0 flex-col gap-5 border-0 p-0"
      >
        {state?.message && <AuthAlert type="error">{state.message}</AuthAlert>}

        <AuthField
          id="full_name"
          name="full_name"
          label="Nombre completo"
          icon="user"
          placeholder="Tu nombre y apellido"
          autoComplete="name"
          defaultValue={state?.values?.full_name}
          error={state?.errors?.full_name}
        />
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
          placeholder="Crea una contraseña segura"
          autoComplete="new-password"
          help="Mínimo 8 caracteres"
          error={state?.errors?.password}
        />
        <AuthField
          id="confirm"
          name="confirm"
          label="Confirmar contraseña"
          type="password"
          icon="key"
          placeholder="Repite tu contraseña"
          autoComplete="new-password"
          error={state?.errors?.confirm}
        />

        <AuthSubmit
          pending={pending}
          label="Crear cuenta"
          pendingLabel="Creando cuenta…"
        />
      </fieldset>
    </form>
  );
}
