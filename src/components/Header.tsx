import React, { useState } from 'react';
import { ScreenId } from '../types';

interface HeaderProps {
  currentScreen: ScreenId;
  onNavigate: (screen: ScreenId) => void;
  cartCount: number;
  onOpenCart: () => void;
  onOpenSearch: () => void;
  onOpenVip: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentScreen,
  onNavigate,
  cartCount,
  onOpenCart,
  onOpenSearch,
  onOpenVip,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems: { id: ScreenId; label: string }[] = [
    { id: 'shop-juices', label: 'Shop Juices' },
    { id: 'build-a-box', label: 'Build-a-Box' },
    { id: 'our-vibe-and-sourcing', label: 'Our Vibe & Sourcing' },
    { id: 'flavor-quiz', label: 'Flavor Quiz' },
    { id: 'drop-lab', label: 'Drop Lab' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-surface/95 backdrop-blur-md">
      {/* Top Ticker Marquee */}
      <div className="w-full bg-tertiary-fixed text-on-tertiary-fixed overflow-hidden py-1.5 border-b-2 border-on-surface select-none">
        <div className="animate-marquee whitespace-nowrap font-label-md text-label-md uppercase tracking-wider font-bold">
          <span className="mx-4">⚡ 100% UNPASTEURIZED</span>
          <span className="mx-4">•</span>
          <span className="mx-4">NO ADDED SUGAR</span>
          <span className="mx-4">•</span>
          <span className="mx-4">REGENERATIVE FRUIT FARMS</span>
          <span className="mx-4">•</span>
          <span className="mx-4">ZERO GUILT</span>
          <span className="mx-4">•</span>
          <span className="mx-4">FREE CHILLED SHIPPING ON 6+ PACKS ⚡</span>
          <span className="mx-4">⚡ 100% UNPASTEURIZED</span>
          <span className="mx-4">•</span>
          <span className="mx-4">NO ADDED SUGAR</span>
          <span className="mx-4">•</span>
          <span className="mx-4">REGENERATIVE FRUIT FARMS</span>
          <span className="mx-4">•</span>
          <span className="mx-4">ZERO GUILT</span>
          <span className="mx-4">•</span>
          <span className="mx-4">FREE CHILLED SHIPPING ON 6+ PACKS ⚡</span>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="h-20 w-full px-gutter-desktop max-w-7xl mx-auto flex items-center justify-between gap-space-md">
        {/* Brand Logo & Tagline */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => onNavigate('our-vibe-and-sourcing')}
            className="flex items-center gap-3 group text-left cursor-pointer focus:outline-none"
            aria-label="SIP DRIFT Home"
          >
            <img
              alt="SIP DRIFT Brand Logo"
              className="h-8 w-auto object-contain transition-transform group-hover:scale-105"
              src="https://lh3.googleusercontent.com/aida/AEtjO1U93nVQG2jgICtlVWsRaU1oOIdM4hLnn3DwVESe6inSu1yJHjCTfOl0VpSjaEL7wECqmMe4SRFfeMDbBEMe5NxrhzOOYL2dGVf1nrIn9n-Q1bYuYYb0WzFpSZf5EtXy88T2OrowRkkrienQXhag27gKDrmniniHL-XjuKlr44hSSmzEQK9OIqlVaBQ2jwUvKyGuJlfPG8tq2YmDCBko2avZpYAqUBWnz46Z_ZSqI599evVIOBoC2SXcazY"
            />
            <span className="font-display-hero text-headline-sm tracking-tight text-on-surface uppercase">
              SIP DRIFT
            </span>
          </button>
          <span className="hidden lg:inline-flex items-center px-2 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed font-label-badge text-label-badge uppercase tracking-widest border border-on-surface -rotate-2 shadow-[1px_1px_0px_#1b1b1f]">
            RAW &amp; ALIVE
          </span>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 lg:gap-2">
          {navItems.map((item) => {
            const isActive = currentScreen === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`px-3 py-2 rounded-full font-label-lg text-label-lg transition-all cursor-pointer ${
                  isActive
                    ? 'bg-primary text-on-primary font-bold shadow-[2px_2px_0px_#1b1b1f] translate-x-[-1px] translate-y-[-1px]'
                    : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Actions (Search, Cart, VIP Profile) */}
        <div className="flex items-center gap-space-sm">
          {/* Search Button */}
          <button
            id="search-button"
            onClick={onOpenSearch}
            aria-label="Search drinks"
            className="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center text-on-surface hover:bg-surface-container-high transition-colors border border-on-surface shadow-[2px_2px_0px_#1b1b1f] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none cursor-pointer"
            type="button"
          >
            <span className="material-symbols-outlined text-[20px]">search</span>
          </button>

          {/* Cart Button with Count Badge */}
          <button
            id="cart-button"
            onClick={onOpenCart}
            className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-surface-container border border-on-surface shadow-[2px_2px_0px_#1b1b1f] hover:bg-surface-container-high transition-all active:translate-x-0.5 active:translate-y-0.5 active:shadow-none cursor-pointer"
            type="button"
          >
            <span className="material-symbols-outlined text-[20px] text-on-surface">shopping_bag</span>
            <span className="font-label-md text-label-md text-on-surface uppercase font-bold">Cart</span>
            <span className="bg-tertiary-fixed text-on-tertiary-fixed font-label-badge text-label-badge font-bold px-2 py-0.5 rounded-full border border-on-surface">
              {cartCount}
            </span>
          </button>

          {/* VIP Sipper Profile */}
          <button
            id="vip-profile-button"
            onClick={onOpenVip}
            className="flex items-center gap-2 pl-1 cursor-pointer focus:outline-none"
            title="View VIP Sipper Rewards"
          >
            <div className="relative">
              <img
                alt="VIP Sipper Profile"
                className="w-8 h-8 rounded-full object-cover border-2 border-on-surface hover:scale-105 transition-transform"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBLijvVrDxAwsyABOthkDQYaVPxP9gJ7x85aH0M_KuCUX9qKTQMy5RzOg6uVLUJgzUPfN7ACNSyzp4eZ2oxoyz3vPueaPzYUxvLy6iO_GSEFl-ajcJCpArN1jn4q-c6h3HRrZU0n9ay4GC-Mfl6akfA7Zyby7PTsBn-BkqelNibRcB-FVtcS2oOxBbf0ZdoK9EZhlcH0sMeRSxlOe31jQbGnwlij2Dq2m6i55W2jbYuaYuFO1V2O9CC"
              />
              <span className="absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full bg-primary-container border-2 border-surface animate-pulse"></span>
            </div>
            <div className="hidden xl:flex flex-col items-start leading-none text-left">
              <span className="font-label-badge text-label-badge text-primary font-bold uppercase tracking-wider">
                VIP Sipper
              </span>
            </div>
          </button>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden w-10 h-10 rounded-full bg-surface-container flex items-center justify-center text-on-surface border border-on-surface shadow-[2px_2px_0px_#1b1b1f]"
            aria-label="Toggle menu"
          >
            <span className="material-symbols-outlined text-[22px]">
              {mobileMenuOpen ? 'close' : 'menu'}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Navigation Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-surface-container-lowest border-b-2 border-on-surface px-4 py-3 flex flex-col gap-2">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                onNavigate(item.id);
                setMobileMenuOpen(false);
              }}
              className={`w-full text-left px-4 py-2.5 rounded-lg font-label-lg text-label-lg uppercase ${
                currentScreen === item.id
                  ? 'bg-primary text-on-primary font-bold shadow-[2px_2px_0px_#1b1b1f]'
                  : 'text-on-surface hover:bg-surface-container'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
    </header>
  );
};
