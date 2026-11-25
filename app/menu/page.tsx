import type { Metadata } from "next";
import { Suspense } from "react";
import { MenuHero } from "@/components/sections/MenuHero";
import { MenuList } from "@/components/sections/MenuList";
import { MenuSkeleton } from "@/components/sections/MenuSkeleton";

export const metadata: Metadata = {
  title: "Menú",
  description:
    "Conoce el menú de Sabor al Instante: aperitivos, platos principales, acompañamientos y postres.",
};

export default function MenuPage() {
  return (
    <main className="flex-1 bg-[var(--dark-color-divider)]">
      <MenuHero />
      {/*
        Los datos vienen de Supabase en cada visita. Como el proyecto tiene
        `cacheComponents` activo, lo que lee datos va dentro de <Suspense>:
        mientras llega, se ve el esqueleto; si falla, app/menu/error.tsx.
      */}
      <Suspense fallback={<MenuSkeleton />}>
        <MenuList />
      </Suspense>
    </main>
  );
}
