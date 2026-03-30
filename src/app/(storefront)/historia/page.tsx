import Link from 'next/link';

export default function HistoriaPage() {
  return (
    <div className="section-container py-12 md:py-20 max-w-3xl mx-auto">
      <h1 className="font-nohemi text-h1 font-extrabold text-neutral-near-black text-center">Nuestra Historia</h1>
      <p className="text-body-lg text-neutral-soft-gray text-center mt-4 max-w-xl mx-auto">
        Cómo un amor incondicional por los perrhijos se convirtió en la marca de ropa canina más perrona de México.
      </p>
      <div className="mt-12 space-y-8 text-body text-neutral-charcoal/80 leading-relaxed">
        <p>Todo empezó con una idea simple pero poderosa: <strong className="text-neutral-near-black">si nuestros perrhijos son parte de la familia, merecen vestir con el mismo estilo y calidad que nosotros.</strong></p>
        <p>Estilo Perrón nació en la Ciudad de México, fundada por un equipo de amantes de los perros que se negaron a aceptar que la ropa para mascotas tenía que ser aburrida, genérica o de mala calidad.</p>
        <p>Nos inspiramos en las marcas de moda que admiramos y las adaptamos al mundo canino, creando piezas que no solo se ven increíbles, sino que están hechas con materiales premium, costuras reforzadas y un fit que realmente funciona para diferentes tipos de cuerpo perruno.</p>
        <div className="bg-brand-blush/30 rounded-xl-brand p-8 text-center">
          <p className="font-nohemi text-h3 font-bold text-neutral-near-black">&ldquo;No hacemos ropa para perros. Hacemos moda para perrhijos.&rdquo;</p>
        </div>
        <p>Cada pieza de Estilo Perrón está diseñada y producida en México, apoyando a talleres locales y utilizando materiales sustentables siempre que es posible.</p>
        <p>Además, por cada compra <strong className="text-brand-rose">donamos $10 a refugios de animales</strong> para que más perrhijos tengan la oportunidad de encontrar un hogar lleno de amor y, por qué no, mucho estilo.</p>
      </div>
      <div className="text-center mt-12">
        <Link href="/tienda" className="btn-pill-lg btn-primary">Conoce nuestras colecciones</Link>
      </div>
    </div>
  );
}
