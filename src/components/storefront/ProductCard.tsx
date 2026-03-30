'use client';
import Link from 'next/link';
import Image from 'next/image';
import { useDataStore } from '@/lib/data/store';
import { formatPrice } from '@/lib/utils';
import type { Product } from '@/lib/types';

export function ProductCard({ product }: { product: Product }) {
  const getProductPrimaryImage = useDataStore(s => s.getProductPrimaryImage);
  const imageUrl = getProductPrimaryImage(product.id);

  return (
    <Link href={`/producto/${product.slug}`} className="product-card group block">
      <div className="relative aspect-square overflow-hidden rounded-lg-brand bg-neutral-stone/20">
        <Image
          src={imageUrl}
          alt={product.title}
          fill
          sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
          className="product-card-image"
        />
        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          {product.is_new && <span className="badge-new">Nuevo</span>}
          {product.compare_at_price && product.compare_at_price > product.base_price && (
            <span className="badge-sale">
              -{Math.round((1 - product.base_price / product.compare_at_price) * 100)}%
            </span>
          )}
        </div>
        {/* Quick add overlay */}
        <div className="absolute inset-x-0 bottom-0 p-3 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-hover">
          <button className="w-full btn-pill-sm btn-secondary text-center">
            Ver producto
          </button>
        </div>
      </div>
      <div className="p-3 md:p-4">
        <h3 className="font-nohemi font-semibold text-body text-neutral-near-black truncate">
          {product.title}
        </h3>
        {product.short_description && (
          <p className="text-meta text-neutral-soft-gray mt-0.5 truncate">{product.short_description}</p>
        )}
        <div className="flex items-center gap-2 mt-2">
          <span className="font-nohemi font-bold text-body-lg text-neutral-near-black">
            {formatPrice(product.base_price)}
          </span>
          {product.compare_at_price && product.compare_at_price > product.base_price && (
            <span className="text-small text-neutral-soft-gray line-through">
              {formatPrice(product.compare_at_price)}
            </span>
          )}
        </div>
        {product.personalization_enabled && (
          <p className="text-caption text-brand-rose font-medium mt-1.5">✨ Personalizable</p>
        )}
      </div>
    </Link>
  );
}
