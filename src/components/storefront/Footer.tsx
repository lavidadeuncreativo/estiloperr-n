'use client';
import Link from 'next/link';
import { Camera, Mail, Phone, MapPin } from 'lucide-react';

const footerLinks = {
  tienda: [
    { label: 'Todas las colecciones', href: '/tienda' },
    { label: 'Lo más nuevo', href: '/tienda?filter=nuevo' },
    { label: 'Los favoritos', href: '/tienda?filter=favoritos' },
    { label: 'Ofertas', href: '/tienda?filter=ofertas' },
  ],
  ayuda: [
    { label: 'Guía de tallas', href: '/guia-de-tallas' },
    { label: 'Envíos', href: '/envios' },
    { label: 'Preguntas frecuentes', href: '/faq' },
    { label: 'Contacto', href: '/contacto' },
  ],
  brand: [
    { label: 'Nuestra historia', href: '/historia' },
    { label: 'Registra a tu perrhijo', href: '/registra-a-tu-perrhijo' },
  ],
};

export function Footer() {
  return (
    <footer className="bg-neutral-near-black text-white mt-0">
      <div className="section-container py-16 md:py-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-8">
          {/* Brand Column */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="inline-block">
              <span className="font-nohemi text-2xl font-extrabold tracking-tight">
                Estilo<span className="text-brand-rose">Perrón</span>
              </span>
              <span className="ml-1 text-lg">🐾</span>
            </Link>
            <p className="text-small text-white/60 mt-4 leading-relaxed max-w-xs">
              La marca mexicana de ropa premium para perrhijos con actitud. Cada pieza está hecha con amor, calidad y mucho estilo.
            </p>
            <div className="flex items-center gap-3 mt-6">
              <a href="https://instagram.com/estiloperron" target="_blank" rel="noopener noreferrer" className="p-2.5 bg-white/10 hover:bg-brand-rose rounded-pill transition-all duration-hover" aria-label="Instagram">
                <Camera size={18} />
              </a>
              <a href="mailto:hola@estiloperron.mx" className="p-2.5 bg-white/10 hover:bg-brand-rose rounded-pill transition-all duration-hover" aria-label="Email">
                <Mail size={18} />
              </a>
            </div>
          </div>

          {/* Tienda */}
          <div>
            <h3 className="font-nohemi font-bold text-body mb-4">Tienda</h3>
            <ul className="space-y-2.5">
              {footerLinks.tienda.map(link => (
                <li key={link.href}>
                  <Link href={link.href} className="text-small text-white/60 hover:text-white transition-colors duration-hover">{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Ayuda */}
          <div>
            <h3 className="font-nohemi font-bold text-body mb-4">Ayuda</h3>
            <ul className="space-y-2.5">
              {footerLinks.ayuda.map(link => (
                <li key={link.href}>
                  <Link href={link.href} className="text-small text-white/60 hover:text-white transition-colors duration-hover">{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contacto */}
          <div>
            <h3 className="font-nohemi font-bold text-body mb-4">Contacto</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-small text-white/60">
                <Mail size={16} className="mt-0.5 shrink-0" />
                <span>hola@estiloperron.mx</span>
              </li>
              <li className="flex items-start gap-2 text-small text-white/60">
                <Phone size={16} className="mt-0.5 shrink-0" />
                <span>+52 55 1234 5678</span>
              </li>
              <li className="flex items-start gap-2 text-small text-white/60">
                <MapPin size={16} className="mt-0.5 shrink-0" />
                <span>Ciudad de México, México</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-white/10 mt-12 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-caption text-white/40">
            © {new Date().getFullYear()} Estilo Perrón. Todos los derechos reservados.
          </p>
          <div className="flex items-center gap-4 text-caption text-white/40">
            <Link href="/faq" className="hover:text-white transition-colors">Términos</Link>
            <Link href="/faq" className="hover:text-white transition-colors">Privacidad</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
