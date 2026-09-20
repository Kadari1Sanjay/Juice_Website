import React, { useState } from 'react';
import { ScreenId } from '../types';

interface FooterProps {
  onNavigate: (screen: ScreenId) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim() && email.includes('@')) {
      setSubscribed(true);
    }
  };

  return (
    <footer className="w-full bg-surface-container-lowest border-t-2 border-on-surface mt-space-2xl">
      <div className="max-w-7xl mx-auto px-gutter-desktop pt-space-2xl pb-space-xl">
        {/* Newsletter Promo Card */}
        <div className="bg-primary-container text-on-primary-container rounded-xl p-space-lg md:p-space-xl mb-space-2xl border-2 border-on-surface shadow-[5px_5px_0px_#1b1b1f] flex flex-col lg:flex-row lg:items-center lg:justify-between gap-space-lg">
          <div className="max-w-xl">
            <span className="inline-block bg-tertiary-fixed text-on-tertiary-fixed font-label-badge text-label-badge px-2.5 py-1 rounded-full uppercase tracking-wider mb-2 border border-on-surface rotate-[-1deg] font-bold">
              NEVER MISS A BATCH
            </span>
            <h3 className="font-headline-lg text-headline-md md:text-headline-lg uppercase text-on-primary-container leading-none font-bold">
              GET THE JUICY DROPS FIRST - 15% OFF YOUR FIRST CRATE
            </h3>
            <p className="font-body-md text-body-md text-on-primary-container/90 mt-2">
              Secret tasting rooms, rare micro-harvest elixirs, and zero spam. Pure unadulterated botanical joy.
            </p>
          </div>

          {subscribed ? (
            <div className="bg-surface-container-lowest text-on-surface p-4 rounded-lg border-2 border-on-surface shadow-[3px_3px_0px_#1b1b1f] max-w-md">
              <div className="flex items-center gap-2 text-tertiary font-bold font-label-lg uppercase">
                <span className="material-symbols-outlined text-tertiary">check_circle</span>
                You’re In The VIP Tasting Room!
              </div>
              <p className="text-body-sm text-on-surface-variant mt-1">
                Use code <span className="bg-tertiary-fixed text-on-tertiary-fixed font-bold px-1.5 py-0.5 rounded border border-on-surface">RAW15</span> at checkout for 15% off your first cold crate.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2 w-full lg:w-auto min-w-[320px]">
              <input
                id="newsletter-email-input"
                className="px-4 py-3 rounded-lg bg-surface text-on-surface placeholder:text-on-surface-variant font-body-md text-body-md border-2 border-on-surface focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2"
                placeholder="Enter your real email..."
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button
                id="newsletter-submit-btn"
                className="px-6 py-3 rounded-lg bg-secondary text-on-secondary font-label-lg text-label-lg uppercase font-bold border-2 border-on-surface shadow-[3px_3px_0px_#1b1b1f] hover:bg-secondary-container hover:text-on-secondary-container transition-all active:translate-x-0.5 active:translate-y-0.5 active:shadow-none cursor-pointer whitespace-nowrap"
                type="submit"
              >
                Unlock 15%
              </button>
            </form>
          )}
        </div>

        {/* 4 Column Footer Navigation */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-space-lg mb-space-xl">
          {/* Col 1: Shop */}
          <div className="flex flex-col gap-space-sm">
            <h4 className="font-headline-sm text-headline-sm text-on-surface uppercase font-bold">Shop</h4>
            <ul className="flex flex-col gap-2 font-body-md text-body-md text-on-surface-variant">
              <li>
                <button onClick={() => onNavigate('shop-juices')} className="hover:text-on-surface text-left cursor-pointer">
                  All Flavors
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('build-a-box')} className="hover:text-on-surface text-left cursor-pointer">
                  Custom Crates (6 &amp; 12)
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('flavor-quiz')} className="hover:text-on-surface text-left cursor-pointer">
                  Cellular Flavor Quiz
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('drop-lab')} className="hover:text-on-surface text-left cursor-pointer">
                  Drop Lab Micro-Batches
                </button>
              </li>
            </ul>
          </div>

          {/* Col 2: The Craft */}
          <div className="flex flex-col gap-space-sm">
            <h4 className="font-headline-sm text-headline-sm text-on-surface uppercase font-bold">The Craft</h4>
            <ul className="flex flex-col gap-2 font-body-md text-body-md text-on-surface-variant">
              <li>
                <button onClick={() => onNavigate('our-vibe-and-sourcing')} className="hover:text-on-surface text-left cursor-pointer">
                  Raw Cold-Press Philosophy
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('our-vibe-and-sourcing')} className="hover:text-on-surface text-left cursor-pointer">
                  Bottle Loop Recycling
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('our-vibe-and-sourcing')} className="hover:text-on-surface text-left cursor-pointer">
                  3rd-Party Lab Testing (COA)
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('our-vibe-and-sourcing')} className="hover:text-on-surface text-left cursor-pointer">
                  Regenerative Farm Partners
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Gen-Z Community */}
          <div className="flex flex-col gap-space-sm">
            <h4 className="font-headline-sm text-headline-sm text-on-surface uppercase font-bold">Gen-Z Community</h4>
            <ul className="flex flex-col gap-2 font-body-md text-body-md text-on-surface-variant">
              <li>
                <a href="#chill-tent" className="hover:text-on-surface">
                  Campus Ambassadors
                </a>
              </li>
              <li>
                <button onClick={() => onNavigate('our-vibe-and-sourcing')} className="hover:text-on-surface text-left cursor-pointer">
                  Music Festival Tents
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('drop-lab')} className="hover:text-on-surface text-left cursor-pointer">
                  VIP Lounge Discord
                </button>
              </li>
              <li>
                <span className="hover:text-on-surface cursor-pointer">
                  TikTok @sipdrift
                </span>
              </li>
            </ul>
          </div>

          {/* Col 4: Trust & Climate */}
          <div className="flex flex-col gap-space-sm">
            <h4 className="font-headline-sm text-headline-sm text-on-surface uppercase font-bold">Trust &amp; Climate</h4>
            <div className="flex flex-wrap gap-2">
              <span className="px-2.5 py-1 rounded-md bg-tertiary-container text-on-tertiary-container font-label-badge text-label-badge uppercase border border-on-surface font-bold">
                100% CARBON NEUTRAL
              </span>
              <span className="px-2.5 py-1 rounded-md bg-surface-container-high text-on-surface font-label-badge text-label-badge uppercase border border-on-surface font-bold">
                B-CORP PENDING
              </span>
              <span className="px-2.5 py-1 rounded-md bg-secondary-fixed text-on-secondary-fixed font-label-badge text-label-badge uppercase border border-on-surface font-bold">
                UPCYCLED GLASS
              </span>
            </div>
            <p className="font-body-sm text-body-sm text-on-surface-variant mt-2">
              Shipped in 100% curbside recyclable thermal cellulose with dry-ice botanical blocks.
            </p>
          </div>
        </div>

        {/* Legal & Copyright */}
        <div className="pt-space-md border-t border-outline-variant flex flex-col md:flex-row items-center justify-between gap-space-sm font-body-sm text-body-sm text-on-surface-variant">
          <p>© 2025 SIP DRIFT BOTANICALS CO. UNFILTERED, UNPASTEURIZED, UNSTOPPABLE.</p>
          <div className="flex items-center gap-space-md">
            <span className="hover:text-on-surface cursor-pointer">Privacy Policy</span>
            <span className="hover:text-on-surface cursor-pointer">Terms of Service</span>
            <span className="hover:text-on-surface cursor-pointer">Sourcing Transparency</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
