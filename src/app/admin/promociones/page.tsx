'use client';
import { useState } from 'react';
import { useDataStore } from '@/lib/data/store';
import { formatPrice, generateId } from '@/lib/utils';
import { Plus, Save, Percent, Truck, DollarSign } from 'lucide-react';

export default function AdminPromotionsPage() {
  const promotions = useDataStore(s => s.promotions);
  const coupons = useDataStore(s => s.coupons);
  const updatePromotion = useDataStore(s => s.updatePromotion);
  const addPromotion = useDataStore(s => s.addPromotion);
  const addCoupon = useDataStore(s => s.addCoupon);
  const [adding, setAdding] = useState(false);
  const [form, setForm] = useState({ title: '', type: 'percentage' as const, value: 10 });

  const handleAdd = () => {
    if (!form.title.trim()) return;
    const promoId = generateId();
    addPromotion({ id: promoId, title: form.title, type: form.type, value: form.value, is_active: true, is_featured: false, applies_to: 'all', usage_count: 0, created_at: new Date().toISOString(), updated_at: new Date().toISOString() });
    const code = form.title.toUpperCase().replace(/\s+/g, '').slice(0, 10);
    addCoupon({ id: generateId(), code, promotion_id: promoId, is_active: true, usage_limit: 100, usage_count: 0, created_at: new Date().toISOString() });
    setForm({ title: '', type: 'percentage', value: 10 }); setAdding(false);
  };

  const typeIcons = { percentage: <Percent size={16} />, fixed_amount: <DollarSign size={16} />, free_shipping: <Truck size={16} /> };
  const typeLabels = { percentage: 'Porcentaje', fixed_amount: 'Monto fijo', free_shipping: 'Envío gratis' };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="font-nohemi text-h2 font-extrabold text-neutral-near-black">Promociones</h1>
        <button onClick={() => setAdding(!adding)} className="btn-pill-md btn-primary"><Plus size={18} /> Nueva</button>
      </div>

      {adding && (
        <div className="admin-card space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div><label className="text-meta font-medium mb-1.5 block">Nombre</label><input type="text" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} placeholder="Ej: Verano 20%" className="w-full rounded-pill border border-neutral-stone/40 px-4 py-3 text-small focus:outline-none focus:ring-2 focus:ring-brand-rose/30" /></div>
            <div><label className="text-meta font-medium mb-1.5 block">Tipo</label><select value={form.type} onChange={e => setForm({ ...form, type: e.target.value as typeof form.type })} className="w-full rounded-pill border border-neutral-stone/40 px-4 py-3 text-small"><option value="percentage">Porcentaje</option><option value="fixed_amount">Monto fijo</option><option value="free_shipping">Envío gratis</option></select></div>
            <div><label className="text-meta font-medium mb-1.5 block">Valor</label><input type="number" value={form.value} onChange={e => setForm({ ...form, value: Number(e.target.value) })} className="w-full rounded-pill border border-neutral-stone/40 px-4 py-3 text-small focus:outline-none focus:ring-2 focus:ring-brand-rose/30" /></div>
          </div>
          <button onClick={handleAdd} className="btn-pill-md btn-primary"><Save size={16} /> Crear promoción</button>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {promotions.map(promo => {
          const promoCoupons = coupons.filter(c => c.promotion_id === promo.id);
          return (
            <div key={promo.id} className="admin-card">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="p-2 bg-brand-rose/10 rounded-lg text-brand-rose">{typeIcons[promo.type]}</div>
                  <h3 className="font-nohemi font-bold text-body">{promo.title}</h3>
                </div>
                <button onClick={() => updatePromotion(promo.id, { is_active: !promo.is_active })} className={`badge ${promo.is_active ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'}`}>
                  {promo.is_active ? 'Activa' : 'Inactiva'}
                </button>
              </div>
              <p className="text-small text-neutral-soft-gray">{promo.description}</p>
              <div className="mt-3 space-y-1.5 text-small">
                <div className="flex justify-between"><span className="text-neutral-soft-gray">Tipo</span><span className="font-medium">{typeLabels[promo.type]}</span></div>
                <div className="flex justify-between"><span className="text-neutral-soft-gray">Valor</span><span className="font-nohemi font-bold text-brand-rose">{promo.type === 'percentage' ? `${promo.value}%` : promo.type === 'fixed_amount' ? formatPrice(promo.value) : 'Gratis'}</span></div>
                <div className="flex justify-between"><span className="text-neutral-soft-gray">Usos</span><span>{promo.usage_count}</span></div>
              </div>
              {promoCoupons.length > 0 && (
                <div className="mt-3 pt-3 border-t border-neutral-stone/20">
                  <p className="text-meta text-neutral-soft-gray mb-1.5">Cupones:</p>
                  <div className="flex flex-wrap gap-2">
                    {promoCoupons.map(c => <span key={c.id} className="badge bg-neutral-surface-gray text-neutral-charcoal font-mono">{c.code}</span>)}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
