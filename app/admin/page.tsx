import { getProfile } from "@/lib/supabase/server";

export default async function AdminPage() {
  const profile = await getProfile();
  return (
    <main className="mx-auto flex min-h-screen max-w-3xl flex-col justify-center gap-2 px-4">
      <h1 className="text-2xl font-bold text-foreground">Panel de administración</h1>
      <p className="text-muted-foreground">
        Hola, {profile?.full_name || "admin"}. El panel se construye en su propia tarea.
      </p>
    </main>
  );
}
