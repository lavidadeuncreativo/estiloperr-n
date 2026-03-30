'use client';
import { PromoStrip } from '@/components/storefront/PromoStrip';
import { Navbar } from '@/components/storefront/Navbar';
import { Footer } from '@/components/storefront/Footer';
import { CartDrawer } from '@/components/storefront/CartDrawer';
import { HydrationGuard } from '@/components/HydrationGuard';

export default function StorefrontLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <HydrationGuard>
      <div className="flex flex-col min-h-screen">
        <PromoStrip />
        <Navbar />
        <CartDrawer />
        <main className="flex-1">{children}</main>
        <Footer />
      </div>
    </HydrationGuard>
  );
}
