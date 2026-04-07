'use client';
import Image from 'next/image';
import Link from 'next/link';
import { Heart, ArrowRight, PawPrint, Star } from 'lucide-react';
import { useRef, useEffect } from 'react';

function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { el.classList.add('animate-reveal-up'); el.style.opacity = '1'; obs.disconnect(); }
    }, { threshold: 0.1 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return ref;
}

export default function HistoriaPage() {
  const reveal1 = useReveal();
  const reveal2 = useReveal();
  const reveal3 = useReveal();

  return (
    <div className="bg-white pb-20">
      {/* Hero Header */}
      <section className="bg-brand-rose py-20 text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full -mr-48 -mt-48 blur-3xl"></div>
        <div className="section-container relative z-10">
          <div className="max-w-3xl">
            <span className="font-nohemi text-caption font-bold tracking-[0.2em] uppercase opacity-80 mb-4 block">Nuestra Alma</span>
            <h1 className="font-nohemi text-hero-display leading-[0.95] mb-8">
              Donde el amor se <br/>
              <span className="italic font-light">convierte en estilo.</span>
            </h1>
            <p className="text-h4 font-light opacity-90 leading-relaxed">
              Estilo Perrón nace del amor profundo por los perros y de la convicción de que merecen una vida digna y una segunda oportunidad.
            </p>
          </div>
        </div>
      </section>

      {/* Mar Section */}
      <section ref={reveal1} className="py-24 opacity-0 transition-all duration-700">
        <div className="section-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="relative aspect-square rounded-3xl-brand overflow-hidden shadow-elevated">
              <Image src="/products/IMG_1259.PNG" alt="Mar y sus perrhijos" fill className="object-cover" />
              <div className="absolute bottom-6 left-6 bg-white/90 backdrop-blur-sm p-4 rounded-xl-brand shadow-card">
                <p className="font-nohemi text-small font-bold text-neutral-near-black">Mariana (Mar)</p>
                <p className="text-caption text-neutral-soft-gray font-medium">Fundadora de Estilo Perrón</p>
              </div>
            </div>
            
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 p-2 bg-brand-blush/40 rounded-pill text-brand-rose px-4">
                <Star size={16} className="fill-current" />
                <span className="text-caption font-bold uppercase tracking-wider">El origen</span>
              </div>
              
              <h2 className="font-nohemi text-h1 font-extrabold text-neutral-near-black leading-tight">
                Una vida dedicada <br/>a ellos.
              </h2>
              
              <div className="space-y-6 text-body-lg text-neutral-charcoal leading-relaxed">
                <p>
                  Mar siempre ha vivido rodeada de animales. Creció con perros, practicó equitación y siempre fue esa persona que en cualquier reunión terminaba acariciando al perro de la casa o comprando comida para un perrito que encontraba en la calle.
                </p>
                <p>
                  Para Mar, los perros no son solo mascotas. <strong>Son compañeros de vida.</strong> Son energía que llega al mundo a dar amor incondicional.
                </p>
                <p>
                  Hoy comparte su vida con <strong>Latte</strong>, un cocker spaniel de 15 años, y con <strong>Lobito</strong>, un valiente perrito rescatado de la calle que le recuerda todos los días por qué hacemos esto.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The Rescue Block */}
      <section ref={reveal2} className="py-24 bg-neutral-near-black text-white overflow-hidden opacity-0 transition-all duration-700">
        <div className="section-container relative">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <PawPrint size={48} className="mx-auto mb-8 text-brand-rose animate-bounce" />
            <h2 className="font-nohemi text-h1 md:text-hero-display font-bold leading-none mb-8 italic">El rescate que lo cambió todo.</h2>
            <div className="space-y-8 text-h4 font-light opacity-90 leading-relaxed text-left md:text-center">
              <p>
                Todo comenzó cuando, junto con un amigo muy querido, rescataron unos cachorros abandonados en una carretera. Pasaron horas tratando de sacarlos de un matorral para evitar que fueran atropellados.
              </p>
              <p>
                Sin tener un plan claro, Mar los llevó a su departamento, los limpiaron, los cuidaron y comenzaron a buscarles hogar. <strong>Esas fueron las primeras adopciones.</strong>
              </p>
            </div>
          </div>
          
          <div className="flex justify-center mt-12">
            <Link href="/adopta-un-amigo" className="btn-pill-lg bg-brand-rose text-white hover:bg-brand-rose/90 font-bold px-10 flex items-center gap-3">
              Conoce Una Huella a la Vez <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </section>

      {/* The Mission Section */}
      <section ref={reveal3} className="py-24 opacity-0 transition-all duration-700">
        <div className="section-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8 order-2 lg:order-1">
              <h2 className="font-nohemi text-h1 font-extrabold text-neutral-near-black leading-tight">
                Moda con <br/>
                <span className="text-brand-rose italic underline decoration-4 underline-offset-8">Propósito.</span>
              </h2>
              
              <div className="space-y-6 text-body-lg text-neutral-charcoal leading-relaxed">
                <p>
                  Mar descubrió algo importante: El problema no era solo la cantidad de perros en la calle. También existía muchísima gente dispuesta a ayudar, donar o adoptar. <strong>Solo faltaba el canal para conectarlos.</strong>
                </p>
                <p>
                  Pero ayudar también requiere recursos. Cuando uno de los perros rescatados necesitó una cirugía costosa, Mar entendió que el amor por sí solo no era suficiente. Para rescatar más perros, necesitaba crear algo que también generara ingresos.
                </p>
                <div className="p-8 bg-brand-blush/30 rounded-2xl-brand border-l-8 border-brand-rose">
                   <p className="font-nohemi text-h4 font-bold text-neutral-near-black italic uppercase mb-2">Así nació Estilo Perrón.</p>
                   <p className="text-body text-neutral-charcoal font-medium">Una marca que celebra el vínculo entre humanos y sus perrijos, mientras construye un modelo que permite financiar rescates y apoyar la causa del bienestar animal.</p>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-4 pt-6">
                <Link href="/tienda" className="btn-pill-lg btn-primary">
                  Ver la tienda
                </Link>
                <Link href="/adopta-un-amigo" className="btn-pill-lg btn-outline">
                  Donar o Adoptar <Heart size={18} className="ml-2" />
                </Link>
              </div>
            </div>
            
            <div className="relative aspect-[4/5] rounded-3xl-brand overflow-hidden shadow-card order-1 lg:order-2">
              <Image src="/products/IMG_1267.PNG" alt="Nuestra misión" fill className="object-cover" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
