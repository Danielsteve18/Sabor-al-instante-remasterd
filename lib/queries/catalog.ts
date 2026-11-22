From 04382c655fad80b005524774a2f7540fef09a6b4 Mon Sep 17 00:00:00 2001
From: Victor Vera <victormanuelveraangulo@gmail.com>
Date: Sun, 22 Nov 2026 16:09:01 -0500
Subject: [PATCH] =?UTF-8?q?feat(backend):=20consultas=20p=C3=BAblicas=20de?=
 =?UTF-8?q?=20categor=C3=ADas=20y=20platos=20(SAB-20)?=
MIME-Version: 1.0
Content-Type: text/plain; charset=UTF-8
Content-Transfer-Encoding: 8bit

Co-Authored-By: Claude Sonnet 5.5 <noreply@anthropic.com>
Claude-Session: https://claude.ai/code/session_01Lexb1dgET7Hy6oBZek94t2
---
 lib/queries/catalog.ts |  72 ++++++++++++++++++++++++++
 types/database.ts      | 112 +++++++++++++++++++++++++++++++++++++++++
 2 files changed, 184 insertions(+)
 create mode 100644 lib/queries/catalog.ts
 create mode 100644 types/database.ts

diff --git a/lib/queries/catalog.ts b/lib/queries/catalog.ts
new file mode 100644
index 0000000..3b50fed
--- /dev/null
+++ b/lib/queries/catalog.ts
@@ -0,0 +1,72 @@
+import { createClient } from "@/lib/supabase/server";
+import type {
+  CatalogCategory,
+  CatalogCategoryWithDishes,
+  CatalogDish,
+} from "@/types/database";
+
+const CATEGORY_COLUMNS = "id, name, slug, sort_order";
+const DISH_COLUMNS = "id, category_id, name, description, price, image_url";
+
+/**
+ * Categorías activas, ordenadas por `sort_order` y luego por nombre.
+ * Funciona sin sesión (rol anon).
+ */
+export async function getCategories(): Promise<CatalogCategory[]> {
+  const supabase = await createClient();
+  const { data, error } = await supabase
+    .from("categories")
+    .select(CATEGORY_COLUMNS)
+    .eq("active", true)
+    .order("sort_order", { ascending: true })
+    .order("name", { ascending: true })
+    .order("id", { ascending: true });
+
+  if (error) throw new Error(`No se pudieron leer las categorías: ${error.message}`);
+  return data ?? [];
+}
+
+/**
+ * Platos disponibles de categorías activas, ordenados por categoría y nombre.
+ * La política RLS de `dishes` es pública para todas las filas, así que el filtro
+ * `available = true` debe aplicarse aquí.
+ * Con `categorySlug` devuelve solo los platos de esa categoría.
+ */
+export async function getDishes(categorySlug?: string): Promise<CatalogDish[]> {
+  const categories = await getCategories();
+  const visible = categorySlug
+    ? categories.filter((c) => c.slug === categorySlug)
+    : categories;
+  if (visible.length === 0) return [];
+
+  const supabase = await createClient();
+  const { data, error } = await supabase
+    .from("dishes")
+    .select(DISH_COLUMNS)
+    .eq("available", true)
+    .in("category_id", visible.map((c) => c.id))
+    .order("name", { ascending: true })
+    .order("id", { ascending: true });
+
+  if (error) throw new Error(`No se pudieron leer los platos: ${error.message}`);
+
+  // Orden final por categoría (sort_order, nombre) y luego nombre del plato.
+  const position = new Map(visible.map((c, i) => [c.id, i]));
+  return (data ?? []).sort(
+    (a, b) =>
+      (position.get(a.category_id) ?? 0) - (position.get(b.category_id) ?? 0) ||
+      a.name.localeCompare(b.name, "es") ||
+      a.id - b.id,
+  );
+}
+
+/** Menú completo agrupado por categoría; omite las categorías sin platos disponibles. */
+export async function getMenu(): Promise<CatalogCategoryWithDishes[]> {
+  const [categories, dishes] = await Promise.all([getCategories(), getDishes()]);
+  return categories
+    .map((category) => ({
+      ...category,
+      dishes: dishes.filter((d) => d.category_id === category.id),
+    }))
+    .filter((c) => c.dishes.length > 0);
+}
diff --git a/types/database.ts b/types/database.ts
new file mode 100644
index 0000000..85bb892
--- /dev/null
+++ b/types/database.ts
@@ -0,0 +1,112 @@
+// Tipos de la base de datos (supabase/migrations/0001_init.sql y 0003_roles.sql).
+// Regenerables con: supabase gen types typescript --project-id <id>
+
+export type Role = "cliente" | "staff" | "admin";
+export type ReservationStatus = "pendiente" | "confirmada" | "cancelada";
+
+export type Profile = {
+  id: string;
+  full_name: string | null;
+  phone: string | null;
+  role: Role;
+  created_at: string;
+};
+
+export type Category = {
+  id: number;
+  name: string;
+  slug: string;
+  sort_order: number;
+  active: boolean;
+};
+
+export type Dish = {
+  id: number;
+  category_id: number;
+  name: string;
+  description: string | null;
+  price: number;
+  image_url: string | null;
+  available: boolean;
+  created_at: string;
+};
+
+export type DailyOffer = {
+  id: number;
+  dish_id: number;
+  offer_date: string;
+  offer_price: number | null;
+  note: string | null;
+  active: boolean;
+  created_at: string;
+};
+
+export type Reservation = {
+  id: number;
+  user_id: string | null;
+  guest_name: string | null;
+  guest_phone: string | null;
+  reserved_date: string;
+  reserved_time: string;
+  people: number;
+  status: ReservationStatus;
+  created_at: string;
+};
+
+export type ContactMessage = {
+  id: number;
+  name: string;
+  email: string;
+  phone: string | null;
+  message: string;
+  read: boolean;
+  created_at: string;
+};
+
+export type Testimonial = {
+  id: number;
+  user_id: string | null;
+  author_name: string;
+  content: string;
+  rating: number;
+  approved: boolean;
+  created_at: string;
+};
+
+export type Post = {
+  id: number;
+  author_id: string | null;
+  title: string;
+  slug: string;
+  excerpt: string | null;
+  content: string;
+  cover_image_url: string | null;
+  published: boolean;
+  published_at: string | null;
+  created_at: string;
+};
+
+export type ScheduleDay = {
+  id: number;
+  day_of_week: number; // 0 = domingo
+  open_time: string | null;
+  close_time: string | null;
+  closed: boolean;
+};
+
+export type ReservationSlotUsage = {
+  reserved_date: string;
+  reserved_time: string;
+  reservations_count: number;
+  people_total: number;
+};
+
+// ---- Respuestas del catálogo público (lib/queries/catalog.ts) ----
+export type CatalogCategory = Pick<Category, "id" | "name" | "slug" | "sort_order">;
+
+export type CatalogDish = Pick<
+  Dish,
+  "id" | "category_id" | "name" | "description" | "price" | "image_url"
+>;
+
+export type CatalogCategoryWithDishes = CatalogCategory & { dishes: CatalogDish[] };
-- 
2.43.0
