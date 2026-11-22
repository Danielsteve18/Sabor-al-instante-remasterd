import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export type Role = "cliente" | "staff" | "admin";

const ROLES: readonly Role[] = ["cliente", "staff", "admin"];

function isRole(value: unknown): value is Role {
  return typeof value === "string" && (ROLES as readonly string[]).includes(value);
}

/**
 * Resuelve el rol del usuario con sesión activa.
 * Devuelve `null` si no hay sesión o no existe perfil.
 */
export async function getCurrentRole(): Promise<Role | null> {
  const supabase = await createClient();

  // getUser() valida el token contra Supabase Auth (getSession() no lo hace).
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return null;

  const { data, error } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  if (error || !isRole(data?.role)) return null;
  return data.role;
}

export async function isAdmin(): Promise<boolean> {
  return (await getCurrentRole()) === "admin";
}

export async function isStaff(): Promise<boolean> {
  const role = await getCurrentRole();
  return role === "staff" || role === "admin";
}

/**
 * Guard para Server Components y Server Actions.
 * Sin sesión redirige a /login; con sesión pero sin permiso, a /.
 */
export async function requireRole(allowed: readonly Role[]): Promise<Role> {
  const role = await getCurrentRole();
  if (!role) redirect("/login");
  if (!allowed.includes(role)) redirect("/");
  return role;
}

export const requireAdmin = () => requireRole(["admin"]);
export const requireStaff = () => requireRole(["staff", "admin"]);

/** Asigna un rol. La base de datos rechaza la llamada si el usuario no es admin. */
export async function setUserRole(targetUserId: string, newRole: Role): Promise<void> {
  await requireAdmin();
  const supabase = await createClient();
  const { error } = await supabase.rpc("set_user_role", {
    target_user: targetUserId,
    new_role: newRole,
  });
  if (error) throw new Error(error.message);
}
