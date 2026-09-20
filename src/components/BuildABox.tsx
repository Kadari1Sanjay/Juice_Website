import React, { useState } from 'react';
import { JUICE_PRODUCTS } from '../data/juiceData';
import { JuiceProduct } from '../types';

interface BuildABoxProps {
  onAddCrateToCart: (bottles: { product: JuiceProduct; count: number }[], boxType: '6-pack' | '12-pack') => void;
  onOpenCart: () => void;
}

export const BuildABox: React.FC<BuildABoxProps> = ({ onAddCrateToCart, onOpenCart }) => {
  const [boxSize, setBoxSize] = useState<'6-pack' | '12-pack'>('6-pack');
  const targetCount = boxSize === '6-pack' ? 6 : 12;

  // Selected counts for each product
  const [counts, setCounts] = useState<{ [id: string]: number }>({
    'electric-yuzu': 2,
    'dragon-blood': 2,
    'emerald-matcha': 2,
  });

  const [frequency, setFrequency] = useState<'weekly' | 'biweekly' | 'onetime'>('biweekly');
  const [packagingType, setPackagingType] = useState<'mycelium' | 'canvas'>('mycelium');
  const [crateAddedToast, setCrateAddedToast] = useState(false);

  const currentTotal = Object.values(counts).reduce((acc, c) => acc + c, 0);

  const handleIncrement = (id: string) => {
    if (currentTotal >= targetCount) return;
    setCounts((prev) => ({
      ...prev,
      [id]: (prev[id] || 0) + 1,
    }));
  };

  const handleDecrement = (id: string) => {
    if (!counts[id] || counts[id] <= 0) return;
    setCounts((prev) => ({
      ...prev,
      [id]: prev[id] - 1,
    }));
  };

  const handleAutoFill = () => {
    // Fill remaining slots proportionally
    const remaining = targetCount - currentTotal;
    if (remaining <= 0) return;
    const newCounts = { ...counts };
    for (let i = 0; i < remaining; i++) {
      const prod = JUICE_PRODUCTS[i % JUICE_PRODUCTS.length];
      newCounts[prod.id] = (newCounts[prod.id] || 0) + 1;
    }
    setCounts(newCounts);
  };

  const handleClear = () => {
    setCounts({});
  };

  const isFull = currentTotal === targetCount;
  const unitPrice = 9.5;
  const rawSubtotal = targetCount * unitPrice;
  const isSubscriber = frequency !== 'onetime';
  const discountRate = isSubscriber ? 0.15 : 0.05; // 15% discount for subscribers, 5% for custom box
  const cratePrice = rawSubtotal * (1 - discountRate);

  // Flatten bottles for the crate slots visualizer
  const crateBottles: JuiceProduct[] = [];
  JUICE_PRODUCTS.forEach((product) => {
    const qty = counts[product.id] || 0;
    for (let i = 0; i < qty; i++) {
      crateBottles.push(product);
    }
  });

  const handleCommit = () => {
    if (currentTotal === 0) return;
    const items = JUICE_PRODUCTS.filter((p) => (counts[p.id] || 0) > 0).map((p) => ({
      product: p,
      count: counts[p.id],
    }));
    onAddCrateToCart(items, boxSize);
    setCrateAddedToast(true);
    setTimeout(() => {
      setCrateAddedToast(false);
      onOpenCart();
    }, 1200);
  };

  return (
    <div className="w-full px-gutter md:px-gutter-desktop max-w-7xl mx-auto py-space-xl">
      {/* Header */}
      <div className="bg-surface-container-lowest rounded-xl p-space-lg md:p-space-xl shadow-xl border-2 border-on-surface mb-space-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-space-md">
          <div>
            <span className="bg-secondary-fixed text-on-secondary-fixed font-label-badge text-label-badge px-3 py-1 rounded-full uppercase tracking-wider font-bold border border-on-surface">
              Curated Rotation
            </span>
            <h1 className="font-display-hero text-headline-lg md:text-display-hero text-on-surface uppercase tracking-tight font-black leading-none mt-2">
              BUILD YOUR COLD CRATE
            </h1>
            <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mt-2">
              Pack your bespoke apothecary crate with living raw juices. Ships chilled directly from our sunrise press room packed with regenerative dry-ice blocks.
            </p>
          </div>

          {/* Size selector buttons */}
          <div className="flex items-center gap-2 bg-surface-container p-1.5 rounded-full border-2 border-on-surface">
            <button
              onClick={() => {
                setBoxSize('6-pack');
                if (currentTotal > 6) {
                  // trim
                  const newCounts: { [id: string]: number } = {};
                  let count = 0;
                  for (const [id, c] of Object.entries(counts)) {
                    for (let i = 0; i < c; i++) {
                      if (count < 6) {
                        newCounts[id] = (newCounts[id] || 0) + 1;
                        count++;
                      }
                    }
                  }
                  setCounts(newCounts);
                }
              }}
              className={`px-4 py-2 rounded-full font-label-md text-label-md uppercase font-bold transition-all cursor-pointer ${
                boxSize === '6-pack'
                  ? 'bg-primary text-on-primary shadow-[2px_2px_0px_#1b1b1f]'
                  : 'text-on-surface hover:bg-surface-container-high'
              }`}
            >
              6-Bottle Crate
            </button>
            <button
              onClick={() => setBoxSize('12-pack')}
              className={`px-4 py-2 rounded-full font-label-md text-label-md uppercase font-bold transition-all cursor-pointer ${
                boxSize === '12-pack'
                  ? 'bg-primary text-on-primary shadow-[2px_2px_0px_#1b1b1f]'
                  : 'text-on-surface hover:bg-surface-container-high'
              }`}
            >
              12-Bottle Master
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg">
        {/* Left Column: Interactive Crate Visualization & Slots */}
        <div className="lg:col-span-5 flex flex-col gap-space-md">
          <div className="bg-surface-container-lowest rounded-xl p-space-md md:p-space-lg shadow-xl border-2 border-on-surface sticky top-32">
            <div className="flex items-center justify-between mb-space-sm">
              <span className="font-label-badge text-label-badge uppercase font-bold text-on-surface-variant">
                Physical Crate Blueprint
              </span>
              <span
                className={`font-label-badge text-label-badge px-2.5 py-1 rounded-full uppercase font-bold border border-on-surface ${
                  isFull ? 'bg-tertiary-fixed text-on-tertiary-fixed' : 'bg-primary-fixed text-on-primary-fixed'
                }`}
              >
                {currentTotal} / {targetCount} Bottles
              </span>
            </div>

            {/* Visual Slots Grid */}
            <div
              className={`grid gap-2.5 p-4 bg-surface-container rounded-xl border-2 border-dashed border-on-surface/30 my-space-sm ${
                boxSize === '6-pack' ? 'grid-cols-3' : 'grid-cols-4'
              }`}
            >
              {Array.from({ length: targetCount }).map((_, index) => {
                const filledJuice = crateBottles[index];
                return (
                  <div
                    key={index}
                    className={`h-28 rounded-lg border-2 border-on-surface flex flex-col items-center justify-center p-2 text-center transition-all ${
                      filledJuice
                        ? 'bg-surface-container-lowest shadow-[2px_2px_0px_#1b1b1f]'
                        : 'bg-surface-container-low/60 border-dashed opacity-60'
                    }`}
                  >
                    {filledJuice ? (
                      <>
                        <span
                          className="w-5 h-5 rounded-full mb-1 border border-on-surface shadow-xs"
                          style={{ backgroundColor: filledJuice.colorHex }}
                        ></span>
                        <span className="text-[11px] font-bold text-on-surface uppercase line-clamp-2 leading-tight">
                          {filledJuice.name}
                        </span>
                        <span className="text-[9px] font-label-badge text-primary uppercase font-bold mt-1">
                          Slot {index + 1}
                        </span>
                      </>
                    ) : (
                      <span className="text-[11px] font-label-badge text-on-surface-variant uppercase font-bold">
                        Empty
                      </span>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Quick Actions Bar */}
            <div className="flex items-center justify-between gap-2 mt-space-sm pt-space-xs border-t border-on-surface/10">
              <button
                onClick={handleAutoFill}
                disabled={isFull}
                className="text-body-sm font-label-md text-secondary font-bold uppercase hover:underline disabled:opacity-40 cursor-pointer"
              >
                ✨ Quick Fill Variety
              </button>
              <button
                onClick={handleClear}
                disabled={currentTotal === 0}
                className="text-body-sm font-label-md text-on-surface-variant font-bold uppercase hover:text-error disabled:opacity-40 cursor-pointer"
              >
                Clear All
              </button>
            </div>

            {/* Delivery Frequency Selector */}
            <div className="mt-space-md pt-space-sm border-t border-on-surface/10">
              <label className="block font-label-badge text-label-badge uppercase font-bold text-on-surface mb-2">
                Replenishment Rhythm
              </label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  onClick={() => setFrequency('weekly')}
                  className={`p-2 rounded-lg text-center font-label-badge uppercase font-bold border-2 border-on-surface transition-all cursor-pointer ${
                    frequency === 'weekly'
                      ? 'bg-tertiary-fixed text-on-tertiary-fixed shadow-[2px_2px_0px_#1b1b1f]'
                      : 'bg-surface hover:bg-surface-container'
                  }`}
                >
                  Weekly (-15%)
                </button>
                <button
                  onClick={() => setFrequency('biweekly')}
                  className={`p-2 rounded-lg text-center font-label-badge uppercase font-bold border-2 border-on-surface transition-all cursor-pointer ${
                    frequency === 'biweekly'
                      ? 'bg-tertiary-fixed text-on-tertiary-fixed shadow-[2px_2px_0px_#1b1b1f]'
                      : 'bg-surface hover:bg-surface-container'
                  }`}
                >
                  Every 2 Wks (-15%)
                </button>
                <button
                  onClick={() => setFrequency('onetime')}
                  className={`p-2 rounded-lg text-center font-label-badge uppercase font-bold border-2 border-on-surface transition-all cursor-pointer ${
                    frequency === 'onetime'
                      ? 'bg-surface-container-high text-on-surface shadow-[2px_2px_0px_#1b1b1f]'
                      : 'bg-surface hover:bg-surface-container'
                  }`}
                >
                  One-Time Box
                </button>
              </div>
            </div>

            {/* Price & Commit Card */}
            <div className="mt-space-md bg-surface-container p-space-sm rounded-xl border-2 border-on-surface">
              <div className="flex items-baseline justify-between mb-1">
                <span className="font-headline-sm text-headline-sm uppercase font-bold text-on-surface">
                  Crate Total
                </span>
                <div className="text-right">
                  <span className="text-body-sm line-through text-on-surface-variant mr-1.5">
                    ${rawSubtotal.toFixed(2)}
                  </span>
                  <span className="font-display-hero text-headline-md font-black text-primary">
                    ${cratePrice.toFixed(2)}
                  </span>
                </div>
              </div>
              <p className="text-[11px] text-tertiary font-bold flex items-center gap-1 mb-3">
                <span className="material-symbols-outlined text-[14px]">local_shipping</span>
                Free Insulated Dry-Ice Shipping Included
              </p>

              <button
                onClick={handleCommit}
                disabled={!isFull}
                className={`w-full py-3.5 rounded-full font-label-lg text-label-lg uppercase tracking-wider font-bold border-2 border-on-surface transition-all cursor-pointer flex items-center justify-center gap-2 ${
                  isFull
                    ? 'bg-primary text-on-primary shadow-[3px_3px_0px_#1b1b1f] hover:bg-primary-container active:translate-x-0.5 active:translate-y-0.5'
                    : 'bg-surface-container-highest text-on-surface-variant border-dashed cursor-not-allowed opacity-70'
                }`}
              >
                <span className="material-symbols-outlined text-[20px]">inventory_2</span>
                {isFull ? `Commit ${targetCount}-Bottle Crate` : `Add ${targetCount - currentTotal} More Bottles`}
              </button>

              {crateAddedToast && (
                <div className="mt-2 bg-tertiary-fixed text-on-tertiary-fixed text-center p-2 rounded-lg font-bold text-xs border border-on-surface">
                  ✓ Crate successfully loaded into your cart!
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Column: Juice Catalog with +/- selectors */}
        <div className="lg:col-span-7 flex flex-col gap-space-md">
          <div className="flex items-center justify-between mb-1">
            <h3 className="font-headline-md text-headline-md uppercase font-bold text-on-surface">
              Select Your Elixirs
            </h3>
            <span className="font-label-badge text-label-badge text-on-surface-variant uppercase font-bold">
              Unit Brix • Certified Unpasteurized
            </span>
          </div>

          <div className="flex flex-col gap-space-sm">
            {JUICE_PRODUCTS.map((juice) => {
              const qty = counts[juice.id] || 0;
              return (
                <div
                  key={juice.id}
                  className="bg-surface-container-lowest p-space-md rounded-xl shadow-md border-2 border-on-surface flex flex-col sm:flex-row items-center justify-between gap-space-md hover:shadow-lg transition-all"
                >
                  <div className="flex items-center gap-space-md w-full sm:w-auto">
                    <div className="w-16 h-16 rounded-xl overflow-hidden bg-surface-container border border-on-surface shrink-0">
                      <img src={juice.image} alt={juice.name} className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-label-badge text-label-badge px-2 py-0.5 rounded-full font-bold border border-on-surface bg-surface-container">
                          Brix {juice.brix}
                        </span>
                        <span className="text-[11px] font-bold text-primary uppercase">
                          {juice.farmOrigin}
                        </span>
                      </div>
                      <h4 className="font-headline-sm text-headline-sm uppercase font-bold text-on-surface mt-0.5">
                        {juice.name}
                      </h4>
                      <p className="text-body-sm text-on-surface-variant line-clamp-1 max-w-sm">
                        {juice.tagline}
                      </p>
                    </div>
                  </div>

                  {/* Increment / Decrement Counter Control */}
                  <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
                    <div className="flex items-center bg-surface-container rounded-full border-2 border-on-surface p-1 shadow-xs">
                      <button
                        onClick={() => handleDecrement(juice.id)}
                        disabled={qty <= 0}
                        aria-label={`Decrease ${juice.name}`}
                        className="w-8 h-8 rounded-full bg-surface-container-lowest flex items-center justify-center font-bold text-on-surface border border-on-surface disabled:opacity-30 active:scale-95 cursor-pointer"
                      >
                        -
                      </button>
                      <span className="w-8 text-center font-headline-sm text-headline-sm font-bold text-on-surface">
                        {qty}
                      </span>
                      <button
                        onClick={() => handleIncrement(juice.id)}
                        disabled={currentTotal >= targetCount}
                        aria-label={`Increase ${juice.name}`}
                        className="w-8 h-8 rounded-full bg-surface-container-lowest flex items-center justify-center font-bold text-on-surface border border-on-surface disabled:opacity-30 active:scale-95 cursor-pointer"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
