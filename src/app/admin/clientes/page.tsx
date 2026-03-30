'use client';
import { useDataStore } from '@/lib/data/store';
import { formatPrice } from '@/lib/utils';
import { Mail, Phone } from 'lucide-react';

export default function AdminCustomersPage() {
  const customers = useDataStore(s => s.customers);
  const dogProfiles = useDataStore(s => s.dogProfiles);

  return (
    <div className="space-y-6">
      <h1 className="font-nohemi text-h2 font-extrabold text-neutral-near-black">Clientes</h1>
      <div className="admin-card p-0 overflow-hidden">
        <table className="admin-table">
          <thead><tr><th className="pl-6">Cliente</th><th>Email</th><th>Teléfono</th><th>Pedidos</th><th>Total gastado</th><th>Perrhijos</th></tr></thead>
          <tbody>
            {customers.map(c => {
              const dogs = dogProfiles.filter(d => d.customer_id === c.id);
              return (
                <tr key={c.id}>
                  <td className="pl-6"><span className="font-nohemi font-semibold">{c.first_name} {c.last_name}</span></td>
                  <td><div className="flex items-center gap-1.5 text-neutral-soft-gray"><Mail size={14} />{c.email}</div></td>
                  <td>{c.phone ? <div className="flex items-center gap-1.5 text-neutral-soft-gray"><Phone size={14} />{c.phone}</div> : '—'}</td>
                  <td className="font-semibold">{c.total_orders}</td>
                  <td className="font-semibold">{formatPrice(c.total_spent)}</td>
                  <td>{dogs.length > 0 ? dogs.map(d => <span key={d.id} className="badge bg-brand-blush text-brand-rose mr-1">{d.name}</span>) : '—'}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
