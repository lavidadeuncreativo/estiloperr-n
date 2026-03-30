'use client';
import { useState } from 'react';
import { useDataStore } from '@/lib/data/store';
import { generateId, slugify } from '@/lib/utils';
import { Save, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function AdminNewProductPage() {
  const collections = useDataStore(s => s.collections);
  const categories = useDataStore(s => s.categories);
  const addProduct = useDataStore(s => s.addProduct);
  const addVariant = useDataStore(s => s.addVariant);
  const router = useRouter();

  const [form, setForm] = useState({ title: '', description: '', collection_id: '', category_id: '', base_price: 0, cost: 0 });

  const handleCreate = () => {
    if (!form.title.trim()) return;
    const id = generateId();
    const slug = slugify(form.title);
    addProduct({
      id, title: form.title, slug, description: form.description,
      collection_id: form.collection_id || undefined, category_id: form.category_id || undefined,
      base_price: form.base_price, cost: form.cost,
      is_featured: false, is_new: true, is_favorite: false, is_visible: true, is_archived: false,
      personalization_enabled: false, personalization_cost: 0, personalization_extra_days: 0,
      tags: [], display_priority: 0, created_at: new Date().toISOString(), updated_at: new Date().toISOString(),
    });
    // Create default variants
    ['XS', 'S', 'M', 'L', 'XL'].forEach((size, i) => {
      addVariant({
        id: generateId(), product_id: id, sku: `EP-${slug.toUpperCase().slice(0, 6)}-${size}`,
        size: size as 'XS' | 'S' | 'M' | 'L' | 'XL', price: form.base_price, cost: form.cost,
        stock: 10, low_stock_threshold: 5, is_active: true, position: i,
        created_at: new Date().toISOString(), updated_at: new Date().toISOString(),
      });
    });
    router.push('/admin/productos');
  };

  return (
    <div className="space-y-6 max-w-3xl">
      <div className="flex items-center gap-3">
        <Link href="/admin/productos" className="p-2 hover:bg-neutral-surface-gray rounded-lg"><ArrowLeft size={20} /></Link>
        <h1 className="font-nohemi text-h2 font-extrabold text-neutral-near-black">Nuevo producto</h1>
      </div>
      <div className="admin-card space-y-4">
        <div><label className="text-meta font-medium mb-1.5 block">Título*</label><input type="text" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} placeholder="Nombre del producto" className="w-full rounded-pill border border-neutral-stone/40 px-4 py-3 text-small focus:outline-none focus:ring-2 focus:ring-brand-rose/30" /></div>
        <div><label className="text-meta font-medium mb-1.5 block">Descripción</label><textarea value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} rows={3} placeholder="Describe el producto..." className="w-full rounded-lg-brand border border-neutral-stone/40 px-4 py-3 text-small focus:outline-none focus:ring-2 focus:ring-brand-rose/30 resize-none" /></div>
        <div className="grid grid-cols-2 gap-4">
          <div><label className="text-meta font-medium mb-1.5 block">Colección</label><select value={form.collection_id} onChange={e => setForm({ ...form, collection_id: e.target.value })} className="w-full rounded-pill border border-neutral-stone/40 px-4 py-3 text-small"><option value="">Sin colección</option>{collections.map(c => <option key={c.id} value={c.id}>{c.title}</option>)}</select></div>
          <div><label className="text-meta font-medium mb-1.5 block">Categoría</label><select value={form.category_id} onChange={e => setForm({ ...form, category_id: e.target.value })} className="w-full rounded-pill border border-neutral-stone/40 px-4 py-3 text-small"><option value="">Sin categoría</option>{categories.map(c => <option key={c.id} value={c.id}>{c.title}</option>)}</select></div>
          <div><label className="text-meta font-medium mb-1.5 block">Precio</label><input type="number" value={form.base_price} onChange={e => setForm({ ...form, base_price: Number(e.target.value) })} className="w-full rounded-pill border border-neutral-stone/40 px-4 py-3 text-small focus:outline-none focus:ring-2 focus:ring-brand-rose/30" /></div>
          <div><label className="text-meta font-medium mb-1.5 block">Costo</label><input type="number" value={form.cost} onChange={e => setForm({ ...form, cost: Number(e.target.value) })} className="w-full rounded-pill border border-neutral-stone/40 px-4 py-3 text-small focus:outline-none focus:ring-2 focus:ring-brand-rose/30" /></div>
        </div>
        <p className="text-caption text-neutral-soft-gray">Se crearán automáticamente variantes XS–XL con 10 unidades de stock cada una.</p>
        <button onClick={handleCreate} disabled={!form.title.trim()} className="btn-pill-lg btn-primary disabled:opacity-50"><Save size={18} /> Crear producto</button>
      </div>
    </div>
  );
}
