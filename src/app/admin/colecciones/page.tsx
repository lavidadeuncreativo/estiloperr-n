'use client';
import { useState } from 'react';
import Image from 'next/image';
import { useDataStore } from '@/lib/data/store';
import { generateId, slugify } from '@/lib/utils';
import { Plus, Eye, EyeOff, Save } from 'lucide-react';

export default function AdminCollectionsPage() {
  const collections = useDataStore(s => s.collections);
  const products = useDataStore(s => s.products);
  const updateCollection = useDataStore(s => s.updateCollection);
  const addCollection = useDataStore(s => s.addCollection);
  const [adding, setAdding] = useState(false);
  const [newTitle, setNewTitle] = useState('');

  const handleAdd = () => {
    if (!newTitle.trim()) return;
    addCollection({ id: generateId(), title: newTitle, slug: slugify(newTitle), display_priority: collections.length + 1, is_visible: true, created_at: new Date().toISOString(), updated_at: new Date().toISOString() });
    setNewTitle(''); setAdding(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="font-nohemi text-h2 font-extrabold text-neutral-near-black">Colecciones</h1>
        <button onClick={() => setAdding(!adding)} className="btn-pill-md btn-primary"><Plus size={18} /> Nueva</button>
      </div>
      {adding && (
        <div className="admin-card flex gap-3 items-end">
          <div className="flex-1"><label className="text-meta font-medium mb-1.5 block">Nombre de la colección</label><input type="text" value={newTitle} onChange={e => setNewTitle(e.target.value)} placeholder="Ej: Primavera 2026" className="w-full rounded-pill border border-neutral-stone/40 px-4 py-3 text-small focus:outline-none focus:ring-2 focus:ring-brand-rose/30" autoFocus /></div>
          <button onClick={handleAdd} className="btn-pill-md btn-primary shrink-0"><Save size={16} /> Crear</button>
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {collections.map(col => {
          const count = products.filter(p => p.collection_id === col.id && !p.is_archived).length;
          return (
            <div key={col.id} className="admin-card group">
              {col.image_url && <div className="relative aspect-video rounded-md-brand overflow-hidden mb-4 bg-neutral-stone/20"><Image src={col.image_url} alt={col.title} fill className="object-cover" sizes="400px" /></div>}
              <h3 className="font-nohemi font-bold text-h4">{col.title}</h3>
              <p className="text-small text-neutral-soft-gray mt-1">{count} productos • /{col.slug}</p>
              <div className="flex gap-2 mt-3">
                <button onClick={() => updateCollection(col.id, { is_visible: !col.is_visible })} className={`btn-pill-sm ${col.is_visible ? 'bg-emerald-100 text-emerald-800' : 'bg-neutral-stone/30 text-neutral-soft-gray'}`}>
                  {col.is_visible ? <><Eye size={14} /> Visible</> : <><EyeOff size={14} /> Oculta</>}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
