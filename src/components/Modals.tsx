import React, { useState } from 'react';
import { JUICE_PRODUCTS } from '../data/juiceData';
import { JuiceProduct, ScreenId } from '../types';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProduct: (product: JuiceProduct) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  onSelectProduct,
}) => {
  const [query, setQuery] = useState('');

  if (!isOpen) return null;

  const results = JUICE_PRODUCTS.filter(
    (p) =>
      p.name.toLowerCase().includes(query.toLowerCase()) ||
      p.ingredients.some((i) => i.toLowerCase().includes(query.toLowerCase())) ||
      p.farmOrigin.toLowerCase().includes(query.toLowerCase()) ||
      p.actives.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-on-surface/50 backdrop-blur-xs" onClick={onClose} />
      <div className="relative w-full max-w-lg bg-surface-container-lowest rounded-xl shadow-2xl border-2 border-on-surface p-space-md z-10">
        <div className="flex items-center justify-between pb-3 border-b-2 border-on-surface">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-[24px]">search</span>
            <h3 className="font-headline-sm uppercase font-bold text-on-surface">
              Quick Botanical Search
            </h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center text-on-surface hover:bg-surface border border-on-surface"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        <div className="mt-3">
          <input
            type="text"
            autoFocus
            placeholder="Search Yuzu, Matcha, Cordyceps, Ojai Valley..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full px-4 py-3 bg-surface border-2 border-on-surface rounded-xl text-body-md font-medium focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        <div className="mt-4 max-h-72 overflow-y-auto flex flex-col gap-2">
          {results.length === 0 ? (
            <div className="text-center py-8 text-on-surface-variant text-sm">
              No botanical matches for "{query}". Try "Matcha", "Lion's Mane", or "Yuzu".
            </div>
          ) : (
            results.map((product) => (
              <div
                key={product.id}
                onClick={() => {
                  onSelectProduct(product);
                  onClose();
                }}
                className="p-2.5 rounded-lg bg-surface-container hover:bg-surface-container-high border border-on-surface/20 flex items-center justify-between cursor-pointer transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-md overflow-hidden bg-surface-container-lowest border border-on-surface">
                    <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h5 className="font-headline-sm text-xs uppercase font-bold text-on-surface">
                      {product.name}
                    </h5>
                    <span className="text-[11px] text-on-surface-variant">
                      {product.actives} • Brix {product.brix}
                    </span>
                  </div>
                </div>
                <span className="font-bold text-xs text-primary font-headline-sm">
                  ${product.price.toFixed(2)}
                </span>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

interface VipModalProps {
  isOpen: boolean;
  onClose: () => void;
  bottleCredits: number;
}

export const VipModal: React.FC<VipModalProps> = ({ isOpen, onClose, bottleCredits }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-on-surface/50 backdrop-blur-xs" onClick={onClose} />
      <div className="relative w-full max-w-md bg-surface-container-lowest rounded-xl shadow-2xl border-2 border-on-surface p-space-md z-10">
        <div className="flex items-center justify-between pb-3 border-b-2 border-on-surface">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-secondary text-[24px]">stars</span>
            <h3 className="font-headline-sm uppercase font-bold text-on-surface">
              VIP Sipper Dashboard
            </h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center text-on-surface hover:bg-surface border border-on-surface"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        <div className="mt-4 flex items-center gap-3 p-3 bg-primary-container text-on-primary-container rounded-xl border-2 border-on-surface">
          <img
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBLijvVrDxAwsyABOthkDQYaVPxP9gJ7x85aH0M_KuCUX9qKTQMy5RzOg6uVLUJgzUPfN7ACNSyzp4eZ2oxoyz3vPueaPzYUxvLy6iO_GSEFl-ajcJCpArN1jn4q-c6h3HRrZU0n9ay4GC-Mfl6akfA7Zyby7PTsBn-BkqelNibRcB-FVtcS2oOxBbf0ZdoK9EZhlcH0sMeRSxlOe31jQbGnwlij2Dq2m6i55W2jbYuaYuFO1V2O9CC"
            alt="VIP Sipper"
            className="w-14 h-14 rounded-full border-2 border-on-surface object-cover"
          />
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-sm uppercase text-on-primary-container">
                Rowan Thorne
              </span>
              <span className="bg-tertiary-fixed text-on-tertiary-fixed text-[10px] font-bold px-1.5 py-0.5 rounded border border-on-surface">
                Level 3 Alchemist
              </span>
            </div>
            <span className="text-xs text-on-primary-container/80 block mt-0.5">
              Member since Jan 2024 • 48 Bottles Returned
            </span>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-2.5 my-4">
          <div className="bg-surface-container p-3 rounded-lg border border-on-surface text-center">
            <span className="text-[10px] font-label-badge uppercase font-bold text-on-surface-variant block">
              Bottle Loop Credits
            </span>
            <span className="font-display-hero text-headline-md font-black text-secondary">
              ${bottleCredits.toFixed(2)}
            </span>
            <span className="text-[9px] text-tertiary font-bold block">
              Auto-Applies at Checkout
            </span>
          </div>
          <div className="bg-surface-container p-3 rounded-lg border border-on-surface text-center">
            <span className="text-[10px] font-label-badge uppercase font-bold text-on-surface-variant block">
              Plastic Bottles Averted
            </span>
            <span className="font-display-hero text-headline-md font-black text-primary">
              60 Units
            </span>
            <span className="text-[9px] text-primary font-bold block">
              Zero Single-Use Waste
            </span>
          </div>
        </div>

        {/* Perks */}
        <div className="flex flex-col gap-2 text-xs">
          <div className="flex items-center gap-2 p-2 bg-surface rounded-lg border border-on-surface/10">
            <span className="material-symbols-outlined text-tertiary text-[18px]">verified</span>
            <span>Early 48-hour access to experimental Drop Lab releases</span>
          </div>
          <div className="flex items-center gap-2 p-2 bg-surface rounded-lg border border-on-surface/10">
            <span className="material-symbols-outlined text-tertiary text-[18px]">verified</span>
            <span>Free chilled dry-ice shipping on all orders</span>
          </div>
          <div className="flex items-center gap-2 p-2 bg-surface rounded-lg border border-on-surface/10">
            <span className="material-symbols-outlined text-tertiary text-[18px]">verified</span>
            <span>Invitation to private Indio &amp; Brooklyn festival backstage lounge</span>
          </div>
        </div>

        <button
          onClick={onClose}
          className="w-full mt-4 py-2.5 rounded-full bg-primary text-on-primary font-label-md uppercase font-bold border-2 border-on-surface shadow-[2px_2px_0px_#1b1b1f] cursor-pointer"
        >
          Close VIP Dashboard
        </button>
      </div>
    </div>
  );
};

interface ReturnPouchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ReturnPouchModal: React.FC<ReturnPouchModalProps> = ({ isOpen, onClose }) => {
  const [address, setAddress] = useState('742 Evergreen Terrace, Apt 4B');
  const [sent, setSent] = useState(false);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-on-surface/50 backdrop-blur-xs" onClick={onClose} />
      <div className="relative w-full max-w-md bg-surface-container-lowest rounded-xl shadow-2xl border-2 border-on-surface p-space-md z-10">
        <div className="flex items-center justify-between pb-3 border-b-2 border-on-surface">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-secondary text-[24px]">local_shipping</span>
            <h3 className="font-headline-sm uppercase font-bold text-on-surface">
              Request Return Pouch
            </h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center text-on-surface hover:bg-surface border border-on-surface"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        {sent ? (
          <div className="text-center py-6">
            <span className="material-symbols-outlined text-[48px] text-tertiary mb-2">
              check_circle
            </span>
            <h4 className="font-headline-sm uppercase font-bold text-on-surface">
              Pouch Dispatched!
            </h4>
            <p className="text-body-sm text-on-surface-variant mt-1">
              A reinforced thermal 12-bottle return tote will arrive on your porch in 1-2 business days with prepaid courier tracking.
            </p>
            <button
              onClick={onClose}
              className="mt-4 px-6 py-2 rounded-full bg-primary text-on-primary font-bold text-xs uppercase border-2 border-on-surface"
            >
              Done
            </button>
          </div>
        ) : (
          <div className="mt-3 flex flex-col gap-3">
            <p className="text-body-sm text-on-surface-variant">
              We send you a durable canvas thermal cooler pouch with prepaid label to return 12 empty SIP DRIFT bottles.
            </p>
            <div>
              <label className="block text-[11px] font-label-badge uppercase font-bold text-on-surface mb-1">
                Confirm Delivery Address
              </label>
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full px-3 py-2 text-body-sm bg-surface border-2 border-on-surface rounded-lg focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>
            <button
              onClick={() => setSent(true)}
              className="w-full py-3 rounded-full bg-secondary text-on-secondary font-label-md uppercase font-bold border-2 border-on-surface shadow-[3px_3px_0px_#1b1b1f] hover:bg-secondary-container transition-all cursor-pointer"
            >
              Send Free Return Pouch
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

interface ProductDetailModalProps {
  product: JuiceProduct | null;
  onClose: () => void;
  onAddToCart: (product: JuiceProduct) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  onAddToCart,
}) => {
  if (!product) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-on-surface/50 backdrop-blur-xs" onClick={onClose} />
      <div className="relative w-full max-w-lg bg-surface-container-lowest rounded-xl shadow-2xl border-2 border-on-surface p-space-md z-10 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between pb-3 border-b-2 border-on-surface">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-[24px]">science</span>
            <h3 className="font-headline-sm uppercase font-bold text-on-surface">
              Lab Specs &amp; Analysis
            </h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center text-on-surface hover:bg-surface border border-on-surface cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        <div className="mt-3 flex gap-4">
          <div className="w-24 h-24 rounded-xl overflow-hidden bg-surface-container border border-on-surface shrink-0">
            <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
          </div>
          <div>
            <span className="font-label-badge text-label-badge uppercase font-bold text-primary">
              {product.farmOrigin}
            </span>
            <h4 className="font-headline-md text-headline-sm uppercase font-bold text-on-surface">
              {product.name}
            </h4>
            <p className="text-body-sm text-on-surface-variant">{product.tagline}</p>
          </div>
        </div>

        {/* Technical metrics */}
        <div className="grid grid-cols-3 gap-2 my-4 text-center">
          <div className="bg-surface-container p-2 rounded-lg border border-on-surface/10">
            <span className="text-[10px] font-label-badge uppercase font-bold text-on-surface-variant block">
              Brix Sweetness
            </span>
            <span className="font-headline-sm font-bold text-on-surface">{product.brix}</span>
          </div>
          <div className="bg-surface-container p-2 rounded-lg border border-on-surface/10">
            <span className="text-[10px] font-label-badge uppercase font-bold text-on-surface-variant block">
              Torque Pressure
            </span>
            <span className="font-headline-sm font-bold text-secondary">{product.psi}</span>
          </div>
          <div className="bg-surface-container p-2 rounded-lg border border-on-surface/10">
            <span className="text-[10px] font-label-badge uppercase font-bold text-on-surface-variant block">
              Active Enzymes
            </span>
            <span className="font-headline-sm font-bold text-tertiary">
              {product.nutrition.enzymesActive}
            </span>
          </div>
        </div>

        {/* Ingredients & Taste */}
        <div className="flex flex-col gap-2 text-xs">
          <div>
            <span className="font-label-badge uppercase font-bold text-on-surface block mb-1">
              Living Ingredients:
            </span>
            <div className="flex flex-wrap gap-1">
              {product.ingredients.map((ing, i) => (
                <span
                  key={i}
                  className="px-2 py-0.5 rounded bg-surface-container text-on-surface font-medium border border-on-surface/10"
                >
                  {ing}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-2 bg-surface-container-low p-2.5 rounded-lg border border-on-surface/10">
            <span className="font-label-badge uppercase font-bold text-primary block mb-0.5">
              Sommelier Palate Notes:
            </span>
            <p className="text-on-surface-variant italic leading-relaxed">{product.tasteNotes}</p>
          </div>

          <div className="grid grid-cols-2 gap-2 mt-2">
            <div className="p-2 bg-surface rounded border border-on-surface/10">
              <span className="font-label-badge uppercase font-bold text-on-surface block">
                Calories &amp; Fruit Sugars
              </span>
              <span>{product.nutrition.calories} kcal • {product.nutrition.sugars}</span>
            </div>
            <div className="p-2 bg-surface rounded border border-on-surface/10">
              <span className="font-label-badge uppercase font-bold text-on-surface block">
                Vitamin C Potency
              </span>
              <span>{product.nutrition.vitaminC}</span>
            </div>
          </div>
        </div>

        {/* Add to crate CTA */}
        <div className="mt-4 pt-3 border-t border-on-surface/10 flex items-center justify-between">
          <div>
            <span className="font-headline-md text-headline-sm font-bold text-on-surface">
              ${product.price.toFixed(2)}
            </span>
            <span className="text-xs text-on-surface-variant ml-1">/ 16oz Glass</span>
          </div>
          <button
            onClick={() => {
              onAddToCart(product);
              onClose();
            }}
            className="px-6 py-2.5 rounded-full bg-primary text-on-primary font-label-md uppercase font-bold border-2 border-on-surface shadow-[2px_2px_0px_#1b1b1f] hover:bg-primary-container cursor-pointer"
          >
            Add to Crate
          </button>
        </div>
      </div>
    </div>
  );
};
