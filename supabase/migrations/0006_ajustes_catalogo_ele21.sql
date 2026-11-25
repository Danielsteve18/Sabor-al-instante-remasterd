-- 0006_ajustes_catalogo_ele21.sql
-- ELE-21: actualiza rutas de imágenes existentes tras convertir JPG a WebP
-- y oculta la categoría de prueba "Entradas" señalada en la revisión.
-- No elimina categorías ni platos; ambos cambios son reversibles.

update dishes
set image_url = replace(image_url, '.jpg', '.webp')
where image_url like '/images/menu/%.jpg';

update categories
set active = false
where slug = 'entradas'
  and lower(name) = 'entradas';
