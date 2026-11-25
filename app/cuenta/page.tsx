import type { Metadata } from "next";
import Link from "next/link";
import { getProfile, requireUser } from "@/lib/supabase/server";

export const metadata: Metadata = { title: "Mi cuenta · Sabor al Instante" };

export default async function CuentaPage() {
  // Segunda barrera (además del proxy): sin sesión, redirige a /login.
  const user = await requireUser("/cuenta");
  const profile = await getProfile();

  return (
    <main className="mx-auto flex min-h-screen max-w-md flex-col justify-center gap-4 px-4">
      <h1 className="text-2xl font-bold text-foreground">Mi cuenta</h1>
      <dl className="flex flex-col gap-2 rounded-md bg-card p-4 text-card-foreground">
        <div><dt className="text-sm text-muted-foreground">Nombre</dt><dd>{profile?.full_name || "Sin nombre"}</dd></div>
        <div><dt className="text-sm text-muted-foreground">Correo</dt><dd>{user.email}</dd></div>
        <div><dt className="text-sm text-muted-foreground">Rol</dt><dd>{profile?.role ?? "—"}</dd></div>
      </dl>
      <Link href="/login" className="text-sm font-semibold text-primary underline">
        Ir a cerrar sesión
      </Link>
    </main>
  );
}
