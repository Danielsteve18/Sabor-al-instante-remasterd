# Estructura de carpetas

El repositorio replica el árbol de carpetas del proyecto **sin código**: cada carpeta existe con un `.gitkeep` para que Git la versione. En S1 no hay archivos `.tsx` ni `.ts` con lógica.

## Árbol

| Ruta | Propósito |
|---|---|
| `app/` | Rutas, layouts y estilos globales del App Router |
| `components/ui/` | Componentes base reutilizables (wrappers de Base UI) |
| `components/layout/` | Navbar, footer y contenedores de página |
| `components/sections/` | Secciones de la home y de las páginas públicas |
| `components/forms/` | Formularios de reserva, contacto y autenticación |
| `components/admin/` | Componentes exclusivos del panel de administración |
| `lib/` | Clientes, consultas, validaciones y utilidades |
| `hooks/` | Hooks de React compartidos |
| `types/` | Tipos y contratos de TypeScript |
| `public/images/` | Imágenes estáticas del sitio |
| `supabase/migrations/` | Migraciones SQL numeradas |
| `scripts/` | Scripts de apoyo (hooks y utilidades) |
| `.githooks/` | Hooks de Git versionados |
| `docs/` | Documentación del proyecto por área |

## Reglas

- Cada carpeta hoja conserva su `.gitkeep` hasta que tenga contenido real.
- Las migraciones se numeran `0001_`, `0002_`, … y no se editan después de aplicadas.
- La documentación de cada área vive en `docs/<área>/`.
- No se agregan carpetas nuevas sin actualizar este documento.
- En S1 no se crean `package.json`, `tsconfig.json` ni archivos de código: la base ejecutable se instala en S2.

## Verificación

```powershell
git ls-files | Select-String '\.(tsx|ts|jsx|js)$'   # sin resultados
git ls-files | Select-String 'gitkeep'              # una entrada por carpeta hoja
```
