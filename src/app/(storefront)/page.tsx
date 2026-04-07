'use client';
import { useEffect, useRef, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useDataStore } from '@/lib/data/store';
import { ProductCard } from '@/components/storefront/ProductCard';
import { ArrowRight, Truck, Heart, Shield, Star, PawPrint } from 'lucide-react';
import { useState } from 'react';

// ---- Section Reveal Hook ----
function useSectionReveal() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { el.classList.add('animate-section-reveal'); el.style.opacity = '1'; obs.disconnect(); } },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return ref;
}

// ---- HERO SECTION ----
function HeroSection() {
  const homepageBlocks = useDataStore(s => s.homepageBlocks);
  const hero = useMemo(() => homepageBlocks.find(b => b.block_type === 'hero' && b.is_visible), [homepageBlocks]);
  if (!hero) return null;

  return (
    <section className="section-container py-4 md:py-6">
      <div className="section-rounded relative overflow-hidden" style={{ backgroundColor: hero.bg_color || '#E8E1D8' }}>
        <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[500px] md:min-h-[600px] lg:min-h-[680px]">
          {/* Text */}
          <div className="flex flex-col justify-center px-8 md:px-12 lg:px-16 py-12 lg:py-16 order-2 lg:order-1">
            <h1 className="font-nohemi text-hero-display text-neutral-near-black leading-[0.92]">
              <span className="italic font-light">Amor</span>{' '}
              <span className="font-extrabold">que se lleva puesto</span>
            </h1>
            <p className="text-body-lg text-neutral-charcoal/80 mt-5 max-w-md">
              {hero.subtitle}
            </p>
            <div className="flex flex-wrap gap-3 mt-8">
              <Link href={hero.cta_url || '/tienda'} className="btn-pill-lg btn-primary">
                {hero.cta_text || 'Ver la tienda'} <ArrowRight size={18} />
              </Link>
              {hero.cta_secondary_text && (
                <Link href={hero.cta_secondary_url || '/tienda'} className="btn-pill-lg btn-outline">
                  {hero.cta_secondary_text}
                </Link>
              )}
            </div>
          </div>
          {/* Image */}
          <div className="relative order-1 lg:order-2 min-h-[350px] md:min-h-[400px]">
            {hero.image_url && (
              <Image
                src={hero.image_url}
                alt="Perrhijo con estilo Perrón"
                fill
                priority
                className="object-cover object-center"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            )}
            {/* Playful annotation */}
            <div className="absolute bottom-8 left-8 bg-white/90 backdrop-blur-sm rounded-xl-brand px-4 py-2.5 shadow-card animate-bounce-subtle">
              <p className="font-nohemi text-meta font-bold text-brand-rose">
                ¡Hola! Soy <span className="inline-block animate-text-slide">Latte</span> 🐾
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ---- TRUST STRIP (TICKER) ----
function TrustStrip() {
  const items = [
    { icon: <Truck size={18} />, label: 'Envío gratis desde $999' },
    { icon: <Heart size={18} />, label: 'Donamos por cada compra' },
    { icon: <Shield size={18} />, label: 'Hecho en México 🇲🇽' },
    { icon: <Star size={18} />, label: 'Sustentable y Local' },
    { icon: <PawPrint size={18} />, label: 'Comunidad +1.5k perrhijos' },
  ];

  // Double the items for seamless loop
  const displayItems = [...items, ...items, ...items];

  return (
    <section className="py-10 overflow-hidden bg-white border-y border-neutral-stone/10">
      <div className="text-center mb-8 px-6">
        <p className="font-nohemi text-h3 md:text-h2 font-bold text-neutral-near-black">
          Para perritos con un estilo... <span className="text-brand-rose italic">bien perrón</span>
        </p>
      </div>
      
      <div className="relative flex overflow-x-hidden group">
        <div className="animate-ticker flex whitespace-nowrap gap-12 md:gap-24 items-center py-4">
          {displayItems.map((f, i) => (
            <div key={i} className="flex items-center gap-4 text-neutral-charcoal shrink-0">
              <div className="p-2.5 bg-brand-blush/40 rounded-full text-brand-rose">
                {f.icon}
              </div>
              <span className="font-nohemi text-body font-bold tracking-tight uppercase">{f.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ---- PRODUCT MOSAIC ----
function ProductMosaic() {
  const ref = useSectionReveal();
  const [filter, setFilter] = useState<'all' | 'new' | 'favorites'>('all');
  const allProductsRaw = useDataStore(s => s.products);
  const allProducts = useMemo(() => allProductsRaw.filter(p => p.is_visible && !p.is_archived), [allProductsRaw]);
  const newProducts = useMemo(() => allProductsRaw.filter(p => p.is_new && p.is_visible && !p.is_archived), [allProductsRaw]);
  const favProducts = useMemo(() => allProductsRaw.filter(p => p.is_favorite && p.is_visible && !p.is_archived), [allProductsRaw]);
  const displayed = useMemo(() => {
    if (filter === 'new') return newProducts;
    if (filter === 'favorites') return favProducts;
    return allProducts;
  }, [filter, allProducts, newProducts, favProducts]);
  const filters = [
    { id: 'all' as const, label: 'Todo' },
    { id: 'new' as const, label: 'Lo más nuevo' },
    { id: 'favorites' as const, label: 'Los favoritos' },
  ];

  return (
    <section ref={ref} className="py-6 md:py-10 opacity-0" style={{ backgroundColor: '#F8C9DD' }}>
      <div className="section-container">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <h2 className="font-nohemi text-h2 font-bold text-neutral-near-black">
            Lo más cool para tu perrhijo
          </h2>
          <div className="flex gap-2">
            {filters.map(f => (
              <button
                key={f.id}
                onClick={() => setFilter(f.id)}
                className={`btn-pill-sm font-nohemi transition-all duration-hover ${
                  filter === f.id
                    ? 'bg-neutral-near-black text-white'
                    : 'bg-white/60 text-neutral-charcoal hover:bg-white'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* Mosaic Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5">
          {displayed.slice(0, 8).map((product, i) => (
            <div
              key={product.id}
              className={
                i === 0 ? 'col-span-2 row-span-2' :
                i === 3 ? 'col-span-2 md:col-span-1' : ''
              }
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>

        <div className="text-center mt-8">
          <Link href="/tienda" className="btn-pill-md btn-secondary">
            Ver toda la tienda <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}

// ---- CAMPAIGN BLOCK ----
function CampaignBlock({ blockId }: { blockId: string }) {
  const ref = useSectionReveal();
  const homepageBlocks = useDataStore(s => s.homepageBlocks);
  const block = useMemo(() => homepageBlocks.find(b => b.id === blockId && b.is_visible), [homepageBlocks, blockId]);
  if (!block) return null;

  const isRed = block.theme === 'red';
  const textColor = isRed || block.theme === 'sunset' ? 'text-white' : 'text-neutral-near-black';

  return (
    <section ref={ref} className="section-container py-4 md:py-6 opacity-0">
      <div className="section-rounded overflow-hidden" style={{ backgroundColor: block.bg_color || '#EC1763' }}>
        <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[450px] md:min-h-[520px]">
          {/* Image Side */}
          <div className="relative min-h-[300px] md:min-h-[400px]">
            {block.image_url && (
              <Image src={block.image_url} alt={block.title || ''} fill className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" />
            )}
            {block.secondary_image_url && (
              <div className="absolute bottom-6 right-6 w-32 h-32 md:w-44 md:h-44 rounded-lg-brand overflow-hidden shadow-elevated">
                <Image src={block.secondary_image_url} alt="" fill className="object-cover" sizes="180px" />
              </div>
            )}
          </div>
          {/* Text Side */}
          <div className="flex flex-col justify-center px-8 md:px-12 lg:px-16 py-10 lg:py-12">
            <h2 className={`font-nohemi text-h1 font-extrabold ${textColor} leading-[0.96]`}>
              {block.title}
            </h2>
            {block.subtitle && (
              <p className={`text-body-lg mt-4 ${textColor} opacity-80 max-w-md`}>
                {block.subtitle}
              </p>
            )}
            {block.cta_text && (
              <div className="mt-8">
                <Link
                  href={block.cta_url || '/tienda'}
                  className={`btn-pill-lg ${isRed ? 'bg-white text-neutral-near-black hover:bg-white/90' : 'btn-secondary'} inline-flex items-center gap-2`}
                >
                  {block.cta_text} <ArrowRight size={18} />
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

// ---- FEATURED PRODUCTS ----
function FeaturedProducts() {
  const ref = useSectionReveal();
  const allProductsRaw = useDataStore(s => s.products);
  const newProducts = useMemo(() => allProductsRaw.filter(p => p.is_new && p.is_visible && !p.is_archived), [allProductsRaw]);
  const featured = useMemo(() => allProductsRaw.filter(p => p.is_featured && p.is_visible && !p.is_archived), [allProductsRaw]);
  const displayed = newProducts.length > 0 ? newProducts : featured;

  return (
    <section ref={ref} className="section-container py-12 md:py-16 opacity-0">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="font-nohemi text-h2 font-bold text-neutral-near-black">Recién llegados</h2>
          <p className="text-body text-neutral-soft-gray mt-1">Las piezas más nuevas de la familia Perrón</p>
        </div>
        <Link href="/tienda?filter=nuevo" className="hidden md:flex items-center gap-2 btn-pill-md btn-ghost font-nohemi">
          Ver todos <ArrowRight size={16} />
        </Link>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5">
        {displayed.slice(0, 4).map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}

// ---- DOG REGISTRATION CTA ----
function DogRegistrationCTA() {
  const ref = useSectionReveal();
  return (
    <section ref={ref} className="section-container py-4 md:py-6 opacity-0">
      <div className="section-rounded relative overflow-hidden bg-brand-aqua">
        <div className="flex flex-col md:flex-row items-center justify-between px-8 md:px-16 py-12 md:py-16 gap-8">
          <div className="max-w-lg">
            <p className="text-meta font-nohemi font-bold text-neutral-near-black/60 uppercase tracking-widest mb-3">🐾 Perrhijos VIP</p>
            <h2 className="font-nohemi text-h1 font-extrabold text-neutral-near-black leading-[0.96]">
              Registra a tu perrhijo
            </h2>
            <p className="text-body-lg text-neutral-charcoal/80 mt-4">
              Encuentra su talla perfecta en menos de 2 minutos. Sin dramas, pura buena vibra.
            </p>
            <Link href="/registra-a-tu-perrhijo" className="btn-pill-lg btn-secondary mt-8 inline-flex items-center gap-2">
              Registrar ahora <ArrowRight size={18} />
            </Link>
          </div>
          <div className="text-8xl md:text-[10rem] select-none">🐕</div>
        </div>
      </div>
    </section>
  );
}

// ---- COLLECTION SLIDER ----
function CollectionSlider({ collectionId, title, subtitle }: { collectionId: string, title: string, subtitle?: string }) {
  const ref = useSectionReveal();
  const allProductsRaw = useDataStore(s => s.products);
  const products = useMemo(() => 
    allProductsRaw.filter(p => p.collection_id === collectionId && p.is_visible && !p.is_archived),
    [allProductsRaw, collectionId]
  );
  const sliderRef = useRef<HTMLDivElement>(null);

  if (products.length === 0) return null;

  return (
    <section ref={ref} className="section-container py-12 md:py-16 opacity-0">
      <div className="flex items-end justify-between mb-8">
        <div className="max-w-2xl">
          <h2 className="font-nohemi text-h2 font-extrabold text-neutral-near-black">{title}</h2>
          {subtitle && <p className="text-body text-neutral-soft-gray mt-2">{subtitle}</p>}
        </div>
        <Link href={`/colecciones/${collectionId}`} className="hidden md:flex items-center gap-2 btn-pill-sm btn-ghost font-nohemi group">
          Ver colección <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
      
      <div className="relative">
        <div 
          ref={sliderRef}
          className="flex overflow-x-auto gap-4 md:gap-6 pb-8 custom-scrollbar scroll-smooth snap-x"
        >
          {products.map(product => (
            <div key={product.id} className="min-w-[280px] md:min-w-[320px] snap-start">
              <ProductCard product={product} />
            </div>
          ))}
        </div>
        <div className="md:hidden mt-4 text-center">
            <p className="text-caption text-neutral-soft-gray italic">Desliza para ver más 🐾</p>
        </div>
      </div>
    </section>
  );
}

// ---- HOMEPAGE ----
export default function HomePage() {
  const homepageBlocks = useDataStore(s => s.homepageBlocks);
  const sortedBlocks = useMemo(() => 
    [...homepageBlocks]
      .filter(b => b.is_visible)
      .sort((a, b) => a.position - b.position),
    [homepageBlocks]
  );

  return (
    <>
      {sortedBlocks.map(block => {
        switch (block.block_type) {
          case 'hero':
            return <HeroSection key={block.id} />;
          case 'promo_strip':
            // PromoStrip is handled in Layout, but we could render others here if needed
            return null;
          case 'trust_strip':
            return <TrustStrip key={block.id} />;
          case 'product_mosaic':
            return <ProductMosaic key={block.id} />;
          case 'campaign':
            return <CampaignBlock key={block.id} blockId={block.id} />;
          case 'featured_products':
            return <FeaturedProducts key={block.id} />;
          case 'dog_registration_cta':
            return <DogRegistrationCTA key={block.id} />;
          default:
            return null;
        }
      })}

      {/* Collection Sliders are now dynamic blocks handled above */}
    </>
  );
}
