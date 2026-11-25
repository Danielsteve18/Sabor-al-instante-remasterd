'use client';

import { useState } from 'react';
import Image from 'next/image';

type Dish = {
  id: number;
  name: string;
  description: string | null;
  price: number;
  image_url: string | null;
  categories?: { name: string; slug: string } | null;
};

interface DishCardProps {
  dish: Dish;
  oferta?: number;
  variant?: 'menu' | 'offer';
  onAddToCart?: (dish: Dish, quantity: number) => void;
}

export function DishCard({
  dish,
  oferta,
  variant = oferta != null ? 'offer' : 'menu',
  onAddToCart,
}: DishCardProps) {
  const [isFavorite, setIsFavorite] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  const isOffer = variant === 'offer' && oferta != null;
  const finalPrice = isOffer ? oferta : dish.price;
  const discountPercentage = isOffer
    ? Math.round(((dish.price - oferta) / dish.price) * 100)
    : 0;

  const handleAdd = () => {
    onAddToCart?.(dish, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <article
      className={`group flex flex-col justify-between overflow-hidden rounded-2xl bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${
        isOffer ? 'border-2 border-[#a6a182]' : 'border border-gray-200'
      }`}
    >
      <div>
        <div className="relative h-48 w-full overflow-hidden bg-[#aeb0b4]">
          {dish.image_url ? (
            <Image
              src={dish.image_url}
              alt={`Plato: ${dish.name}`}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div
              role="img"
              aria-label={`Sin imagen disponible para ${dish.name}`}
              className="flex h-full items-center justify-center text-sm font-medium text-[#1f2120]"
            >
              Sin imagen
            </div>
          )}

          {isOffer && (
            <span className="absolute left-3 top-3 rounded-full bg-[#a6a182] px-3 py-1 text-xs font-extrabold tracking-wide text-[#1f2120] shadow-sm">
              OFERTA -{discountPercentage}%
            </span>
          )}

          {dish.categories?.name && (
            <span className="absolute bottom-3 left-3 rounded-md bg-[#1f2120]/85 px-2.5 py-0.5 text-xs font-medium text-white backdrop-blur-sm">
              {dish.categories.name}
            </span>
          )}

          <button
            type="button"
            onClick={() => setIsFavorite(!isFavorite)}
            aria-pressed={isFavorite}
            aria-label={isFavorite ? 'Quitar de favoritos' : 'Guardar en favoritos'}
            className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/95 text-[#1f2120] shadow-sm transition hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1f2120] focus-visible:ring-offset-2 active:scale-95"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill={isFavorite ? '#dc2626' : 'none'}
              stroke={isFavorite ? '#dc2626' : 'currentColor'}
              strokeWidth="2"
              aria-hidden="true"
              className="h-5 w-5 transition-colors"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
              />
            </svg>
          </button>
        </div>

        <div className="space-y-2 p-4 pb-2">
          <h3 className="text-lg font-bold text-[#1f2120] transition-colors group-hover:text-[#6b674f]">
            {dish.name}
          </h3>

          {dish.description && (
            <div>
              <p
                className={`text-sm text-gray-700 transition-all ${
                  isExpanded ? '' : 'line-clamp-2'
                }`}
              >
                {dish.description}
              </p>
              {dish.description.length > 85 && (
                <button
                  type="button"
                  onClick={() => setIsExpanded(!isExpanded)}
                  aria-expanded={isExpanded}
                  className="mt-1 rounded text-xs font-semibold text-[#5c5843] underline-offset-2 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1f2120]"
                >
                  {isExpanded ? 'Ver menos' : 'Ver más'}
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      <div className="space-y-3 p-4 pt-2">
        <div className="flex items-baseline justify-between">
          <p className="text-lg font-extrabold text-[#1f2120]">
            {isOffer ? (
              <>
                <span className="sr-only">Precio anterior: </span>
                <s className="mr-2 text-sm font-normal text-gray-500">
                  ${dish.price.toLocaleString('es-CO')}
                </s>
                <span className="sr-only">Precio en oferta: </span>
                <span className="text-[#5c5843]">
                  ${oferta.toLocaleString('es-CO')}
                </span>
              </>
            ) : (
              `$${dish.price.toLocaleString('es-CO')}`
            )}
          </p>
          {quantity > 1 && (
            <span className="text-xs font-medium text-gray-600">
              Total: ${(finalPrice * quantity).toLocaleString('es-CO')}
            </span>
          )}
        </div>

        <div className="flex items-center gap-2">
          <div
            role="group"
            aria-label={`Cantidad de ${dish.name}`}
            className="flex items-center rounded-xl border border-gray-300 bg-gray-50"
          >
            <button
              type="button"
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              disabled={quantity <= 1}
              aria-label="Disminuir cantidad"
              className="rounded-l-xl px-2.5 py-1.5 text-sm font-bold text-[#1f2120] transition hover:bg-gray-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1f2120] disabled:opacity-40"
            >
              −
            </button>
            <span
              aria-live="polite"
              className="min-w-[1.75rem] text-center text-sm font-semibold text-[#1f2120]"
            >
              {quantity}
            </span>
            <button
              type="button"
              onClick={() => setQuantity((q) => q + 1)}
              aria-label="Aumentar cantidad"
              className="rounded-r-xl px-2.5 py-1.5 text-sm font-bold text-[#1f2120] transition hover:bg-gray-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1f2120]"
            >
              +
            </button>
          </div>

          <button
            type="button"
            onClick={handleAdd}
            className={`flex-1 rounded-xl px-4 py-2 text-sm font-semibold text-white transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1f2120] focus-visible:ring-offset-2 active:scale-95 ${
              added ? 'bg-emerald-700' : 'bg-[#1f2120] hover:bg-[#383b39]'
            }`}
          >
            {added ? '¡Agregado!' : 'Agregar'}
          </button>
        </div>
      </div>
    </article>
  );
}