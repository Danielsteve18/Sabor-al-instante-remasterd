-- 0005_imagenes_platos.sql · ELE-21
-- Asigna la imagen de cada plato del catálogo (28 platos).
-- Las fotos viven en public/images/menu/ (WebP).
-- Idempotente: se puede ejecutar varias veces; deja siempre la misma imagen por plato.
-- No toca "Plato de prueba" (categoría Entradas), que la 0006 deja oculta.
-- Más adelante (RF-17) el admin podrá reemplazarlas subiendo a Supabase Storage.

update dishes d
set image_url = v.url
from (values
  -- Aperitivos
  ('Chips & Dip',                   '/images/menu/aperitivos-1.webp'),
  ('Garlic Fries',                  '/images/menu/aperitivos-2.webp'),
  ('Caprese Salad',                 '/images/menu/aperitivos-3.webp'),
  ('Bruschetta',                    '/images/menu/aperitivos-4.webp'),
  ('Spring Rolls',                  '/images/menu/aperitivos-5.webp'),
  ('Stuffed Mushrooms',             '/images/menu/aperitivos-6.webp'),
  -- Platos Principales
  ('Thai Curry',                    '/images/menu/main-dishes-1.webp'),
  ('Grilled Salmon',                '/images/menu/main-dishes-2.webp'),
  ('Beef Stroganoff',               '/images/menu/main-dishes-3.webp'),
  ('Chicken Parmesan',              '/images/menu/main-dishes-4.webp'),
  ('Paella de Mariscos',            '/images/menu/main-dishes-5.webp'),
  ('Lamb Chops',                    '/images/menu/main-dishes-6.webp'),
  -- Acompañamientos
  ('Kale Salad',                    '/images/menu/sides-1.webp'),
  ('Tortilla Soup',                 '/images/menu/sides-2.webp'),
  ('Baked Potatoes',                '/images/menu/sides-3.webp'),
  ('Coleslaw',                      '/images/menu/sides-4.webp'),
  ('Steamed Vegetables',            '/images/menu/sides-5.webp'),
  ('Garlic Rice',                   '/images/menu/sides-6.webp'),
  -- Postres
  ('Tiramisú',                      '/images/menu/desserts-1.webp'),
  ('Chocolate Lava Cake',           '/images/menu/desserts-2.webp'),
  ('Cheesecake de Fresas',          '/images/menu/desserts-3.webp'),
  ('Apple Pie',                     '/images/menu/desserts-4.webp'),
  ('Crème Brûlée',                  '/images/menu/desserts-5.webp'),
  ('Mango Sorbet',                  '/images/menu/desserts-6.webp'),
  -- Sopas
  ('Sopa de mariscos del Pacífico', '/images/menu/soups-1.webp'),
  ('Crema de tomate asado',         '/images/menu/soups-2.webp'),
  -- Ensaladas
  ('Ensalada César con pollo',      '/images/menu/salads-1.webp'),
  ('Ensalada de aguacate y camarón','/images/menu/salads-2.webp')
) as v(name, url)
where d.name = v.name;
