import { NextResponse, type NextRequest } from "next/server";
import { createClient } from "@/lib/supabase/server";

/** Consume el `code` del correo de confirmación (flujo PKCE) y abre la sesión. */
export async function GET(request: NextRequest) {
  const code = request.nextUrl.searchParams.get("code");
  const exito = new URL("/login?confirmado=1", request.url);
  const fallo = new URL("/login?error=confirmacion", request.url);

  if (!code) return NextResponse.redirect(fallo);

  const supabase = await createClient();
  const { error } = await supabase.auth.exchangeCodeForSession(code);

  if (error) {
    console.error("Error al confirmar el correo:", error.message);
    return NextResponse.redirect(fallo);
  }

  return NextResponse.redirect(exito);
}
