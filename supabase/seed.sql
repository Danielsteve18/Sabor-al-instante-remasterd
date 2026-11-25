-- supabase/seed.sql · SAB-12 · Seed de categorías y platos
-- Idempotente: se puede ejecutar varias veces sin duplicar registros.
-- Requiere las tablas de 0001_init.sql. Las imágenes viven en public/images/menu/.
-- Reproduce el menú base (de info.md) y agrega las categorías Sopas y Ensaladas.

-- Categorías: name y slug son únicos, así que "on conflict do nothing" evita duplicarlas.
insert into categories (name, slug, sort_order) values
                                                    ('Aperitivos',         'aperitivos',         1),
                                                    ('Platos Principales', 'platos-principales', 2),
                                                    ('Acompañamientos',    'acompanamientos',    3),
                                                    ('Postres',            'postres',            4),
                                                    ('Sopas',              'sopas',              5),
                                                    ('Ensaladas',          'ensaladas',          6)
    on conflict do nothing;

-- Platos: dishes no tiene restricción única, por eso se usa "where not exists"
-- (misma categoría y mismo nombre = ya existe).
insert into dishes (category_id, name, description, price, image_url)
select c.id, v.name, v.description, v.price, v.image_url
from (values
          -- Aperitivos
          ('aperitivos', 'Chips & Dip', 'Una combinación perfecta de chips crujientes recién hechos y salsas ricas y llenas de sabor.', 16.00, '/images/menu/aperitivos-1.jpg'),
          ('aperitivos', 'Garlic Fries', 'Papas fritas doradas y crujientes, sazonadas con ajo fresco y hierbas, servidas con una salsa especial.', 26.00, '/images/menu/aperitivos-2.jpg'),
          ('aperitivos', 'Caprese Salad', 'Ensalada fresca con rodajas de tomate, mozzarella y albahaca, bañada con aceite de oliva y vinagre balsámico.', 12.00, '/images/menu/aperitivos-3.jpg'),
          ('aperitivos', 'Bruschetta', 'Pan tostado con tomate fresco, albahaca y un toque de ajo, servido con aceite de oliva.', 14.00, '/images/menu/aperitivos-4.jpg'),
          ('aperitivos', 'Spring Rolls', 'Rollitos rellenos de vegetales frescos y camarones, servidos con una salsa agridulce.', 18.00, '/images/menu/aperitivos-5.jpg'),
          ('aperitivos', 'Stuffed Mushrooms', 'Champiñones rellenos de queso crema, ajo y hierbas, gratinados al horno.', 20.00, '/images/menu/aperitivos-6.jpg'),

          -- Platos Principales
          ('platos-principales', 'Thai Curry', 'Curry tailandés cremoso con leche de coco, vegetales frescos y un toque picante, servido con arroz jazmín.', 22.00, '/images/menu/main-dishes-1.jpg'),
          ('platos-principales', 'Grilled Salmon', 'Salmón a la parrilla con costra de hierbas, acompañado de puré de papas y espárragos.', 30.00, '/images/menu/main-dishes-2.jpg'),
          ('platos-principales', 'Beef Stroganoff', 'Trozos de carne de res en salsa cremosa de champiñones y mostaza, servidos con pasta.', 28.00, '/images/menu/main-dishes-3.jpg'),
          ('platos-principales', 'Chicken Parmesan', 'Pechuga de pollo empanizada con queso parmesano, cubierta de salsa marinara y gratinada.', 24.00, '/images/menu/main-dishes-4.jpg'),
          ('platos-principales', 'Paella de Mariscos', 'Arroz con mariscos frescos, azafrán y especias, preparado al estilo tradicional español.', 32.00, '/images/menu/main-dishes-5.jpg'),
          ('platos-principales', 'Lamb Chops', 'Costillas de cordero asadas con romero, servidas con vegetales salteados.', 35.00, '/images/menu/main-dishes-6.jpg'),

          -- Acompañamientos
          ('acompanamientos', 'Kale Salad', 'Ensalada nutritiva con kale fresco, frutos secos y un aderezo especial.', 10.00, '/images/menu/sides-1.jpg'),
          ('acompanamientos', 'Tortilla Soup', 'Sopa reconfortante con base de tomate y especias, servida con tiras de tortilla crujiente.', 20.00, '/images/menu/sides-2.jpg'),
          ('acompanamientos', 'Baked Potatoes', 'Papas al horno con mantequilla de ajo y perejil, acompañadas de crema agria.', 12.00, '/images/menu/sides-3.jpg'),
          ('acompanamientos', 'Coleslaw', 'Ensalada de col rallada con zanahoria y aderezo cremoso.', 8.00, '/images/menu/sides-4.jpg'),
          ('acompanamientos', 'Steamed Vegetables', 'Verduras al vapor con un toque de mantequilla y sal marina.', 9.00, '/images/menu/sides-5.jpg'),
          ('acompanamientos', 'Garlic Rice', 'Arroz salteado con ajo y hierbas frescas.', 11.00, '/images/menu/sides-6.jpg'),

          -- Postres
          ('postres', 'Tiramisú', 'Postre italiano con capas de bizcocho empapado en café y crema de mascarpone.', 15.00, '/images/menu/desserts-1.jpg'),
          ('postres', 'Chocolate Lava Cake', 'Bizcocho de chocolate con un centro fundido de chocolate caliente, acompañado de helado.', 18.00, '/images/menu/desserts-2.jpg'),
          ('postres', 'Cheesecake de Fresas', 'Tarta de queso cremosa con una capa de fresas frescas y base de galleta.', 14.00, '/images/menu/desserts-3.jpg'),
          ('postres', 'Apple Pie', 'Tarta de manzana horneada con canela y servida con helado de vainilla.', 16.00, '/images/menu/desserts-4.jpg'),
          ('postres', 'Crème Brûlée', 'Crema pastelera con una fina capa de caramelo crujiente.', 17.00, '/images/menu/desserts-5.jpg'),
          ('postres', 'Mango Sorbet', 'Sorbete refrescante de mango con un toque de limón.', 12.00, '/images/menu/desserts-6.jpg'),

          -- Sopas (nuevas)
          ('sopas', 'Sopa de mariscos del Pacífico', 'Caldo cremoso con camarones, calamar y pescado en base de coco y cilantro.', 28.00, '/images/menu/soups-1.jpg'),
          ('sopas', 'Crema de tomate asado', 'Crema suave de tomates asados con albahaca y crutones.', 16.00, '/images/menu/soups-2.jpg'),

          -- Ensaladas (nuevas)
          ('ensaladas', 'Ensalada César con pollo', 'Lechuga romana, pollo a la plancha, parmesano y crutones con aderezo César.', 22.00, '/images/menu/salads-1.jpg'),
          ('ensaladas', 'Ensalada de aguacate y camarón', 'Aguacate, camarones salteados, tomate cherry y limón sobre hojas verdes.', 24.00, '/images/menu/salads-2.jpg')
     ) as v(slug, name, description, price, image_url)
         join categories c on c.slug = v.slug
where not exists (
    select 1 from dishes d where d.category_id = c.id and d.name = v.name
);
