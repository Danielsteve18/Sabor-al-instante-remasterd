import type { Metadata } from "next";
import { AuthShell } from "@/components/auth/AuthShell";
import { LoginForm } from "@/components/forms/login-form";

export const metadata: Metadata = { title: "Iniciar sesión" };

export default function LoginPage() {
  return (
    <AuthShell
      title="Bienvenido de nuevo"
      subtitle="Ingresa tus credenciales para continuar"
      panelTitle={
        <>
          Prueba lo mejor que{" "}
          <span className="text-[#d4c59e]">te sorprenda</span>
        </>
      }
      panelText="Inicia sesión para reservar tu mesa y consultar nuestro menú."
      backHref="/"
      backLabel="Volver al inicio"
      switchText="¿No tienes cuenta?"
      switchLabel="Crear cuenta nueva"
      switchHref="/registro"
    >
      <LoginForm />
    </AuthShell>
  );
}
