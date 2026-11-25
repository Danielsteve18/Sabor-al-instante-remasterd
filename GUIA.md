# Guía de trabajo

Reglas de ramas, commits y Pull Requests del equipo.

## Ramas

| Rama | Uso | Protegida |
|---|---|---|
| `main` | Versión estable del proyecto | Sí |
| `dev` | Integración del trabajo de cada sprint | Sí |
| `usuario/sab-N-slug` | Una rama por issue | No |

El nombre de la rama lo sugiere la issue en Linear. Ejemplo: `manuelveraangulo/sab-8-migracion-inicial-esquema`.

## Commits

Formato: `tipo(área): mensaje`

| Tipo | Uso |
|---|---|
| `feat` | Funcionalidad nueva |
| `fix` | Corrección de un error |
| `docs` | Documentación |
| `chore` | Infraestructura, configuración o mantenimiento |
| `test` | Pruebas |
| `refactor` | Reescritura sin cambio de comportamiento |

Áreas válidas: `infra`, `db`, `backend`, `frontend`, `auth`, `admin`, `qa`, `docs`, `storage`.

Ejemplos:

```
feat(db): migración inicial del esquema
docs(infra): documentar proyecto Supabase y credenciales
chore(infra): crear estructura de carpetas del proyecto
```

## Flujo de una issue

1. Tomar la issue en Linear y moverla a In Progress.
2. Actualizar `dev`: `git checkout dev` y `git pull`.
3. Crear la rama: `git checkout -b usuario/sab-N-slug dev`.
4. Hacer commits pequeños con el formato acordado.
5. Empujar la rama: `git push -u origin usuario/sab-N-slug`.
6. Abrir el Pull Request hacia `dev` y pedir revisión.
7. Resolver los comentarios y hacer merge cuando esté aprobado.
8. Mover la issue a Done en Linear.

## Hooks

El repositorio versiona sus hooks en `.githooks/`.

- Activación en PowerShell: `pwsh scripts/setup-hooks.ps1`
- Activación en sh: `sh scripts/setup-hooks.sh`
- El hook `pre-push` bloquea el push directo a `main` y `dev`.

Para saltarlo en local, solo si es imprescindible:

```powershell
$env:SKIP_PROTECTED_PUSH = "1"; git push
```

## Reglas de revisión

- Un Pull Request debe tener al menos una aprobación de otro integrante.
- No se hace merge con el build o el lint en rojo.
- Los cambios de base de datos incluyen su migración numerada.
- Toda entrega indica la evidencia en la ruta que pide la issue.

## Finales de línea

`.gitattributes` fuerza `eol=lf` en todo el repositorio para evitar diferencias entre Windows y Linux.
