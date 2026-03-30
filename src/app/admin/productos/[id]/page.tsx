'use client';
import { useState } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import { useDataStore } from '@/lib/data/store';

import { ArrowLeft, Save, Plus, Minus } from 'lucide-react';
import Link from 'next/link';

export default function AdminProductEditPage() {
  const { id } = useParams<{ id: string }>();
  
  const product = useDataStore(s => s.getProductById(id));
  const variants = useDataStore(s => s.getProductVariants(id));
  const images = useDataStore(s => s.getProductImages(id));
  const collections = useDataStore(s => s.collections);
  const categories = useDataStore(s => s.categories);
  const updateProduct = useDataStore(s => s.updateProduct);
  const updateVariant = useDataStore(s => s.updateVariant);

  const [form, setForm] = useState(product ? { ...product } : null);
  const [saved, setSaved] = useState(false);

  if (!form || !product) return <div className="text-center py-20"><p className="font-nohemi text-h3">Producto no encontrado</p><Link href="/admin/productos" className="text-brand-rose hover:underline mt-2 block">← Volver</Link></div>;

  const handleSave = () => {
    updateProduct(id, form);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href="/admin/productos" className="p-2 hover:bg-neutral-surface-gray rounded-lg"><ArrowLeft size={20} /></Link>
          <h1 className="font-nohemi text-h2 font-extrabold text-neutral-near-black">Editar producto</h1>
        </div>
        <button onClick={handleSave} className={`btn-pill-md ${saved ? 'bg-emerald-500 text-white' : 'btn-primary'}`}>
          <Save size={16} /> {saved ? '¡Guardado!' : 'Guardar'}
        </button>
      </div>

      {/* Basic Info */}
      <div className="admin-card">
        <h2 className="font-nohemi font-bold text-h4 mb-4">Información básica</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-2"><label className="text-meta font-medium mb-1.5 block">Título</label><input type="text" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} className="w-full rounded-pill border border-neutral-stone/40 px-4 py-3 text-small focus:outline-none focus:ring-2 focus:ring-brand-rose/30" /></div>
          <div className="md:col-span-2"><label className="text-meta font-medium mb-1.5 block">Descripción</label><textarea value={form.description || ''} onChange={e => setForm({ ...form, description: e.target.value })} rows={4} className="w-full rounded-lg-brand border border-neutral-stone/40 px-4 py-3 text-small focus:outline-none focus:ring-2 focus:ring-brand-rose/30 resize-none" /></div>
          <div><label className="text-meta font-medium mb-1.5 block">Colección</label><select value={form.collection_id || ''} onChange={e => setForm({ ...form, collection_id: e.target.value })} className="w-full rounded-pill border border-neutral-stone/40 px-4 py-3 text-small"><option value="">Sin colección</option>{collections.map(c => <option key={c.id} value={c.id}>{c.title}</option>)}</select></div>
          <div><label className="text-meta font-medium mb-1.5 block">Categoría</label><select value={form.category_id || ''} onChange={e => setForm({ ...form, category_id: e.target.value })} className="w-full rounded-pill border border-neutral-stone/40 px-4 py-3 text-small"><option value="">Sin categoría</option>{categories.map(c => <option key={c.id} value={c.id}>{c.title}</option>)}</select></div>
        </div>
      </div>

      {/* Pricing */}
      <div className="admin-card">
        <h2 className="font-nohemi font-bold text-h4 mb-4">Precios</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div><label className="text-meta font-medium mb-1.5 block">Precio base</label><input type="number" value={form.base_price} onChange={e => setForm({ ...form, base_price: Number(e.target.value) })} className="w-full rounded-pill border border-neutral-stone/40 px-4 py-3 text-small focus:outline-none focus:ring-2 focus:ring-brand-rose/30" /></div>
          <div><label className="text-meta font-medium mb-1.5 block">Precio comparativo</label><input type="number" value={form.compare_at_price || ''} onChange={e => setForm({ ...form, compare_at_price: Number(e.target.value) || undefined })} className="w-full rounded-pill border border-neutral-stone/40 px-4 py-3 text-small focus:outline-none focus:ring-2 focus:ring-brand-rose/30" /></div>
          <div><label className="text-meta font-medium mb-1.5 block">Costo</label><input type="number" value={form.cost || ''} onChange={e => setForm({ ...form, cost: Number(e.target.value) || undefined })} className="w-full rounded-pill border border-neutral-stone/40 px-4 py-3 text-small focus:outline-none focus:ring-2 focus:ring-brand-rose/30" /></div>
        </div>
      </div>

      {/* Flags */}
      <div className="admin-card">
        <h2 className="font-nohemi font-bold text-h4 mb-4">Opciones</h2>
        <div className="flex flex-wrap gap-3">
          {[
            { key: 'is_visible', label: 'Visible' },
            { key: 'is_featured', label: 'Destacado' },
            { key: 'is_new', label: 'Nuevo' },
            { key: 'is_favorite', label: 'Favorito' },
            { key: 'personalization_enabled', label: 'Personalizable' },
          ].map(flag => (
            <button key={flag.key} onClick={() => setForm({ ...form, [flag.key]: !form[flag.key as keyof typeof form] })}
              className={`btn-pill-sm ${form[flag.key as keyof typeof form] ? 'bg-brand-rose text-white' : 'bg-neutral-surface-gray text-neutral-charcoal'} transition-all`}
            >
              {flag.label}
            </button>
          ))}
        </div>
      </div>

      {/* Variants */}
      <div className="admin-card">
        <h2 className="font-nohemi font-bold text-h4 mb-4">Variantes ({variants.length})</h2>
        <table className="admin-table">
          <thead><tr><th>SKU</th><th>Talla</th><th>Precio</th><th>Stock</th><th>Activo</th></tr></thead>
          <tbody>
            {variants.map(v => (
              <tr key={v.id}>
                <td className="font-mono text-caption">{v.sku}</td>
                <td><span className="font-nohemi font-bold">{v.size}</span></td>
                <td>
                  <input type="number" value={v.price} onChange={e => updateVariant(v.id, { price: Number(e.target.value) })}
                    className="w-24 rounded-pill border border-neutral-stone/40 px-3 py-1.5 text-small focus:outline-none focus:ring-2 focus:ring-brand-rose/30" />
                </td>
                <td>
                  <div className="flex items-center gap-1">
                    <button onClick={() => updateVariant(v.id, { stock: Math.max(0, v.stock - 1) })} className="p-1 hover:bg-neutral-surface-gray rounded"><Minus size={14} /></button>
                    <span className={`w-10 text-center font-semibold ${v.stock <= 0 ? 'text-red-500' : v.stock <= v.low_stock_threshold ? 'text-amber-500' : 'text-emerald-600'}`}>{v.stock}</span>
                    <button onClick={() => updateVariant(v.id, { stock: v.stock + 1 })} className="p-1 hover:bg-neutral-surface-gray rounded"><Plus size={14} /></button>
                  </div>
                </td>
                <td>
                  <button onClick={() => updateVariant(v.id, { is_active: !v.is_active })}
                    className={`badge ${v.is_active ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'}`}>
                    {v.is_active ? 'Activo' : 'Inactivo'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Images */}
      <div className="admin-card">
        <h2 className="font-nohemi font-bold text-h4 mb-4">Imágenes ({images.length})</h2>
        <div className="grid grid-cols-3 md:grid-cols-5 gap-3">
          {images.map(img => (
            <div key={img.id} className={`relative aspect-square rounded-lg-brand overflow-hidden border-2 ${img.is_primary ? 'border-brand-rose' : 'border-transparent'}`}>
              <Image src={img.url} alt={img.alt_text || ''} fill className="object-cover" sizes="150px" />
              {img.is_primary && <span className="absolute top-1 left-1 badge-sale text-[10px]">Principal</span>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
