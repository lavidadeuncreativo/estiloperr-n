'use client';
import Image from 'next/image';
import Link from 'next/link';
import { Heart, PawPrint, Home, Gift } from 'lucide-react';
import { useRef, useEffect } from 'react';

function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { el.classList.add('animate-section-reveal'); el.style.opacity = '1'; obs.disconnect(); }
    }, { threshold: 0.1 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return ref;
}

export default function AdoptaUnAmigoPage() {
  const revealHero = useReveal();
  const revealStory = useReveal();
  const revealVision = useReveal();
  const revealCTA = useReveal();

  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section */}
      <section ref={revealHero} className="relative h-[80vh] min-h-[600px] flex items-center justify-center overflow-hidden opacity-0">
        <div className="absolute inset-0 z-0">
          <Image 
            src="/products/IMG_1267.PNG" 
            alt="Perrito rescatado" 
            fill 
            className="object-cover brightness-[0.7]" 
            priority
          />
        </div>
        <div className="relative z-10 text-center text-white px-6 max-w-4xl">
          <span className="inline-block py-1.5 px-4 bg-brand-rose rounded-full text-white font-nohemi text-caption font-bold mb-6 tracking-widest uppercase">
            Una Huella a la Vez 🐾
          </span>
          <h1 className="font-nohemi text-hero-display leading-[0.95] mb-8">
            Más que una marca, <br/>
            <span className="italic font-light">una misión de amor.</span>
          </h1>
          <p className="text-body-lg md:text-h4 font-light max-w-2xl mx-auto opacity-90 mb-10">
            Rescatamos, rehabilitamos y encontramos hogares para los perritos que el mundo olvidó.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="#historia" className="btn-pill-lg bg-white text-neutral-near-black hover:bg-neutral-surface-gray">
              Conoce nuestra historia
            </a>
            <Link href="/tienda" className="btn-pill-lg btn-primary">
              Ayuda comprando <Heart size={18} className="fill-current" />
            </Link>
          </div>
        </div>
      </section>

      {/* Connection Section */}
      <section className="py-20 bg-neutral-surface-gray">
        <div className="section-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <h2 className="font-nohemi text-h1 font-extrabold text-neutral-near-black leading-tight">
                El motor de <br/>
                <span className="text-brand-rose">Estilo Perrón.</span>
              </h2>
              <div className="space-y-6 text-body-lg text-neutral-charcoal">
                <p>
                  <strong>Estilo Perrón</strong> y <strong>Una Huella a la Vez</strong> están profundamente conectadas.
                </p>
                <p>
                  Estilo Perrón es la marca que genera recursos y comunidad. Es la forma en la que celebramos el vínculo con nuestros perrhijos.
                </p>
                <p>
                  <strong>Una Huella a la Vez</strong> es el proyecto social detrás de cada prenda: nuestra misión de rescatar y rehabilitar perros abandonados.
                </p>
                <div className="bg-brand-blush/30 p-8 rounded-xl-brand border-l-4 border-brand-rose italic">
                  &quot;Nuestra visión a largo plazo es que un porcentaje de las ventas de Estilo Perrón contribuya directamente al rescate y cuidado de perros en situación de calle.&quot;
                </div>
              </div>
            </div>
            <div className="relative aspect-square rounded-2xl-brand overflow-hidden shadow-elevated">
              <Image src="/products/IMG_1261.PNG" alt="Rescate animal" fill className="object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* The Story Section */}
      <section id="historia" ref={revealStory} className="py-24 opacity-0">
        <div className="section-container max-w-5xl">
          <div className="text-center mb-16">
            <h2 className="font-nohemi text-h1 font-extrabold text-neutral-near-black">La historia de Mar</h2>
            <div className="w-24 h-1.5 bg-brand-rose mx-auto mt-4 rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20 items-center">
            <div className="relative aspect-[3/4] rounded-2xl-brand overflow-hidden">
              <Image src="/products/IMG_1259.PNG" alt="Mariana y sus perros" fill className="object-cover" />
            </div>
            <div className="space-y-6 text-body text-neutral-charcoal leading-relaxed">
              <p>
                La marca fue fundada por <strong>Mariana</strong>, a quien todos conocen como Mar. Desde pequeña, Mar ha vivido rodeada de animales; su vida siempre ha tenido cuatro patas y un corazón peludo.
              </p>
              <p>
                Para Mar, los perros no son solo mascotas. Son compañeros de vida, son energía pura que llega al mundo a enseñar lo que es el amor incondicional.
              </p>
              <p>
                Hoy comparte su vida con <strong>Latte</strong>, un cocker spaniel de 15 años, y con <strong>Lobito</strong>, un valiente perrito rescatado de la calle.
              </p>
            </div>
          </div>

          <div className="space-y-12 bg-neutral-near-black text-white p-10 md:p-16 rounded-3xl-brand shadow-card relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-brand-rose/20 rounded-full blur-3xl -mr-32 -mt-32"></div>
            <h3 className="font-nohemi text-h2 font-bold mb-8 relative z-10">El momento que cambió todo</h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 relative z-10">
              <div className="space-y-6 opacity-90">
                <p>
                  Todo comenzó cuando Mar y un amigo rescataron unos cachorros abandonados en una carretera. Pasaron horas en un matorral para evitar que fueran atropellados.
                </p>
                <p>
                  Sin un plan, Mar los llevó a su departamento, los cuidó y les buscó hogar. Esas fueron las primeras de muchas adopciones.
                </p>
              </div>
              <div className="space-y-6 opacity-90">
                <p>
                  Mar descubrió que había muchísima gente dispuesta a ayudar, pero faltaba el canal para conectar ese deseo con la necesidad. Así nació <strong>Una Huella a la Vez</strong>.
                </p>
                <p>
                  Pero el amor no era suficiente cuando uno de los perros necesitó una cirugía costosa. Para rescatar más, se necesitaban recursos. <strong>Así nació Estilo Perrón</strong>.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Cards Section */}
      <section ref={revealVision} className="py-24 bg-brand-aqua/20 opacity-0">
        <div className="section-container">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="font-nohemi text-h2 md:text-h1 font-extrabold text-neutral-near-black mb-6">
              Una adopción a la vez. <br/>
              <span className="italic font-light">Una huella a la vez.</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="admin-card bg-white p-10 text-center hover:scale-[1.02] transition-transform">
              <div className="w-16 h-16 bg-brand-rose/10 rounded-full flex items-center justify-center text-brand-rose mx-auto mb-6">
                <PawPrint size={32} />
              </div>
              <h3 className="font-nohemi text-h4 font-bold mb-4">Rescate</h3>
              <p className="text-neutral-charcoal opacity-80">
                Sacamos a perritos de situaciones de peligro, abandono y maltrato en las calles de México.
              </p>
            </div>

            <div className="admin-card bg-white p-10 text-center hover:scale-[1.02] transition-transform">
              <div className="w-16 h-16 bg-brand-lime/20 rounded-full flex items-center justify-center text-brand-rose mx-auto mb-6">
                <Heart size={32} className="fill-brand-rose" />
              </div>
              <h3 className="font-nohemi text-h4 font-bold mb-4">Rehabilitación</h3>
              <p className="text-neutral-charcoal opacity-80">
                Brindamos atención médica, cirugías, vacunas y, sobre todo, el amor que necesitan para sanar.
              </p>
            </div>

            <div className="admin-card bg-white p-10 text-center hover:scale-[1.02] transition-transform">
              <div className="w-16 h-16 bg-brand-aqua/20 rounded-full flex items-center justify-center text-neutral-near-black mx-auto mb-6">
                <Home size={32} />
              </div>
              <h3 className="font-nohemi text-h4 font-bold mb-4">Hogar</h3>
              <p className="text-neutral-charcoal opacity-80">
                Filtramos y educamos a las familias para asegurar que cada perrito llegue al hogar definitivo que merece.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section ref={revealCTA} className="py-24 opacity-0">
        <div className="section-container">
          <div className="bg-brand-rose rounded-3xl-brand p-12 md:p-20 text-center text-white relative overflow-hidden">
            <div className="absolute top-0 left-0 w-32 h-32 bg-white/10 rounded-full -ml-16 -mt-16 animate-pulse"></div>
            <div className="absolute bottom-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mb-32"></div>
            
            <h2 className="font-nohemi text-h1 md:text-[4rem] font-extrabold mb-8 relative z-10 leading-none">
              ¿Quieres ser parte <br/>del cambio?
            </h2>
            <p className="text-h4 font-light mb-12 opacity-90 max-w-2xl mx-auto relative z-10">
              Cada compra en Estilo Perrón es una oportunidad para cambiar la vida de un perro. Juntos estamos dejando huella.
            </p>
            
            <div className="flex flex-wrap justify-center gap-6 relative z-10">
              <Link href="/tienda" className="btn-pill-lg bg-white text-brand-rose hover:bg-neutral-surface-gray font-bold px-10">
                Ir a la tienda <Gift className="ml-2" />
              </Link>
              <button className="btn-pill-lg border-2 border-white text-white hover:bg-white/10 font-bold px-10">
                Donar ahora <Heart className="ml-2" />
              </button>
            </div>
            
            <div className="mt-12 pt-8 border-t border-white/20 relative z-10">
              <p className="font-nohemi text-small tracking-wider uppercase opacity-80">
                Sigue nuestra labor en Instagram <br/>
                <a href="https://instagram.com" className="font-bold border-b-2 border-white pb-0.5 hover:opacity-100 transition-opacity">@UnaHuellaALaVez</a>
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
