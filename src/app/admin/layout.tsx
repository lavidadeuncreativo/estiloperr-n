'use client';
import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { HydrationGuard } from '@/components/HydrationGuard';
import {
  LayoutDashboard, Package, FolderOpen, Tags, Warehouse,
  ShoppingCart, Users, Dog, Percent, Home, ChevronLeft,
  Menu, LogOut,
} from 'lucide-react';

const sidebarItems = [
  { label: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { label: 'Productos', href: '/admin/productos', icon: Package },
  { label: 'Colecciones', href: '/admin/colecciones', icon: FolderOpen },
  { label: 'Categorías', href: '/admin/categorias', icon: Tags },
  { label: 'Inventario', href: '/admin/inventario', icon: Warehouse },
  { label: 'Pedidos', href: '/admin/pedidos', icon: ShoppingCart },
  { label: 'Clientes', href: '/admin/clientes', icon: Users },
  { label: 'Perrhijos', href: '/admin/perrhijos', icon: Dog },
  { label: 'Promociones', href: '/admin/promociones', icon: Percent },
  { label: 'Homepage', href: '/admin/home', icon: Home },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <HydrationGuard>
    <div className="flex min-h-screen bg-neutral-surface-gray">
      {/* Sidebar */}
      <aside className={cn(
        'fixed left-0 top-0 h-full bg-white border-r border-neutral-stone/20 z-40 transition-all duration-300 hidden md:flex flex-col',
        collapsed ? 'w-[72px]' : 'w-[260px]'
      )}>
        {/* Logo */}
        <div className="flex items-center justify-between px-4 py-5 border-b border-neutral-stone/20">
          {!collapsed && (
            <Link href="/admin" className="font-nohemi font-extrabold text-body-lg text-neutral-near-black">
              Estilo<span className="text-brand-rose">Perrón</span> <span className="text-meta font-inter font-normal text-neutral-soft-gray">Admin</span>
            </Link>
          )}
          <button onClick={() => setCollapsed(!collapsed)} className="p-1.5 hover:bg-neutral-surface-gray rounded-lg transition-colors" aria-label="Colapsar menú">
            <ChevronLeft size={18} className={cn('transition-transform', collapsed && 'rotate-180')} />
          </button>
        </div>

        {/* Nav Items */}
        <nav className="flex-1 py-3 px-2.5 space-y-0.5 overflow-y-auto custom-scrollbar">
          {sidebarItems.map(item => {
            const isActive = pathname === item.href || (item.href !== '/admin' && pathname.startsWith(item.href));
            return (
              <Link key={item.href} href={item.href}
                className={cn(
                  'flex items-center gap-3 px-3 py-2.5 rounded-lg-brand text-small font-medium transition-all duration-hover',
                  isActive ? 'bg-brand-rose/10 text-brand-rose font-semibold' : 'text-neutral-charcoal hover:bg-neutral-surface-gray hover:text-neutral-near-black'
                )}
              >
                <item.icon size={20} className="shrink-0" />
                {!collapsed && <span>{item.label}</span>}
              </Link>
            );
          })}
        </nav>

        {/* Bottom */}
        <div className="px-2.5 py-3 border-t border-neutral-stone/20">
          <Link href="/" target="_blank"
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg-brand text-small text-neutral-soft-gray hover:text-neutral-charcoal hover:bg-neutral-surface-gray transition-all"
          >
            <LogOut size={18} /> {!collapsed && 'Ver tienda'}
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <div className={cn('flex-1 transition-all duration-300', collapsed ? 'md:ml-[72px]' : 'md:ml-[260px]')}>
        {/* Top Bar */}
        <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-neutral-stone/20 px-6 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button className="md:hidden p-2 hover:bg-neutral-surface-gray rounded-lg" aria-label="Menú"><Menu size={20} /></button>
            <h2 className="font-nohemi font-bold text-body text-neutral-near-black">
              {sidebarItems.find(i => pathname === i.href || (i.href !== '/admin' && pathname.startsWith(i.href)))?.label || 'Admin'}
            </h2>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-brand-rose flex items-center justify-center text-white font-nohemi font-bold text-caption">EP</div>
          </div>
        </header>

        {/* Page Content */}
        <div className="p-6 md:p-8">{children}</div>
      </div>
    </div>
    </HydrationGuard>
  );
}
