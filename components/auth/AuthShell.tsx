import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { Icon, type IconName } from "@/components/auth/AuthIcons";

type AuthShellProps = {
  /** Título del formulario, p. ej. "Bienvenido de nuevo". */
  title: string;
  subtitle: string;
  /** Titular del panel con foto (puede llevar un <span> dorado). */
  panelTitle: ReactNode;
  /** Texto de apoyo del panel (solo escritorio). */
  panelText: string;
  /** Enlace "volver" sobre el título. */
  backHref: string;
  backLabel: string;
  /** Pregunta del pie, p. ej. "¿No tienes cuenta?", y el enlace a la otra página. */
  switchText: string;
  switchLabel: string;
  switchHref: string;
  /** El formulario. */
  children: ReactNode;
};

const features: { icon: IconName; title: string; text: string }[] = [
  { icon: "calendar", title: "Reserva tu mesa", text: "Elige día y hora en pocos pasos." },
  { icon: "book", title: "Menú siempre al día", text: "Platos, precios y fotos actualizados." },
  { icon: "star", title: "Todo en un solo lugar", text: "Consulta y gestiona tus reservas." },
];

/**
 * Estructura de /login y /registro.
 *  - Escritorio (≥1024px): pantalla dividida. A la izquierda la foto del restaurante
 *    con mensaje y beneficios; a la derecha el formulario sobre fondo oscuro.
 *  - Celular: banner con la foto arriba y el formulario como una hoja que sube encima.
 * La foto es una sola y cambia de lugar con CSS. El header global es `absolute`,
 * de ahí el padding superior del banner.
 */
export function AuthShell({
  title,
  subtitle,
  panelTitle,
  panelText,
  backHref,
  backLabel,
  switchText,
  switchLabel,
  switchHref,
  children,
}: AuthShellProps) {
  return (
    <main className="bg-brand-ink lg:grid lg:min-h-screen lg:grid-cols-2">
      <style>{`
        @keyframes auth-slide-down {
          from { opacity: 0; transform: translateY(-8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        /* Evita el fondo azul/blanco que pone Chrome al autocompletar */
        .auth-input:-webkit-autofill,
        .auth-input:-webkit-autofill:hover,
        .auth-input:-webkit-autofill:focus {
          -webkit-box-shadow: 0 0 0 1000px var(--brand-field) inset !important;
          -webkit-text-fill-color: var(--brand-text) !important;
          caret-color: var(--brand-text);
          transition: background-color 9999s ease-in-out 0s;
        }
      `}</style>

      {/* ---------- Panel con foto (banner en celular) ---------- */}
      <section className="relative isolate flex min-h-[290px] flex-col justify-end overflow-hidden px-5 pb-16 pt-28 min-[500px]:px-10 lg:min-h-screen lg:justify-center lg:px-14 lg:pb-20 lg:pt-32 xl:px-20">
        <Image
          src="/images/hero-bg.jpg"
          alt=""
          fill
          priority
          sizes="(min-width: 1024px) 50vw, 100vw"
          className="-z-20 object-cover"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 bg-gradient-to-b from-black/55 via-black/65 to-brand-ink lg:bg-gradient-to-r lg:from-black/55 lg:via-black/70 lg:to-brand-ink"
        />

        <div className="max-w-[520px]">
          <span className="flex items-center gap-[10px] text-sm font-extrabold uppercase tracking-[1px] text-brand-gold before:block before:h-2 before:w-2 before:rounded-full before:bg-brand-gold before:content-['']">
            Sabor al instante
          </span>
          <h2 className="mt-3 text-[28px] font-extrabold uppercase leading-[1.08] tracking-[-1px] text-brand-text [text-shadow:1px_1px_1px_rgba(0,0,0,0.3)] min-[500px]:text-[34px] lg:text-[44px] xl:text-[52px]">
            {panelTitle}
          </h2>
          <p className="mt-4 hidden max-w-[440px] text-lg leading-normal text-brand-muted lg:block">
            {panelText}
          </p>

          <ul className="mt-10 hidden flex-col gap-5 lg:flex">
            {features.map((f) => (
              <li key={f.title} className="flex items-center gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-brand-gold/15 text-brand-gold ring-1 ring-brand-gold/30">
                  <Icon name={f.icon} className="h-5 w-5" />
                </span>
                <span>
                  <span className="block font-semibold text-brand-text">{f.title}</span>
                  <span className="block text-sm text-brand-muted">{f.text}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ---------- Formulario ---------- */}
      <section className="relative z-10 -mt-8 overflow-hidden rounded-t-[28px] border-t border-white/10 bg-brand-surface px-5 pb-14 pt-9 shadow-[0_-20px_40px_-20px_rgba(0,0,0,0.8)] min-[500px]:px-10 lg:mt-0 lg:flex lg:items-center lg:justify-center lg:rounded-none lg:border-0 lg:bg-brand-ink lg:px-12 lg:py-32 lg:shadow-none">
        {/* Brillo suave de fondo (solo escritorio) */}
        <div
          aria-hidden="true"
          className="auth-glow pointer-events-none absolute inset-0 hidden lg:block"
        />

        <div className="relative mx-auto w-full max-w-[440px]">
          <Link
            href={backHref}
            className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-brand-gold no-underline transition-all duration-300 hover:-translate-x-1 hover:text-brand-gold-hover"
          >
            <Icon name="arrow-left" className="h-4 w-4" />
            {backLabel}
          </Link>

          <h1 className="mb-2 text-[28px] font-bold leading-tight text-brand-text lg:text-[34px]">
            {title}
          </h1>
          <p className="mb-8 text-[15px] text-brand-muted">{subtitle}</p>

          {children}

          <div
            aria-hidden="true"
            className="my-7 flex items-center gap-4 text-sm text-brand-muted before:h-px before:flex-1 before:bg-white/10 before:content-[''] after:h-px after:flex-1 after:bg-white/10 after:content-['']"
          >
            o
          </div>

          <p className="text-center text-[15px] text-brand-muted">
            {switchText}{" "}
            <Link
              href={switchHref}
              className="inline-flex items-center gap-[6px] font-semibold text-brand-gold no-underline transition-all duration-300 hover:gap-[10px] hover:text-brand-gold-hover"
            >
              {switchLabel}
              <Icon name="arrow-right" className="h-4 w-4" />
            </Link>
          </p>
        </div>
      </section>
    </main>
  );
}
