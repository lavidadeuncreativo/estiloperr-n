'use client';
import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useDataStore } from '@/lib/data/store';
import { formatPrice } from '@/lib/utils';
import { 
  User, 
  Lock, 
  Plus, 
  Heart, 
  Star, 
  Gift, 
  Calendar, 
  Trash2, 
  ChevronRight, 
  LogOut,
  Sparkles,
  PawPrint,
  ArrowRight
} from 'lucide-react';

export default function PerrhijosVIPPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(true);
  
  const dogProfiles = useDataStore(s => s.dogProfiles);
  const removeDogProfile = useDataStore(s => s.removeDogProfile);
  const products = useDataStore(s => s.products);

  // Suggested premium products for VIPs
  const vipOffers = useMemo(() => 
    products.filter(p => (p.is_featured || p.is_new) && p.is_visible).slice(0, 3)
  , [products]);

  useEffect(() => {
    const auth = localStorage.getItem('estilo-perron-user-auth');
    if (auth === 'true') setIsAuthenticated(true);
    setLoading(false);
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simple demo auth
    setTimeout(() => {
      localStorage.setItem('estilo-perron-user-auth', 'true');
      setIsAuthenticated(true);
      setLoading(false);
    }, 600);
  };

  const handleLogout = () => {
    localStorage.removeItem('estilo-perron-user-auth');
    setIsAuthenticated(false);
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-brand-rose border-t-transparent" />
      </div>
    );
  }

  // --- LOGIN VIEW ---
  if (!isAuthenticated) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center bg-neutral-surface-gray/30 px-6 py-12">
        <div className="w-full max-w-md">
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-brand-rose/10 text-brand-rose rounded-full mb-6">
              <PawPrint size={40} />
            </div>
            <h1 className="font-nohemi text-h1 font-extrabold text-neutral-near-black">Perrhijos VIP</h1>
            <p className="text-body-lg text-neutral-soft-gray mt-2">Accede a beneficios exclusivos para tu mejor amigo</p>
          </div>

          <div className="bg-white rounded-3xl-brand shadow-elevated p-8 md:p-10">
            <form onSubmit={handleLogin} className="space-y-5">
              <div>
                <label className="text-meta font-bold text-neutral-charcoal mb-2 block">Email</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-soft-gray">✉️</span>
                  <input 
                    type="email" 
                    required
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="tu@email.com"
                    className="w-full pl-12 pr-4 py-3.5 rounded-pill border border-neutral-stone/40 focus:border-brand-rose outline-none transition-all"
                  />
                </div>
              </div>
              <div>
                <label className="text-meta font-bold text-neutral-charcoal mb-2 block">Contraseña</label>
                <div className="relative">
                  <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-soft-gray" />
                  <input 
                    type="password" 
                    required
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-12 pr-4 py-3.5 rounded-pill border border-neutral-stone/40 focus:border-brand-rose outline-none transition-all"
                  />
                </div>
              </div>
              <button type="submit" className="w-full btn-pill-lg btn-primary shadow-brand-rose/20 shadow-lg">
                Entrar al Club
              </button>
            </form>
            
            <div className="mt-8 pt-8 border-t border-neutral-stone/10">
              <p className="text-center text-meta font-bold text-neutral-soft-gray mb-6 uppercase tracking-widest">O conéctate con</p>
              <div className="grid grid-cols-2 gap-3">
                <button className="flex items-center justify-center gap-2 py-3 rounded-pill border border-neutral-stone/30 hover:bg-neutral-surface-gray transition-colors text-small font-bold">
                  <span className="text-lg leading-none">🌐</span> Google
                </button>
                <button className="flex items-center justify-center gap-2 py-3 rounded-pill border border-neutral-stone/30 hover:bg-neutral-surface-gray transition-colors text-small font-bold">
                  <span className="text-lg leading-none">📸</span> Instagram
                </button>
                <button className="flex items-center justify-center gap-2 py-3 rounded-pill border border-neutral-stone/30 hover:bg-neutral-surface-gray transition-colors text-small font-bold">
                  <span className="text-lg leading-none">👥</span> Facebook
                </button>
                <button className="flex items-center justify-center gap-2 py-3 rounded-pill border border-neutral-stone/30 hover:bg-neutral-surface-gray transition-colors text-small font-bold">
                  <span className="text-lg leading-none">🍎</span> Apple
                </button>
                <button className="col-span-2 flex items-center justify-center gap-2 py-3 rounded-pill border border-neutral-stone/30 hover:bg-neutral-surface-gray transition-colors text-small font-bold">
                  <span className="text-lg leading-none">📱</span> Número de teléfono
                </button>
              </div>
              
              <Link href="/registra-a-tu-perrhijo" className="block mt-8 text-center text-small font-bold text-brand-rose hover:underline">
                ¿Aún no eres miembro? Registra a tu perrhijo
              </Link>
            </div>
          </div>
          
          <p className="mt-8 text-center text-caption text-neutral-soft-gray">
             Al unirte aceptas recibir amor ilimitado y promociones perronas.
          </p>
        </div>
      </div>
    );
  }

  // --- DASHBOARD VIEW ---
  return (
    <div className="bg-neutral-surface-gray/30 min-h-screen pb-20">
      {/* Header Profile */}
      <section className="bg-white border-b border-neutral-stone/10 pt-16 pb-10">
        <div className="section-container">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="flex items-center gap-6">
              <div className="w-24 h-24 rounded-full bg-brand-blush/40 flex items-center justify-center text-brand-rose/80">
                <User size={48} />
              </div>
              <div>
                <span className="badge bg-brand-lime text-neutral-near-black mb-2">Miembro Fundador</span>
                <h1 className="font-nohemi text-h2 font-extrabold text-neutral-near-black">¡Qué onda, humano! 👋</h1>
                <p className="text-body text-neutral-soft-gray">Bienvenido a tu portal VIP de Estilo Perrón.</p>
              </div>
            </div>
            <button onClick={handleLogout} className="btn-pill-sm btn-ghost hover:text-red-500 flex items-center gap-2">
              <LogOut size={16} /> Cerrar Sesión
            </button>
          </div>
        </div>
      </section>

      <div className="section-container mt-10 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: My Dogs */}
        <div className="lg:col-span-2 space-y-8">
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-nohemi text-h3 font-bold text-neutral-near-black">Mis Perrhijos</h2>
              <Link href="/registra-a-tu-perrhijo" className="btn-pill-sm btn-outline flex items-center gap-2">
                 <Plus size={16} /> Agregar otro
              </Link>
            </div>
            
            {dogProfiles.length === 0 ? (
              <div className="bg-white rounded-3xl-brand border-2 border-dashed border-neutral-stone/30 p-12 text-center">
                <PawPrint size={48} className="mx-auto mb-4 text-neutral-stone" />
                <p className="text-body font-medium text-neutral-charcoal">Aún no has registrado a ningún perrhijo</p>
                <p className="text-small text-neutral-soft-gray mt-1">Regístralo para encontrar su talla y recibir beneficios.</p>
                <Link href="/registra-a-tu-perrhijo" className="btn-pill-md btn-primary mt-6">Registrar ahora</Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {dogProfiles.map(dog => (
                  <div key={dog.id} className="bg-white rounded-2xl-brand p-6 shadow-card hover:shadow-elevated transition-all group">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-16 rounded-2xl bg-brand-rose/5 text-brand-rose flex items-center justify-center">
                           <span className="text-3xl">🐕</span>
                        </div>
                        <div>
                          <h3 className="font-nohemi font-bold text-h4 text-neutral-near-black">{dog.name}</h3>
                          <p className="text-caption font-bold text-brand-rose">Talla: {dog.recommended_size}</p>
                        </div>
                      </div>
                      <button onClick={() => removeDogProfile(dog.id)} className="p-2 text-neutral-stone hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Trash2 size={16} />
                      </button>
                    </div>
                    <div className="mt-6 pt-4 border-t border-neutral-stone/10 flex items-center justify-between text-meta">
                      <span className="text-neutral-soft-gray">Perfil completo</span>
                      <Link href="/tienda" className="flex items-center gap-1 text-neutral-charcoal hover:text-brand-rose transition-colors font-bold">
                        Comprar para {dog.name} <ChevronRight size={14} />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Exclusive Offers */}
          <div>
             <h2 className="font-nohemi text-h3 font-bold text-neutral-near-black mb-6">Preventas y Ofertas VIP</h2>
             <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {vipOffers.map(product => (
                  <Link href={`/producto/${product.slug}`} key={product.id} className="bg-white rounded-xl-brand overflow-hidden shadow-card hover:-translate-y-1 transition-all">
                    <div className="aspect-square relative">
                       <Image 
                         src={useDataStore.getState().getProductPrimaryImage(product.id)} 
                         alt={product.title} 
                         fill 
                         className="object-cover" 
                       />
                       <div className="absolute top-2 right-2">
                         <span className="badge bg-brand-rose text-white text-[10px]">10% VIP OFF</span>
                       </div>
                    </div>
                    <div className="p-4">
                      <p className="font-bold text-small truncate">{product.title}</p>
                      <p className="text-caption text-neutral-soft-gray mt-1">Precio Miembro: <span className="text-emerald-600 font-bold">{formatPrice(product.base_price * 0.9)}</span></p>
                    </div>
                  </Link>
                ))}
             </div>
          </div>
        </div>

        {/* Right Column: Benefits & Community */}
        <div className="space-y-8">
           <div className="bg-neutral-near-black text-white rounded-3xl-brand p-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-brand-rose/20 rounded-full blur-3xl -mr-16 -mt-16" />
              <Star className="text-brand-lime mb-4" size={32} />
              <h3 className="font-nohemi text-h3 font-bold mb-4">Tus Beneficios VIP</h3>
              <ul className="space-y-4">
                {[
                  { icon: <Gift size={18} />, text: 'Regalo sorpresa en tu cumpleaños' },
                  { icon: <Sparkles size={18} />, text: 'Acceso anticipado a colecciones' },
                  { icon: <Heart size={18} />, text: 'Cupón de 10% en cada compra' },
                  { icon: <Calendar size={18} />, text: 'Invitación a eventos perrunos' },
                ].map((b, i) => (
                  <li key={i} className="flex items-center gap-3 text-small opacity-90">
                    <span className="text-brand-rose">{b.icon}</span>
                    {b.text}
                  </li>
                ))}
              </ul>
              <button className="w-full mt-8 py-3 bg-brand-rose rounded-pill font-bold hover:bg-brand-rose/90 transition-all">
                Ver mi cupón
              </button>
           </div>

           <div className="bg-brand-blush/20 rounded-3xl-brand p-8 border border-brand-blush">
              <h3 className="font-nohemi text-h4 font-bold text-neutral-near-black mb-3">Una Huella a la Vez</h3>
              <p className="text-small text-neutral-charcoal leading-relaxed mb-6">
                Como miembro VIP, tus compras ayudan directamente a financiar rescates y rehabilitaciones.
              </p>
              <Link href="/adopta-un-amigo" className="text-caption font-bold text-brand-rose flex items-center gap-2 hover:underline">
                 Conoce el impacto que estás logrando <ArrowRight size={14} />
              </Link>
           </div>
        </div>
      </div>
    </div>
  );
}
