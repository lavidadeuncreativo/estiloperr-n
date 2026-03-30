'use client';
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useDataStore } from '@/lib/data/store';
import { formatPrice } from '@/lib/utils';
import { Search, Plus, Edit, Eye, EyeOff, Star, Sparkles } from 'lucide-react';

export default function AdminProductsPage() {
  const products = useDataStore(s => s.products.filter(p => !p.is_archived));
  const collections = useDataStore(s => s.collections);
  const getProductPrimaryImage = useDataStore(s => s.getProductPrimaryImage);
  const getProductVariants = useDataStore(s => s.getProductVariants);
  const updateProduct = useDataStore(s => s.updateProduct);
  const [search, setSearch] = useState('');
  const [filterCol, setFilterCol] = useState('all');

  const filtered = products.filter(p => {
    const matchSearch = p.title.toLowerCase().includes(search.toLowerCase()) || p.slug.includes(search.toLowerCase());
    const matchCol = filterCol === 'all' || p.collection_id === filterCol;
    return matchSearch && matchCol;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h1 className="font-nohemi text-h2 font-extrabold text-neutral-near-black">Productos</h1>
        <Link href="/admin/productos/nuevo" className="btn-pill-md btn-primary inline-flex items-center gap-2 shrink-0"><Plus size={18} /> Nuevo producto</Link>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3">
        <div className="flex items-center gap-2 bg-white border border-neutral-stone/40 rounded-pill px-4 py-2 flex-1 max-w-sm">
          <Search size={16} className="text-neutral-soft-gray" />
          <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="Buscar productos..." className="bg-transparent text-small w-full outline-none" />
        </div>
        <select value={filterCol} onChange={e => setFilterCol(e.target.value)} className="bg-white border border-neutral-stone/40 rounded-pill px-4 py-2 text-small">
          <option value="all">Todas las colecciones</option>
          {collections.map(c => <option key={c.id} value={c.id}>{c.title}</option>)}
        </select>
      </div>

      {/* Products Table */}
      <div className="admin-card p-0 overflow-hidden">
        <table className="admin-table">
          <thead><tr><th className="pl-6">Producto</th><th>Colección</th><th>Precio</th><th>Stock total</th><th>Estado</th><th>Acciones</th></tr></thead>
          <tbody>
            {filtered.map(product => {
              const variants = getProductVariants(product.id);
              const totalStock = variants.reduce((s, v) => s + v.stock, 0);
              const col = collections.find(c => c.id === product.collection_id);
              return (
                <tr key={product.id}>
                  <td className="pl-6">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-md-brand overflow-hidden bg-neutral-stone/20 relative shrink-0">
                        <Image src={getProductPrimaryImage(product.id)} alt={product.title} fill className="object-cover" sizes="48px" />
                      </div>
                      <div>
                        <p className="font-nohemi font-semibold text-small text-neutral-near-black line-clamp-1">{product.title}</p>
                        <div className="flex items-center gap-1.5 mt-0.5">
                          {product.is_new && <span className="text-caption text-brand-lime font-bold">NUEVO</span>}
                          {product.is_featured && <Star size={12} className="text-brand-sunset" />}
                          {product.personalization_enabled && <Sparkles size={12} className="text-brand-rose" />}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="text-neutral-soft-gray">{col?.title || '—'}</td>
                  <td className="font-semibold">{formatPrice(product.base_price)}{product.compare_at_price ? <span className="text-neutral-soft-gray line-through ml-1 font-normal text-caption">{formatPrice(product.compare_at_price)}</span> : null}</td>
                  <td>
                    <span className={`font-semibold ${totalStock <= 0 ? 'text-red-500' : totalStock <= 10 ? 'text-amber-500' : 'text-emerald-600'}`}>
                      {totalStock} uds.
                    </span>
                  </td>
                  <td>
                    <button onClick={() => updateProduct(product.id, { is_visible: !product.is_visible })} className={`badge ${product.is_visible ? 'bg-emerald-100 text-emerald-800' : 'bg-neutral-stone/30 text-neutral-soft-gray'}`}>
                      {product.is_visible ? 'Visible' : 'Oculto'}
                    </button>
                  </td>
                  <td>
                    <div className="flex items-center gap-1">
                      <Link href={`/admin/productos/${product.id}`} className="p-2 hover:bg-neutral-surface-gray rounded-lg transition-colors" title="Editar"><Edit size={16} /></Link>
                      <button onClick={() => updateProduct(product.id, { is_visible: !product.is_visible })} className="p-2 hover:bg-neutral-surface-gray rounded-lg transition-colors" title={product.is_visible ? 'Ocultar' : 'Mostrar'}>
                        {product.is_visible ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                      <button onClick={() => updateProduct(product.id, { is_featured: !product.is_featured })} className="p-2 hover:bg-neutral-surface-gray rounded-lg transition-colors" title={product.is_featured ? 'Quitar destacado' : 'Destacar'}>
                        <Star size={16} className={product.is_featured ? 'fill-brand-sunset text-brand-sunset' : ''} />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {filtered.length === 0 && (
          <div className="text-center py-12"><p className="text-body text-neutral-soft-gray">No se encontraron productos</p></div>
        )}
      </div>
      <p className="text-meta text-neutral-soft-gray">{filtered.length} de {products.length} productos</p>
    </div>
  );
}
