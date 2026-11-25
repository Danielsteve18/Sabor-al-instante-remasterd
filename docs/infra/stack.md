# Stack y aplicaciones de gestión

Documento de decisión del stack del proyecto. Cada tecnología se eligió por una razón concreta y queda fija para todos los sprints.

## Tecnologías

| Capa | Tecnología | Versión | Motivo |
|---|---|---|---|
| Framework | Next.js (App Router) | 16 | Server Components, rutas por archivo y despliegue directo en Vercel |
| UI | React | 19 | Requerido por Next.js 16; hooks y Server Actions |
| Lenguaje | TypeScript | 5 | Tipado estático en cliente, servidor y base de datos |
| Estilos | Tailwind CSS | 4 | Utilidades y tokens mediante `@theme inline` |
| Componentes base | Base UI | 1.x | Componentes accesibles sin estilos impuestos |
| Runtime y paquetes | bun | 1.x | Instalación y scripts más rápidos que npm |
| Base de datos | Supabase (PostgreSQL) | 15 | Postgres gestionado con Auth y Storage en un solo servicio |
| Despliegue | Vercel | — | Previews por Pull Request y variables de entorno por entorno |

## Aplicaciones de gestión

| App | Uso |
|---|---|
| GitHub | Repositorio, ramas, Pull Requests y revisión de código |
| Linear | Backlog, sprints, issues, estimaciones y seguimiento |
| Supabase | Base de datos, autenticación, políticas RLS y almacenamiento |
| Vercel | Despliegue y entornos de preview |
| bun | Instalación de dependencias y scripts del proyecto |

## Diseño

El diseño se trabaja con Tailwind CSS v4 y variables CSS exportadas de tweakcn. Los tokens viven en `app/globals.css` y se documentan en `docs/diseno/identidad-visual.md`. No se usan herramientas de prototipado externas: la fuente de verdad es el CSS y su documento.

## Convenciones del equipo

- Ramas: `usuario/sab-N-slug`, por ejemplo `manuelveraangulo/sab-8-migracion-inicial-esquema`.
- Commits: `tipo(área): mensaje`, con `tipo` en `feat`, `fix`, `docs`, `chore`, `test` o `refactor`.
- Áreas: `infra`, `db`, `backend`, `frontend`, `auth`, `admin`, `qa`, `docs`, `storage`.
- Archivos en `kebab-case`; componentes en `PascalCase` dentro del código.
- Una issue por rama y un Pull Request por issue hacia `dev`.
