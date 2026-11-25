// Tipos de la base de datos (supabase/migrations/0001_init.sql y 0003_roles.sql).
// Regenerables con: supabase gen types typescript --project-id <id>

export type Role = "cliente" | "staff" | "admin";
export type ReservationStatus = "pendiente" | "confirmada" | "cancelada";

export type Profile = {
  id: string;
  full_name: string | null;
  phone: string | null;
  role: Role;
  created_at: string;
};

export type Category = {
  id: number;
  name: string;
  slug: string;
  sort_order: number;
  active: boolean;
};

export type Dish = {
  id: number;
  category_id: number;
  name: string;
  description: string | null;
  price: number;
  image_url: string | null;
  available: boolean;
  created_at: string;
};

export type DailyOffer = {
  id: number;
  dish_id: number;
  offer_date: string;
  offer_price: number | null;
  note: string | null;
  active: boolean;
  created_at: string;
};

export type Reservation = {
  id: number;
  user_id: string | null;
  guest_name: string | null;
  guest_phone: string | null;
  reserved_date: string;
  reserved_time: string;
  people: number;
  status: ReservationStatus;
  created_at: string;
};

export type ContactMessage = {
  id: number;
  name: string;
  email: string;
  phone: string | null;
  message: string;
  read: boolean;
  created_at: string;
};

export type Testimonial = {
  id: number;
  user_id: string | null;
  author_name: string;
  content: string;
  rating: number;
  approved: boolean;
  created_at: string;
};

export type Post = {
  id: number;
  author_id: string | null;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string;
  cover_image_url: string | null;
  published: boolean;
  published_at: string | null;
  created_at: string;
};

export type ScheduleDay = {
  id: number;
  day_of_week: number; // 0 = domingo
  open_time: string | null;
  close_time: string | null;
  closed: boolean;
};

export type ReservationSlotUsage = {
  reserved_date: string;
  reserved_time: string;
  reservations_count: number;
  people_total: number;
};

// ---- Respuestas del catálogo público (lib/queries/catalog.ts) ----
export type CatalogCategory = Pick<Category, "id" | "name" | "slug" | "sort_order">;

export type CatalogDish = Pick<
  Dish,
  "id" | "category_id" | "name" | "description" | "price" | "image_url"
>;

export type CatalogCategoryWithDishes = CatalogCategory & { dishes: CatalogDish[] };
