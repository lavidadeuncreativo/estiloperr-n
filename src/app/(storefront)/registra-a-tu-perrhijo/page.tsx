'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useDataStore } from '@/lib/data/store';
import { WEIGHT_RANGE_LABELS, BODY_TYPE_LABELS, type WeightRange, type BodyType, type DogSize } from '@/lib/types';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { generateId } from '@/lib/utils';

const STEPS = ['nombre', 'peso', 'cuerpo', 'talla', 'resultado'] as const;

export default function DogRegistrationPage() {
  const [step, setStep] = useState(0);
  const [name, setName] = useState('');
  const [weightRange, setWeightRange] = useState<WeightRange | null>(null);
  const [bodyType, setBodyType] = useState<BodyType | null>(null);
  const [knownSize, setKnownSize] = useState<DogSize | null>(null);
  const [recommendedSize, setRecommendedSize] = useState<DogSize | null>(null);
  const sizeRules = useDataStore(s => s.sizeRules);
  const addDogProfile = useDataStore(s => s.addDogProfile);

  const currentStep = STEPS[step];
  const canNext = currentStep === 'nombre' ? name.trim().length > 0 :
                  currentStep === 'peso' ? weightRange !== null :
                  currentStep === 'cuerpo' ? bodyType !== null : true;

  const computeSize = () => {
    if (knownSize) return knownSize;
    const rule = sizeRules.find(r => r.weight_range === weightRange && r.body_type === bodyType && r.is_active);
    return rule?.recommended_size || 'M';
  };

  const handleNext = () => {
    if (currentStep === 'talla') {
      const size = computeSize();
      setRecommendedSize(size as DogSize);
      // Save profile
      addDogProfile({
        id: generateId(),
        name,
        weight_range: weightRange || undefined,
        body_type: bodyType || undefined,
        known_size: knownSize || undefined,
        recommended_size: size as DogSize,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      });
    }
    setStep(s => Math.min(s + 1, STEPS.length - 1));
  };

  return (
    <div className="min-h-[80vh] flex flex-col">
      {/* Progress Bar */}
      <div className="section-container pt-6 md:pt-10">
        <div className="flex items-center gap-2 mb-2">
          {step > 0 && currentStep !== 'resultado' && (
            <button onClick={() => setStep(s => s - 1)} className="p-2 hover:bg-neutral-surface-gray rounded-pill transition-colors" aria-label="Paso anterior">
              <ArrowLeft size={20} />
            </button>
          )}
          <span className="text-meta text-neutral-soft-gray font-medium">
            {currentStep !== 'resultado' ? `Paso ${step + 1} de ${STEPS.length - 1}` : '¡Listo!'}
          </span>
        </div>
        <div className="w-full bg-neutral-stone/30 rounded-full h-1.5 mb-8">
          <div className="bg-brand-rose h-1.5 rounded-full transition-all duration-500 ease-brand" style={{ width: `${((step + 1) / STEPS.length) * 100}%` }} />
        </div>
      </div>

      <div className="section-container flex-1 flex flex-col items-center justify-center max-w-2xl mx-auto px-6 pb-12">
        {/* Step 1: Name */}
        {currentStep === 'nombre' && (
          <div className="w-full text-center animate-fade-up">
            <div className="text-6xl mb-6">🐾</div>
            <h1 className="font-nohemi text-h1 font-extrabold text-neutral-near-black">
              ¿Cómo se llama tu perrhijo?
            </h1>
            <p className="text-body-lg text-neutral-soft-gray mt-3">
              Empecemos con lo más importante
            </p>
            <input
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="Ej: Luna, Rocky, Firulais..."
              maxLength={30}
              autoFocus
              className="mt-8 w-full max-w-md mx-auto text-center rounded-pill border-2 border-neutral-stone/40 px-6 py-4 text-h3 font-nohemi font-bold focus:outline-none focus:border-brand-rose transition-colors"
            />
          </div>
        )}

        {/* Step 2: Weight */}
        {currentStep === 'peso' && (
          <div className="w-full animate-fade-up">
            <div className="text-center mb-8">
              <h1 className="font-nohemi text-h1 font-extrabold text-neutral-near-black">
                ¿Qué tan grande es {name}?
              </h1>
              <p className="text-body-lg text-neutral-soft-gray mt-3">
                No necesitas la báscula, elige lo que más se parezca
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {(Object.entries(WEIGHT_RANGE_LABELS) as [WeightRange, typeof WEIGHT_RANGE_LABELS[WeightRange]][]).map(([key, val]) => (
                <button key={key} onClick={() => setWeightRange(key)}
                  className={`flex flex-col items-center gap-2 p-5 rounded-xl-brand border-2 transition-all duration-hover ${
                    weightRange === key ? 'border-brand-rose bg-brand-rose/5 shadow-card' : 'border-neutral-stone/30 hover:border-neutral-charcoal bg-white'
                  }`}
                >
                  <span className="text-3xl">{val.emoji}</span>
                  <span className="font-nohemi font-bold text-body text-neutral-near-black">{val.label}</span>
                  <span className="text-caption text-neutral-soft-gray">{val.range}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 3: Body Type */}
        {currentStep === 'cuerpo' && (
          <div className="w-full animate-fade-up">
            <div className="text-center mb-8">
              <h1 className="font-nohemi text-h1 font-extrabold text-neutral-near-black">
                ¿Cómo es el cuerpo de {name}?
              </h1>
              <p className="text-body-lg text-neutral-soft-gray mt-3">
                Esto nos ayuda a afinar la recomendación
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 max-w-xl mx-auto">
              {(Object.entries(BODY_TYPE_LABELS) as [BodyType, typeof BODY_TYPE_LABELS[BodyType]][]).map(([key, val]) => (
                <button key={key} onClick={() => setBodyType(key)}
                  className={`flex flex-col items-center gap-1.5 p-5 rounded-xl-brand border-2 transition-all duration-hover ${
                    bodyType === key ? 'border-brand-rose bg-brand-rose/5 shadow-card' : 'border-neutral-stone/30 hover:border-neutral-charcoal bg-white'
                  }`}
                >
                  <span className="font-nohemi font-bold text-body text-neutral-near-black">{val.label}</span>
                  <span className="text-meta text-neutral-soft-gray text-center">{val.description}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 4: Known Size */}
        {currentStep === 'talla' && (
          <div className="w-full animate-fade-up text-center">
            <h1 className="font-nohemi text-h1 font-extrabold text-neutral-near-black">
              ¿Ya sabes la talla de {name}?
            </h1>
            <p className="text-body-lg text-neutral-soft-gray mt-3">
              Si ya has comprado ropa para perro, elige su talla. Si no, no te preocupes.
            </p>
            <div className="flex flex-wrap justify-center gap-3 mt-8">
              {(['XS', 'S', 'M', 'L', 'XL'] as DogSize[]).map(size => (
                <button key={size} onClick={() => setKnownSize(size)}
                  className={`w-16 h-16 rounded-xl-brand border-2 font-nohemi font-bold text-h4 transition-all duration-hover ${
                    knownSize === size ? 'border-brand-rose bg-brand-rose text-white' : 'border-neutral-stone/40 hover:border-neutral-charcoal text-neutral-charcoal'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
            <button onClick={() => setKnownSize(null)} className={`mt-4 text-small ${!knownSize ? 'text-brand-rose font-bold' : 'text-neutral-soft-gray hover:text-neutral-near-black'} transition-colors`}>
              No estoy seguro / No sé
            </button>
          </div>
        )}

        {/* Step 5: Result */}
        {currentStep === 'resultado' && (
          <div className="w-full text-center animate-fade-up">
            <div className="text-6xl mb-4">🎉</div>
            <h1 className="font-nohemi text-h1 font-extrabold text-neutral-near-black">
              ¡{name} ya tiene talla!
            </h1>
            <p className="text-body-lg text-neutral-soft-gray mt-3">
              Basado en lo que nos contaste, la talla recomendada es:
            </p>
            <div className="mt-8 inline-flex items-center justify-center w-32 h-32 rounded-full bg-brand-rose text-white">
              <span className="font-nohemi text-hero-display font-extrabold">{recommendedSize}</span>
            </div>
            <p className="text-body text-neutral-soft-gray mt-6 max-w-md mx-auto">
              Esta es una recomendación basada en peso y tipo de cuerpo. Siempre puedes consultar nuestra <Link href="/guia-de-tallas" className="text-brand-rose hover:underline">guía de tallas</Link> para medidas exactas.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center mt-8">
              <Link href="/tienda" className="btn-pill-lg btn-primary">
                Ir a comprar <ArrowRight size={18} />
              </Link>
              <Link href="/" className="btn-pill-lg btn-outline">
                Volver al inicio
              </Link>
            </div>
          </div>
        )}

        {/* Next Button */}
        {currentStep !== 'resultado' && (
          <div className="mt-10 w-full max-w-md">
            <button onClick={handleNext} disabled={!canNext}
              className="w-full btn-pill-lg btn-primary disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {currentStep === 'talla' ? 'Ver mi recomendación' : 'Siguiente'} <ArrowRight size={18} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
