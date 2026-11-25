# Proyecto de Supabase

Documentación del proyecto en la nube: migraciones aplicadas, variables de entorno y verificación de seguridad.

## Proyecto

| Campo | Valor |
|---|---|
| Nombre | sabor-al-instante |
| Región | us-east-1 |
| Plan | Free |
| Motor | PostgreSQL 15 |

## Migraciones

| Archivo | Contenido | Responsable |
|---|---|---|
| `supabase/migrations/0001_init.sql` | Tablas, claves foráneas, checks e índices | Manuel Vera |
| `supabase/migrations/0002_rls.sql` | Funciones de rol y políticas RLS | Jesus Zapata |

Se ejecutan en el SQL Editor **en orden** y no se editan después de aplicadas. La siguiente migración se numera `0003_`.

## Variables de entorno

| Variable | Dónde se usa | Se versiona |
|---|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Cliente y servidor | Sí |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Cliente y servidor (clave pública) | Sí |
| `SUPABASE_SERVICE_ROLE_KEY` | Solo tareas administrativas puntuales | **Nunca** |

Configuración:

- Desarrollo: archivo `.env.local` en la raíz (ignorado por `.gitignore`).
- Producción: variables de entorno del proyecto en Vercel.

La clave `service_role` no se usa en S1 y no se escribe en el repositorio.

## Verificación

1. Las 9 tablas del modelo aparecen en el panel.
2. `0002_rls.sql` deja RLS activo en todas las tablas.
3. Con la clave `anon` solo se lee el catálogo y el contenido publicado.
4. `git ls-files` no muestra ningún archivo `.env` ni claves.

## Notas

- En S1 no se escriben clientes de Supabase en el código: eso corresponde a S2.
- Las políticas de rol se documentan en `docs/base-datos/rls.md`.
- El modelo de datos se documenta en `docs/base-datos/modelo-datos.md`.
