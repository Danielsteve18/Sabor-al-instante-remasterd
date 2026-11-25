# Pruebas de flujo auth — S2

**Issue:** SAB-19 · **Fecha:** 2026-11-25  
**Alcance ejecutado:** protección de rutas y disponibilidad de las pantallas de auth.  
**No ejecutado:** operaciones que requieren una cuenta real y confirmación de correo. Quedan documentadas para el siguiente pase.

## Casos de prueba

| ID | Caso | Pasos | Resultado esperado | Estado | Evidencia |
|---|---|---|---|---|---|
| AUTH-01 | Registro nuevo | Completar `/registro` con nombre, correo y contraseña válidos | `ok=true`; si Supabase exige confirmación, `needsConfirmation=true` y mensaje para revisar correo | ⏳ Pendiente | Requiere correo de prueba y acceso a la bandeja. Implementación revisada en `app/(auth)/registro/actions.ts:20-87`. |
| AUTH-02 | Correo repetido | Repetir AUTH-01 con un correo ya registrado | Error de campo: “Este correo ya está registrado.” | ⏳ Pendiente | Requiere cuenta previa. Manejo implementado en `app/(auth)/registro/actions.ts:63-84`. |
| AUTH-03 | Login válido | Enviar credenciales correctas en `/login` | Sesión en cookies y `redirect(destino)` (`next` o `/`) | ⏳ Pendiente | Requiere cuenta confirmada. Implementación en `app/(auth)/login/actions.ts:24-58`. |
| AUTH-04 | Login inválido | Enviar contraseña incorrecta | Mensaje “Correo o contraseña incorrectos.” (sin revelar si el correo existe) | ⏳ Pendiente | Requiere correo de prueba. Manejo en `app/(auth)/login/actions.ts:40-52`. |
| AUTH-05 | Logout | Ejecutar `cerrarSesion()` con sesión activa | Cookies borradas y redirect a `/login?sesion=cerrada` | ⏳ Pendiente | Requiere sesión activa. Implementación en `app/(auth)/login/actions.ts:60-65`. |
| AUTH-06 | `/cuenta` sin sesión | GET directo sin cookies | 307 → `/login?next=%2Fcuenta` | ✅ OK | Build de producción, 2026-11-25: HTTP 307, `Location: /login?next=%2Fcuenta`. |
| AUTH-07 | `/admin` sin sesión | GET directo sin cookies | 307 → `/login?next=%2Fadmin` | ✅ OK | Build de producción, 2026-11-25: HTTP 307, `Location: /login?next=%2Fadmin`. |
| AUTH-08 | Segunda barrera en `/cuenta` | Revisión del Server Component | `requireUser("/cuenta")` redirige si no hay usuario validado | ✅ Revisado | `app/cuenta/page.tsx:7-9` y `lib/supabase/server.ts:69-74`. |
| AUTH-09 | UI de `/login` y `/registro` | GET en build de producción | 200 y pantallas disponibles | ✅ OK | `/login` HTTP 200 (28944 bytes) · `/registro` HTTP 200 (29929 bytes). |
| AUTH-10 | Viewport de auth | GET `/registro` y revisión de clases | Sin scroll de página; scroll interno de seguridad | ✅ OK | HTML con `h-dvh` y `overflow-y-auto` tras el ajuste en `components/auth/AuthShell.tsx`. |
| AUTH-11 | Destino `next` seguro | Revisión de código | Solo rutas internas; valores externos caen a `/` | ✅ Revisado | `app/(auth)/login/actions.ts:17-22`. |

## Protección implementada

- `proxy.ts` delega en `updateSession()` (`lib/supabase/proxy.ts:16-59`).
- `RUTAS_PRIVADAS = ["/cuenta", "/admin"]`; cualquier submatching también queda protegido (`lib/supabase/proxy.ts:4-9`).
- Sin usuario, se redirige a `/login?next=<pathname+search>` y se conservan las cookies renovadas por Supabase (`lib/supabase/proxy.ts:47-57`).
- `requireUser()` valida el token con `getUser()` y vuelve a redirigir como segunda barrera (`lib/supabase/server.ts:69-74`).

## Resultado y pendientes

**Pasaron** las rutas privadas sin sesión, la disponibilidad de las pantallas y el viewport de auth.  
**Quedan pendientes** AUTH-01 a AUTH-05 por falta de una cuenta de prueba confirmada. No se marcan como correctos sin ejecución real.

No se encontraron defectos en los casos ejecutados. La carencia de cuenta de prueba se registró como D-03 en `docs/qa/s2.md` y se asigna a QA para el próximo pase.

Registrado por: OpenCode en sesión con el usuario · 2026-11-25.
