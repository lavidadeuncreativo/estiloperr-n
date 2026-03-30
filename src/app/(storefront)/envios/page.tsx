export default function EnviosPage() {
  return (
    <div className="section-container py-12 md:py-20 max-w-3xl mx-auto">
      <h1 className="font-nohemi text-h1 font-extrabold text-neutral-near-black text-center">Envíos</h1>
      <p className="text-body-lg text-neutral-soft-gray text-center mt-4">Todo lo que necesitas saber sobre cómo llega tu pedido.</p>
      <div className="mt-12 space-y-8">
        <div className="admin-card"><h2 className="font-nohemi font-bold text-h4 mb-3">🚚 Envío estándar</h2><p className="text-body text-neutral-charcoal/80">Entrega en 3–7 días hábiles a cualquier parte de México. Costo: $149 MXN.</p><p className="text-body text-brand-rose font-semibold mt-2">¡Envío GRATIS en compras mayores a $999!</p></div>
        <div className="admin-card"><h2 className="font-nohemi font-bold text-h4 mb-3">📦 Seguimiento</h2><p className="text-body text-neutral-charcoal/80">Te enviamos un número de rastreo por email y WhatsApp para que sigas tu pedido en todo momento.</p></div>
        <div className="admin-card"><h2 className="font-nohemi font-bold text-h4 mb-3">🔄 Devoluciones</h2><p className="text-body text-neutral-charcoal/80">Si la talla no es la correcta, tienes 15 días para hacer un cambio sin costo adicional. Contáctanos a hola@estiloperron.mx.</p></div>
        <div className="admin-card"><h2 className="font-nohemi font-bold text-h4 mb-3">⏱ Pedidos personalizados</h2><p className="text-body text-neutral-charcoal/80">Los productos con personalización requieren 3–5 días hábiles adicionales de producción antes del envío.</p></div>
      </div>
    </div>
  );
}
