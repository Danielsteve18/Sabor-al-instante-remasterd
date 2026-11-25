import Link from "next/link";
import { getCategorias, getPlatos } from "@/lib/data/menu";
import { DishCard } from "@/components/ui/DishCard";
import { MenuCategorias } from "@/components/sections/MenuCategorias";
import type { Categoria, Plato } from "@/types/menu";

/**
 * Lee categorías y platos de Supabase y los muestra agrupados por categoría.
 * Si la consulta falla lanza un error y Next muestra `app/menu/error.tsx`.
 */
export async function MenuList() {
  const [categoriasData, platosData] = await Promise.all([
    getCategorias(),
    getPlatos(),
  ]);
  const categorias = (categoriasData ?? []) as Categoria[];
  const platos = (platosData ?? []) as unknown as Plato[];

  const secciones = categorias
    .map((categoria) => ({
      categoria,
      platos: platos.filter((p) => p.categories?.slug === categoria.slug),
    }))
    .filter((s) => s.platos.length > 0);

  // Para cada categoría: la foto del primer plato que tenga imagen y cuántos platos hay
  const categoriasConImagen = secciones.map(({ categoria, platos }) => ({
    ...categoria,
    image: platos.find((p) => p.image_url)?.image_url ?? null,
    count: platos.length,
  }));

  if (secciones.length === 0) {
    return (
      <p className="mx-auto max-w-[1200px] px-[15px] py-[100px] text-center text-lg text-[var(--text-color)]">
        Por ahora no hay platos disponibles. ¡Vuelve pronto!
      </p>
    );
  }

  return (
    <>
      <MenuCategorias categorias={categoriasConImagen} />

      {secciones.map(({ categoria, platos }) => (
        <section
          key={categoria.id}
          id={categoria.slug}
          aria-labelledby={`titulo-${categoria.slug}`}
          className="scroll-mt-20 px-[15px] py-[60px] min-[993px]:py-[80px]"
        >
          <div className="mx-auto max-w-[1200px]">
            <header className="mb-10 flex flex-wrap items-end justify-between gap-x-6 gap-y-2 border-b border-[var(--color-divider)] pb-6">
              <div className="flex flex-col gap-2">
                <span className="flex items-center gap-[10px] text-sm font-extrabold uppercase tracking-[1px] text-[var(--color-primary)] before:block before:h-2 before:w-2 before:rounded-full before:bg-[var(--color-primary)] before:content-['']">
                  Menú &amp; precios
                </span>
                <h2
                  id={`titulo-${categoria.slug}`}
                  className="text-[30px] font-extrabold uppercase leading-[1.1] tracking-[-1px] text-[var(--color-light)] min-[993px]:text-[42px]"
                >
                  {categoria.name}
                </h2>
              </div>
              <span className="text-sm font-medium text-[var(--text-color)]">
                {platos.length} {platos.length === 1 ? "plato" : "platos"}
              </span>
            </header>

            <div className="grid gap-6 min-[577px]:grid-cols-2 min-[993px]:grid-cols-3">
              {platos.map((plato) => (
                <DishCard key={plato.id} dish={plato} />
              ))}
            </div>
          </div>
        </section>
      ))}

      {/* Cierre con llamado a la acción */}
      <section className="px-[15px] pb-[80px] pt-[20px] min-[993px]:pb-[110px]">
        <div className="mx-auto flex max-w-[1200px] flex-col items-center gap-5 rounded-[24px] border border-[var(--color-divider)] bg-[var(--color-secondary)] px-6 py-12 text-center">
          <h2 className="max-w-[640px] text-[28px] font-extrabold uppercase leading-[1.1] tracking-[-1px] text-[var(--color-light)] min-[993px]:text-[36px]">
            ¿Listo para probar <span className="text-[var(--color-primary)]">sabores frescos?</span>
          </h2>
          <p className="max-w-[520px] text-base text-[var(--text-color)]">
            Reserva tu mesa y disfruta de nuestros platos en el momento.
          </p>
          <Link
            href="/reserva"
            className="flex items-center gap-[10px] rounded-full bg-[var(--color-primary)] px-[25px] py-[17px] text-base font-bold text-[var(--color-light)] no-underline transition-colors duration-300 hover:bg-[var(--color-light)] hover:text-[var(--dark-color-divider)]"
          >
            Reserva una mesa
            <i className="fa-solid fa-arrow-right" aria-hidden="true" />
          </Link>
        </div>
      </section>
    </>
  );
}
