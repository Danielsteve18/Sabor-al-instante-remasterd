import { createClient } from "@/lib/supabase/server";
import type {
  CatalogCategory,
  CatalogCategoryWithDishes,
  CatalogDish,
} from "@/types/database";

const CATEGORY_COLUMNS = "id, name, slug, sort_order";
const DISH_COLUMNS = "id, category_id, name, description, price, image_url";

/**
 * Categorías activas, ordenadas por `sort_order` y luego por nombre.
 * Funciona sin sesión (rol anon).
 */
export async function getCategories(): Promise<CatalogCategory[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("categories")
    .select(CATEGORY_COLUMNS)
    .eq("active", true)
    .order("sort_order", { ascending: true })
    .order("name", { ascending: true })
    .order("id", { ascending: true });

  if (error) throw new Error(`No se pudieron leer las categorías: ${error.message}`);
  return data ?? [];
}

/**
 * Platos disponibles de categorías activas, ordenados por categoría y nombre.
 * La política RLS de `dishes` es pública para todas las filas, así que el filtro
 * `available = true` debe aplicarse aquí.
 * Con `categorySlug` devuelve solo los platos de esa categoría.
 */
export async function getDishes(categorySlug?: string): Promise<CatalogDish[]> {
  const categories = await getCategories();
  const visible = categorySlug
    ? categories.filter((c) => c.slug === categorySlug)
    : categories;
  if (visible.length === 0) return [];

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("dishes")
    .select(DISH_COLUMNS)
    .eq("available", true)
    .in("category_id", visible.map((c) => c.id))
    .order("name", { ascending: true })
    .order("id", { ascending: true });

  if (error) throw new Error(`No se pudieron leer los platos: ${error.message}`);

  // Orden final por categoría (sort_order, nombre) y luego nombre del plato.
  const position = new Map(visible.map((c, i) => [c.id, i]));
  return (data ?? []).sort(
    (a, b) =>
      (position.get(a.category_id) ?? 0) - (position.get(b.category_id) ?? 0) ||
      a.name.localeCompare(b.name, "es") ||
      a.id - b.id,
  );
}

/** Menú completo agrupado por categoría; omite las categorías sin platos disponibles. */
export async function getMenu(): Promise<CatalogCategoryWithDishes[]> {
  const [categories, dishes] = await Promise.all([getCategories(), getDishes()]);
  return categories
    .map((category) => ({
      ...category,
      dishes: dishes.filter((d) => d.category_id === category.id),
    }))
    .filter((c) => c.dishes.length > 0);
}
