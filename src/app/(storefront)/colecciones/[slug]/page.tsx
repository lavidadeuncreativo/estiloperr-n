'use client';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { useDataStore } from '@/lib/data/store';
import { ProductCard } from '@/components/storefront/ProductCard';
import { ArrowLeft } from 'lucide-react';

export default function CollectionPage() {
  const { slug } = useParams<{ slug: string }>();
  const getCollection = useDataStore(s => s.getCollection);
  const getProductsByCollection = useDataStore(s => s.getProductsByCollection);
  const collection = getCollection(slug);
  const products = getProductsByCollection(slug);

  if (!collection) {
    return (
      <div className="section-container py-20 text-center">
        <p className="font-nohemi text-h2 text-neutral-charcoal">Colección no encontrada</p>
        <Link href="/tienda" className="btn-pill-md btn-primary mt-6 inline-flex items-center gap-2"><ArrowLeft size={16} /> Volver</Link>
      </div>
    );
  }

  return (
    <div>
      {/* Collection Hero */}
      <section className="section-container py-4 md:py-6">
        <div className="section-rounded relative overflow-hidden bg-neutral-stone min-h-[280px] md:min-h-[360px] flex items-end">
          {collection.image_url && (
            <Image src={collection.image_url} alt={collection.title} fill className="object-cover opacity-60" sizes="100vw" />
          )}
          <div className="relative z-10 p-8 md:p-12 lg:p-16">
            <Link href="/tienda" className="inline-flex items-center gap-1.5 text-meta text-white/70 hover:text-white mb-3 transition-colors">
              <ArrowLeft size={14} /> Tienda
            </Link>
            <h1 className="font-nohemi text-h1 font-extrabold text-white">{collection.title}</h1>
            {collection.description && <p className="text-body-lg text-white/80 mt-2 max-w-lg">{collection.description}</p>}
            <p className="text-small text-white/60 mt-3">{products.length} productos</p>
          </div>
        </div>
      </section>

      {/* Products */}
      <section className="section-container py-8 md:py-12">
        {products.length === 0 ? (
          <div className="text-center py-16">
            <p className="font-nohemi text-h3 text-neutral-soft-gray">Próximamente nuevos productos</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {products.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        )}
      </section>
    </div>
  );
}
