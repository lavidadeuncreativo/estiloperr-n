'use client';
import Image from 'next/image';
import { useDataStore } from '@/lib/data/store';
import { WEIGHT_RANGE_LABELS, BODY_TYPE_LABELS } from '@/lib/types';
import { Dog } from 'lucide-react';

export default function AdminDogProfilesPage() {
  const dogProfiles = useDataStore(s => s.dogProfiles);
  const customers = useDataStore(s => s.customers);

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <h1 className="font-nohemi text-h2 font-extrabold text-neutral-near-black">Perrhijos</h1>
        <span className="badge bg-brand-blush text-brand-rose">{dogProfiles.length} registrados</span>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {dogProfiles.map(dog => {
          const owner = customers.find(c => c.id === dog.customer_id);
          return (
            <div key={dog.id} className="admin-card">
              <div className="flex items-center gap-4 mb-4">
                {dog.photo_url ? (
                  <div className="w-16 h-16 rounded-full overflow-hidden relative shrink-0 bg-neutral-stone/20"><Image src={dog.photo_url} alt={dog.name} fill className="object-cover" sizes="64px" /></div>
                ) : (
                  <div className="w-16 h-16 rounded-full bg-brand-blush flex items-center justify-center shrink-0"><Dog size={28} className="text-brand-rose" /></div>
                )}
                <div>
                  <h3 className="font-nohemi font-bold text-h4">{dog.name}</h3>
                  {dog.breed && <p className="text-small text-neutral-soft-gray">{dog.breed}</p>}
                </div>
              </div>
              <div className="space-y-2 text-small">
                {dog.weight_range && <div className="flex justify-between"><span className="text-neutral-soft-gray">Peso</span><span className="font-medium">{WEIGHT_RANGE_LABELS[dog.weight_range]?.label} ({WEIGHT_RANGE_LABELS[dog.weight_range]?.range})</span></div>}
                {dog.body_type && <div className="flex justify-between"><span className="text-neutral-soft-gray">Cuerpo</span><span className="font-medium">{BODY_TYPE_LABELS[dog.body_type]?.label}</span></div>}
                {dog.recommended_size && <div className="flex justify-between"><span className="text-neutral-soft-gray">Talla recomendada</span><span className="font-nohemi font-bold text-brand-rose text-body">{dog.recommended_size}</span></div>}
                {dog.known_size && <div className="flex justify-between"><span className="text-neutral-soft-gray">Talla conocida</span><span className="font-medium">{dog.known_size}</span></div>}
                {owner && <div className="flex justify-between pt-2 border-t border-neutral-stone/20 mt-2"><span className="text-neutral-soft-gray">Dueño</span><span className="font-medium">{owner.first_name} {owner.last_name}</span></div>}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
