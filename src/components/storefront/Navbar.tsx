'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Search, ShoppingBag, Heart, Menu, X } from 'lucide-react';
import { useCartStore } from '@/lib/data/store';
import { cn } from '@/lib/utils';

const navLinks = [
  { label: 'Tienda', href: '/tienda' },
  { label: 'Historia', href: '/historia' },
  { label: 'Adopta un amigo', href: '/adopta-un-amigo' },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const itemCount = useCartStore(s => s.getItemCount());
  const openCart = useCartStore(s => s.openCart);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  return (
    <>
      <header
        className={cn(
          'sticky top-0 z-50 w-full transition-all duration-300 ease-brand',
          scrolled ? 'py-2' : 'py-3'
        )}
      >
        <div className="section-container">
          <nav
            className={cn(
              'flex items-center justify-between rounded-pill px-4 md:px-6 transition-all duration-300',
              scrolled
                ? 'bg-brand-rose py-2 shadow-nav'
                : 'bg-brand-rose py-3 shadow-nav'
            )}
          >
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 shrink-0">
              <span className="font-nohemi text-white font-extrabold text-xl md:text-2xl tracking-tight">
                Estilo<span className="opacity-80">Perr</span>ó<span className="opacity-80">n</span>
              </span>
              <span className="text-lg">🐾</span>
            </Link>

            {/* Desktop Nav Links */}
            <div className="hidden md:flex items-center gap-1">
              {navLinks.map(link => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-white/90 hover:text-white font-nohemi text-small font-medium px-4 py-2 rounded-pill hover:bg-white/10 transition-all duration-hover"
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-1">
              {/* Search */}
              <button
                onClick={() => setSearchOpen(!searchOpen)}
                className="hidden md:flex items-center gap-2 bg-white/15 hover:bg-white/25 text-white rounded-pill px-4 py-2 text-small transition-all duration-hover"
                aria-label="Buscar productos"
              >
                <Search size={16} />
                <span className="font-inter text-white/70">Buscar productos</span>
              </button>

              {/* Favorites */}
              <button
                className="p-2.5 text-white/80 hover:text-white hover:bg-white/10 rounded-pill transition-all duration-hover"
                aria-label="Favoritos"
              >
                <Heart size={20} />
              </button>

              {/* Cart */}
              <button
                onClick={openCart}
                className="relative p-2.5 text-white/80 hover:text-white hover:bg-white/10 rounded-pill transition-all duration-hover"
                aria-label="Carrito de compras"
              >
                <ShoppingBag size={20} />
                {itemCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 bg-brand-lime text-neutral-near-black text-caption font-bold rounded-full w-5 h-5 flex items-center justify-center">
                    {itemCount}
                  </span>
                )}
              </button>

              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="md:hidden p-2.5 text-white/80 hover:text-white hover:bg-white/10 rounded-pill transition-all duration-hover"
                aria-label="Menú"
              >
                {mobileOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </nav>
        </div>
      </header>

      {/* Mobile Nav Drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div className="absolute inset-0 bg-black/40" onClick={() => setMobileOpen(false)} />
          <div className="absolute top-0 right-0 w-80 max-w-[85vw] h-full bg-white animate-slide-in-right shadow-elevated">
            <div className="p-6 pt-20">
              <nav className="flex flex-col gap-2">
                {navLinks.map(link => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="font-nohemi text-h4 font-bold text-neutral-near-black py-3 border-b border-neutral-stone/30 hover:text-brand-rose transition-colors"
                  >
                    {link.label}
                  </Link>
                ))}
                <Link
                  href="/guia-de-tallas"
                  onClick={() => setMobileOpen(false)}
                  className="font-nohemi text-body-lg font-medium text-neutral-soft-gray py-3 hover:text-brand-rose transition-colors"
                >
                  Guía de tallas
                </Link>
                <Link
                  href="/contacto"
                  onClick={() => setMobileOpen(false)}
                  className="font-nohemi text-body-lg font-medium text-neutral-soft-gray py-3 hover:text-brand-rose transition-colors"
                >
                  Contacto
                </Link>
              </nav>
              <div className="mt-8">
                <div className="flex items-center gap-2 bg-neutral-surface-gray rounded-pill px-4 py-3">
                  <Search size={18} className="text-neutral-soft-gray" />
                  <input
                    type="text"
                    placeholder="Buscar productos..."
                    className="bg-transparent w-full text-small font-inter outline-none placeholder:text-neutral-soft-gray"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
