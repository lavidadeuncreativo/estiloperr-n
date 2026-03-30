'use client';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useCartStore } from '@/lib/data/store';
import { formatPrice } from '@/lib/utils';
import { ArrowLeft, Lock, CreditCard, Truck } from 'lucide-react';

export default function CheckoutPage() {
  const { items, getSubtotal, getShippingCost, getTotal, clearCart } = useCartStore();
  const [submitted, setSubmitted] = useState(false);

  if (items.length === 0 && !submitted) {
    return (
      <div className="section-container py-20 text-center">
        <p className="font-nohemi text-h2 text-neutral-charcoal">Tu carrito está vacío</p>
        <Link href="/tienda" className="btn-pill-md btn-primary mt-6 inline-flex items-center gap-2"><ArrowLeft size={16} /> Ir a la tienda</Link>
      </div>
    );
  }

  if (submitted) {
    return (
      <div className="section-container py-20 text-center max-w-lg mx-auto">
        <div className="text-6xl mb-6">🎉</div>
        <h1 className="font-nohemi text-h1 font-extrabold text-neutral-near-black">¡Gracias por tu compra!</h1>
        <p className="text-body-lg text-neutral-soft-gray mt-4">Tu pedido ha sido recibido. Te enviaremos un email con los detalles y seguimiento.</p>
        <div className="bg-brand-blush/30 rounded-lg-brand p-6 mt-8">
          <p className="font-nohemi font-bold text-body text-neutral-charcoal">Pedido #EP-{String(Math.floor(Math.random() * 9000) + 1000).padStart(4, '0')}</p>
          <p className="text-small text-neutral-soft-gray mt-1">Donamos $10 a un refugio de perrhijos gracias a tu compra 💛</p>
        </div>
        <Link href="/tienda" className="btn-pill-lg btn-primary mt-8 inline-flex items-center gap-2">Seguir comprando</Link>
      </div>
    );
  }

  return (
    <div className="section-container py-8 md:py-12">
      <Link href="/carrito" className="inline-flex items-center gap-1.5 text-small text-neutral-soft-gray hover:text-neutral-near-black mb-6 transition-colors">
        <ArrowLeft size={14} /> Volver al carrito
      </Link>
      <h1 className="font-nohemi text-h1 font-extrabold text-neutral-near-black mb-8">Checkout</h1>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 md:gap-12">
        {/* Form */}
        <div className="lg:col-span-3 space-y-8">
          {/* Contact */}
          <div className="admin-card">
            <h2 className="font-nohemi font-bold text-h4 mb-4">Datos de contacto</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-meta font-medium text-neutral-charcoal mb-1.5 block">Nombre*</label>
                <input type="text" placeholder="Tu nombre" className="w-full rounded-pill border border-neutral-stone/40 px-4 py-3 text-small focus:outline-none focus:ring-2 focus:ring-brand-rose/30" />
              </div>
              <div>
                <label className="text-meta font-medium text-neutral-charcoal mb-1.5 block">Apellido*</label>
                <input type="text" placeholder="Tu apellido" className="w-full rounded-pill border border-neutral-stone/40 px-4 py-3 text-small focus:outline-none focus:ring-2 focus:ring-brand-rose/30" />
              </div>
              <div className="md:col-span-2">
                <label className="text-meta font-medium text-neutral-charcoal mb-1.5 block">Email*</label>
                <input type="email" placeholder="tu@email.com" className="w-full rounded-pill border border-neutral-stone/40 px-4 py-3 text-small focus:outline-none focus:ring-2 focus:ring-brand-rose/30" />
              </div>
              <div className="md:col-span-2">
                <label className="text-meta font-medium text-neutral-charcoal mb-1.5 block">Teléfono*</label>
                <input type="tel" placeholder="+52 55 1234 5678" className="w-full rounded-pill border border-neutral-stone/40 px-4 py-3 text-small focus:outline-none focus:ring-2 focus:ring-brand-rose/30" />
              </div>
            </div>
          </div>

          {/* Shipping */}
          <div className="admin-card">
            <h2 className="font-nohemi font-bold text-h4 mb-4 flex items-center gap-2"><Truck size={20} /> Dirección de envío</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label className="text-meta font-medium text-neutral-charcoal mb-1.5 block">Calle y número*</label>
                <input type="text" placeholder="Av. Reforma 123" className="w-full rounded-pill border border-neutral-stone/40 px-4 py-3 text-small focus:outline-none focus:ring-2 focus:ring-brand-rose/30" />
              </div>
              <div>
                <label className="text-meta font-medium text-neutral-charcoal mb-1.5 block">Colonia*</label>
                <input type="text" placeholder="Juárez" className="w-full rounded-pill border border-neutral-stone/40 px-4 py-3 text-small focus:outline-none focus:ring-2 focus:ring-brand-rose/30" />
              </div>
              <div>
                <label className="text-meta font-medium text-neutral-charcoal mb-1.5 block">Código postal*</label>
                <input type="text" placeholder="06600" className="w-full rounded-pill border border-neutral-stone/40 px-4 py-3 text-small focus:outline-none focus:ring-2 focus:ring-brand-rose/30" />
              </div>
              <div>
                <label className="text-meta font-medium text-neutral-charcoal mb-1.5 block">Ciudad*</label>
                <input type="text" placeholder="Ciudad de México" className="w-full rounded-pill border border-neutral-stone/40 px-4 py-3 text-small focus:outline-none focus:ring-2 focus:ring-brand-rose/30" />
              </div>
              <div>
                <label className="text-meta font-medium text-neutral-charcoal mb-1.5 block">Estado*</label>
                <input type="text" placeholder="CDMX" className="w-full rounded-pill border border-neutral-stone/40 px-4 py-3 text-small focus:outline-none focus:ring-2 focus:ring-brand-rose/30" />
              </div>
            </div>
          </div>

          {/* Payment */}
          <div className="admin-card">
            <h2 className="font-nohemi font-bold text-h4 mb-4 flex items-center gap-2"><CreditCard size={20} /> Método de pago</h2>
            <div className="p-6 bg-neutral-surface-gray rounded-lg-brand text-center">
              <Lock size={24} className="mx-auto text-neutral-soft-gray mb-3" />
              <p className="font-nohemi font-semibold text-body text-neutral-charcoal">Pago seguro con Mercado Pago</p>
              <p className="text-small text-neutral-soft-gray mt-1">Al hacer clic en &ldquo;Pagar&rdquo; serás redirigido a Mercado Pago para completar tu pago de forma segura.</p>
            </div>
            <button
              onClick={() => { clearCart(); setSubmitted(true); }}
              className="w-full btn-pill-lg btn-primary mt-6 flex items-center justify-center gap-2"
            >
              <Lock size={18} /> Pagar {formatPrice(getTotal())}
            </button>
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-2">
          <div className="admin-card sticky top-28">
            <h2 className="font-nohemi font-bold text-h4 mb-4">Tu pedido</h2>
            <div className="space-y-3 mb-6">
              {items.map(item => (
                <div key={item.variant_id} className="flex gap-3">
                  <div className="w-16 h-16 rounded-md-brand overflow-hidden bg-neutral-stone/20 shrink-0 relative">
                    {item.image_url && <Image src={item.image_url} alt={item.product_title} fill className="object-cover" sizes="64px" />}
                    <span className="absolute -top-1 -right-1 bg-brand-rose text-white text-caption rounded-full w-5 h-5 flex items-center justify-center font-bold">{item.quantity}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-nohemi font-semibold text-small truncate">{item.product_title}</p>
                    <p className="text-caption text-neutral-soft-gray">Talla: {item.variant_size}</p>
                    {item.personalization && <p className="text-caption text-brand-rose">✨ {item.personalization.data.text}</p>}
                  </div>
                  <p className="font-nohemi font-bold text-small shrink-0">{formatPrice(item.unit_price * item.quantity + (item.personalization?.cost || 0))}</p>
                </div>
              ))}
            </div>
            {/* Coupon */}
            <div className="flex gap-2 mb-6">
              <input type="text" placeholder="Código de descuento" className="flex-1 rounded-pill border border-neutral-stone/40 px-4 py-2.5 text-small focus:outline-none focus:ring-2 focus:ring-brand-rose/30" />
              <button className="btn-pill-sm btn-outline shrink-0">Aplicar</button>
            </div>
            {/* Totals */}
            <div className="space-y-2 pt-4 border-t border-neutral-stone/30">
              <div className="flex justify-between text-small"><span className="text-neutral-soft-gray">Subtotal</span><span>{formatPrice(getSubtotal())}</span></div>
              <div className="flex justify-between text-small"><span className="text-neutral-soft-gray">Envío</span><span>{getShippingCost() === 0 ? 'Gratis 🎉' : formatPrice(getShippingCost())}</span></div>
              <div className="flex justify-between font-nohemi font-bold text-body-lg pt-3 border-t border-neutral-stone/30"><span>Total</span><span>{formatPrice(getTotal())}</span></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
