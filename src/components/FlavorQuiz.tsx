import React, { useState } from 'react';
import { JUICE_PRODUCTS } from '../data/juiceData';
import { JuiceProduct } from '../types';

interface FlavorQuizProps {
  onAddPrescribedPack: (bottles: JuiceProduct[]) => void;
  onOpenCart: () => void;
}

export const FlavorQuiz: React.FC<FlavorQuizProps> = ({ onAddPrescribedPack, onOpenCart }) => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [answers, setAnswers] = useState({
    goal: '',
    flavor: '',
    timing: '',
    preference: '',
  });
  const [addedToast, setAddedToast] = useState(false);

  const totalSteps = 4;

  const handleSelect = (key: keyof typeof answers, value: string) => {
    setAnswers((prev) => ({ ...prev, [key]: value }));
    if (currentStep < totalSteps) {
      setCurrentStep((prev) => prev + 1);
    } else {
      setCurrentStep(5); // results
    }
  };

  const getPrescribedBottles = (): JuiceProduct[] => {
    // Generate intelligent prescription based on user choices
    if (answers.goal === 'clarity') {
      return [
        JUICE_PRODUCTS[0], // Electric Yuzu
        JUICE_PRODUCTS[0],
        JUICE_PRODUCTS[2], // Emerald Matcha
        JUICE_PRODUCTS[2],
        JUICE_PRODUCTS[1], // Dragon Blood
        JUICE_PRODUCTS[5], // Green flush
      ];
    } else if (answers.goal === 'calm') {
      return [
        JUICE_PRODUCTS[4], // Glacial Lavender Calm
        JUICE_PRODUCTS[4],
        JUICE_PRODUCTS[1], // Dragon Blood
        JUICE_PRODUCTS[1],
        JUICE_PRODUCTS[0],
        JUICE_PRODUCTS[5],
      ];
    } else if (answers.goal === 'metabolic') {
      return [
        JUICE_PRODUCTS[3], // Guava Habanero
        JUICE_PRODUCTS[3],
        JUICE_PRODUCTS[0], // Electric Yuzu
        JUICE_PRODUCTS[1],
        JUICE_PRODUCTS[2],
        JUICE_PRODUCTS[5],
      ];
    }
    // Default balanced pack
    return [
      JUICE_PRODUCTS[0],
      JUICE_PRODUCTS[1],
      JUICE_PRODUCTS[2],
      JUICE_PRODUCTS[3],
      JUICE_PRODUCTS[4],
      JUICE_PRODUCTS[5],
    ];
  };

  const prescribedBottles = getPrescribedBottles();

  const handleAddPrescription = () => {
    onAddPrescribedPack(prescribedBottles);
    setAddedToast(true);
    setTimeout(() => {
      setAddedToast(false);
      onOpenCart();
    }, 1200);
  };

  const handleRestart = () => {
    setAnswers({ goal: '', flavor: '', timing: '', preference: '' });
    setCurrentStep(1);
  };

  return (
    <div className="w-full px-gutter md:px-gutter-desktop max-w-5xl mx-auto py-space-xl">
      {/* Header */}
      <div className="text-center mb-space-xl">
        <span className="inline-block bg-tertiary-fixed text-on-tertiary-fixed font-label-badge text-label-badge px-3 py-1 rounded-full uppercase tracking-wider font-bold border border-on-surface mb-2 rotate-[-1deg]">
          Bio-Adaptive Sizing Tool
        </span>
        <h1 className="font-display-hero text-headline-lg md:text-display-hero text-on-surface uppercase tracking-tight font-black leading-none">
          WHAT DOES YOUR BIOLOGY CRAVE?
        </h1>
        <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mx-auto mt-2">
          Tell us about your energy rhythms, flavor palate, and stress profile. We formulate a customized 6-pack cold raw routine tailored to your day.
        </p>

        {currentStep <= totalSteps && (
          <div className="flex items-center justify-center gap-2 mt-space-md">
            {Array.from({ length: totalSteps }).map((_, i) => (
              <div
                key={i}
                className={`h-2.5 rounded-full transition-all border border-on-surface ${
                  i + 1 === currentStep
                    ? 'w-10 bg-primary'
                    : i + 1 < currentStep
                    ? 'w-6 bg-tertiary-fixed'
                    : 'w-4 bg-surface-container-highest'
                }`}
              />
            ))}
          </div>
        )}
      </div>

      {/* STEP 1 */}
      {currentStep === 1 && (
        <div className="bg-surface-container-lowest rounded-xl p-space-lg md:p-space-xl shadow-xl border-2 border-on-surface">
          <span className="font-label-badge text-label-badge text-primary uppercase font-bold tracking-widest block mb-1">
            Question 01 of 04
          </span>
          <h2 className="font-headline-md text-headline-md uppercase font-bold text-on-surface mb-space-md">
            What is your primary physiological target this week?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-space-md">
            {[
              {
                id: 'clarity',
                title: 'High-Frequency Brain Clarity',
                desc: 'Banish mental fog, elevate sustained dopamine, zero jittery crash.',
                icon: 'psychology',
                badge: 'Nootropic Focus',
              },
              {
                id: 'detox',
                title: 'Deep Cellular Detox & Flush',
                desc: 'Alkaline green hydraulic flush of heavy digestive bloat.',
                icon: 'sanitizer',
                badge: '12-Ton Chlorophyll',
              },
              {
                id: 'calm',
                title: 'Adrenal Reset & Parasympathetic Chill',
                desc: 'Soothe overworked nervous systems with high-altitude adaptogens.',
                icon: 'spa',
                badge: 'Ashwagandha Calm',
              },
              {
                id: 'metabolic',
                title: 'Workout Spark & Metabolic Ignite',
                desc: 'Vascular circulation, clean endurance, thermogenic burn.',
                icon: 'bolt',
                badge: 'Metabolic Heat',
              },
            ].map((opt) => (
              <button
                key={opt.id}
                onClick={() => handleSelect('goal', opt.id)}
                className="p-space-md rounded-xl text-left border-2 border-on-surface hover:bg-surface-bright shadow-[3px_3px_0px_#1b1b1f] hover:translate-x-[-1px] hover:translate-y-[-1px] transition-all cursor-pointer group"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="w-10 h-10 rounded-lg bg-surface-container flex items-center justify-center border border-on-surface text-primary group-hover:bg-primary group-hover:text-on-primary transition-colors">
                    <span className="material-symbols-outlined">{opt.icon}</span>
                  </span>
                  <span className="font-label-badge text-label-badge uppercase font-bold bg-surface-container px-2 py-0.5 rounded border border-on-surface">
                    {opt.badge}
                  </span>
                </div>
                <h4 className="font-headline-sm text-headline-sm uppercase font-bold text-on-surface">
                  {opt.title}
                </h4>
                <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">
                  {opt.desc}
                </p>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* STEP 2 */}
      {currentStep === 2 && (
        <div className="bg-surface-container-lowest rounded-xl p-space-lg md:p-space-xl shadow-xl border-2 border-on-surface">
          <span className="font-label-badge text-label-badge text-primary uppercase font-bold tracking-widest block mb-1">
            Question 02 of 04
          </span>
          <h2 className="font-headline-md text-headline-md uppercase font-bold text-on-surface mb-space-md">
            What sensory flavor profile does your palate gravitate toward?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-space-md">
            {[
              {
                id: 'tart',
                title: 'Electric Tart Citrus & Yuzu Snap',
                desc: 'Sharp, vibrant morning punch with zero sugary cloying syrup.',
                icon: 'lemon',
              },
              {
                id: 'botanical',
                title: 'Deep Earthy Matcha & Herbaceous Greens',
                desc: 'Silky umami ceremonial tencha and cold-pressed Tuscan herbs.',
                icon: 'grass',
              },
              {
                id: 'spicy',
                title: 'Spiced Ginger Snap & Roasted Warmth',
                desc: 'Micro-dosed habanero pepper, raw Hawaiian ginger and turmeric.',
                icon: 'local_fire_department',
              },
              {
                id: 'floral',
                title: 'Delicate Floral Wildflower & Mountain Berries',
                desc: 'Subtle high-elevation lavender, blueberry, and raw wildflower honey.',
                icon: 'local_florist',
              },
            ].map((opt) => (
              <button
                key={opt.id}
                onClick={() => handleSelect('flavor', opt.id)}
                className="p-space-md rounded-xl text-left border-2 border-on-surface hover:bg-surface-bright shadow-[3px_3px_0px_#1b1b1f] hover:translate-x-[-1px] hover:translate-y-[-1px] transition-all cursor-pointer group"
              >
                <span className="w-10 h-10 rounded-lg bg-surface-container flex items-center justify-center border border-on-surface text-secondary group-hover:bg-secondary group-hover:text-on-secondary transition-colors mb-2">
                  <span className="material-symbols-outlined">{opt.icon}</span>
                </span>
                <h4 className="font-headline-sm text-headline-sm uppercase font-bold text-on-surface">
                  {opt.title}
                </h4>
                <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">
                  {opt.desc}
                </p>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* STEP 3 */}
      {currentStep === 3 && (
        <div className="bg-surface-container-lowest rounded-xl p-space-lg md:p-space-xl shadow-xl border-2 border-on-surface">
          <span className="font-label-badge text-label-badge text-primary uppercase font-bold tracking-widest block mb-1">
            Question 03 of 04
          </span>
          <h2 className="font-headline-md text-headline-md uppercase font-bold text-on-surface mb-space-md">
            When during the day do you experience your heaviest cellular dip?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-space-md">
            {[
              {
                id: 'morning',
                title: 'Dawn / Early Morning (6 - 9 AM)',
                desc: 'Slow waking, brain feels like dial-up internet, groggy.',
                badge: 'AM Protocol',
              },
              {
                id: 'midday',
                title: 'Post-Lunch Trough (1 - 3 PM)',
                desc: 'After eating, eyelids heavy, craving high-refined carbohydrates.',
                badge: 'Noon Reset',
              },
              {
                id: 'late',
                title: 'Late Afternoon Slump (4 - 6 PM)',
                desc: 'Depleted mental bandwidth before workout or evening commute.',
                badge: 'PM Surge',
              },
              {
                id: 'night',
                title: 'Evening Overstimulation (8 - 11 PM)',
                desc: 'Can’t shut down mental tabs, nervous system stuck in fight-or-flight.',
                badge: 'Sleep Buffer',
              },
            ].map((opt) => (
              <button
                key={opt.id}
                onClick={() => handleSelect('timing', opt.id)}
                className="p-space-md rounded-xl text-left border-2 border-on-surface hover:bg-surface-bright shadow-[3px_3px_0px_#1b1b1f] hover:translate-x-[-1px] hover:translate-y-[-1px] transition-all cursor-pointer"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-label-badge text-label-badge uppercase font-bold bg-secondary-fixed text-on-secondary-fixed px-2 py-0.5 rounded border border-on-surface">
                    {opt.badge}
                  </span>
                </div>
                <h4 className="font-headline-sm text-headline-sm uppercase font-bold text-on-surface">
                  {opt.title}
                </h4>
                <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">
                  {opt.desc}
                </p>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* STEP 4 */}
      {currentStep === 4 && (
        <div className="bg-surface-container-lowest rounded-xl p-space-lg md:p-space-xl shadow-xl border-2 border-on-surface">
          <span className="font-label-badge text-label-badge text-primary uppercase font-bold tracking-widest block mb-1">
            Question 04 of 04
          </span>
          <h2 className="font-headline-md text-headline-md uppercase font-bold text-on-surface mb-space-md">
            Any strict dietary or botanical boundaries?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-space-md">
            {[
              {
                id: 'low-glycemic',
                title: 'Strict Low-Glycemic',
                desc: 'Under 5g natural fruit sugars per bottle. Maximum green ratio.',
                icon: 'bloodtype',
              },
              {
                id: 'max-adaptogen',
                title: 'Max Adaptogen Load',
                desc: 'Clinical 1,500mg+ of medicinal mushroom extracts & Uji matcha.',
                icon: 'nature',
              },
              {
                id: 'pure-raw',
                title: 'All-Around Raw Living',
                desc: 'Balanced variety across fruit, citrus, roots, and adaptogens.',
                icon: 'all_inclusive',
              },
            ].map((opt) => (
              <button
                key={opt.id}
                onClick={() => handleSelect('preference', opt.id)}
                className="p-space-md rounded-xl text-left border-2 border-on-surface hover:bg-surface-bright shadow-[3px_3px_0px_#1b1b1f] hover:translate-x-[-1px] hover:translate-y-[-1px] transition-all cursor-pointer"
              >
                <span className="material-symbols-outlined text-[24px] text-tertiary mb-2 block">
                  {opt.icon}
                </span>
                <h4 className="font-headline-sm text-headline-sm uppercase font-bold text-on-surface">
                  {opt.title}
                </h4>
                <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">
                  {opt.desc}
                </p>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* RESULTS / DIAGNOSTIC PRESCRIPTION */}
      {currentStep === 5 && (
        <div className="bg-surface-container-lowest rounded-xl p-space-lg md:p-space-xl shadow-2xl border-2 border-on-surface">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-space-md pb-space-md border-b-2 border-on-surface/10">
            <div>
              <span className="bg-tertiary-fixed text-on-tertiary-fixed font-label-badge text-label-badge px-3 py-1 rounded-full uppercase tracking-wider font-bold border border-on-surface inline-block mb-1">
                ✓ Prescription Generated
              </span>
              <h2 className="font-display-hero text-headline-lg uppercase font-black text-on-surface">
                YOUR TAILORED CELLULAR CRATE
              </h2>
              <p className="font-body-md text-body-md text-on-surface-variant max-w-xl">
                Based on your metabolic target and sensory palate, here is your prescribed 6-bottle unpasteurized rotation.
              </p>
            </div>

            <div className="text-right">
              <span className="font-label-badge text-label-badge text-on-surface-variant uppercase block font-bold">
                Bundle Value: $57.00
              </span>
              <span className="font-display-hero text-headline-md font-black text-primary">
                $48.45
              </span>
              <span className="text-body-sm text-tertiary font-bold ml-1">
                (15% Quiz Discount Applied)
              </span>
            </div>
          </div>

          {/* 6 Prescribed Bottles Showcase */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-space-sm my-space-lg">
            {prescribedBottles.map((bottle, idx) => (
              <div
                key={idx}
                className="bg-surface-container rounded-xl p-3 border-2 border-on-surface flex flex-col justify-between text-center shadow-sm"
              >
                <div className="relative h-28 w-full rounded-lg overflow-hidden mb-2 border border-on-surface/10">
                  <img src={bottle.image} alt={bottle.name} className="w-full h-full object-cover" />
                  <span className="absolute bottom-1 right-1 bg-surface-container-lowest text-on-surface font-label-badge px-1.5 py-0.5 rounded text-[9px] font-bold border border-on-surface">
                    Day {idx + 1}
                  </span>
                </div>
                <div>
                  <h5 className="font-headline-sm text-[13px] uppercase font-bold text-on-surface leading-tight">
                    {bottle.name}
                  </h5>
                  <span className="text-[10px] text-primary font-bold uppercase block mt-0.5">
                    {bottle.actives.split('+')[0]}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Diagnostic Active Breakdown */}
          <div className="bg-surface-container p-space-md rounded-xl border-2 border-on-surface mb-space-lg grid grid-cols-1 sm:grid-cols-3 gap-space-md">
            <div>
              <span className="font-label-badge text-label-badge text-on-surface uppercase font-bold block">
                Primary Adaptogen
              </span>
              <span className="font-headline-sm text-headline-sm text-secondary font-bold uppercase">
                Lion’s Mane &amp; Cordyceps
              </span>
            </div>
            <div>
              <span className="font-label-badge text-label-badge text-on-surface uppercase font-bold block">
                Average Brix
              </span>
              <span className="font-headline-sm text-headline-sm text-primary font-bold uppercase">
                12.4° (Balanced Raw Fruit)
              </span>
            </div>
            <div>
              <span className="font-label-badge text-label-badge text-on-surface uppercase font-bold block">
                Sterilization Method
              </span>
              <span className="font-headline-sm text-headline-sm text-tertiary font-bold uppercase">
                Sub-Zero HPP (87k PSI)
              </span>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-space-sm justify-between">
            <button
              onClick={handleRestart}
              className="text-body-sm font-label-md uppercase font-bold text-on-surface-variant hover:text-on-surface underline cursor-pointer"
            >
              ← Retake Quiz
            </button>

            <button
              onClick={handleAddPrescription}
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-secondary text-on-secondary font-label-lg text-label-lg uppercase font-bold border-2 border-on-surface shadow-[4px_4px_0px_#1b1b1f] hover:bg-secondary-container transition-all active:translate-x-0.5 active:translate-y-0.5 cursor-pointer flex items-center justify-center gap-2"
            >
              <span className="material-symbols-outlined text-[20px]">shopping_bag</span>
              Add My Prescribed Crate to Cart ($48.45)
            </button>
          </div>

          {addedToast && (
            <div className="mt-4 bg-tertiary-fixed text-on-tertiary-fixed text-center p-3 rounded-lg font-bold border border-on-surface text-sm">
              ✓ Prescribed 6-Pack successfully added to your cart with 15% discount!
            </div>
          )}
        </div>
      )}
    </div>
  );
};
