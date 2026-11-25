import { cerrarSesion } from "@/app/(auth)/login/actions";

export function LogoutButton({ className }: { className?: string }) {
  return (
    <form action={cerrarSesion}>
      <button
        type="submit"
        className={
          className ??
          "rounded-md border border-input px-4 py-2 font-semibold text-foreground hover:bg-muted"
        }
      >
        Cerrar sesión
      </button>
    </form>
  );
}
