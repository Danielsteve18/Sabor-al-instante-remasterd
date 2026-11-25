import type { Metadata } from "next";
import Link from "next/link";
import { AuthAlert } from "@/components/auth/AuthAlert";
import { AuthShell } from "@/components/auth/AuthShell";
import { LoginForm } from "@/components/forms/login-form";
import { LogoutButton } from "@/components/forms/logout-button";
import { createClient } from "@/lib/supabase/server";

export const metadata: Metadata = { title: "Iniciar sesión · Sabor al Instante" };

type Props = {
  searchParams: Promise<{ next?: string; sesion?: string }>;
};

const panelTitle = (
  <>
    Prueba lo mejor que <span className="text-brand-gold">te sorprenda</span>
  </>
);

export default async function LoginPage({ searchParams }: Props) {
  const { next, sesion } = await searchParams;

  // getUser() valida la sesión con Supabase (más seguro que leer solo la cookie).
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    return (
      <AuthShell
        title="Ya iniciaste sesión"
        subtitle={`Entraste como ${user.email}.`}
        panelTitle={panelTitle}
        panelText="Inicia sesión para reservar tu mesa y consultar nuestro menú."
        backHref="/"
        backLabel="Volver al inicio"
        switchText="¿Quieres gestionar tus reservas?"
        switchLabel="Ir a mi cuenta"
        switchHref="/cuenta"
      >
        <div className="flex flex-col gap-3">
          <Link
            href="/"
            className="rounded-xl border border-brand-gold/40 px-4 py-[15px] text-center font-semibold text-brand-gold no-underline transition-colors hover:bg-brand-gold/10"
          >
            Ir al inicio
          </Link>
          <LogoutButton className="w-full cursor-pointer rounded-xl border border-white/20 px-4 py-[15px] font-semibold text-brand-text transition-colors hover:bg-white/10" />
        </div>
      </AuthShell>
    );
  }

  return (
    <AuthShell
      title="Bienvenido de nuevo"
      subtitle="Ingresa tus credenciales para continuar"
      panelTitle={panelTitle}
      panelText="Inicia sesión para reservar tu mesa y consultar nuestro menú."
      backHref="/"
      backLabel="Volver al inicio"
      switchText="¿No tienes cuenta?"
      switchLabel="Crear cuenta nueva"
      switchHref="/registro"
    >
      <div className="flex flex-col gap-4">
        {sesion === "cerrada" && (
          <AuthAlert type="success" title="Sesión cerrada">
            Cerraste sesión correctamente.
          </AuthAlert>
        )}
        <LoginForm next={next ?? "/"} />
      </div>
    </AuthShell>
  );
}
