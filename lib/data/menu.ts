import { createClient } from '@/lib/supabase/server';

type SupabaseError = { message?: string | null; code?: string | null };
type QueryResult<T> = { data: T | null; error: SupabaseError | null };

/**
 * Convierte cualquier fallo de Supabase en un Error con mensaje legible.
 * Así el overlay de Next muestra texto y no el objeto `{message, details, ...}`.
 */
async function consultar<T>(
  contexto: string,
  consulta: () => PromiseLike<QueryResult<T>>,
): Promise<T | null> {
  try {
    const { data, error } = await consulta();
    if (error) {
      const codigo = error.code ? ` (código ${error.code})` : '';
      throw new Error(`${contexto}: ${error.message ?? 'error desconocido'}${codigo}`);
    }
    return data;
  } catch (cause) {
    if (cause instanceof Error && cause.message.startsWith(contexto)) throw cause;
    throw new Error(
      `${contexto}. No se pudo conectar con Supabase; revisa la configuración y la conexión.`,
      { cause },
    );
  }
}

export async function getCategorias() {
  const supabase = await createClient();
  return consultar('No se pudieron cargar las categorías', () =>
    supabase
      .from('categories')
      .select('id, name, slug')
      .eq('active', true)
      .order('sort_order'),
  );
}

export async function getPlatos() {
  const supabase = await createClient();
  return consultar('No se pudieron cargar los platos', () =>
    supabase
      .from('dishes')
      .select('id, name, description, price, image_url, categories(name, slug)')
      .eq('available', true)
      .order('name'),
  );
}
