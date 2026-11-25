# Políticas RLS y funciones de rol

Migraciones: `supabase/migrations/0002_rls.sql` y `supabase/migrations/0003_roles.sql`

## Funciones
- `my_role()`: devuelve el rol (cliente, staff y admin) del usuario autenticado, leyendo `profiles.role`.
- `is_admin()`: `true` si `my_role() = 'admin'`.
- `is_staff()` (0003): `true` si el rol es `staff` o `admin`.
- `set_user_role(target_user, new_role)` (0003): única vía para asignar roles. Lanza error si el llamante no es admin, si el rol no es válido o si un admin intenta quitarse su propio rol.

Las funciones son `security definer` con `search_path` vacío, para que las políticas de `profiles` no se llamen a sí mismas en bucle.

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

## Roles (SAB-17)
- `profiles.role` admite `cliente` (por defecto), `staff` y `admin`.
- Helpers en `lib/auth.ts`: `getCurrentRole()`, `isAdmin()`, `isStaff()`, `requireRole()`, `requireAdmin()`, `requireStaff()` y `setUserRole()`.
- Promover a un usuario por SQL (primer admin, desde el SQL Editor): `update public.profiles set role = 'admin' where id = '<uuid>';`
- Después, los roles se asignan con `select public.set_user_role('<uuid>', 'staff');` autenticado como admin.

### Pruebas con un usuario de cada rol (por ejecutar en Supabase)
| Usuario | `my_role()` | `set_user_role(...)` | UPDATE propio de `role` |
| -- | -- | -- | -- |
| cliente | `cliente` | error 42501 | sin efecto (RLS) |
| staff | `staff` | error 42501 | sin efecto (RLS) |
| admin | `admin` | permitido | permitido |
