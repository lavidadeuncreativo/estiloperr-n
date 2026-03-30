'use client';
import Image from 'next/image';
import { useDataStore } from '@/lib/data/store';
import { formatPrice, getStockStatus } from '@/lib/utils';
import { Search, Minus } from 'lucide-react';
import { useState } from 'react';

export default function AdminInventoryPage() {
  const products = useDataStore(s => s.products.filter(p => !p.is_archived));
  const variants = useDataStore(s => s.productVariants);
  const getProductPrimaryImage = useDataStore(s => s.getProductPrimaryImage);
  const updateVariant = useDataStore(s => s.updateVariant);
  const [search, setSearch] = useState('');

  const allVariants = variants.map(v => {
    const product = products.find(p => p.id === v.product_id);
    return { ...v, product };
  }).filter(v => v.product && (!search || v.product!.title.toLowerCase().includes(search.toLowerCase()) || v.sku.toLowerCase().includes(search.toLowerCase())));

  const totalStock = allVariants.reduce((s, v) => s + v.stock, 0);
  const lowCount = allVariants.filter(v => v.stock > 0 && v.stock <= v.low_stock_threshold).length;
  const outCount = allVariants.filter(v => v.stock <= 0).length;

  return (
    <div className="space-y-6">
      <h1 className="font-nohemi text-h2 font-extrabold text-neutral-near-black">Inventario</h1>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="admin-stat-card"><span className="text-meta text-neutral-soft-gray">Stock total</span><span className="font-nohemi text-h3 font-bold text-neutral-near-black">{totalStock} uds.</span></div>
        <div className="admin-stat-card border-l-4 border-l-amber-400"><span className="text-meta text-neutral-soft-gray">Stock bajo</span><span className="font-nohemi text-h3 font-bold text-amber-500">{lowCount}</span></div>
        <div className="admin-stat-card border-l-4 border-l-red-400"><span className="text-meta text-neutral-soft-gray">Agotados</span><span className="font-nohemi text-h3 font-bold text-red-500">{outCount}</span></div>
      </div>

      <div className="flex items-center gap-2 bg-white border border-neutral-stone/40 rounded-pill px-4 py-2 max-w-sm">
        <Search size={16} className="text-neutral-soft-gray" />
        <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="Buscar por producto o SKU..." className="bg-transparent text-small w-full outline-none" />
      </div>

      <div className="admin-card p-0 overflow-hidden overflow-x-auto">
        <table className="admin-table">
          <thead><tr><th className="pl-6">Producto</th><th>SKU</th><th>Talla</th><th>Costo</th><th>Precio</th><th>Stock</th><th>Semáforo</th><th>Ajustar</th></tr></thead>
          <tbody>
            {allVariants.map(v => {
              const status = getStockStatus(v.stock, v.low_stock_threshold);
              return (
                <tr key={v.id}>
                  <td className="pl-6">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded overflow-hidden relative shrink-0 bg-neutral-stone/20">
                        {v.product && <Image src={getProductPrimaryImage(v.product.id)} alt="" fill className="object-cover" sizes="32px" />}
                      </div>
                      <span className="text-small font-medium truncate max-w-[150px]">{v.product?.title}</span>
                    </div>
                  </td>
                  <td className="font-mono text-caption text-neutral-soft-gray">{v.sku}</td>
                  <td className="font-nohemi font-bold">{v.size}</td>
                  <td className="text-neutral-soft-gray">{v.cost ? formatPrice(v.cost) : '—'}</td>
                  <td className="font-semibold">{formatPrice(v.price)}</td>
                  <td className="font-bold">{v.stock}</td>
                  <td>
                    <span className={`inline-flex items-center gap-1.5 ${status === 'ok' ? 'stock-ok' : status === 'low' ? 'stock-low' : 'stock-out'}`}>
                      <span className={`w-2.5 h-2.5 rounded-full ${status === 'ok' ? 'bg-emerald-500' : status === 'low' ? 'bg-amber-400' : 'bg-red-500'}`} />
                      {status === 'ok' ? 'OK' : status === 'low' ? 'Bajo' : 'Agotado'}
                    </span>
                  </td>
                  <td>
                    <div className="flex items-center gap-1">
                      <button onClick={() => updateVariant(v.id, { stock: Math.max(0, v.stock - 1) })} className="p-1.5 hover:bg-red-50 rounded transition-colors"><Minus size={14} /></button>
                      <button onClick={() => updateVariant(v.id, { stock: v.stock + 5 })} className="p-1.5 hover:bg-emerald-50 rounded transition-colors text-caption font-bold text-emerald-600">+5</button>
                      <button onClick={() => updateVariant(v.id, { stock: v.stock + 10 })} className="p-1.5 hover:bg-emerald-50 rounded transition-colors text-caption font-bold text-emerald-600">+10</button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
