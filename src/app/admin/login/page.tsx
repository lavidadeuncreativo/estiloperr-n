'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Lock, Mail, ArrowRight } from 'lucide-react';

export default function AdminLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // Redirect if already logged in
  useEffect(() => {
    const auth = localStorage.getItem('estilo-perron-admin-auth');
    if (auth === 'true') {
      router.push('/admin');
    }
  }, [router]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Hardcoded credentials for Demo/Initial Phase
    const ADMIN_EMAIL = 'admin@estiloperron.com';
    const ADMIN_PASS = 'Perron2026!!';

    setTimeout(() => {
      if (email === ADMIN_EMAIL && password === ADMIN_PASS) {
        localStorage.setItem('estilo-perron-admin-auth', 'true');
        router.push('/admin');
      } else {
        setError('Credenciales inválidas. Por favor intenta de nuevo.');
        setLoading(false);
      }
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-surface-gray px-6 py-12">
      <div className="w-full max-w-md">
        {/* Logo Section */}
        <div className="text-center mb-10 animate-reveal-up">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-brand-rose text-white rounded-2xl shadow-lg mb-6">
            <span className="font-nohemi text-3xl font-extrabold tracking-tighter">EP</span>
          </div>
          <h1 className="font-nohemi text-h2 font-extrabold text-neutral-near-black">
            Panel de Administración
          </h1>
          <p className="text-body text-neutral-soft-gray mt-2">Bienvenido de nuevo a Estilo Perrón.</p>
        </div>

        {/* Login Card */}
        <div className="bg-white rounded-3xl-brand shadow-elevated p-8 md:p-10 border border-neutral-stone/10 animate-fade-up">
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-red-50 text-red-600 p-4 rounded-xl-brand text-small font-medium border border-red-100 flex items-center gap-3">
                <span className="text-xl">⚠️</span> {error}
              </div>
            )}

            <div className="space-y-2">
              <label className="text-meta font-bold text-neutral-charcoal block px-1">Correo Electrónico</label>
              <div className="relative group">
                <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-soft-gray group-focus-within:text-brand-rose transition-colors" />
                <input 
                  type="email" 
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="admin@estiloperron.mx"
                  required
                  className="w-full pl-12 pr-4 py-4 rounded-pill border border-neutral-stone/30 focus:border-brand-rose focus:ring-4 focus:ring-brand-rose/5 outline-none transition-all placeholder:text-neutral-stone"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-meta font-bold text-neutral-charcoal block px-1">Contraseña</label>
              <div className="relative group">
                <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-soft-gray group-focus-within:text-brand-rose transition-colors" />
                <input 
                  type="password" 
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full pl-12 pr-4 py-4 rounded-pill border border-neutral-stone/30 focus:border-brand-rose focus:ring-4 focus:ring-brand-rose/5 outline-none transition-all placeholder:text-neutral-stone"
                />
              </div>
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="w-full btn-pill-lg btn-primary shadow-brand-rose/20 shadow-xl disabled:opacity-50"
            >
              {loading ? (
                <div className="flex items-center gap-2">
                   <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                   Iniciando sesión...
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  Iniciar Sesión <ArrowRight size={18} />
                </div>
              )}
            </button>
          </form>

          <div className="mt-8 pt-8 border-t border-neutral-stone/10 text-center">
            <p className="text-caption text-neutral-soft-gray">
              ¿Olvidaste tu contraseña o tienes problemas de acceso? 
              <br /> Contacta a soporte técnico.
            </p>
          </div>
        </div>

        <div className="mt-8 text-center">
           <a href="/" className="text-small font-medium text-neutral-charcoal hover:text-brand-rose transition-colors">
              ← Volver a la página principal
           </a>
        </div>
      </div>
    </div>
  );
}
