import type { Metadata } from "next";
import { RegistroForm } from "@/components/forms/registro-form";

export const metadata: Metadata = { title: "Crear cuenta · Sabor al Instante" };

export default function RegistroPage() {
  return (
    <main className="mx-auto flex min-h-screen max-w-md flex-col justify-center gap-6 px-4">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-bold text-foreground">Crear cuenta</h1>
        <p className="text-muted-foreground">Regístrate para hacer tus reservas.</p>
      </div>
      <RegistroForm />
    </main>
  );
}
