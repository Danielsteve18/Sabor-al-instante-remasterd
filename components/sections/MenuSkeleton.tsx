/** Esqueleto de carga de /menu: barra de categorías + 2 secciones con 3 tarjetas "fantasma". */
export function MenuSkeleton() {
  return (
    <div role="status" aria-busy="true" aria-live="polite">
      <span className="sr-only">Cargando el menú…</span>

      {/* Barra de categorías */}
      <div className="flex animate-pulse justify-center gap-3 border-y border-[var(--color-divider)] px-[15px] py-3">
        {[0, 1, 2, 3].map((c) => (
          <div key={c} className="h-[52px] w-[150px] rounded-full bg-white/10" />
        ))}
      </div>

      {[0, 1].map((s) => (
        <section key={s} className="px-[15px] py-[60px] min-[993px]:py-[80px]">
          <div className="mx-auto max-w-[1200px] animate-pulse">
            <div className="mb-10 space-y-3 border-b border-[var(--color-divider)] pb-6">
              <div className="h-4 w-32 rounded bg-white/10" />
              <div className="h-9 w-64 rounded bg-white/10" />
            </div>

            <div className="grid gap-6 min-[577px]:grid-cols-2 min-[993px]:grid-cols-3">
              {[0, 1, 2].map((c) => (
                <div
                  key={c}
                  className="overflow-hidden rounded-2xl border border-gray-200 bg-white"
                >
                  <div className="h-48 bg-[#aeb0b4]/50" />
                  <div className="space-y-3 p-4">
                    <div className="h-5 w-2/3 rounded bg-gray-200" />
                    <div className="h-4 w-full rounded bg-gray-200" />
                    <div className="h-4 w-4/5 rounded bg-gray-200" />
                    <div className="h-9 w-full rounded-xl bg-gray-200" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      ))}
    </div>
  );
}
