"use client";

import { useEffect } from "react";

/** Se muestra si falla la lectura del menú (por ejemplo, la BD no responde). */
export default function MenuError({
  error,
  unstable_retry,
  reset,
}: {
  error: Error & { digest?: string };
  /** Next 16: vuelve a pedir los datos al servidor. */
  unstable_retry?: () => void;
  /** Next anterior: solo re-dibuja el segmento. */
  reset?: () => void;
}) {
  useEffect(() => {
    // El detalle técnico queda en consola; la página muestra solo un mensaje claro.
    console.error("Error al cargar el menú:", error.message, error.cause ?? "");
  }, [error]);

  return (
    <main className="flex flex-1 items-center justify-center bg-[var(--dark-color-divider)] px-[15px] pb-[100px] pt-[160px]">
      <div
        role="alert"
        className="flex max-w-[520px] flex-col items-center gap-4 text-center"
      >
        <i
          className="fa-solid fa-triangle-exclamation text-[40px] text-[var(--color-primary)]"
          aria-hidden="true"
        />
        <h1 className="text-2xl font-extrabold uppercase text-[var(--color-light)] min-[769px]:text-[34px]">
          No pudimos cargar el menú
        </h1>
        <p className="text-lg text-[var(--text-color)]">
          Hubo un problema al consultar los platos. Revisa tu conexión e
          inténtalo de nuevo en unos segundos.
        </p>
        {/* Reintenta la carga del menú */}
        <button
          type="button"
          onClick={() => (unstable_retry ?? reset)?.()}
          className="mt-2 flex cursor-pointer items-center gap-[10px] rounded-full border-none bg-[var(--color-primary)] px-[25px] py-[17px] text-base font-bold text-[var(--color-light)] transition-colors duration-300 hover:bg-[var(--color-light)] hover:text-[var(--dark-color-divider)]"
        >
          Reintentar
          <i className="fa-solid fa-rotate-right" aria-hidden="true" />
        </button>
      </div>
    </main>
  );
}
