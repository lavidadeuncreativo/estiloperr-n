'use client';
import { useDataStore } from '@/lib/data/store';
import { formatPrice } from '@/lib/utils';
import { Package, ShoppingCart, Users, DollarSign, AlertTriangle, Dog } from 'lucide-react';
import Link from 'next/link';

export default function AdminDashboard() {
  const orders = useDataStore(s => s.orders);
  const products = useDataStore(s => s.products);
  const customers = useDataStore(s => s.customers);
  const variants = useDataStore(s => s.productVariants);
  const dogProfiles = useDataStore(s => s.dogProfiles);

  const totalRevenue = orders.filter(o => o.payment_status === 'paid').reduce((s, o) => s + o.total, 0);
  const pendingOrders = orders.filter(o => o.status === 'pending' || o.status === 'paid').length;
  const lowStockVariants = variants.filter(v => v.stock > 0 && v.stock <= v.low_stock_threshold);
  const outOfStock = variants.filter(v => v.stock <= 0);
  const recentOrders = [...orders].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()).slice(0, 5);

  const stats = [
    { label: 'Ingresos totales', value: formatPrice(totalRevenue), icon: DollarSign, color: 'text-emerald-600 bg-emerald-50' },
    { label: 'Pedidos totales', value: orders.length, icon: ShoppingCart, color: 'text-brand-rose bg-brand-rose/10' },
    { label: 'Productos activos', value: products.filter(p => p.is_visible && !p.is_archived).length, icon: Package, color: 'text-brand-sky-blue bg-brand-sky-blue/10' },
    { label: 'Clientes', value: customers.length, icon: Users, color: 'text-brand-sunset bg-brand-sunset/10' },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome */}
      <div>
        <h1 className="font-nohemi text-h2 font-extrabold text-neutral-near-black">¡Hola, Estilo Perrón! 🐾</h1>
        <p className="text-body text-neutral-soft-gray mt-1">Aquí tienes el resumen de tu tienda.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map(stat => (
          <div key={stat.label} className="admin-stat-card">
            <div className="flex items-center justify-between">
              <span className="text-meta text-neutral-soft-gray font-medium">{stat.label}</span>
              <div className={`p-2 rounded-lg-brand ${stat.color}`}><stat.icon size={18} /></div>
            </div>
            <p className="font-nohemi text-h3 font-bold text-neutral-near-black">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Orders */}
        <div className="lg:col-span-2 admin-card">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-nohemi font-bold text-h4">Pedidos recientes</h2>
            <Link href="/admin/pedidos" className="text-small text-brand-rose hover:underline">Ver todos</Link>
          </div>
          <table className="admin-table">
            <thead><tr><th>Pedido</th><th>Estado</th><th>Total</th><th>Fecha</th></tr></thead>
            <tbody>
              {recentOrders.map(order => (
                <tr key={order.id}>
                  <td><Link href={`/admin/pedidos/${order.id}`} className="font-semibold text-brand-rose hover:underline">{order.order_number}</Link></td>
                  <td><span className={`${order.status === 'pending' ? 'status-pending' : order.status === 'paid' ? 'status-paid' : order.status === 'shipped' ? 'status-shipped' : order.status === 'delivered' ? 'status-delivered' : order.status === 'cancelled' ? 'status-cancelled' : 'status-preparation'}`}>
                    {order.status === 'pending' ? 'Pendiente' : order.status === 'paid' ? 'Pagado' : order.status === 'shipped' ? 'Enviado' : order.status === 'delivered' ? 'Entregado' : order.status === 'in_preparation' ? 'Preparando' : order.status}
                  </span></td>
                  <td className="font-semibold">{formatPrice(order.total)}</td>
                  <td className="text-neutral-soft-gray">{new Date(order.created_at).toLocaleDateString('es-MX')}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Alerts */}
        <div className="space-y-4">
          {/* Pending Orders */}
          {pendingOrders > 0 && (
            <div className="admin-card border-l-4 border-l-amber-400">
              <div className="flex items-center gap-2 mb-2">
                <AlertTriangle size={18} className="text-amber-500" />
                <span className="font-nohemi font-bold text-small">Pedidos pendientes</span>
              </div>
              <p className="text-h3 font-nohemi font-bold text-neutral-near-black">{pendingOrders}</p>
              <Link href="/admin/pedidos" className="text-meta text-brand-rose hover:underline mt-1 block">Ver pedidos →</Link>
            </div>
          )}

          {/* Low Stock */}
          {lowStockVariants.length > 0 && (
            <div className="admin-card border-l-4 border-l-amber-400">
              <div className="flex items-center gap-2 mb-2">
                <AlertTriangle size={18} className="text-amber-500" />
                <span className="font-nohemi font-bold text-small">Stock bajo</span>
              </div>
              <p className="text-h3 font-nohemi font-bold text-neutral-near-black">{lowStockVariants.length} variantes</p>
              <Link href="/admin/inventario" className="text-meta text-brand-rose hover:underline mt-1 block">Ver inventario →</Link>
            </div>
          )}

          {/* Out of Stock */}
          {outOfStock.length > 0 && (
            <div className="admin-card border-l-4 border-l-red-400">
              <div className="flex items-center gap-2 mb-2">
                <AlertTriangle size={18} className="text-red-500" />
                <span className="font-nohemi font-bold text-small">Agotados</span>
              </div>
              <p className="text-h3 font-nohemi font-bold text-neutral-near-black">{outOfStock.length} variantes</p>
              <Link href="/admin/inventario" className="text-meta text-brand-rose hover:underline mt-1 block">Ver inventario →</Link>
            </div>
          )}

          {/* Dog Profiles */}
          <div className="admin-card">
            <div className="flex items-center gap-2 mb-2">
              <Dog size={18} className="text-brand-rose" />
              <span className="font-nohemi font-bold text-small">Perrhijos registrados</span>
            </div>
            <p className="text-h3 font-nohemi font-bold text-neutral-near-black">{dogProfiles.length}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
