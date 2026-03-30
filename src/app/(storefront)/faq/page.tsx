'use client';
import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const faqs = [
  { q: '¿Cómo elijo la talla correcta para mi perrhijo?', a: 'Usa nuestro asistente de tallas que te guía paso a paso, o consulta nuestra guía de tallas con medidas detalladas. Si tu perrhijo está entre dos tallas, siempre recomendamos la más grande.' },
  { q: '¿Cuánto tarda en llegar mi pedido?', a: 'Los pedidos estándar se entregan en 3–7 días hábiles a cualquier parte de México. Los pedidos con personalización requieren 3–5 días adicionales de producción.' },
  { q: '¿El envío es gratis?', a: '¡Sí! El envío es gratis en compras mayores a $999 MXN. Para montos menores, el costo de envío es de $149 MXN.' },
  { q: '¿Puedo personalizar los productos?', a: 'Muchos de nuestros productos permiten personalización como bordado del nombre de tu perrhijo. En cada producto verás si la opción está disponible.' },
  { q: '¿Qué pasa si la talla no le queda?', a: 'Tienes 15 días para solicitar un cambio de talla sin costo adicional. Solo contáctanos por email o WhatsApp.' },
  { q: '¿Los materiales son seguros para mi perro?', a: 'Absolutamente. Usamos algodón premium suave, costuras reforzadas y materiales hipoalergénicos. Todo está diseñado pensando en la comodidad y seguridad de tu perrhijo.' },
  { q: '¿Hacen donaciones?', a: 'Sí. Por cada compra donamos $10 MXN a refugios de animales para que más perrhijos encuentren un hogar lleno de amor.' },
  { q: '¿Cómo cuido las prendas?', a: 'Recomendamos lavar a máquina en frío, no usar secadora y planchar a baja temperatura. Cada producto incluye instrucciones específicas de cuidado.' },
];

export default function FAQPage() {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <div className="section-container py-12 md:py-20 max-w-3xl mx-auto">
      <h1 className="font-nohemi text-h1 font-extrabold text-neutral-near-black text-center">Preguntas Frecuentes</h1>
      <p className="text-body-lg text-neutral-soft-gray text-center mt-4">Todas las respuestas que necesitas sobre Estilo Perrón.</p>
      <div className="mt-12 space-y-3">
        {faqs.map((faq, i) => (
          <div key={i} className="admin-card cursor-pointer" onClick={() => setOpen(open === i ? null : i)}>
            <div className="flex items-center justify-between">
              <h3 className="font-nohemi font-semibold text-body text-neutral-near-black pr-4">{faq.q}</h3>
              <ChevronDown size={20} className={`shrink-0 text-neutral-soft-gray transition-transform duration-200 ${open === i ? 'rotate-180' : ''}`} />
            </div>
            {open === i && <p className="text-body text-neutral-charcoal/80 mt-3 pt-3 border-t border-neutral-stone/20">{faq.a}</p>}
          </div>
        ))}
      </div>
    </div>
  );
}
