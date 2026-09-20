import React, { useState } from 'react';
import { CartItem, ScreenId } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (productId: string, delta: number) => void;
  onRemoveItem: (productId: string) => void;
  onNavigate: (screen: ScreenId) => void;
  bottleCreditsEarned: number;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onNavigate,
  bottleCreditsEarned,
}) => {
  const [promoCode, setPromoCode] = useState('');
  const [discountApplied, setDiscountApplied] = useState<'RAW15' | 'BOTTLE10' | null>(null);
  const [promoError, setPromoError] = useState('');
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);

  if (!isOpen) return null;

  const totalBottles = items.reduce((acc, i) => acc + i.quantity, 0);
  const subtotal = items.reduce((acc, i) => acc + i.product.price * i.quantity, 0);

  const freeShippingThreshold = 6;
  const isFreeShipping = totalBottles >= freeShippingThreshold;
  const shippingFee = totalBottles === 0 ? 0 : isFreeShipping ? 0 : 8.5;

  let discountAmount = 0;
  if (discountApplied === 'RAW15') {
    discountAmount = subtotal * 0.15;
  } else if (discountApplied === 'BOTTLE10') {
    discountAmount = 10;
  }

  const finalTotal = Math.max(0, subtotal - discountAmount + shippingFee);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    setPromoError('');
    const code = promoCode.trim().toUpperCase();
    if (code === 'RAW15') {
      setDiscountApplied('RAW15');
    } else if (code === 'BOTTLE10') {
      setDiscountApplied('BOTTLE10');
    } else {
      setPromoError('Invalid code. Try "RAW15" or "BOTTLE10"');
    }
  };

  const handleSimulateCheckout = () => {
    setIsCheckingOut(true);
    setTimeout(() => {
      setIsCheckingOut(false);
      setOrderComplete(true);
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-on-surface/50 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      {/* Drawer Panel */}
      <div className="relative w-full max-w-md bg-surface-container-lowest h-full shadow-2xl border-l-2 border-on-surface flex flex-col justify-between z-10">
        {/* Header */}
        <div className="p-space-md border-b-2 border-on-surface flex items-center justify-between bg-surface-container">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[24px] text-primary">shopping_bag</span>
            <h3 className="font-headline-md text-headline-sm uppercase font-bold text-on-surface">
              Your Cold Crate ({totalBottles})
            </h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-surface-container-lowest flex items-center justify-center text-on-surface hover:bg-surface border border-on-surface shadow-xs cursor-pointer"
            aria-label="Close cart"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        {/* Free Shipping Meter */}
        <div className="bg-tertiary-fixed text-on-tertiary-fixed p-2.5 px-4 border-b border-on-surface">
          <div className="flex items-center justify-between text-xs font-bold uppercase mb-1">
            <span>
              {isFreeShipping
                ? '✓ FREE Chilled Shipping Unlocked!'
                : `Add ${freeShippingThreshold - totalBottles} more for FREE Chilled Shipping`}
            </span>
            <span>{Math.min(100, Math.round((totalBottles / freeShippingThreshold) * 100))}%</span>
          </div>
          <div className="w-full bg-on-tertiary-fixed/20 h-2 rounded-full overflow-hidden">
            <div
              className="bg-on-tertiary-fixed h-full rounded-full transition-all duration-300"
              style={{ width: `${Math.min(100, (totalBottles / freeShippingThreshold) * 100)}%` }}
            />
          </div>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-space-md flex flex-col gap-space-sm">
          {orderComplete ? (
            <div className="text-center py-12 px-4">
              <span className="material-symbols-outlined text-[56px] text-tertiary mb-2">
                check_circle
              </span>
              <h4 className="font-headline-md text-headline-md uppercase font-bold text-on-surface">
                Fresh Cold Crate Confirmed!
              </h4>
              <p className="font-body-sm text-body-sm text-on-surface-variant mt-2 max-w-xs mx-auto">
                Your living cold-pressed juices are being packed in dry-ice at Ojai Valley. Tracking number <span className="font-bold text-primary">#SD-99481-CAL</span> sent to your email.
              </p>
              <div className="bg-surface-container p-3 rounded-lg border border-on-surface/10 mt-4 text-xs font-bold text-on-surface">
                Estimated Delivery: Tomorrow by 10:30 AM (In Reusable Insulated Crate)
              </div>
              <button
                onClick={() => {
                  setOrderComplete(false);
                  onClose();
                }}
                className="mt-6 px-6 py-2.5 rounded-full bg-primary text-on-primary font-label-md uppercase font-bold border-2 border-on-surface shadow-[2px_2px_0px_#1b1b1f] cursor-pointer"
              >
                Continue Exploring
              </button>
            </div>
          ) : items.length === 0 ? (
            <div className="text-center py-16">
              <span className="material-symbols-outlined text-[48px] text-on-surface-variant mb-2">
                inventory_2
              </span>
              <h4 className="font-headline-sm text-headline-sm uppercase font-bold text-on-surface">
                Your Crate is Empty
              </h4>
              <p className="font-body-sm text-body-sm text-on-surface-variant mt-1 mb-4">
                Explore our living botanical flavors and pack your unpasteurized bottles.
              </p>
              <button
                onClick={() => {
                  onClose();
                  onNavigate('shop-juices');
                }}
                className="px-6 py-2.5 rounded-full bg-primary text-on-primary font-label-md uppercase font-bold border-2 border-on-surface shadow-[2px_2px_0px_#1b1b1f] cursor-pointer"
              >
                Browse Elixirs →
              </button>
            </div>
          ) : (
            items.map(({ product, quantity }) => (
              <div
                key={product.id}
                className="bg-surface-container-lowest p-3 rounded-xl border-2 border-on-surface shadow-sm flex items-center justify-between gap-3"
              >
                <div className="flex items-center gap-3">
                  <div className="w-14 h-14 rounded-lg overflow-hidden bg-surface-container border border-on-surface shrink-0">
                    <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h5 className="font-headline-sm text-[13px] uppercase font-bold text-on-surface leading-tight">
                      {product.name}
                    </h5>
                    <span className="text-[11px] text-on-surface-variant block font-medium">
                      Brix {product.brix} • ${product.price.toFixed(2)}
                    </span>
                    <span className="text-[10px] text-primary font-bold uppercase">
                      {product.farmOrigin}
                    </span>
                  </div>
                </div>

                {/* +/- Controls */}
                <div className="flex items-center gap-2">
                  <div className="flex items-center bg-surface-container rounded-full border border-on-surface p-0.5">
                    <button
                      onClick={() => onUpdateQuantity(product.id, -1)}
                      className="w-6 h-6 rounded-full bg-surface-container-lowest flex items-center justify-center text-xs font-bold cursor-pointer"
                    >
                      -
                    </button>
                    <span className="w-6 text-center text-xs font-bold">{quantity}</span>
                    <button
                      onClick={() => onUpdateQuantity(product.id, 1)}
                      className="w-6 h-6 rounded-full bg-surface-container-lowest flex items-center justify-center text-xs font-bold cursor-pointer"
                    >
                      +
                    </button>
                  </div>
                  <button
                    onClick={() => onRemoveItem(product.id)}
                    className="text-on-surface-variant hover:text-error p-1 cursor-pointer"
                    title="Remove item"
                  >
                    <span className="material-symbols-outlined text-[18px]">delete</span>
                  </button>
                </div>
              </div>
            ))
          )}

          {/* Promo Code Input */}
          {!orderComplete && items.length > 0 && (
            <div className="mt-2 pt-2 border-t border-on-surface/10">
              <form onSubmit={handleApplyPromo} className="flex gap-2">
                <input
                  type="text"
                  placeholder="Promo (RAW15 or BOTTLE10)"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  className="flex-1 px-3 py-1.5 text-xs bg-surface-container border-2 border-on-surface rounded-lg uppercase font-bold"
                />
                <button
                  type="submit"
                  className="px-3 py-1.5 rounded-lg bg-surface-container-high text-on-surface font-label-badge text-xs uppercase font-bold border-2 border-on-surface shadow-xs cursor-pointer"
                >
                  Apply
                </button>
              </form>
              {discountApplied && (
                <span className="text-[11px] text-tertiary font-bold mt-1 block">
                  ✓ Code {discountApplied} applied!
                </span>
              )}
              {promoError && (
                <span className="text-[11px] text-error font-bold mt-1 block">
                  {promoError}
                </span>
              )}
            </div>
          )}
        </div>

        {/* Footer / Checkout */}
        {!orderComplete && items.length > 0 && (
          <div className="p-space-md border-t-2 border-on-surface bg-surface-container flex flex-col gap-2">
            <div className="flex justify-between text-xs text-on-surface-variant">
              <span>Bottles Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>

            {discountAmount > 0 && (
              <div className="flex justify-between text-xs text-tertiary font-bold">
                <span>Discount Applied</span>
                <span>-${discountAmount.toFixed(2)}</span>
              </div>
            )}

            <div className="flex justify-between text-xs text-on-surface-variant">
              <span>Chilled Dry-Ice Courier</span>
              <span>{isFreeShipping ? 'FREE' : `$${shippingFee.toFixed(2)}`}</span>
            </div>

            <div className="flex justify-between font-headline-sm text-headline-sm font-bold text-on-surface pt-1 border-t border-on-surface/10">
              <span>Total</span>
              <span className="font-display-hero text-headline-md text-primary font-black">
                ${finalTotal.toFixed(2)}
              </span>
            </div>

            <button
              onClick={handleSimulateCheckout}
              disabled={isCheckingOut}
              className="w-full py-3.5 rounded-full bg-primary text-on-primary font-label-lg text-label-lg uppercase font-bold border-2 border-on-surface shadow-[3px_3px_0px_#1b1b1f] hover:bg-primary-container transition-all active:translate-x-0.5 active:translate-y-0.5 cursor-pointer flex items-center justify-center gap-2 mt-1"
            >
              {isCheckingOut ? (
                <>
                  <span className="w-4 h-4 rounded-full border-2 border-on-primary border-t-transparent animate-spin" />
                  Dispatching to Ojai Cold-Room...
                </>
              ) : (
                <>
                  <span className="material-symbols-outlined text-[20px]">lock</span>
                  Instant Chilled Checkout (${finalTotal.toFixed(2)})
                </>
              )}
            </button>
            <p className="text-[10px] text-center text-on-surface-variant">
              🔒 256-Bit SSL • Free doorstep bottle return pick-up on every order
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
