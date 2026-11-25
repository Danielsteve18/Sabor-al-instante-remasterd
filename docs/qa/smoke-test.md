# Smoke test de integración — cierre S2

**Issue:** SAB-13 · **Épica:** E1 Auth y catálogo · **Fecha:** 2026-11-25 15:17 -05  
**Rama:** `dev` @ `cb5639f` + ajustes de QA en el árbol de trabajo (`AuthShell.tsx`, `lib/data/menu.ts`, `app/menu/error.tsx`)  
**Entorno:** Next.js 16.4.6 (Turbopack), Bun 1.3.10, Supabase remoto (`NEXT_PUBLIC_*` en `.env.local`, ignorado por git).

## Flujos críticos del sprint

1. Instalación reproducible y chequeo de tipos.
2. Build de producción.
3. Lint (si existe script en el proyecto).
4. Rutas públicas: `/`, `/login`, `/registro`, `/menu`.
5. Catálogo contra Supabase (sin error de conexión ni overlay).
6. Rutas privadas sin sesión: `/cuenta`, `/admin`.
7. Configuración de entorno sin secretos versionados.

## Checklist ejecutado

| # | Paso | Resultado esperado | Resultado real | Evidencia |
|---|---|---|---|---|
| 1 | `bun install --frozen-lockfile` | Dependencias resueltas sin cambios en `bun.lock` | ✅ OK | `Checked 58 installs across 116 packages (no changes)` · exit 0 |
| 2 | `bun run typecheck` | `tsc --noEmit` sin errores | ✅ OK | Sin salida de error · exit 0 |
| 3 | `bun run build` | Build de producción correcto y rutas listadas | ✅ OK | `✓ Compiled successfully in 1666ms` · `Finished TypeScript in 6.3s` · 8 rutas estáticas/dinámicas + Proxy |
| 4 | `bun run lint` | Script de lint disponible y en verde | ⚠️ No aplicable | `package.json` solo define `dev`, `build`, `start`, `typecheck` (líneas 5–10). Ver D-01 en `docs/qa/s2.md`. |
| 5 | GET `/` | 200 | ✅ OK | HTTP 200 · 6092 bytes |
| 6 | GET `/login` | 200 y formulario disponible | ✅ OK | HTTP 200 · 28944 bytes |
| 7 | GET `/registro` | 200 y viewport fijado | ✅ OK | HTTP 200 · 29929 bytes · clases `h-dvh` y `overflow-y-auto` presentes en el HTML |
| 8 | GET `/menu` | 200 sin error de Supabase | ✅ OK | HTTP 200 · 178144 bytes · `uiError=false` · `ECONNREFUSED=false` |
| 9 | Catálogo en `/menu` | Categorías y platos reales | ✅ OK | Título “Menú & precios” · categoría “Aperitivos” · 56 etiquetas `<article>` en el HTML |
| 10 | GET `/cuenta` sin sesión | Redirección a login conservando destino | ✅ OK | HTTP 307 · `Location: /login?next=%2Fcuenta` |
| 11 | GET `/admin` sin sesión | Redirección a login conservando destino | ✅ OK | HTTP 307 · `Location: /login?next=%2Fadmin` |
| 12 | Secretos en el repo | Ningún `.env` ni clave versionado | ✅ OK | `.env.local` ignorado por `.gitignore`; `doc/env/.env` ignorado por `.gitignore:8`; `git status` no los lista |

## Condiciones de ejecución

- Servidor usado para las rutas: `bun run start -- --hostname 127.0.0.1 --port 3000` sobre el build de producción.
- El servidor fue detenido al terminar; el puerto 3000 quedó libre.
- El log del servidor mostró `Ready in 1088ms` y no registró errores de Supabase ni `ECONNREFUSED 127.0.0.1:54321` durante la pasada.
- El error previo de `/menu` (`{message, details, hint, code}`) quedó resuelto: `lib/data/menu.ts` lanza un `Error` legible y `app/menu/error.tsx` deja el detalle técnico solo en consola.

## Resultado

**Smoke test: PASS con una salvedad.** La única condición no ejecutable es el lint, porque el proyecto no define ese script. Los flujos críticos de build, rutas, base de datos y protección de rutas pasaron.

Registrado por: OpenCode en sesión con el usuario · 2026-11-25.  
Firma humana del responsable del sprint: pendiente de contrasignar en este archivo.
