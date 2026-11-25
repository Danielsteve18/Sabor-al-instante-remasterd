import type { Metadata } from "next";
import { AuthShell } from "@/components/auth/AuthShell";
import { RegistroForm } from "@/components/forms/registro-form";

export const metadata: Metadata = { title: "Crear cuenta · Sabor al Instante" };

export default function RegistroPage() {
  return (
    <AuthShell
      title="Crear nueva cuenta"
      subtitle="Completa el formulario para registrarte"
      panelTitle={
        <>
          Únete a <span className="text-brand-gold">sabor al instante</span>
        </>
      }
      panelText="Crea tu cuenta en menos de un minuto y empieza a reservar."
      backHref="/login"
      backLabel="Volver al login"
      switchText="¿Ya tienes cuenta?"
      switchLabel="Iniciar sesión"
      switchHref="/login"
    >
      <RegistroForm />
    </AuthShell>
  );
}
