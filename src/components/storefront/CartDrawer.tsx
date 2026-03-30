'use client';
import Image from 'next/image';
import Link from 'next/link';
import { X, Minus, Plus, ShoppingBag } from 'lucide-react';
import { useCartStore } from '@/lib/data/store';
import { formatPrice } from '@/lib/utils';

export function CartDrawer() {
  const { items, isOpen, closeCart, removeItem, updateQuantity, getSubtotal, getShippingCost, getTotal, getItemCount } = useCartStore();
  const itemCount = getItemCount();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60]">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={closeCart} />
      <div className="absolute top-0 right-0 w-full max-w-md h-full bg-white animate-slide-in-right shadow-elevated flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-neutral-stone/30">
          <div className="flex items-center gap-2">
            <ShoppingBag size={20} />
            <h2 className="font-nohemi font-bold text-h4">Tu carrito</h2>
            <span className="bg-brand-rose text-white text-caption font-bold rounded-pill px-2.5 py-0.5">
              {itemCount}
            </span>
          </div>
          <button onClick={closeCart} className="p-2 hover:bg-neutral-surface-gray rounded-pill transition-colors" aria-label="Cerrar carrito">
            <X size={20} />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto custom-scrollbar p-5">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <ShoppingBag size={48} className="text-neutral-stone mb-4" />
              <p className="font-nohemi font-bold text-h4 text-neutral-charcoal">Tu carrito está vacío</p>
              <p className="text-small text-neutral-soft-gray mt-2">Explora nuestra tienda y encuentra algo perrón para tu perrhijo.</p>
              <Link href="/tienda" onClick={closeCart} className="btn-pill-md btn-primary mt-6">
                Ir a la tienda
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map(item => (
                <div key={item.variant_id} className="flex gap-4 p-3 rounded-lg-brand bg-neutral-surface-gray/50">
                  <div className="relative w-20 h-20 rounded-md-brand overflow-hidden shrink-0 bg-neutral-stone/20">
                    {item.image_url && (
                      <Image src={item.image_url} alt={item.product_title} fill className="object-cover" sizes="80px" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <Link href={`/producto/${item.product_slug}`} onClick={closeCart} className="font-nohemi font-semibold text-small hover:text-brand-rose transition-colors line-clamp-1">
                      {item.product_title}
                    </Link>
                    <p className="text-caption text-neutral-soft-gray mt-0.5">
                      Talla: {item.variant_size} {item.variant_color ? `• ${item.variant_color}` : ''}
                    </p>
                    {item.personalization && (
                      <p className="text-caption text-brand-rose mt-0.5">✨ +{formatPrice(item.personalization.cost)}</p>
                    )}
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center gap-1 border border-neutral-stone/40 rounded-pill">
                        <button onClick={() => updateQuantity(item.variant_id, item.quantity - 1)} className="p-1.5 hover:bg-neutral-stone/20 rounded-full transition-colors" aria-label="Reducir cantidad">
                          <Minus size={14} />
                        </button>
                        <span className="text-small font-medium w-6 text-center">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.variant_id, item.quantity + 1)} className="p-1.5 hover:bg-neutral-stone/20 rounded-full transition-colors" aria-label="Aumentar cantidad">
                          <Plus size={14} />
                        </button>
                      </div>
                      <span className="font-nohemi font-bold text-small">{formatPrice(item.unit_price * item.quantity)}</span>
                    </div>
                  </div>
                  <button onClick={() => removeItem(item.variant_id)} className="self-start p-1 text-neutral-soft-gray hover:text-brand-rose transition-colors" aria-label="Eliminar">
                    <X size={16} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-neutral-stone/30 p-5 space-y-3">
            <div className="flex justify-between text-small">
              <span className="text-neutral-soft-gray">Subtotal</span>
              <span className="font-medium">{formatPrice(getSubtotal())}</span>
            </div>
            <div className="flex justify-between text-small">
              <span className="text-neutral-soft-gray">Envío</span>
              <span className="font-medium">{getShippingCost() === 0 ? '¡Gratis! 🎉' : formatPrice(getShippingCost())}</span>
            </div>
            {getShippingCost() > 0 && (
              <p className="text-caption text-brand-rose">
                ¡Te faltan {formatPrice(999 - getSubtotal())} para envío gratis!
              </p>
            )}
            <div className="flex justify-between font-nohemi font-bold text-body-lg pt-2 border-t border-neutral-stone/30">
              <span>Total</span>
              <span>{formatPrice(getTotal())}</span>
            </div>
            <Link href="/checkout" onClick={closeCart} className="btn-pill-lg btn-primary w-full text-center block">
              Ir a pagar
            </Link>
            <button onClick={closeCart} className="btn-pill-md btn-ghost w-full">
              Seguir comprando
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
