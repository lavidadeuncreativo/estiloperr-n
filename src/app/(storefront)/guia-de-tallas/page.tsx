import Link from 'next/link';

export default function GuiaDeTallasPage() {
  const sizes = [
    { size: 'XS', chest: '25–30', neck: '18–22', back: '18–22', weight: '1–3 kg' },
    { size: 'S', chest: '30–38', neck: '22–28', back: '22–28', weight: '3–6 kg' },
    { size: 'M', chest: '38–48', neck: '28–34', back: '28–35', weight: '6–12 kg' },
    { size: 'L', chest: '48–58', neck: '34–42', back: '35–45', weight: '12–20 kg' },
    { size: 'XL', chest: '58–70', neck: '42–50', back: '45–55', weight: '20–30 kg' },
  ];

  return (
    <div className="section-container py-12 md:py-20 max-w-4xl mx-auto">
      <h1 className="font-nohemi text-h1 font-extrabold text-neutral-near-black text-center">Guía de Tallas</h1>
      <p className="text-body-lg text-neutral-soft-gray text-center mt-4 max-w-xl mx-auto">Encuentra la talla perfecta para tu perrhijo. Si tienes dudas, nuestro <Link href="/registra-a-tu-perrhijo" className="text-brand-rose hover:underline">asistente de tallas</Link> te ayuda en 2 minutos.</p>

      <div className="mt-12 overflow-x-auto">
        <table className="w-full border-collapse">
          <thead><tr className="bg-brand-rose text-white">
            <th className="px-6 py-4 text-left font-nohemi font-bold rounded-tl-lg-brand">Talla</th>
            <th className="px-6 py-4 text-left font-nohemi font-bold">Pecho (cm)</th>
            <th className="px-6 py-4 text-left font-nohemi font-bold">Cuello (cm)</th>
            <th className="px-6 py-4 text-left font-nohemi font-bold">Largo (cm)</th>
            <th className="px-6 py-4 text-left font-nohemi font-bold rounded-tr-lg-brand">Peso aprox.</th>
          </tr></thead>
          <tbody>
            {sizes.map((s, i) => (
              <tr key={s.size} className={i % 2 === 0 ? 'bg-white' : 'bg-neutral-surface-gray'}>
                <td className="px-6 py-4 font-nohemi font-bold text-h4 text-brand-rose">{s.size}</td>
                <td className="px-6 py-4 text-body">{s.chest}</td>
                <td className="px-6 py-4 text-body">{s.neck}</td>
                <td className="px-6 py-4 text-body">{s.back}</td>
                <td className="px-6 py-4 text-body">{s.weight}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-12 bg-brand-aqua/40 rounded-xl-brand p-8">
        <h2 className="font-nohemi text-h3 font-bold text-neutral-near-black mb-4">¿Cómo medir a tu perrhijo?</h2>
        <ul className="space-y-3 text-body text-neutral-charcoal">
          <li><strong>Pecho:</strong> Mide la parte más ancha del pecho, justo detrás de las patas delanteras.</li>
          <li><strong>Cuello:</strong> Mide alrededor del cuello donde normalmente iría un collar.</li>
          <li><strong>Largo:</strong> Mide desde la base del cuello hasta la base de la cola.</li>
        </ul>
        <p className="text-small text-neutral-soft-gray mt-4">💡 Si tu perrhijo está entre dos tallas, recomendamos elegir la talla más grande para mayor comodidad.</p>
      </div>

      <div className="text-center mt-10">
        <Link href="/registra-a-tu-perrhijo" className="btn-pill-lg btn-primary">Encontrar mi talla automáticamente 🐾</Link>
      </div>
    </div>
  );
}
