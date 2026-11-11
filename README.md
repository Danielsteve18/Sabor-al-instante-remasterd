# Sabor al Instante

Sitio público y panel de administración para un restaurante: catálogo de platos, ofertas diarias, reservas, contacto, blog y gestión interna.

## ¿Por qué este proyecto?

Sabor al Instante es un restaurante que necesita una presencia digital que acompañe su operación diaria. Hasta hoy no contaba con una solución que funcionara de verdad:

- Los clientes no podían consultar el menú ni las ofertas desde el celular.
- No existía una forma ordenada de reservar mesa: todo se gestionaba por fuera, con pérdida de solicitudes y sin control de cupo.
- Los mensajes de contacto se perdían: no llegaban a nadie.

Este proyecto construye la solución digital completa del restaurante:

- Sitio web con el menú siempre actualizado, ofertas diarias, historia y blog.
- Reservas en línea simples y con confirmación inmediata para el cliente.
- Canal de contacto que sí llega al equipo.
- Panel de administración para gestionar menú, reservas, ofertas y contenido sin depender de programadores.
- Cuentas de cliente para ver y manejar sus propias reservas.

Con esto el restaurante pasa a operar su presencia online de punta a punta: del menú a la reserva, con todo administrable desde un solo lugar.

## Estado del proyecto

Sprint actual: **S1 — Fundaciones** (4 al 11 de noviembre de 2026).

S1 entrega la estructura del repositorio, la documentación base, el modelo de datos y la identidad visual. **La base ejecutable —dependencias, `package.json` y código— se instala en S2.** Por eso en esta etapa no hay `bun install` ni servidor de desarrollo.

| Sprint | Fechas | Alcance |
|---|---|---|
| S0 | 10 – 31 oct | Capacitación del equipo |
| S1 | 4 – 11 nov | Estructura, documentación, base de datos y diseño |
| S2 | 12 – 18 nov | Autenticación y catálogo |
| S3 | 19 – 25 nov | Reservas, home y despliegue |
| S4 | 26 nov – 2 dic | Contenido y panel de administración |
| S5 | 3 – 9 dic | Cierre, auditorías y sustentación |

## Stack

Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS v4, Base UI, Supabase (PostgreSQL, Auth y Storage), Vercel y bun.

El detalle, las versiones y la justificación de cada elección están en [`docs/infra/stack.md`](docs/infra/stack.md).

## Estructura del repositorio

| Ruta | Contenido |
|---|---|
| `app/` | Rutas, layouts y estilos globales |
| `components/` | Componentes de UI, layout, secciones, formularios y admin |
| `lib/` | Clientes, consultas, validaciones y utilidades |
| `hooks/` | Hooks de React compartidos |
| `types/` | Tipos y contratos de TypeScript |
| `public/images/` | Imágenes estáticas |
| `supabase/migrations/` | Migraciones SQL numeradas |
| `scripts/` | Scripts de apoyo |
| `docs/` | Documentación del proyecto |

El árbol completo está en [`docs/infra/estructura.md`](docs/infra/estructura.md).

## Puesta en marcha (a partir de S2)

1. Instalar bun.
2. `bun install`
3. Crear `.env.local` con las variables de la tabla siguiente.
4. `bun run dev`

## Variables de entorno

| Variable | Uso |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | URL del proyecto de Supabase |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Clave pública (`anon`) para el cliente |

Los secretos nunca se versionan. El detalle está en [`docs/infra/supabase.md`](docs/infra/supabase.md).

## Flujo de trabajo

- `main` es la rama estable; `dev` integra el trabajo de cada sprint.
- Cada issue se resuelve en una rama `usuario/sab-N-slug`.
- Todo cambio entra por Pull Request hacia `dev`, con al menos una revisión.
- Los hooks de `.githooks/` bloquean el push directo a `main` y `dev`.
- Los commits siguen el formato `tipo(área): mensaje`.

Guía completa en [`GUIA.md`](GUIA.md).

## Documentación

Índice de todos los documentos en [`docs/README.md`](docs/README.md).
