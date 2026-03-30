'use client';
import { useState } from 'react';
import { useDataStore } from '@/lib/data/store';
import { generateId, slugify } from '@/lib/utils';
import { Plus, Save } from 'lucide-react';

export default function AdminCategoriesPage() {
  const categories = useDataStore(s => s.categories);
  const products = useDataStore(s => s.products);
  const updateCategory = useDataStore(s => s.updateCategory);
  const addCategory = useDataStore(s => s.addCategory);
  const [adding, setAdding] = useState(false);
  const [newTitle, setNewTitle] = useState('');

  const handleAdd = () => {
    if (!newTitle.trim()) return;
    addCategory({ id: generateId(), title: newTitle, slug: slugify(newTitle), display_priority: categories.length + 1, is_visible: true, created_at: new Date().toISOString(), updated_at: new Date().toISOString() });
    setNewTitle(''); setAdding(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="font-nohemi text-h2 font-extrabold text-neutral-near-black">Categorías</h1>
        <button onClick={() => setAdding(!adding)} className="btn-pill-md btn-primary"><Plus size={18} /> Nueva</button>
      </div>
      {adding && (
        <div className="admin-card flex gap-3 items-end">
          <div className="flex-1"><label className="text-meta font-medium mb-1.5 block">Nombre</label><input type="text" value={newTitle} onChange={e => setNewTitle(e.target.value)} placeholder="Ej: Rompevientos" className="w-full rounded-pill border border-neutral-stone/40 px-4 py-3 text-small focus:outline-none focus:ring-2 focus:ring-brand-rose/30" autoFocus /></div>
          <button onClick={handleAdd} className="btn-pill-md btn-primary shrink-0"><Save size={16} /> Crear</button>
        </div>
      )}
      <div className="admin-card p-0 overflow-hidden">
        <table className="admin-table">
          <thead><tr><th className="pl-6">Categoría</th><th>Slug</th><th>Productos</th><th>Prioridad</th><th>Estado</th></tr></thead>
          <tbody>
            {categories.map(cat => (
              <tr key={cat.id}>
                <td className="pl-6 font-nohemi font-semibold">{cat.title}</td>
                <td className="text-neutral-soft-gray font-mono text-caption">/{cat.slug}</td>
                <td>{products.filter(p => p.category_id === cat.id && !p.is_archived).length}</td>
                <td>{cat.display_priority}</td>
                <td><button onClick={() => updateCategory(cat.id, { is_visible: !cat.is_visible })} className={`badge ${cat.is_visible ? 'bg-emerald-100 text-emerald-800' : 'bg-neutral-stone/30 text-neutral-soft-gray'}`}>{cat.is_visible ? 'Visible' : 'Oculta'}</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
