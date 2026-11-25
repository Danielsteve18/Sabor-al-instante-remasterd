import Image from "next/image";
import Link from "next/link";

/** Banner superior de /menu: foto de fondo que se funde con el resto de la página. */
export function MenuHero() {
  return (
    <section className="relative isolate flex min-h-[70vh] items-center overflow-hidden px-[15px] pb-[90px] pt-[160px]">
      <Image
        src="/images/hero-bg.jpg"
        alt=""
        fill
        priority
        sizes="100vw"
        className="-z-20 object-cover"
      />
      {/* Oscurece la foto y la funde con el fondo de la página */}
      <div
        className="absolute inset-0 -z-10 bg-gradient-to-b from-black/70 via-black/65 to-[var(--dark-color-divider)]"
        aria-hidden="true"
      />

      <div className="mx-auto flex w-full max-w-[1200px] flex-col items-center gap-5 text-center">
        <span className="flex items-center gap-[10px] text-sm font-extrabold uppercase tracking-[1px] text-[var(--color-primary)] before:block before:h-2 before:w-2 before:rounded-full before:bg-[var(--color-primary)] before:content-['']">
          Nuestro menú
        </span>
        <h1 className="max-w-[900px] text-[38px] font-extrabold uppercase leading-[1.05] tracking-[-1px] text-[var(--color-light)] [text-shadow:1px_1px_1px_rgba(0,0,0,0.3)] min-[769px]:text-[52px] min-[993px]:text-[64px]">
          Prueba lo mejor que te{" "}
          <span className="text-[var(--color-primary)]">sorprenda</span>
        </h1>
        <p className="max-w-[640px] text-lg leading-normal text-[var(--text-color)]">
          Sabores auténticos, ingredientes frescos y una presentación
          impecable. Cada plato es una experiencia pensada para elevar tu
          paladar.
        </p>
        <div className="mt-4 flex flex-wrap justify-center gap-4">
          <Link
            href="/reserva"
            className="flex items-center gap-[10px] rounded-full bg-[var(--color-primary)] px-[25px] py-[17px] text-base font-bold text-[var(--color-light)] no-underline transition-colors duration-300 hover:bg-[var(--color-light)] hover:text-[var(--dark-color-divider)]"
          >
            Reserva una mesa
            <i className="fa-solid fa-arrow-right" aria-hidden="true" />
          </Link>
          <a
            href="#menu"
            className="flex items-center gap-[10px] rounded-full border border-[var(--color-divider)] px-[25px] py-[17px] text-base font-bold text-[var(--color-light)] no-underline transition-colors duration-300 hover:border-[var(--color-primary)] hover:text-[var(--color-primary)]"
          >
            Ver el menú
            <i className="fa-solid fa-chevron-down" aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
}
