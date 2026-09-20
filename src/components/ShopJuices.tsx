import React, { useState } from 'react';
import { JUICE_PRODUCTS } from '../data/juiceData';
import { JuiceProduct, ScreenId } from '../types';

interface ShopJuicesProps {
  onAddToCart: (product: JuiceProduct) => void;
  onSelectProduct: (product: JuiceProduct) => void;
  onNavigate: (screen: ScreenId) => void;
}

export const ShopJuices: React.FC<ShopJuicesProps> = ({
  onAddToCart,
  onSelectProduct,
  onNavigate,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'featured' | 'brix' | 'potency'>('featured');
  const [recentlyAddedId, setRecentlyAddedId] = useState<string | null>(null);

  const categories = [
    { id: 'all', label: 'All Raw Elixirs' },
    { id: 'cognitive', label: 'Cognitive & Focus' },
    { id: 'immune', label: 'Immune Shield' },
    { id: 'metabolic', label: 'Metabolic Ignite' },
    { id: 'recovery', label: 'Calm Recovery' },
    { id: 'detox', label: 'Hydraulic Detox' },
  ];

  let filtered = JUICE_PRODUCTS.filter((item) => {
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.ingredients.some((ing) => ing.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  if (sortBy === 'brix') {
    filtered = [...filtered].sort((a, b) => parseFloat(b.brix) - parseFloat(a.brix));
  } else if (sortBy === 'potency') {
    filtered = [...filtered].sort((a, b) => b.name.localeCompare(a.name));
  }

  const handleAdd = (product: JuiceProduct) => {
    onAddToCart(product);
    setRecentlyAddedId(product.id);
    setTimeout(() => setRecentlyAddedId(null), 1800);
  };

  return (
    <div className="w-full px-gutter md:px-gutter-desktop max-w-7xl mx-auto py-space-xl">
      {/* Header Banner */}
      <div className="bg-surface-container-lowest rounded-xl p-space-lg md:p-space-xl shadow-xl border-2 border-on-surface mb-space-xl">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-space-md">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-2">
              <span className="bg-tertiary-fixed text-on-tertiary-fixed font-label-badge text-label-badge px-2.5 py-1 rounded-full uppercase tracking-wider font-bold border border-on-surface">
                100% Raw • 0% Heat
              </span>
              <span className="font-label-badge text-label-badge uppercase tracking-wider text-on-surface-variant font-bold">
                Batch Sourced Weekly
              </span>
            </div>
            <h1 className="font-display-hero text-headline-lg md:text-display-hero text-on-surface uppercase tracking-tight font-black leading-none">
              LIVING BOTANICAL ELIXIRS
            </h1>
            <p className="font-body-lg text-body-lg text-on-surface-variant mt-2">
              Never cooked. Never aerated. Handcrafted in refrigerated cleanrooms and high-pressure sealed under 87,000 PSI to lock in raw cellular vitality.
            </p>
          </div>

          <div className="bg-primary text-on-primary p-space-md rounded-xl border-2 border-on-surface shadow-[4px_4px_0px_#1b1b1f] flex flex-col items-start gap-2 max-w-sm">
            <span className="font-label-badge text-label-badge bg-tertiary-fixed text-on-tertiary-fixed px-2 py-0.5 rounded-full font-bold border border-on-surface">
              CURATED PACK SPECIAL
            </span>
            <h4 className="font-headline-sm text-headline-sm uppercase font-bold text-on-primary">
              Build a 6-Pack &amp; Save 15%
            </h4>
            <p className="font-body-sm text-body-sm text-on-primary/90">
              Customize your weekly or bi-weekly box. Delivered chilled on dry-ice with free bottle collection.
            </p>
            <button
              onClick={() => onNavigate('build-a-box')}
              className="mt-1 px-4 py-2 rounded-full bg-surface text-on-surface font-label-md text-label-md uppercase font-bold border-2 border-on-surface shadow-[2px_2px_0px_#1b1b1f] hover:bg-surface-bright transition-all active:translate-x-0.5 active:translate-y-0.5 cursor-pointer"
            >
              Open Box Builder →
            </button>
          </div>
        </div>
      </div>

      {/* Filter Chips & Search Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-space-md mb-space-lg">
        {/* Category pills */}
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => {
            const active = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-full font-label-md text-label-md uppercase tracking-wider font-bold border-2 border-on-surface transition-all cursor-pointer ${
                  active
                    ? 'bg-tertiary-fixed text-on-tertiary-fixed shadow-[2px_2px_0px_#1b1b1f] translate-x-[-1px] translate-y-[-1px]'
                    : 'bg-surface-container-lowest text-on-surface hover:bg-surface-container'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Search & Sort Controls */}
        <div className="flex items-center gap-2">
          <div className="relative">
            <input
              type="text"
              placeholder="Search botanical, adaptogen..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 pr-3 py-2 text-body-sm bg-surface-container-lowest border-2 border-on-surface rounded-full focus:outline-none focus:ring-2 focus:ring-primary w-52 md:w-64"
            />
            <span className="material-symbols-outlined absolute left-2.5 top-2.5 text-[18px] text-on-surface-variant">
              search
            </span>
          </div>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="px-3 py-2 bg-surface-container-lowest border-2 border-on-surface rounded-full text-body-sm font-label-md font-bold text-on-surface focus:outline-none cursor-pointer"
          >
            <option value="featured">Sort: Featured</option>
            <option value="brix">Highest Brix (Sweetness)</option>
            <option value="potency">Adaptogen Potency</option>
          </select>
        </div>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-space-lg">
        {filtered.map((juice) => {
          const isAdded = recentlyAddedId === juice.id;
          return (
            <div
              key={juice.id}
              className="bg-surface-container-lowest rounded-xl overflow-hidden shadow-lg border-2 border-on-surface flex flex-col justify-between group hover:shadow-2xl transition-all duration-300"
            >
              <div>
                {/* Visual Area */}
                <div className="relative h-64 w-full overflow-hidden bg-surface-container">
                  <img
                    src={juice.image}
                    alt={juice.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {/* Floating Neo Badge */}
                  <span
                    className="absolute top-3 left-3 px-3 py-1 rounded-full font-label-badge text-label-badge uppercase tracking-wider font-bold border border-on-surface shadow-md rotate-[-2deg]"
                    style={{ backgroundColor: juice.badgeBg, color: juice.badgeColor }}
                  >
                    {juice.badgeText}
                  </span>

                  <button
                    onClick={() => onSelectProduct(juice)}
                    className="absolute bottom-3 right-3 px-3 py-1.5 rounded-full bg-surface-container-lowest/90 backdrop-blur-md text-on-surface font-label-badge text-label-badge uppercase font-bold border border-on-surface shadow-sm hover:bg-surface transition-colors cursor-pointer flex items-center gap-1"
                  >
                    <span className="material-symbols-outlined text-[14px]">science</span>
                    Lab Specs
                  </button>
                </div>

                {/* Content Area */}
                <div className="p-space-md">
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <span className="font-label-badge text-label-badge uppercase font-bold text-primary tracking-wider">
                      {juice.farmOrigin}
                    </span>
                    <span className="bg-surface-container-high text-on-surface px-2 py-0.5 rounded-full font-label-badge text-label-badge font-bold">
                      Brix {juice.brix}
                    </span>
                  </div>

                  <h3 className="font-headline-md text-headline-sm uppercase font-bold text-on-surface mb-1">
                    {juice.name}
                  </h3>
                  <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed mb-space-sm">
                    {juice.tagline}
                  </p>

                  {/* Active Botanicals Tag */}
                  <div className="bg-surface-container-low p-2 rounded-lg border border-on-surface/10 mb-space-sm">
                    <span className="font-label-badge text-label-badge text-on-surface uppercase block font-bold">
                      Key Actives
                    </span>
                    <span className="font-body-sm text-body-sm text-secondary font-medium">
                      {juice.actives}
                    </span>
                  </div>

                  {/* Ingredients Chips */}
                  <div className="flex flex-wrap gap-1">
                    {juice.ingredients.slice(0, 3).map((ing, i) => (
                      <span
                        key={i}
                        className="text-[11px] px-2 py-0.5 rounded bg-surface-container text-on-surface font-medium border border-on-surface/10"
                      >
                        {ing}
                      </span>
                    ))}
                    {juice.ingredients.length > 3 && (
                      <span className="text-[11px] px-1.5 py-0.5 text-on-surface-variant">
                        +{juice.ingredients.length - 3} more
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Card Footer: Price & Add to Cart */}
              <div className="p-space-md pt-0 border-t border-on-surface/10 mt-space-sm">
                <div className="flex items-center justify-between pt-3">
                  <div>
                    <span className="font-display-hero text-headline-md text-on-surface font-black">
                      ${juice.price.toFixed(2)}
                    </span>
                    <span className="text-body-sm text-on-surface-variant ml-1 font-medium">
                      / 16oz Amber
                    </span>
                  </div>

                  <button
                    onClick={() => handleAdd(juice)}
                    className={`px-4 py-2.5 rounded-full font-label-md text-label-md uppercase tracking-wider font-bold border-2 border-on-surface shadow-[2px_2px_0px_#1b1b1f] transition-all active:translate-x-0.5 active:translate-y-0.5 active:shadow-none cursor-pointer flex items-center gap-1.5 ${
                      isAdded
                        ? 'bg-tertiary-fixed text-on-tertiary-fixed'
                        : 'bg-primary text-on-primary hover:bg-primary-container'
                    }`}
                  >
                    <span className="material-symbols-outlined text-[18px]">
                      {isAdded ? 'check' : 'add_shopping_cart'}
                    </span>
                    {isAdded ? 'Added!' : 'Add to Crate'}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Zero Plastic Guarantee Callout */}
      <div className="mt-space-2xl bg-surface-container rounded-xl p-space-lg border-2 border-on-surface flex flex-col md:flex-row items-center justify-between gap-space-md">
        <div className="flex items-center gap-space-md">
          <div className="w-12 h-12 rounded-full bg-tertiary-fixed text-on-tertiary-fixed flex items-center justify-center font-bold border border-on-surface shadow-sm shrink-0">
            <span className="material-symbols-outlined text-[24px]">recycling</span>
          </div>
          <div>
            <h4 className="font-headline-sm text-headline-sm uppercase font-bold text-on-surface">
              Need a Custom Routine for Your Household?
            </h4>
            <p className="font-body-sm text-body-sm text-on-surface-variant">
              Take our 60-second Cellular Biology Flavor Quiz to receive a personalized doctor-formulated cold elixir prescription.
            </p>
          </div>
        </div>
        <button
          onClick={() => onNavigate('flavor-quiz')}
          className="px-6 py-3 rounded-full bg-secondary text-on-secondary font-label-lg text-label-lg uppercase font-bold border-2 border-on-surface shadow-[3px_3px_0px_#1b1b1f] hover:bg-secondary-container transition-all active:translate-x-0.5 active:translate-y-0.5 cursor-pointer whitespace-nowrap"
        >
          Start Flavor Quiz →
        </button>
      </div>
    </div>
  );
};
