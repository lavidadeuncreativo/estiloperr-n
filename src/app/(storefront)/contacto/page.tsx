import { Mail, Phone, MapPin, Camera, MessageCircle } from 'lucide-react';

export default function ContactoPage() {
  return (
    <div className="section-container py-12 md:py-20 max-w-4xl mx-auto">
      <h1 className="font-nohemi text-h1 font-extrabold text-neutral-near-black text-center">Contacto</h1>
      <p className="text-body-lg text-neutral-soft-gray text-center mt-4">¿Tienes dudas? Estamos aquí para ayudarte a ti y a tu perrhijo.</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
        <div className="space-y-6">
          <div className="admin-card flex items-start gap-4"><Mail className="text-brand-rose shrink-0 mt-1" size={22} /><div><h3 className="font-nohemi font-bold text-body">Email</h3><p className="text-small text-neutral-soft-gray mt-1">hola@estiloperron.mx</p></div></div>
          <div className="admin-card flex items-start gap-4"><Phone className="text-brand-rose shrink-0 mt-1" size={22} /><div><h3 className="font-nohemi font-bold text-body">Teléfono / WhatsApp</h3><p className="text-small text-neutral-soft-gray mt-1">+52 55 1234 5678</p></div></div>
          <div className="admin-card flex items-start gap-4"><Camera className="text-brand-rose shrink-0 mt-1" size={22} /><div><h3 className="font-nohemi font-bold text-body">Instagram</h3><p className="text-small text-neutral-soft-gray mt-1">@estiloperron</p></div></div>
          <div className="admin-card flex items-start gap-4"><MapPin className="text-brand-rose shrink-0 mt-1" size={22} /><div><h3 className="font-nohemi font-bold text-body">Ubicación</h3><p className="text-small text-neutral-soft-gray mt-1">Ciudad de México, México</p></div></div>
        </div>
        <div className="admin-card">
          <h2 className="font-nohemi font-bold text-h4 mb-6 flex items-center gap-2"><MessageCircle size={20} /> Envíanos un mensaje</h2>
          <div className="space-y-4">
            <div><label className="text-meta font-medium text-neutral-charcoal mb-1.5 block">Nombre</label><input type="text" placeholder="Tu nombre" className="w-full rounded-pill border border-neutral-stone/40 px-4 py-3 text-small focus:outline-none focus:ring-2 focus:ring-brand-rose/30" /></div>
            <div><label className="text-meta font-medium text-neutral-charcoal mb-1.5 block">Email</label><input type="email" placeholder="tu@email.com" className="w-full rounded-pill border border-neutral-stone/40 px-4 py-3 text-small focus:outline-none focus:ring-2 focus:ring-brand-rose/30" /></div>
            <div><label className="text-meta font-medium text-neutral-charcoal mb-1.5 block">Mensaje</label><textarea placeholder="¿En qué podemos ayudarte?" rows={4} className="w-full rounded-lg-brand border border-neutral-stone/40 px-4 py-3 text-small focus:outline-none focus:ring-2 focus:ring-brand-rose/30 resize-none" /></div>
            <button className="w-full btn-pill-lg btn-primary">Enviar mensaje</button>
          </div>
        </div>
      </div>
    </div>
  );
}
