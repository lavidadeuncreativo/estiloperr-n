'use client';
import { useDataStore } from '@/lib/data/store';

export function PromoStrip() {
  const homepageBlocks = useDataStore(s => s.homepageBlocks);
  const strip = homepageBlocks.find(b => b.block_type === 'promo_strip' && b.is_visible);
  if (!strip) return null;

  return (
    <div
      className="w-full py-2.5 text-center"
      style={{ backgroundColor: strip.bg_color || '#5568AF', color: strip.text_color || '#FFFFFF' }}
    >
      <p className="font-nohemi text-caption md:text-small font-medium tracking-wide">
        {strip.title}
      </p>
    </div>
  );
}
