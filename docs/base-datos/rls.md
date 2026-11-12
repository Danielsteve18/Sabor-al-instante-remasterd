# Políticas RLS y funciones de rol

Migración: `supabase/migrations/0002_rls.sql`

## Funciones
- `my_role()`: devuelve el rol (`cliente` o `admin`) del usuario autenticado, leyendo `profiles.role`.
- `is_admin()`: `true` si `my_role() = 'admin'`.

Ambas son `security definer` con `search_path` vacío, para que las políticas de `profiles` no se llamen a sí mismas en bucle.

## Matriz de permisos

| Tabla | SELECT | INSERT | UPDATE | DELETE |
| -- | -- | -- | -- | -- |
| profiles | propio / admin | propio (rol `cliente`) | propio sin cambiar el rol / admin | admin |
| categories | público (`active`) / admin | admin | admin | admin |
| dishes | público | admin | admin | admin |
| daily_offers | público (`active`) / admin | admin | admin | admin |
| schedule | público | admin | admin | admin |
| reservations | propio / admin | autenticado (a su nombre) | admin / propio (cancelar si está pendiente) | admin |
| contact_messages | admin | autenticado | admin | admin |
| testimonials | público (`approved`), propios y admin | admin | admin | admin |
| posts | público (`published`) / admin | admin | admin | admin |

## Pruebas realizadas
- **anon:** lee `dishes`; `reservations` devuelve 0 filas; insertar en `categories` falla por RLS.
- **cliente autenticado:** `my_role()` = `cliente`, `is_admin()` = `false`; solo ve su fila en `profiles`; no lee `contact_messages`; no puede cambiarse el rol.
- **admin:** `is_admin()` = `true`; ve todas las filas de `profiles`.

## Notas
- Las reservas de invitado (`user_id` nulo) solo se pueden crear desde el servidor.
- La vista `reservation_slot_usage` expone únicamente conteos por franja horaria.
