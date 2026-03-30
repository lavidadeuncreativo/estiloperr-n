'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useCartStore } from '@/lib/data/store';
import { formatPrice } from '@/lib/utils';
import { Minus, Plus, X, ArrowRight, ArrowLeft, ShoppingBag } from 'lucide-react';

export default function CarritoPage() {
  const { items, removeItem, updateQuantity, getSubtotal, getShippingCost, getTotal, getItemCount } = useCartStore();

  if (items.length === 0) {
    return (
      <div className="section-container py-20 text-center">
        <ShoppingBag size={56} className="mx-auto text-neutral-stone mb-4" />
        <h1 className="font-nohemi text-h1 font-extrabold text-neutral-near-black">Tu carrito está vacío</h1>
        <p className="text-body-lg text-neutral-soft-gray mt-2">Explora nuestra tienda y encuentra algo perrón.</p>
        <Link href="/tienda" className="btn-pill-lg btn-primary mt-8 inline-flex items-center gap-2">Ir a la tienda <ArrowRight size={18} /></Link>
      </div>
    );
  }

  return (
    <div className="section-container py-8 md:py-12">
      <h1 className="font-nohemi text-h1 font-extrabold text-neutral-near-black mb-8">Tu carrito ({getItemCount()})</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-12">
        <div className="lg:col-span-2 space-y-4">
          {items.map(item => (
            <div key={item.variant_id} className="flex gap-4 md:gap-6 p-4 md:p-5 bg-white rounded-xl-brand shadow-soft">
              <div className="relative w-24 h-24 md:w-32 md:h-32 rounded-lg-brand overflow-hidden bg-neutral-stone/20 shrink-0">
                {item.image_url && <Image src={item.image_url} alt={item.product_title} fill className="object-cover" sizes="128px" />}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start">
                  <div>
                    <Link href={`/producto/${item.product_slug}`} className="font-nohemi font-bold text-body hover:text-brand-rose transition-colors">{item.product_title}</Link>
                    <p className="text-small text-neutral-soft-gray mt-0.5">Talla: {item.variant_size} • SKU: {item.variant_sku}</p>
                    {item.personalization && <p className="text-small text-brand-rose mt-0.5">✨ {item.personalization.data.text} (+{formatPrice(item.personalization.cost)})</p>}
                  </div>
                  <button onClick={() => removeItem(item.variant_id)} className="p-1.5 text-neutral-soft-gray hover:text-brand-rose transition-colors" aria-label="Eliminar"><X size={18} /></button>
                </div>
                <div className="flex items-center justify-between mt-4">
                  <div className="flex items-center gap-1 border border-neutral-stone/40 rounded-pill">
                    <button onClick={() => updateQuantity(item.variant_id, item.quantity - 1)} className="p-2 hover:bg-neutral-stone/20 rounded-full transition-colors"><Minus size={14} /></button>
                    <span className="font-medium w-8 text-center text-small">{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.variant_id, item.quantity + 1)} className="p-2 hover:bg-neutral-stone/20 rounded-full transition-colors"><Plus size={14} /></button>
                  </div>
                  <span className="font-nohemi font-bold text-body-lg">{formatPrice(item.unit_price * item.quantity)}</span>
                </div>
              </div>
            </div>
          ))}
          <Link href="/tienda" className="inline-flex items-center gap-1.5 text-small text-neutral-soft-gray hover:text-brand-rose transition-colors mt-4"><ArrowLeft size={14} /> Seguir comprando</Link>
        </div>

        <div className="admin-card h-fit sticky top-28">
          <h2 className="font-nohemi font-bold text-h4 mb-6">Resumen</h2>
          <div className="space-y-3">
            <div className="flex justify-between text-small"><span className="text-neutral-soft-gray">Subtotal</span><span>{formatPrice(getSubtotal())}</span></div>
            <div className="flex justify-between text-small"><span className="text-neutral-soft-gray">Envío</span><span>{getShippingCost() === 0 ? 'Gratis 🎉' : formatPrice(getShippingCost())}</span></div>
            {getShippingCost() > 0 && <p className="text-caption text-brand-rose">¡Te faltan {formatPrice(999 - getSubtotal())} para envío gratis!</p>}
          </div>
          <div className="flex justify-between font-nohemi font-bold text-h4 pt-4 mt-4 border-t border-neutral-stone/30">
            <span>Total</span><span>{formatPrice(getTotal())}</span>
          </div>
          <Link href="/checkout" className="w-full btn-pill-lg btn-primary mt-6 text-center block">Ir a pagar</Link>
        </div>
      </div>
    </div>
  );
}
