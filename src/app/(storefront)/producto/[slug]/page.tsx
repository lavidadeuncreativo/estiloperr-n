'use client';
import { useState, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useDataStore, useCartStore } from '@/lib/data/store';
import { ProductCard } from '@/components/storefront/ProductCard';
import { formatPrice, getStockStatus, getStockLabel } from '@/lib/utils';
import { ShoppingBag, Heart, Truck, Check, ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';

export default function ProductoPage() {
  const { slug } = useParams<{ slug: string }>();
  const getProductWithRelations = useDataStore(s => s.getProductWithRelations);
  const rawProducts = useDataStore(s => s.products);
  const allProducts = useMemo(() => rawProducts.filter(p => p.is_visible && !p.is_archived), [rawProducts]);
  
  const addItem = useCartStore(s => s.addItem);
  const openCart = useCartStore(s => s.openCart);

  const product = getProductWithRelations(slug);
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [selectedImageIdx, setSelectedImageIdx] = useState(0);
  const [personalizationText, setPersonalizationText] = useState('');
  const [addedToCart, setAddedToCart] = useState(false);

  if (!product) {
    return (
      <div className="section-container py-20 text-center">
        <p className="font-nohemi text-h2 text-neutral-charcoal">Producto no encontrado</p>
        <Link href="/tienda" className="btn-pill-md btn-primary mt-6 inline-flex items-center gap-2">
          <ArrowLeft size={16} /> Volver a la tienda
        </Link>
      </div>
    );
  }

  const selectedVariant = product.variants.find(v => v.size === selectedSize);
  const stockStatus = selectedVariant ? getStockStatus(selectedVariant.stock, selectedVariant.low_stock_threshold) : null;
  const relatedProducts = allProducts.filter(p => p.id !== product.id && (p.collection_id === product.collection_id || p.category_id === product.category_id)).slice(0, 4);

  const handleAddToCart = () => {
    if (!selectedVariant) return;
    addItem({
      variant_id: selectedVariant.id,
      product_id: product.id,
      product_title: product.title,
      product_slug: product.slug,
      variant_sku: selectedVariant.sku,
      variant_size: selectedVariant.size,
      variant_color: selectedVariant.color,
      unit_price: selectedVariant.price,
      compare_at_price: selectedVariant.compare_at_price,
      quantity: 1,
      image_url: product.images[0]?.url,
      max_stock: selectedVariant.stock,
      ...(product.personalization_enabled && personalizationText ? {
        personalization: { type: product.personalization_type!, data: { text: personalizationText }, cost: product.personalization_cost }
      } : {}),
    });
    setAddedToCart(true);
    openCart();
    setTimeout(() => setAddedToCart(false), 2000);
  };

  return (
    <div className="section-container py-6 md:py-10">
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 text-meta text-neutral-soft-gray mb-6">
        <Link href="/tienda" className="hover:text-neutral-near-black transition-colors">Tienda</Link>
        <span>/</span>
        {product.collection && <><Link href={`/colecciones/${product.collection.slug}`} className="hover:text-neutral-near-black transition-colors">{product.collection.title}</Link><span>/</span></>}
        <span className="text-neutral-near-black">{product.title}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
        {/* Gallery */}
        <div className="space-y-3">
          <div className="relative aspect-square rounded-xl-brand overflow-hidden bg-neutral-stone/20">
            <Image
              src={product.images[selectedImageIdx]?.url || '/products/GAP foto 0.jpg'}
              alt={product.title}
              fill
              priority
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            {product.images.length > 1 && (
              <>
                <button onClick={() => setSelectedImageIdx(i => i > 0 ? i - 1 : product.images.length - 1)} className="absolute left-3 top-1/2 -translate-y-1/2 p-2 bg-white/80 rounded-full shadow-card hover:bg-white transition-colors" aria-label="Imagen anterior">
                  <ChevronLeft size={20} />
                </button>
                <button onClick={() => setSelectedImageIdx(i => i < product.images.length - 1 ? i + 1 : 0)} className="absolute right-3 top-1/2 -translate-y-1/2 p-2 bg-white/80 rounded-full shadow-card hover:bg-white transition-colors" aria-label="Siguiente imagen">
                  <ChevronRight size={20} />
                </button>
              </>
            )}
          </div>
          {/* Thumbnails */}
          {product.images.length > 1 && (
            <div className="flex gap-2 overflow-x-auto no-scrollbar">
              {product.images.map((img, i) => (
                <button key={img.id} onClick={() => setSelectedImageIdx(i)}
                  className={`relative w-20 h-20 rounded-md-brand overflow-hidden shrink-0 border-2 transition-all ${i === selectedImageIdx ? 'border-brand-rose' : 'border-transparent hover:border-neutral-stone'}`}
                >
                  <Image src={img.url} alt={img.alt_text || ''} fill className="object-cover" sizes="80px" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="flex flex-col">
          {/* Badges */}
          <div className="flex gap-2 mb-3">
            {product.is_new && <span className="badge-new">Nuevo</span>}
            {product.is_favorite && <span className="badge-featured">Favorito</span>}
            {product.collection && <span className="badge bg-brand-sky-blue/10 text-brand-sky-blue">{product.collection.title}</span>}
          </div>

          <h1 className="font-nohemi text-h1 font-extrabold text-neutral-near-black">{product.title}</h1>

          {/* Price */}
          <div className="flex items-baseline gap-3 mt-3">
            <span className="font-nohemi text-h2 font-bold text-neutral-near-black">{formatPrice(product.base_price)}</span>
            {product.compare_at_price && product.compare_at_price > product.base_price && (
              <>
                <span className="text-body-lg text-neutral-soft-gray line-through">{formatPrice(product.compare_at_price)}</span>
                <span className="badge-sale">-{Math.round((1 - product.base_price / product.compare_at_price!) * 100)}%</span>
              </>
            )}
          </div>

          <p className="text-body text-neutral-charcoal/80 mt-4 leading-relaxed">{product.description}</p>

          {/* Size Selection */}
          <div className="mt-8">
            <div className="flex items-center justify-between mb-3">
              <span className="font-nohemi font-semibold text-body">Talla</span>
              <Link href="/guia-de-tallas" className="text-meta text-brand-rose hover:underline">Guía de tallas</Link>
            </div>
            <div className="flex flex-wrap gap-2">
              {product.variants.map(v => {
                const status = getStockStatus(v.stock, v.low_stock_threshold);
                return (
                  <button key={v.id} onClick={() => setSelectedSize(v.size)} disabled={status === 'out'}
                    className={`relative rounded-pill px-5 py-2.5 font-nohemi font-semibold text-small border-2 transition-all duration-hover ${
                      selectedSize === v.size ? 'border-brand-rose bg-brand-rose text-white' :
                      status === 'out' ? 'border-neutral-stone/30 bg-neutral-surface-gray text-neutral-soft-gray cursor-not-allowed opacity-50' :
                      'border-neutral-stone/40 hover:border-neutral-near-black text-neutral-charcoal'
                    }`}
                  >
                    {v.size}
                    {status === 'low' && <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-amber-400 rounded-full" />}
                  </button>
                );
              })}
            </div>
            {selectedVariant && stockStatus && (
              <p className={`text-meta mt-2 ${stockStatus === 'ok' ? 'text-emerald-600' : stockStatus === 'low' ? 'text-amber-600' : 'text-red-500'}`}>
                {getStockLabel(stockStatus)}{stockStatus === 'low' ? ` — Solo quedan ${selectedVariant.stock}` : ''}
              </p>
            )}
          </div>

          {/* Personalization */}
          {product.personalization_enabled && (
            <div className="mt-6 p-5 bg-brand-blush/20 rounded-lg-brand">
              <div className="flex items-center justify-between mb-2">
                <span className="font-nohemi font-semibold text-body">✨ Personalización</span>
                <span className="text-meta text-brand-rose font-medium">+{formatPrice(product.personalization_cost)}</span>
              </div>
              <p className="text-meta text-neutral-soft-gray mb-3">{product.personalization_instructions}</p>
              <input
                type="text"
                value={personalizationText}
                onChange={e => setPersonalizationText(e.target.value)}
                placeholder="Nombre de tu perrhijo..."
                maxLength={20}
                className="w-full rounded-pill border border-neutral-stone/40 px-4 py-2.5 text-small font-inter focus:outline-none focus:ring-2 focus:ring-brand-rose/30"
              />
              {product.personalization_extra_days > 0 && (
                <p className="text-caption text-neutral-soft-gray mt-2">⏱ +{product.personalization_extra_days} días de producción</p>
              )}
            </div>
          )}

          {/* Add to Cart */}
          <div className="flex gap-3 mt-8">
            <button
              onClick={handleAddToCart}
              disabled={!selectedSize || stockStatus === 'out'}
              className={`flex-1 btn-pill-lg ${addedToCart ? 'bg-emerald-500 text-white' : 'btn-primary'} disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              {addedToCart ? <><Check size={20} /> ¡Agregado!</> : <><ShoppingBag size={20} /> {!selectedSize ? 'Selecciona una talla' : 'Agregar al carrito'}</>}
            </button>
            <button className="p-4 border-2 border-neutral-stone/40 rounded-pill hover:border-brand-rose hover:text-brand-rose transition-all duration-hover" aria-label="Agregar a favoritos">
              <Heart size={22} />
            </button>
          </div>

          {/* Shipping Info */}
          <div className="mt-6 p-4 bg-neutral-surface-gray rounded-lg-brand space-y-2">
            <div className="flex items-center gap-2 text-small">
              <Truck size={16} className="text-brand-rose" />
              <span>Envío gratis en compras mayores a $999</span>
            </div>
            <div className="flex items-center gap-2 text-small">
              <Heart size={16} className="text-brand-rose" />
              <span>Donamos $10 por cada compra a refugios</span>
            </div>
          </div>

          {/* Care Instructions */}
          {product.care_instructions && (
            <div className="mt-6">
              <h3 className="font-nohemi font-semibold text-body mb-2">Cuidados</h3>
              <p className="text-small text-neutral-soft-gray">{product.care_instructions}</p>
            </div>
          )}
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="mt-16 md:mt-20">
          <h2 className="font-nohemi text-h2 font-bold text-neutral-near-black mb-6">También te puede gustar</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5">
            {relatedProducts.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        </div>
      )}
    </div>
  );
}
