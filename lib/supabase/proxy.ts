import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

/** Rutas que exigen sesión. Todo lo que empiece por ellas queda protegido. */
const RUTAS_PRIVADAS = ["/cuenta", "/admin"];

function esPrivada(pathname: string) {
  return RUTAS_PRIVADAS.some((r) => pathname === r || pathname.startsWith(`${r}/`));
}

/**
 * Se ejecuta antes de cada página:
 * 1. Renueva la sesión de Supabase y guarda las cookies actualizadas.
 * 2. Si la ruta es privada y no hay sesión, redirige a /login?next=<destino>.
 */
export async function updateSession(request: NextRequest) {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !anonKey) {
    throw new Error("Faltan NEXT_PUBLIC_SUPABASE_URL o NEXT_PUBLIC_SUPABASE_ANON_KEY en .env.local.");
  }

  let response = NextResponse.next({ request });

  const supabase = createServerClient(url, anonKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
        response = NextResponse.next({ request });
        cookiesToSet.forEach(({ name, value, options }) =>
          response.cookies.set(name, value, options),
        );
      },
    },
  });

  // Importante: no poner código entre createServerClient y getUser (Supabase lo recomienda así).
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { pathname, search } = request.nextUrl;

  if (!user && esPrivada(pathname)) {
    const loginUrl = request.nextUrl.clone();
    loginUrl.pathname = "/login";
    loginUrl.search = "";
    loginUrl.searchParams.set("next", pathname + search);

    const redirectResponse = NextResponse.redirect(loginUrl);
    // Conserva las cookies que Supabase acaba de actualizar.
    response.cookies.getAll().forEach((c) => redirectResponse.cookies.set(c));
    return redirectResponse;
  }

  return response;
}
