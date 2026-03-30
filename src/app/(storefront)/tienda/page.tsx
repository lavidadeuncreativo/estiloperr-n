'use client';
import { useState, useMemo } from 'react';
import { useDataStore } from '@/lib/data/store';
import { ProductCard } from '@/components/storefront/ProductCard';
import { SlidersHorizontal } from 'lucide-react';

export default function TiendaPage() {
  const allProducts = useDataStore(s => s.products);
  const allCollections = useDataStore(s => s.collections);
  const allCategories = useDataStore(s => s.categories);
  const products = useMemo(() => allProducts.filter(p => p.is_visible && !p.is_archived), [allProducts]);
  const collections = useMemo(() => allCollections.filter(c => c.is_visible), [allCollections]);
  const categories = useMemo(() => allCategories.filter(c => c.is_visible), [allCategories]);
  const [selectedCollection, setSelectedCollection] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('featured');

  const filtered = useMemo(() => {
    let result = [...products];
    if (selectedCollection !== 'all') result = result.filter(p => p.collection_id === selectedCollection);
    if (selectedCategory !== 'all') result = result.filter(p => p.category_id === selectedCategory);
    switch (sortBy) {
      case 'price-asc': result.sort((a, b) => a.base_price - b.base_price); break;
      case 'price-desc': result.sort((a, b) => b.base_price - a.base_price); break;
      case 'newest': result.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()); break;
      default: result.sort((a, b) => a.display_priority - b.display_priority);
    }
    return result;
  }, [products, selectedCollection, selectedCategory, sortBy]);

  return (
    <div className="section-container py-8 md:py-12">
      {/* Header */}
      <div className="mb-8 md:mb-12">
        <h1 className="font-nohemi text-h1 font-extrabold text-neutral-near-black">Tienda</h1>
        <p className="text-body-lg text-neutral-soft-gray mt-2">
          Encuentra el look perfecto para tu perrhijo
        </p>
      </div>

      {/* Filters Bar */}
      <div className="flex flex-wrap items-center gap-3 mb-8 pb-6 border-b border-neutral-stone/30">
        <div className="flex items-center gap-2 text-neutral-soft-gray mr-auto">
          <SlidersHorizontal size={16} />
          <span className="text-small font-medium">{filtered.length} productos</span>
        </div>
        {/* Collection Filter */}
        <select
          value={selectedCollection}
          onChange={e => setSelectedCollection(e.target.value)}
          className="bg-white border border-neutral-stone/40 rounded-pill px-4 py-2 text-small font-inter focus:outline-none focus:ring-2 focus:ring-brand-rose/30"
        >
          <option value="all">Todas las colecciones</option>
          {collections.map(c => <option key={c.id} value={c.id}>{c.title}</option>)}
        </select>
        {/* Category Filter */}
        <select
          value={selectedCategory}
          onChange={e => setSelectedCategory(e.target.value)}
          className="bg-white border border-neutral-stone/40 rounded-pill px-4 py-2 text-small font-inter focus:outline-none focus:ring-2 focus:ring-brand-rose/30"
        >
          <option value="all">Todas las categorías</option>
          {categories.map(c => <option key={c.id} value={c.id}>{c.title}</option>)}
        </select>
        {/* Sort */}
        <select
          value={sortBy}
          onChange={e => setSortBy(e.target.value)}
          className="bg-white border border-neutral-stone/40 rounded-pill px-4 py-2 text-small font-inter focus:outline-none focus:ring-2 focus:ring-brand-rose/30"
        >
          <option value="featured">Destacados</option>
          <option value="newest">Más nuevos</option>
          <option value="price-asc">Precio: menor a mayor</option>
          <option value="price-desc">Precio: mayor a menor</option>
        </select>
      </div>

      {/* Product Grid */}
      {filtered.length === 0 ? (
        <div className="text-center py-20">
          <p className="font-nohemi text-h3 text-neutral-soft-gray">No encontramos productos</p>
          <p className="text-body text-neutral-soft-gray mt-2">Intenta con otros filtros</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {filtered.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
