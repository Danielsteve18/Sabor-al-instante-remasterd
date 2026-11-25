/** Forma de los datos que devuelven getCategorias() y getPlatos() (ELE-20). */
export type Categoria = {
  id: number;
  name: string;
  slug: string;
};

export type Plato = {
  id: number;
  name: string;
  description: string | null;
  price: number;
  image_url: string | null;
  categories: { name: string; slug: string } | null;
};
