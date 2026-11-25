# Identidad visual — Sabor al Instante

Paleta de colores, tipografía y reglas de uso del diseño del restaurante, organizadas mediante tokens reutilizables.

**Fuente de verdad:** este documento y `app/globals.css`. Si uno cambia, se actualiza el otro en el mismo Pull Request.

**Origen:** `info.md`, hojas de estilo del sitio original (paleta, fuente y tamaños) y tema exportado desde Tweakcn en formato Tailwind CSS v4.

**Estado:** vigente desde S1.

---

## 1. Principios

- **Oscuro y cálido.** Se utilizan fondos oscuros, texto gris claro, títulos blancos y el oliva como color principal de identidad.
- **Un solo acento de marca.** El oliva `#a6a182` identifica los elementos destacados, como botones, etiquetas y enlaces importantes.
- **Tipografía única.** Hanken Grotesk se utiliza en todo el sitio. La jerarquía visual se consigue mediante diferentes tamaños y pesos.
- **Tokens, no valores.** El código debe utilizar clases de Tailwind o variables CSS, evitando escribir directamente los códigos HEX en los componentes.
- **Separación entre tema y marca.** Los colores semánticos cambian según el tema claro u oscuro, mientras que los colores propios de la marca mantienen su identidad.

## 2. Organización del archivo CSS

El archivo `app/globals.css` está organizado en cinco bloques funcionales, además de las importaciones iniciales:

| Bloque | Nombre | Contenido | ¿Se reemplaza al exportar desde Tweakcn? |
|---|---|---|---|
| 1 | Tema (`:root` y `.dark`) | Tokens semánticos, tipografía, sombras, espaciado y variables de barra lateral. | Sí, únicamente los bloques del tema. |
| 2 | Paleta de marca (`:root`) | Colores propios de Sabor al Instante. | No. |
| 3 | Compatibilidad (`:root`) | Alias de variables utilizados por el proyecto anterior. | No. |
| 4 | `@theme inline` | Mapeo de variables a utilidades de Tailwind CSS v4. | No, salvo que se agreguen nuevos tokens. |
| 5 | `@layer base` | Estilos generales de bordes, foco, fondo y tipografía del cuerpo de la página. | No. |

Al inicio del archivo se encuentran las importaciones de Hanken Grotesk y Tailwind CSS, además de la variante para el tema oscuro.

La regla `@custom-variant dark` permite utilizar la variante `dark` de Tailwind cuando existe la clase `dark` en un elemento superior.

### Dos familias de tokens

| Familia | Cambia con claro/oscuro | Cuándo utilizarla | Ejemplo |
|---|:---:|---|---|
| Tema (semánticos) | Sí | Formularios, tarjetas, paneles de administración y componentes de shadcn/ui. | `bg-card text-card-foreground` |
| Marca (`brand-*`) | No | Secciones públicas con la identidad visual del restaurante. | `bg-brand-night text-brand-gray` |

**Regla práctica:** si el color debe cambiar entre los temas claro y oscuro, se utiliza un token semántico. Si debe conservar siempre el mismo color, se utiliza un token de marca.

## 3. Paleta de marca

Los colores se toman de `info.md` y de las hojas de estilo del sitio original.

| Nombre | Código HEX | Variable CSS | Utilidad Tailwind | Uso |
|---|---|---|---|---|
| Oliva | `#a6a182` | `--brand-olive` | `bg-brand-olive`, `text-brand-olive` | Color de acento para botones, etiquetas y palabras destacadas. |
| Carbón | `#1f2120` | `--brand-carbon` | `bg-brand-carbon`, `text-brand-carbon` | Tarjetas, encabezados y superficies oscuras. |
| Noche | `#0e110d` | `--brand-night` | `bg-brand-night` | Fondos principales y pie de página. |
| Gris | `#aeb0b4` | `--brand-gray` | `text-brand-gray` | Texto de cuerpo y descripciones sobre fondos oscuros. |
| Blanco | `#ffffff` | `--brand-white` | `text-brand-white` | Títulos y textos principales sobre fondos oscuros. |
| Divisor | `#ffffff1a` | `--brand-divider` | `border-brand-divider` | Bordes y separadores con transparencia sobre fondos oscuros. |

Para configurar el tema en Tweakcn se utilizan como referencia el oliva como acento, el carbón como color oscuro y el gris como color de texto atenuado.

## 4. Tokens del tema

Los tokens semánticos se definen en los bloques `:root` y `.dark` de `app/globals.css`.

Los valores originales del tema se conservan en formato OKLCH, tal como fueron exportados desde Tweakcn. Los códigos HEX de la paleta de marca son independientes de esos valores.

Cada token se puede utilizar mediante las utilidades correspondientes de Tailwind, como `bg-*`, `text-*` y `border-*`.

### Superficies y texto

| Token | Utilidad Tailwind | Uso |
|---|---|---|
| `background` | `bg-background` | Fondo general de la página. |
| `foreground` | `text-foreground` | Texto principal. |
| `card` | `bg-card` | Fondo de tarjetas y paneles. |
| `card-foreground` | `text-card-foreground` | Texto dentro de las tarjetas. |
| `popover` | `bg-popover` | Menús desplegables y ventanas emergentes. |
| `popover-foreground` | `text-popover-foreground` | Texto de los elementos emergentes. |
| `muted` | `bg-muted` | Fondos secundarios y áreas deshabilitadas. |
| `muted-foreground` | `text-muted-foreground` | Descripciones, ayudas y textos secundarios. |

### Acciones y énfasis

| Token | Utilidad Tailwind | Uso |
|---|---|---|
| `primary` | `bg-primary` | Color de la acción principal del tema. |
| `primary-foreground` | `text-primary-foreground` | Texto sobre el color principal. |
| `secondary` | `bg-secondary` | Acciones y superficies secundarias. |
| `secondary-foreground` | `text-secondary-foreground` | Texto sobre el color secundario. |
| `accent` | `bg-accent` | Elementos resaltados y estados de selección. |
| `accent-foreground` | `text-accent-foreground` | Texto sobre elementos resaltados. |
| `destructive` | `bg-destructive`, `text-destructive` | Errores y acciones destructivas. |

### Bordes, foco y gráficos

| Token | Utilidad Tailwind | Uso |
|---|---|---|
| `border` | `border-border` | Bordes generales de los componentes. |
| `input` | `border-input` | Bordes de campos de formulario. |
| `ring` | `outline-ring` | Indicador visual de foco. |
| `chart-1` a `chart-5` | `--color-chart-1` a `--color-chart-5` | Colores para gráficos y visualizaciones. |

Los valores exactos de estos tokens están definidos en formato OKLCH en `globals.css`. Los valores de los gráficos se definen tanto en el tema claro como en el oscuro.

### Variables adicionales

El archivo también contiene variables para otros elementos del diseño:

| Grupo | Variables | Uso |
|---|---|---|
| Barra lateral | `--sidebar`, `--sidebar-foreground`, `--sidebar-primary`, `--sidebar-primary-foreground`, `--sidebar-accent`, `--sidebar-accent-foreground`, `--sidebar-border`, `--sidebar-ring` | Apariencia de las barras laterales y sus elementos. |
| Sombras | `--shadow-2xs` hasta `--shadow-2xl` | Profundidad visual de los componentes. |
| Espaciado | `--spacing` | Referencia para el sistema de espaciado. |
| Seguimiento tipográfico | `--tracking-normal` | Espaciado normal entre letras. |
| Bordes redondeados | `--radius` | Radio base de los componentes. |

## 5. Tipografía

**Familia tipográfica:** Hanken Grotesk, obtenida mediante Google Fonts.

Se importa al inicio de `app/globals.css`, antes de las demás reglas CSS.

La tipografía principal se utiliza en títulos, párrafos, botones, navegación y demás componentes del restaurante.

| Variable | Valor | Utilidad |
|---|---|---|
| `--font-sans` | `"Hanken Grotesk", system-ui, -apple-system, sans-serif` | `font-sans`. |
| `--font-mono` | `monospace` | `font-mono`. |

**Pesos utilizados:**

- 400: texto general.
- 500: navegación.
- 600: marca y logotipo.
- 700: botones.
- 800: títulos y etiquetas.

### Escala tipográfica del sitio

Los tamaños se basan en el diseño original y se adaptan a diferentes tamaños de pantalla.

| Rol | Tamaño | Peso | Estilo |
|---|---|---|---|
| Título de portada (h1) | 60 / 50 / 30 px | 800 | Mayúsculas, interlineado 1.1 y tracking de -1 px. |
| Título de sección | 42 / 34 / 24 px | 800 | Mayúsculas y tracking de -1 px. |
| Nombre de marca (logo) | 26 px | 600 | Minúsculas. |
| Texto destacado | 18 / 18 / 16 px | 400 | Interlineado 1.5. |
| Texto de cuerpo y navegación | 16 px | 400 / 500 | Texto normal. |
| Botón | 16 px | 700 | Primera letra en mayúscula. |
| Etiqueta (badge) | 14 px | 800 | Mayúsculas y tracking de 1 px. |

Dentro de los títulos, las palabras que se quieran destacar pueden utilizar el color oliva mediante `text-brand-olive`.

## 6. Forma y espacio

### Bordes redondeados

La variable `--radius` establece un valor base de `0.625rem`. A partir de este valor se calculan las utilidades de bordes redondeados de Tailwind.

| Utilidad | Resultado | Uso |
|---|---|---|
| `rounded-sm` | 6 px | Detalles pequeños. |
| `rounded-md` | 8 px | Botones de menú y chips. |
| `rounded-lg` | 10 px | Campos de formulario. |
| `rounded-xl` | 14 px | Tarjetas y contenedores. |
| `rounded-full` | Círculo o píldora | Botones, avatares e imágenes. |

### Contenedor y secciones

- Ancho máximo del contenido: `max-w-[1200px]`.
- Contenido centrado horizontalmente.
- Relleno vertical de las secciones: 100 px en escritorio.
- En pantallas de hasta 992 px se utiliza como referencia un relleno de `50px 15px`.

### Puntos de corte

Se utilizan valores arbitrarios de Tailwind para respetar los tamaños del sitio original.

| Nombre | Ancho | En Tailwind |
|---|---|---|
| sm | 576 px | `max-[576px]:` |
| md | 768 px | `max-[768px]:` / `min-[769px]:` |
| lg | 992 px | `max-[992px]:` / `min-[993px]:` |
| xl | 1200 px | `max-w-[1200px]` |

Estos puntos de corte no están registrados como variables personalizadas en `@theme`.

## 7. Iconos

El sitio original utiliza Font Awesome 6 en su versión gratuita, cargada mediante CDN desde el layout.

Entre los iconos utilizados se encuentran:

- Estrella y check.
- Flecha derecha y flechas de navegación.
- Motocicleta.
- Etiquetas y ranking.
- Cara con estrellas.
- Ubicación y teléfono.
- Facebook, X e Instagram.
- Barras para el menú móvil y X para cerrar.

Los iconos que sean únicamente decorativos deben incluir `aria-hidden="true"` para mejorar la accesibilidad.

## 8. Contraste y accesibilidad

La paleta de marca se revisa utilizando la fórmula de contraste WCAG 2.2.

Como referencia, se utilizan los siguientes valores mínimos:

- 4.5:1 para texto normal.
- 3:1 para texto grande.
- 3:1 para componentes gráficos y elementos de interfaz que necesiten distinguirse visualmente.

### Contraste de la paleta de marca

| Combinación | Contraste aproximado | Resultado |
|---|---:|---|
| Blanco sobre noche | 19.0:1 | AAA |
| Gris sobre noche | 8.8:1 | AAA |
| Oliva sobre noche | 7.3:1 | AAA |
| Gris sobre carbón | 7.5:1 | AAA |
| Carbón sobre oliva | 6.2:1 | AA |
| Blanco sobre oliva | 2.6:1 | No cumple |

### Reglas de accesibilidad

1. Sobre el color oliva, el texto debe utilizar carbón o noche, no blanco.
2. El texto gris debe conservar suficiente contraste sobre los fondos oscuros.
3. Los botones y enlaces deben ser fácilmente identificables.
4. Los elementos interactivos deben contar con indicadores de foco visibles.
5. Los contrastes de los tokens semánticos deben verificarse cuando se modifique el tema en Tweakcn.

El valor del token `ring` se define en formato OKLCH en el CSS. Su contraste debe comprobarse frente al fondo correspondiente antes de considerar que cumple el requisito de accesibilidad.

## 9. Ejemplos de uso

Los siguientes ejemplos muestran cómo utilizar los tokens definidos en `globals.css` desde componentes del proyecto.

### Botón principal de marca

```tsx
<a className="rounded-full bg-brand-olive px-6 py-4 font-bold text-brand-carbon transition-colors hover:bg-brand-white">
  Reservar mesa
</a>
```

### Botón que sigue el tema

```tsx
<button className="rounded-lg bg-primary px-4 py-2 text-primary-foreground">
  Guardar
</button>
```

### Sección oscura de marca

```tsx
<section className="bg-brand-night py-[100px]">
  <h2 className="text-[42px] font-extrabold uppercase tracking-tight text-brand-white">
    Menú <span className="text-brand-olive">especial</span>
  </h2>

  <p className="text-lg text-brand-gray">
    Sabores auténticos, ingredientes frescos.
  </p>
</section>
```

### Tarjeta que sigue el tema

```tsx
<div className="rounded-xl border border-border bg-card p-6 text-card-foreground">
  <p className="text-muted-foreground">
    Texto secundario
  </p>
</div>
```

### Estado de error

```tsx
<p className="text-destructive">
  Correo o contraseña incorrectos
</p>
```

**Activar el tema oscuro:** se debe agregar la clase `dark` al elemento `<html>` o a un contenedor superior. La decisión de qué tema se utiliza por defecto se configura desde el layout de la aplicación, no desde este documento.

## 10. Cómo cambiar el tema

Para actualizar la identidad visual mediante Tweakcn se deben seguir estos pasos:

1. Abrir el editor de Tweakcn: https://tweakcn.com/editor/theme.
2. Ajustar la paleta tomando como referencia los colores de la sección 3.
3. Exportar el CSS en formato Tailwind CSS v4.
4. En `app/globals.css`, reemplazar únicamente los bloques `:root` y `.dark` correspondientes a los tokens del tema.
5. Conservar las variables de marca, los alias de compatibilidad y los estilos base.
6. Si la exportación incorpora nuevas variables, agregarlas al bloque correspondiente y revisar su integración con `@theme inline`.
7. Actualizar las tablas de este documento cuando cambien los valores del tema.
8. Comprobar los contrastes y verificar en el navegador componentes en tema claro y oscuro.

**Importante:** no se deben reemplazar los bloques de paleta de marca ni los estilos propios del proyecto al actualizar la exportación de Tweakcn.

## 11. Limitaciones y decisiones abiertas

| # | Tema | Situación |
|---|---|---|
| 1 | Anillo de foco | El valor de `ring` está definido en OKLCH. Se debe verificar su contraste en los fondos claros y oscuros. |
| 2 | Tema por defecto | El sitio original tiene una identidad oscura. Falta confirmar si la aplicación pública iniciará siempre con la clase `dark`. |
| 3 | Sombras, tracking y sidebar | Sus variables están definidas en los bloques del tema. Debe comprobarse su uso y su integración con las utilidades de Tailwind cuando se necesiten. |
| 4 | Puntos de corte | Se conservan como valores arbitrarios para respetar el diseño original. |
| 5 | Gráficos en oscuro | Los colores `chart-1` a `chart-5` están definidos en los bloques de tema claro y oscuro. |

## 12. Migración desde el proyecto anterior

El sitio original utilizaba variables como `--color-primary` para representar el oliva y `--color-secondary` para representar el carbón.

En Tailwind CSS v4 estos nombres se utilizan dentro del sistema de tokens semánticos. Para evitar confusiones entre los colores de marca y los colores del tema, se establecieron variables independientes con el prefijo `brand-`.

| Nombre anterior | Reemplazo | Notas |
|---|---|---|
| `var(--color-primary)` | `var(--brand-olive)` o `bg-brand-olive` | El color oliva ahora pertenece a la paleta de marca. |
| `var(--color-secondary)` | `var(--brand-carbon)` o `bg-brand-carbon` | El carbón ahora pertenece a la paleta de marca. |
| `var(--text-color)` | `text-brand-gray` | Alias de compatibilidad. |
| `var(--color-light)` | `text-brand-white` | Alias de compatibilidad. |
| `var(--color-divider)` | `border-brand-divider` | Alias de compatibilidad. |
| `var(--dark-color-divider)` | `bg-brand-night` | Alias de compatibilidad. |
| `var(--default-font)` | `font-sans` | Alias de compatibilidad. |
| `--breakpoint-sm/md/lg/xl` | Valores arbitrarios de Tailwind | Se conservan los puntos de corte originales sin modificar los valores predeterminados de Tailwind. |


---

