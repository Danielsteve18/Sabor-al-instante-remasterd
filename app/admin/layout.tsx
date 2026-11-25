import { requireAdmin } from "@/lib/supabase/server";

export default async function AdminLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  // Sin sesión → /login. Con sesión pero sin rol admin → inicio.
  await requireAdmin("/admin");
  return <>{children}</>;
}
