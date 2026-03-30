'use client';
import { useDataStore } from '@/lib/data/store';
import { formatPrice } from '@/lib/utils';


export default function AdminOrdersPage() {
  const orders = useDataStore(s => s.orders);
  const customers = useDataStore(s => s.customers);
  const updateOrderStatus = useDataStore(s => s.updateOrderStatus);

  const statusLabels: Record<string, { label: string; cls: string }> = {
    pending: { label: 'Pendiente', cls: 'status-pending' },
    paid: { label: 'Pagado', cls: 'status-paid' },
    in_preparation: { label: 'Preparando', cls: 'status-preparation' },
    personalized: { label: 'Personalizado', cls: 'status-preparation' },
    shipped: { label: 'Enviado', cls: 'status-shipped' },
    delivered: { label: 'Entregado', cls: 'status-delivered' },
    cancelled: { label: 'Cancelado', cls: 'status-cancelled' },
  };
  const statusFlow = ['pending', 'paid', 'in_preparation', 'shipped', 'delivered'];

  return (
    <div className="space-y-6">
      <h1 className="font-nohemi text-h2 font-extrabold text-neutral-near-black">Pedidos</h1>
      <div className="admin-card p-0 overflow-hidden">
        <table className="admin-table">
          <thead><tr><th className="pl-6">Pedido</th><th>Cliente</th><th>Estado</th><th>Pago</th><th>Total</th><th>Personalización</th><th>Fecha</th><th>Acciones</th></tr></thead>
          <tbody>
            {[...orders].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()).map(order => {
              const customer = customers.find(c => c.id === order.customer_id);
              const st = statusLabels[order.status] || { label: order.status, cls: 'badge' };
              const currentIdx = statusFlow.indexOf(order.status);
              const nextStatus = currentIdx < statusFlow.length - 1 ? statusFlow[currentIdx + 1] : null;
              return (
                <tr key={order.id}>
                  <td className="pl-6"><span className="font-nohemi font-bold text-brand-rose">{order.order_number}</span></td>
                  <td>{customer ? `${customer.first_name} ${customer.last_name}` : '—'}</td>
                  <td><span className={st.cls}>{st.label}</span></td>
                  <td><span className={`badge ${order.payment_status === 'paid' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'}`}>{order.payment_status === 'paid' ? 'Pagado' : 'Pendiente'}</span></td>
                  <td className="font-semibold">{formatPrice(order.total)}</td>
                  <td>{order.has_personalization ? <span className="text-brand-rose">✨ Sí</span> : '—'}</td>
                  <td className="text-neutral-soft-gray">{new Date(order.created_at).toLocaleDateString('es-MX')}</td>
                  <td>
                    {nextStatus && (
                      <button onClick={() => updateOrderStatus(order.id, nextStatus)}
                        className="btn-pill-sm bg-neutral-surface-gray hover:bg-neutral-stone/30 text-neutral-charcoal text-caption transition-colors">
                        → {statusLabels[nextStatus]?.label}
                      </button>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
