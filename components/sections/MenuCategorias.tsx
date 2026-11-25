import Image from "next/image";
import type { Categoria } from "@/types/menu";

export type CategoriaConImagen = Categoria & {
  image: string | null;
  count: number;
};

/**
 * Barra de categorías fija arriba al hacer scroll.
 * Cada opción lleva a su sección (#slug) y muestra la foto de un plato.
 */
export function MenuCategorias({
  categorias,
}: {
  categorias: CategoriaConImagen[];
}) {
  return (
    <nav
      id="menu"
      aria-label="Categorías del menú"
      className="sticky top-0 z-40 scroll-mt-0 border-y border-[var(--color-divider)] bg-[var(--dark-color-divider)]/90 backdrop-blur-md"
    >
      <ul className="mx-auto flex max-w-[1200px] gap-3 overflow-x-auto px-[15px] py-3 [scrollbar-width:none] min-[993px]:justify-center [&::-webkit-scrollbar]:hidden">
        {categorias.map((categoria) => (
          <li key={categoria.id} className="shrink-0">
            <a
              href={`#${categoria.slug}`}
              className="group flex items-center gap-3 rounded-full border border-[var(--color-divider)] bg-[var(--color-secondary)] py-[6px] pl-[6px] pr-5 no-underline transition-colors duration-300 hover:border-[var(--color-primary)]"
            >
              <span className="relative block h-10 w-10 overflow-hidden rounded-full bg-[var(--dark-color-divider)]">
                {categoria.image ? (
                  <Image
                    src={categoria.image}
                    alt=""
                    fill
                    sizes="40px"
                    unoptimized={categoria.image.startsWith("http")}
                    className="object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                ) : (
                  <span
                    aria-hidden="true"
                    className="flex h-full w-full items-center justify-center text-sm text-[var(--color-primary)]"
                  >
                    <i className="fa-solid fa-utensils" />
                  </span>
                )}
              </span>
              <span className="text-[15px] font-semibold text-[var(--color-light)] transition-colors duration-300 group-hover:text-[var(--color-primary)]">
                {categoria.name}
              </span>
              <span className="text-xs font-bold text-[var(--text-color)]">
                {categoria.count}
              </span>
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
