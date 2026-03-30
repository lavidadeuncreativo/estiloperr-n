'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Lock } from 'lucide-react';

export default function AdminLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simplified admin access — replace with Supabase Auth when configured
    if (email && password) {
      router.push('/admin');
    }
  };

  return (
    <div className="min-h-screen bg-neutral-offwhite flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <span className="font-nohemi text-3xl font-extrabold text-neutral-near-black">
            Estilo<span className="text-brand-rose">Perrón</span>
          </span>
          <p className="text-body text-neutral-soft-gray mt-2">Panel de administración</p>
        </div>
        <form onSubmit={handleLogin} className="admin-card space-y-4">
          <div>
            <label className="text-meta font-medium text-neutral-charcoal mb-1.5 block">Email</label>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="admin@estiloperron.mx" className="w-full rounded-pill border border-neutral-stone/40 px-4 py-3 text-small focus:outline-none focus:ring-2 focus:ring-brand-rose/30" />
          </div>
          <div>
            <label className="text-meta font-medium text-neutral-charcoal mb-1.5 block">Contraseña</label>
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" className="w-full rounded-pill border border-neutral-stone/40 px-4 py-3 text-small focus:outline-none focus:ring-2 focus:ring-brand-rose/30" />
          </div>
          <button type="submit" className="w-full btn-pill-lg btn-primary"><Lock size={18} /> Iniciar sesión</button>
        </form>
        <p className="text-center text-caption text-neutral-soft-gray mt-6">
          Acceso autorizado. Para el MVP ingresa cualquier email/contraseña.
        </p>
      </div>
    </div>
  );
}
