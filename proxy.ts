import type { NextRequest } from "next/server";
import { updateSession } from "@/lib/supabase/proxy";

/** Next 16: proxy.ts reemplaza a middleware.ts. Se ejecuta antes de cada petición. */
export async function proxy(request: NextRequest) {
  return updateSession(request);
}

export const config = {
  // Todo menos archivos estáticos e imágenes (no necesitan sesión).
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|images/|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)",
  ],
};
