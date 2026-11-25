import { MenuHero } from "@/components/sections/MenuHero";
import { MenuSkeleton } from "@/components/sections/MenuSkeleton";

/** Se muestra al navegar a /menu mientras la página se prepara. */
export default function Loading() {
  return (
    <main className="flex-1 bg-[var(--dark-color-divider)]">
      <MenuHero />
      <MenuSkeleton />
    </main>
  );
  
}
