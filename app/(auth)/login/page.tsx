import type { Metadata } from "next";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { LoginForm } from "@/components/forms/login-form";
import { LogoutButton } from "@/components/forms/logout-button";

export const metadata: Metadata = { title: "Iniciar sesión · Sabor al Instante" };

type Props = {
  searchParams: Promise<{ next?: string; sesion?: string }>;
};

export default async function LoginPage({ searchParams }: Props) {
  const { next, sesion } = await searchParams;

  // getUser() valida la sesión con Supabase (más seguro que leer solo la cookie).
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <main className="mx-auto flex min-h-screen max-w-md flex-col justify-center gap-6 px-4">
      {user ? (
        <>
          <div className="flex flex-col gap-1">
            <h1 className="text-2xl font-bold text-foreground">Ya iniciaste sesión</h1>
            <p className="text-muted-foreground">Entraste como {user.email}.</p>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="rounded-md bg-primary px-4 py-2 font-semibold text-primary-foreground"
            >
              Ir al inicio
            </Link>
            <LogoutButton />
          </div>
        </>
      ) : (
        <>
          <div className="flex flex-col gap-1">
            <h1 className="text-2xl font-bold text-foreground">Iniciar sesión</h1>
            <p className="text-muted-foreground">Entra para ver y hacer tus reservas.</p>
          </div>

          {sesion === "cerrada" && (
            <p role="status" className="rounded-md bg-card p-3 text-sm text-card-foreground">
              Cerraste sesión correctamente.
            </p>
          )}

          <LoginForm next={next ?? "/"} />

          <p className="text-sm text-muted-foreground">
            ¿No tienes cuenta?{" "}
            <Link href="/registro" className="font-semibold text-primary underline">
              Regístrate
            </Link>
          </p>
        </>
      )}
    </main>
  );
}
