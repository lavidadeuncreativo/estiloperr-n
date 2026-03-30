'use client';
import { useState } from 'react';
import { useDataStore } from '@/lib/data/store';
import { Eye, EyeOff, ChevronUp, ChevronDown, Save, GripVertical } from 'lucide-react';

export default function AdminHomepagePage() {
  const blocks = useDataStore(s => s.homepageBlocks);
  const updateHomepageBlock = useDataStore(s => s.updateHomepageBlock);
  const [editing, setEditing] = useState<string | null>(null);
  const [saved, setSaved] = useState<string | null>(null);

  const sorted = [...blocks].sort((a, b) => a.position - b.position);

  const moveBlock = (id: string, direction: 'up' | 'down') => {
    const idx = sorted.findIndex(b => b.id === id);
    const swapIdx = direction === 'up' ? idx - 1 : idx + 1;
    if (swapIdx < 0 || swapIdx >= sorted.length) return;
    updateHomepageBlock(sorted[idx].id, { position: sorted[swapIdx].position });
    updateHomepageBlock(sorted[swapIdx].id, { position: sorted[idx].position });
  };

  const handleSave = (id: string, data: Record<string, unknown>) => {
    updateHomepageBlock(id, data);
    setSaved(id);
    setTimeout(() => setSaved(null), 1500);
  };

  const typeLabels: Record<string, string> = {
    promo_strip: '📢 Barra promocional',
    hero: '🦸 Hero principal',
    trust_strip: '✅ Barra de confianza',
    product_mosaic: '🎨 Mosaico de productos',
    campaign: '🎯 Campaña',
    featured_products: '⭐ Productos destacados',
    dog_registration_cta: '🐾 CTA registro perrhijo',
    custom: '📝 Personalizado',
  };

  const themeColors: Record<string, string> = {
    blue: 'bg-brand-sky-blue', pink: 'bg-brand-blush', red: 'bg-brand-rose',
    lime: 'bg-brand-lime', stone: 'bg-neutral-stone', white: 'bg-white border',
    aqua: 'bg-brand-aqua', sunset: 'bg-brand-sunset',
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-nohemi text-h2 font-extrabold text-neutral-near-black">Homepage</h1>
        <p className="text-body text-neutral-soft-gray mt-1">Gestiona las secciones de tu página principal. Los cambios se reflejan inmediatamente en la tienda.</p>
      </div>

      <div className="space-y-3">
        {sorted.map((block, idx) => (
          <div key={block.id} className="admin-card">
            <div className="flex items-center gap-3">
              <GripVertical size={18} className="text-neutral-stone cursor-grab shrink-0" />

              <div className="flex items-center gap-2 flex-1 min-w-0">
                {block.theme && <span className={`w-4 h-4 rounded-full ${themeColors[block.theme] || 'bg-neutral-stone'} shrink-0`} />}
                <span className="font-nohemi font-semibold text-body truncate">{typeLabels[block.block_type] || block.block_type}</span>
                <span className="text-caption text-neutral-soft-gray">#{block.position}</span>
              </div>

              <div className="flex items-center gap-1 shrink-0">
                <button onClick={() => moveBlock(block.id, 'up')} disabled={idx === 0} className="p-1.5 hover:bg-neutral-surface-gray rounded disabled:opacity-30"><ChevronUp size={16} /></button>
                <button onClick={() => moveBlock(block.id, 'down')} disabled={idx === sorted.length - 1} className="p-1.5 hover:bg-neutral-surface-gray rounded disabled:opacity-30"><ChevronDown size={16} /></button>
                <button onClick={() => updateHomepageBlock(block.id, { is_visible: !block.is_visible })} className={`p-1.5 rounded transition-colors ${block.is_visible ? 'text-emerald-600 hover:bg-emerald-50' : 'text-red-400 hover:bg-red-50'}`}>
                  {block.is_visible ? <Eye size={16} /> : <EyeOff size={16} />}
                </button>
                <button onClick={() => setEditing(editing === block.id ? null : block.id)} className="btn-pill-sm bg-neutral-surface-gray text-neutral-charcoal hover:bg-neutral-stone/30 text-caption">
                  Editar
                </button>
              </div>
            </div>

            {/* Inline Edit Panel */}
            {editing === block.id && (
              <div className="mt-4 pt-4 border-t border-neutral-stone/20 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div><label className="text-meta font-medium mb-1.5 block">Título</label><input type="text" defaultValue={block.title || ''} id={`title-${block.id}`} className="w-full rounded-pill border border-neutral-stone/40 px-4 py-2.5 text-small focus:outline-none focus:ring-2 focus:ring-brand-rose/30" /></div>
                  <div><label className="text-meta font-medium mb-1.5 block">Subtítulo</label><input type="text" defaultValue={block.subtitle || ''} id={`subtitle-${block.id}`} className="w-full rounded-pill border border-neutral-stone/40 px-4 py-2.5 text-small focus:outline-none focus:ring-2 focus:ring-brand-rose/30" /></div>
                  <div><label className="text-meta font-medium mb-1.5 block">CTA texto</label><input type="text" defaultValue={block.cta_text || ''} id={`cta-${block.id}`} className="w-full rounded-pill border border-neutral-stone/40 px-4 py-2.5 text-small focus:outline-none focus:ring-2 focus:ring-brand-rose/30" /></div>
                  <div><label className="text-meta font-medium mb-1.5 block">CTA URL</label><input type="text" defaultValue={block.cta_url || ''} id={`ctaurl-${block.id}`} className="w-full rounded-pill border border-neutral-stone/40 px-4 py-2.5 text-small focus:outline-none focus:ring-2 focus:ring-brand-rose/30" /></div>
                  <div><label className="text-meta font-medium mb-1.5 block">Color de fondo</label><input type="text" defaultValue={block.bg_color || ''} id={`bg-${block.id}`} className="w-full rounded-pill border border-neutral-stone/40 px-4 py-2.5 text-small focus:outline-none focus:ring-2 focus:ring-brand-rose/30" placeholder="#EC1763" /></div>
                  <div><label className="text-meta font-medium mb-1.5 block">URL imagen</label><input type="text" defaultValue={block.image_url || ''} id={`img-${block.id}`} className="w-full rounded-pill border border-neutral-stone/40 px-4 py-2.5 text-small focus:outline-none focus:ring-2 focus:ring-brand-rose/30" /></div>
                </div>
                <button
                  onClick={() => {
                    const title = (document.getElementById(`title-${block.id}`) as HTMLInputElement)?.value;
                    const subtitle = (document.getElementById(`subtitle-${block.id}`) as HTMLInputElement)?.value;
                    const cta_text = (document.getElementById(`cta-${block.id}`) as HTMLInputElement)?.value;
                    const cta_url = (document.getElementById(`ctaurl-${block.id}`) as HTMLInputElement)?.value;
                    const bg_color = (document.getElementById(`bg-${block.id}`) as HTMLInputElement)?.value;
                    const image_url = (document.getElementById(`img-${block.id}`) as HTMLInputElement)?.value;
                    handleSave(block.id, { title, subtitle, cta_text, cta_url, bg_color, image_url });
                  }}
                  className={`btn-pill-md ${saved === block.id ? 'bg-emerald-500 text-white' : 'btn-primary'}`}
                >
                  <Save size={16} /> {saved === block.id ? '¡Guardado!' : 'Guardar cambios'}
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
