import { createClient } from '@/lib/supabase/server';

export async function getCategorias() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('categories')
    .select('id, name, slug')
    .eq('active', true)
    .order('sort_order');
  if (error) throw error;
  return data;
}

export async function getPlatos() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('dishes')
    .select('id, name, description, price, image_url, categories(name, slug)')
    .eq('available', true)
    .order('name');
  if (error) throw error;
  return data;
}
