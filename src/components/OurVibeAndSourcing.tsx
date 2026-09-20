import React, { useState, useEffect } from 'react';
import { FARMS_DATA } from '../data/juiceData';
import { ScreenId } from '../types';

interface OurVibeAndSourcingProps {
  onNavigate: (screen: ScreenId) => void;
  onRequestReturnPouch: () => void;
  onBottleReturned?: () => void;
}

export const OurVibeAndSourcing: React.FC<OurVibeAndSourcingProps> = ({
  onNavigate,
  onRequestReturnPouch,
  onBottleReturned,
}) => {
  const [activeFarmId, setActiveFarmId] = useState<string>('ojai');
  const [bottleCount, setBottleCount] = useState<number>(142840);
  const [votedOption, setVotedOption] = useState<string | null>(null);
  const [voteStats, setVoteStats] = useState({
    opt1: { votes: 68, count: 812 },
    opt2: { votes: 32, count: 382 },
  });
  const [showVoteSuccess, setShowVoteSuccess] = useState(false);

  const selectedFarm = FARMS_DATA.find((f) => f.id === activeFarmId) || FARMS_DATA[0];

  const handleVote = (option: 'opt1' | 'opt2') => {
    if (votedOption === option) return;
    setVotedOption(option);
    setShowVoteSuccess(true);
    if (option === 'opt1') {
      setVoteStats((prev) => ({
        opt1: { votes: 69, count: prev.opt1.count + 1 },
        opt2: { votes: 31, count: prev.opt2.count },
      }));
    } else {
      setVoteStats((prev) => ({
        opt1: { votes: 67, count: prev.opt1.count },
        opt2: { votes: 33, count: prev.opt2.count + 1 },
      }));
    }
    setTimeout(() => setShowVoteSuccess(false), 3000);
  };

  const handleSimulateReturn = () => {
    setBottleCount((prev) => prev + 12);
    if (onBottleReturned) onBottleReturned();
  };

  return (
    <div className="flex flex-col w-full">
      {/* SECTION 1: MANIFESTO HERO */}
      <section className="w-full px-gutter md:px-gutter-desktop max-w-7xl mx-auto py-space-xl">
        <div className="relative bg-surface-container-lowest rounded-xl p-space-lg md:p-space-2xl shadow-xl overflow-hidden border border-on-surface/5">
          {/* Decorative background glow and neo-stickers */}
          <div className="absolute -right-24 -top-24 w-96 h-96 rounded-full bg-primary-fixed-dim/40 blur-3xl pointer-events-none"></div>
          <div className="absolute -left-20 -bottom-20 w-80 h-80 rounded-full bg-tertiary-fixed-dim/30 blur-3xl pointer-events-none"></div>

          {/* Top Row Sticker Badges */}
          <div className="flex flex-wrap items-center gap-space-sm mb-space-lg relative z-10">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-tertiary-fixed text-on-tertiary-fixed font-label-badge text-label-badge uppercase tracking-wider rotate-[-2deg] shadow-md border border-on-surface">
              <span className="material-symbols-outlined text-[14px]">verified</span>
              Certified B-Corp Pending
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-secondary-fixed text-on-secondary-fixed font-label-badge text-label-badge uppercase tracking-wider rotate-[1.5deg] shadow-md border border-on-surface">
              <span className="material-symbols-outlined text-[14px]">eco</span>
              100% Regenerative Fruit
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary-fixed text-on-primary-fixed font-label-badge text-label-badge uppercase tracking-wider rotate-[-1deg] shadow-md border border-on-surface">
              <span className="material-symbols-outlined text-[14px]">autorenew</span>
              Zero-Waste Closed Loop
            </span>
          </div>

          {/* Hero Headline Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg relative z-10 items-end">
            <div className="lg:col-span-8 flex flex-col gap-space-sm">
              <span className="font-label-md text-label-md text-primary font-bold uppercase tracking-widest flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-primary animate-ping"></span>
                The Raw Awakening • Vol. 04
              </span>
              <h1 className="font-display-hero text-headline-lg md:text-display-hero text-on-surface uppercase tracking-tight leading-none">
                WE REFUSE TO DRINK DEAD JUICE.
              </h1>
              <p className="font-body-lg text-body-lg text-on-surface-variant max-w-3xl mt-space-sm leading-relaxed">
                Most supermarket juice is heated to death, stripped of active enzymes, and sits in translucent plastic vats under fluorescent bulbs for months. We built SIP DRIFT because your cellular biology craves raw, living botanical vitality, unapologetic unpasteurized flavor, and a planet that doesn't drown under single-use microplastics.
              </p>
            </div>

            {/* Quick Vitality Stat Block */}
            <div className="lg:col-span-4 bg-surface-container rounded-xl p-space-md shadow-md flex flex-col gap-space-sm border border-on-surface/10">
              <div className="flex items-center justify-between pb-space-xs">
                <span className="font-label-badge text-label-badge uppercase text-on-surface-variant tracking-wider font-bold">
                  Bio-Enzyme Retention Rate
                </span>
                <span className="font-label-md text-label-md bg-tertiary-fixed text-on-tertiary-fixed px-2 py-0.5 rounded-full font-bold border border-on-surface">
                  99.4%
                </span>
              </div>
              <div className="w-full bg-surface-container-highest rounded-full h-3 overflow-hidden border border-on-surface/20">
                <div className="bg-tertiary h-full rounded-full w-[99.4%] transition-all duration-1000"></div>
              </div>
              <div className="grid grid-cols-2 gap-space-sm pt-space-xs text-center">
                <div className="bg-surface-container-lowest p-2.5 rounded-lg border border-on-surface/10 shadow-sm">
                  <span className="block font-headline-md text-headline-md text-primary leading-none font-bold">
                    0°C
                  </span>
                  <span className="font-label-badge text-label-badge text-on-surface-variant uppercase font-bold">
                    Thermal Exposure
                  </span>
                </div>
                <div className="bg-surface-container-lowest p-2.5 rounded-lg border border-on-surface/10 shadow-sm">
                  <span className="block font-headline-md text-headline-md text-secondary leading-none font-bold">
                    3 HRS
                  </span>
                  <span className="font-label-badge text-label-badge text-on-surface-variant uppercase font-bold">
                    Harvest To Press
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Bento Manifesto Visual Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-space-md mt-space-xl relative z-10">
            <div className="relative h-64 md:h-72 rounded-xl overflow-hidden group shadow-md border-2 border-on-surface">
              <img
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                alt="Living Plant Cells, Never Cooked"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAtUeZ6MPS6cemWbAdJM28XhGSCIdfW7Nff8TaIFFPUaYv9rEJqDsYDMG5W82VPMvjpSVys7Rjxla_WUVWEiTGEftpp3twVmfju2rRoPmSxy99PMbZ2W5VYfHMRq2sahPhVNw2sEatGb8BH4M0rlVydVwTFr6i9yOevq59SrDut9ElVC72mJVBduGVA056qRHQXQjvFnILPR9kock7ONwvmsHyDCe7KiJt3pOD55Img8UZHewlXUKwr"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-on-surface/95 via-on-surface/30 to-transparent flex flex-col justify-end p-space-md text-on-secondary">
                <span className="font-label-badge text-label-badge uppercase tracking-widest text-primary-fixed font-bold">
                  Raw Vitality
                </span>
                <p className="font-headline-sm text-headline-sm uppercase text-on-secondary font-bold">
                  Living plant cells, never cooked.
                </p>
              </div>
            </div>

            <div className="relative h-64 md:h-72 rounded-xl overflow-hidden group shadow-md border-2 border-on-surface">
              <img
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                alt="Zero Oxidation Hydraulic Torque"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuB8b7537ih6IfEKQyw24MxAbv2kKFYlI8HvCLLhyySFJDJ8KFQZ6GNKpIiybtx1uCqJ5XTTknPfTEkRkWCkllzYJg6D_W5SKinpQpTDWHVsVEnQoB9kdx-BXZtCZKbh7RuybKiFkGxkWQdFDldSaCKlBTcc4s3ZR87RyG7VpSubh0FLYR7F7ex7_OY5ye5hrWPPLRkBcor21xy0XqYg-2H0wfYF_0YiDh_mvfnqjM-KY1H6Uq6I3Boq"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-on-surface/95 via-on-surface/30 to-transparent flex flex-col justify-end p-space-md text-on-secondary">
                <span className="font-label-badge text-label-badge uppercase tracking-widest text-tertiary-fixed font-bold">
                  12-Ton Cold Squeeze
                </span>
                <p className="font-headline-sm text-headline-sm uppercase text-on-secondary font-bold">
                  Zero oxidation hydraulic torque.
                </p>
              </div>
            </div>

            <div className="relative h-64 md:h-72 rounded-xl overflow-hidden group shadow-md border-2 border-on-surface">
              <img
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                alt="Refillable Glass Crate Ecosystem"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDAbnbmrIuht-5bfyhAhNQWZh_dROHkXue2WnOzs_UNvAwqw7RFJ-QhXImtBgeOKT-g1Gt1XEKfSTSxJ8MrAvO4BFkbcvtRG7A_CcHmLpZS9ERGdbzzHuQM2_rToo_duHDQ2iDaEHRbvX1kGFKM7SDPUGAGxl12PI9TTiFBo6T53Dxv9N8hts_h0lk61wMGwtHn_aeBoQAbEpomn4O5Q8uFovLBJm1VPbEHNkXNtNGUVHJjgEsS1AVK"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-on-surface/95 via-on-surface/30 to-transparent flex flex-col justify-end p-space-md text-on-secondary">
                <span className="font-label-badge text-label-badge uppercase tracking-widest text-secondary-fixed font-bold">
                  Loop Circularity
                </span>
                <p className="font-headline-sm text-headline-sm uppercase text-on-secondary font-bold">
                  Refillable glass crate ecosystem.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: THE 3-HOUR COLD-PRESS PHILOSOPHY (Interactive Timeline) */}
      <section className="w-full px-gutter md:px-gutter-desktop max-w-7xl mx-auto py-space-xl">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-space-xl gap-space-sm">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <span className="font-label-badge text-label-badge bg-primary-fixed text-on-primary-fixed px-2.5 py-1 rounded-full uppercase tracking-wider font-bold border border-on-surface">
                The Standard
              </span>
              <span className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider font-bold">
                Hyper-Fresh Chronology
              </span>
            </div>
            <h2 className="font-headline-lg text-headline-lg md:text-display-hero text-on-surface uppercase tracking-tight font-bold">
              THE 3-HOUR COLD-PRESS SYSTEM
            </h2>
          </div>
          <p className="font-body-md text-body-md text-on-surface-variant max-w-md">
            From early sunrise dew to chilled high-pressure sealed bottles, our timeline is timed down to the minute to preserve volatile polyphenols and bio-active enzymes.
          </p>
        </div>

        {/* Timeline Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-space-md">
          {/* Step 01 */}
          <div className="bg-surface-container-lowest rounded-xl p-space-md shadow-md flex flex-col justify-between group hover:shadow-xl transition-all duration-200 border-2 border-on-surface">
            <div>
              <div className="flex items-center justify-between mb-space-md">
                <span className="font-headline-md text-headline-md text-primary font-bold">01</span>
                <span className="bg-primary-fixed text-on-primary-fixed px-2 py-0.5 rounded-full font-label-badge text-label-badge uppercase tracking-wider font-bold border border-on-surface">
                  05:00 AM
                </span>
              </div>
              <div className="w-12 h-12 rounded-xl bg-primary-container/10 flex items-center justify-center text-primary mb-space-md border border-primary/20">
                <span className="material-symbols-outlined text-[28px]">wb_twilight</span>
              </div>
              <h3 className="font-headline-sm text-headline-sm text-on-surface uppercase mb-space-xs font-bold">
                DAWN HARVEST
              </h3>
              <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                Sourced exclusively from regenerative family orchards in California, Florida &amp; Costa Rica. Fruits picked at peak brix (natural fruit-sugar balance) when active bio-flavonoids are densest.
              </p>
            </div>
            <div className="mt-space-md pt-space-sm bg-surface-container-low rounded-lg p-2.5 border border-on-surface/10">
              <span className="font-label-badge text-label-badge text-on-surface uppercase block font-bold">
                Key Indicator
              </span>
              <span className="font-body-sm text-body-sm text-on-surface-variant">
                14.8° Brix Index • Zero pesticides
              </span>
            </div>
          </div>

          {/* Step 02 */}
          <div className="bg-surface-container-lowest rounded-xl p-space-md shadow-md flex flex-col justify-between group hover:shadow-xl transition-all duration-200 border-2 border-on-surface">
            <div>
              <div className="flex items-center justify-between mb-space-md">
                <span className="font-headline-md text-headline-md text-secondary font-bold">02</span>
                <span className="bg-secondary-fixed text-on-secondary-fixed px-2 py-0.5 rounded-full font-label-badge text-label-badge uppercase tracking-wider font-bold border border-on-surface">
                  06:30 AM
                </span>
              </div>
              <div className="w-12 h-12 rounded-xl bg-secondary-container/10 flex items-center justify-center text-secondary mb-space-md border border-secondary/20">
                <span className="material-symbols-outlined text-[28px]">compress</span>
              </div>
              <h3 className="font-headline-sm text-headline-sm text-on-surface uppercase mb-space-xs font-bold">
                HYDRAULIC COLD SQUEEZE
              </h3>
              <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                Custom German stainless steel hydraulic rams exert 12 tons of slow cold pressure. Not a single blade whips or aerates the fruit, locking out thermal friction and preventing oxidation.
              </p>
            </div>
            <div className="mt-space-md pt-space-sm bg-surface-container-low rounded-lg p-2.5 border border-on-surface/10">
              <span className="font-label-badge text-label-badge text-on-surface uppercase block font-bold">
                Cold Spec
              </span>
              <span className="font-body-sm text-body-sm text-on-surface-variant">
                12-Ton Pneumatic • Constant 3°C
              </span>
            </div>
          </div>

          {/* Step 03 */}
          <div className="bg-surface-container-lowest rounded-xl p-space-md shadow-md flex flex-col justify-between group hover:shadow-xl transition-all duration-200 border-2 border-on-surface">
            <div>
              <div className="flex items-center justify-between mb-space-md">
                <span className="font-headline-md text-headline-md text-tertiary font-bold">03</span>
                <span className="bg-tertiary-fixed text-on-tertiary-fixed px-2 py-0.5 rounded-full font-label-badge text-label-badge uppercase tracking-wider font-bold border border-on-surface">
                  07:15 AM
                </span>
              </div>
              <div className="w-12 h-12 rounded-xl bg-tertiary-container/10 flex items-center justify-center text-tertiary mb-space-md border border-tertiary/20">
                <span className="material-symbols-outlined text-[28px]">science</span>
              </div>
              <h3 className="font-headline-sm text-headline-sm text-on-surface uppercase mb-space-xs font-bold">
                ADAPTOGENIC INFUSION
              </h3>
              <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                Clinically backed organic Lion’s Mane, Cordyceps, ceremonial grade stoneground Uji matcha, and wild ocean sea moss are micro-blended into the living nectar without heat or stabilizers.
              </p>
            </div>
            <div className="mt-space-md pt-space-sm bg-surface-container-low rounded-lg p-2.5 border border-on-surface/10">
              <span className="font-label-badge text-label-badge text-on-surface uppercase block font-bold">
                Actives
              </span>
              <span className="font-body-sm text-body-sm text-on-surface-variant">
                Dual-extracted • 1,500mg potency
              </span>
            </div>
          </div>

          {/* Step 04 */}
          <div className="bg-surface-container-lowest rounded-xl p-space-md shadow-md flex flex-col justify-between group hover:shadow-xl transition-all duration-200 border-2 border-on-surface">
            <div>
              <div className="flex items-center justify-between mb-space-md">
                <span className="font-headline-md text-headline-md text-on-surface font-bold">04</span>
                <span className="bg-surface-container-high text-on-surface px-2 py-0.5 rounded-full font-label-badge text-label-badge uppercase tracking-wider font-bold border border-on-surface">
                  08:00 AM
                </span>
              </div>
              <div className="w-12 h-12 rounded-xl bg-surface-container-highest flex items-center justify-center text-on-surface mb-space-md border border-on-surface/20">
                <span className="material-symbols-outlined text-[28px]">water_drop</span>
              </div>
              <h3 className="font-headline-sm text-headline-sm text-on-surface uppercase mb-space-xs font-bold">
                SUB-ZERO HPP
              </h3>
              <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                Pure chilled hyper-baric water pressure (87,000 PSI) incapacitates harmful flora while safeguarding living vitamins, color, and aroma. Never pasteurized. 100% raw integrity.
              </p>
            </div>
            <div className="mt-space-md pt-space-sm bg-surface-container-low rounded-lg p-2.5 border border-on-surface/10">
              <span className="font-label-badge text-label-badge text-on-surface uppercase block font-bold">
                Pressure Metric
              </span>
              <span className="font-body-sm text-body-sm text-on-surface-variant">
                87,000 PSI • 0 Chemical Preservatives
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: INTERACTIVE SOURCING MAP & FARM TRANSPARENCY */}
      <section className="w-full px-gutter md:px-gutter-desktop max-w-7xl mx-auto py-space-xl">
        <div className="bg-surface-container rounded-xl p-space-lg md:p-space-2xl shadow-xl border-2 border-on-surface">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-space-md mb-space-xl">
            <div>
              <span className="font-label-badge text-label-badge bg-tertiary-fixed text-on-tertiary-fixed px-3 py-1 rounded-full uppercase tracking-wider font-bold border border-on-surface">
                Root-Level Traceability
              </span>
              <h2 className="font-headline-lg text-headline-md md:text-headline-lg text-on-surface uppercase tracking-tight mt-2 font-bold">
                WHERE EVERY DROP GROWS
              </h2>
              <p className="font-body-md text-body-md text-on-surface-variant max-w-xl mt-1">
                We partner exclusively with multi-generational regenerative orchards that restore soil microbiomes, pay living fair wages, and ban synthetic glyphosates.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-label-badge text-label-badge bg-surface-container-lowest text-on-surface px-3 py-2 rounded-full font-bold shadow-sm border border-on-surface">
                4 PARTNER ESTATES • 100% NON-GMO
              </span>
            </div>
          </div>

          {/* Map & Farm Selector Bento Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg">
            {/* Farm Details Display Column */}
            <div className="lg:col-span-5 flex flex-col gap-space-sm">
              {FARMS_DATA.map((farm) => {
                const isSelected = activeFarmId === farm.id;
                return (
                  <div
                    key={farm.id}
                    onClick={() => setActiveFarmId(farm.id)}
                    className={`bg-surface-container-lowest p-space-md rounded-xl transition-all cursor-pointer border-2 border-on-surface ${
                      isSelected
                        ? 'shadow-[4px_4px_0px_#1b1b1f] translate-x-[-2px] translate-y-[-2px] ring-2 ring-primary'
                        : 'opacity-80 hover:opacity-100 shadow-sm'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <span
                          className="font-label-badge text-label-badge uppercase font-bold tracking-wider"
                          style={{ color: farm.accentColor }}
                        >
                          {farm.region}
                        </span>
                        <h4 className="font-headline-sm text-headline-sm text-on-surface uppercase font-bold">
                          {farm.name}
                        </h4>
                      </div>
                      <span
                        className="material-symbols-outlined text-[24px]"
                        style={{ color: farm.accentColor }}
                      >
                        {farm.pinIcon}
                      </span>
                    </div>
                    <p className="font-body-sm text-body-sm text-on-surface-variant mt-2">
                      {farm.description}
                    </p>
                    <div className="flex items-center gap-2 mt-3 text-on-surface font-label-badge text-label-badge">
                      <span className="bg-primary-fixed text-on-primary-fixed px-2 py-0.5 rounded-full font-bold border border-on-surface">
                        {farm.tag1}
                      </span>
                      <span className="bg-surface-container-high px-2 py-0.5 rounded-full border border-on-surface/20">
                        {farm.tag2}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Interactive Map Visual Canvas */}
            <div className="lg:col-span-7 flex flex-col gap-space-md">
              <div className="relative w-full h-[380px] lg:h-full rounded-xl overflow-hidden shadow-md bg-surface-container-highest border-2 border-on-surface">
                <div
                  className="w-full h-full bg-cover bg-center transition-all duration-700"
                  style={{ backgroundImage: `url('${selectedFarm.bgImage}')` }}
                ></div>

                {/* Overlay Vignette & Map Pins */}
                <div className="absolute inset-0 bg-gradient-to-t from-on-surface/90 via-transparent to-on-surface/40 p-space-md flex flex-col justify-between">
                  <div className="flex items-center justify-between">
                    <span className="bg-surface-container-lowest/95 backdrop-blur-md px-3 py-1 rounded-full font-label-badge text-label-badge text-on-surface uppercase tracking-wider shadow-sm font-bold border border-on-surface">
                      Live GPS Sourcing Telemetry
                    </span>
                    <span className="bg-primary text-on-primary px-3 py-1 rounded-full font-label-badge text-label-badge uppercase tracking-wider font-bold border border-on-surface">
                      {selectedFarm.batchNumber}
                    </span>
                  </div>

                  {/* Interactive Pin Callout */}
                  <div className="bg-surface-container-lowest/95 backdrop-blur-md p-space-md rounded-xl shadow-lg max-w-sm border-2 border-on-surface">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="w-3 h-3 rounded-full bg-primary animate-pulse"></span>
                      <span className="font-label-badge text-label-badge uppercase text-primary font-bold">
                        Active Harvest Window
                      </span>
                    </div>
                    <h5 className="font-headline-sm text-headline-sm text-on-surface uppercase font-bold">
                      {selectedFarm.name}
                    </h5>
                    <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">
                      {selectedFarm.coordinates} • {selectedFarm.statusText}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4: THE "SIP & LOOP" ZERO-WASTE SYSTEM */}
      <section className="w-full px-gutter md:px-gutter-desktop max-w-7xl mx-auto py-space-xl">
        <div className="bg-surface-container-lowest rounded-xl p-space-lg md:p-space-2xl shadow-xl border-2 border-on-surface">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-space-xl gap-space-md">
            <div>
              <span className="font-label-badge text-label-badge bg-secondary-fixed text-on-secondary-fixed px-3 py-1 rounded-full uppercase tracking-wider font-bold border border-on-surface">
                Circularity In Action
              </span>
              <h2 className="font-headline-lg text-headline-md md:text-headline-lg text-on-surface uppercase tracking-tight mt-2 font-bold">
                THE SIP &amp; LOOP SYSTEM
              </h2>
              <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mt-2">
                Say goodbye to endless plastic piles. Every SIP DRIFT arrives in thick apothecary amber-tinted glass that travels in an endless circular dance between our sterilization lab and your doorstep.
              </p>
            </div>

            {/* Real-Time Counter Box with interactive click */}
            <div className="bg-surface-container p-space-md rounded-xl shadow-md flex flex-col items-center justify-center min-w-[280px] border-2 border-on-surface">
              <span className="font-label-badge text-label-badge uppercase text-on-surface-variant tracking-wider font-bold">
                Bottles Diverted From Landfill
              </span>
              <div className="flex items-baseline gap-1 my-1">
                <span className="font-display-hero text-headline-lg text-secondary font-black tracking-tight">
                  {bottleCount.toLocaleString()}
                </span>
                <span className="font-label-md text-label-md text-secondary font-bold">+</span>
              </div>
              <span className="font-body-sm text-body-sm text-tertiary flex items-center gap-1 font-bold">
                <span className="material-symbols-outlined text-[16px]">trending_up</span> 418 bottles returned today
              </span>
              <button
                onClick={handleSimulateReturn}
                className="mt-2 text-[11px] font-label-badge uppercase tracking-wider text-on-surface-variant hover:text-primary underline cursor-pointer"
                title="Simulate returning 12 empty bottles for $10 credit"
              >
                + Simulate Bottle Return (Earn $10)
              </button>
            </div>
          </div>

          {/* 4-Step Loop Graphic Flow */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-space-md">
            {/* Loop Step 1 */}
            <div className="relative bg-surface-container-low p-space-md rounded-xl shadow-sm flex flex-col justify-between border-2 border-on-surface">
              <div>
                <div className="w-10 h-10 rounded-full bg-surface-container-lowest flex items-center justify-center font-headline-sm text-headline-sm text-on-surface mb-space-md shadow-sm border border-on-surface font-bold">
                  1
                </div>
                <h4 className="font-headline-sm text-headline-sm text-on-surface uppercase mb-space-xs font-bold">
                  DRINK &amp; REVEL
                </h4>
                <p className="font-body-sm text-body-sm text-on-surface-variant">
                  Down your unpasteurized cold-pressed elixirs at peak potency. Keep your bottles refrigerated until empty to protect the botanical integrity.
                </p>
              </div>
              <div className="mt-space-md pt-space-sm flex items-center gap-2 text-primary font-label-badge text-label-badge uppercase font-bold">
                <span className="material-symbols-outlined text-[18px]">local_cafe</span> Step One
              </div>
            </div>

            {/* Loop Step 2 */}
            <div className="relative bg-surface-container-low p-space-md rounded-xl shadow-sm flex flex-col justify-between border-2 border-on-surface">
              <div>
                <div className="w-10 h-10 rounded-full bg-surface-container-lowest flex items-center justify-center font-headline-sm text-headline-sm text-on-surface mb-space-md shadow-sm border border-on-surface font-bold">
                  2
                </div>
                <h4 className="font-headline-sm text-headline-sm text-on-surface uppercase mb-space-xs font-bold">
                  QUICK RINSE
                </h4>
                <p className="font-body-sm text-body-sm text-on-surface-variant">
                  Swirl a drop of warm water to rinse out sediment. No need to soak or scrub labels; our plant-based adhesive cleanly dissolves in our wash tubs.
                </p>
              </div>
              <div className="mt-space-md pt-space-sm flex items-center gap-2 text-secondary font-label-badge text-label-badge uppercase font-bold">
                <span className="material-symbols-outlined text-[18px]">water_drop</span> Step Two
              </div>
            </div>

            {/* Loop Step 3 */}
            <div className="relative bg-surface-container-low p-space-md rounded-xl shadow-sm flex flex-col justify-between border-2 border-on-surface">
              <div>
                <div className="w-10 h-10 rounded-full bg-surface-container-lowest flex items-center justify-center font-headline-sm text-headline-sm text-on-surface mb-space-md shadow-sm border border-on-surface font-bold">
                  3
                </div>
                <h4 className="font-headline-sm text-headline-sm text-on-surface uppercase mb-space-xs font-bold">
                  PORCH PICKUP
                </h4>
                <p className="font-body-sm text-body-sm text-on-surface-variant">
                  Pack 12 empties into your reusable thermal cooler pouch. Simply place it on your doorstep on delivery morning. Our courier picks it up seamlessly.
                </p>
              </div>
              <div className="mt-space-md pt-space-sm flex items-center gap-2 text-tertiary font-label-badge text-label-badge uppercase font-bold">
                <span className="material-symbols-outlined text-[18px]">doorbell</span> Step Three
              </div>
            </div>

            {/* Loop Step 4 */}
            <div className="relative bg-surface-container-low p-space-md rounded-xl shadow-sm flex flex-col justify-between border-2 border-on-surface">
              <div>
                <div className="w-10 h-10 rounded-full bg-tertiary-fixed text-on-tertiary-fixed flex items-center justify-center font-headline-sm text-headline-sm mb-space-md shadow-sm border border-on-surface font-bold">
                  4
                </div>
                <h4 className="font-headline-sm text-headline-sm text-on-surface uppercase mb-space-xs font-bold">
                  GET $10 CREDIT
                </h4>
                <p className="font-body-sm text-body-sm text-on-surface-variant">
                  We sanitize bottles under medical autoclave steam. You automatically receive $10 digital credit loaded into your SIP DRIFT account instantly.
                </p>
              </div>
              <div className="mt-space-md pt-space-sm flex items-center gap-2 text-tertiary font-label-badge text-label-badge uppercase font-bold">
                <span className="material-symbols-outlined text-[18px]">loyalty</span> $10 Auto-Credit
              </div>
            </div>
          </div>

          {/* Loop Graphic Visual Bar */}
          <div className="mt-space-xl bg-surface-container p-space-md rounded-xl flex flex-col md:flex-row items-center justify-between gap-space-md border-2 border-on-surface">
            <div className="flex items-center gap-space-md">
              <div className="w-12 h-12 rounded-full bg-secondary text-on-secondary flex items-center justify-center shrink-0 border border-on-surface shadow-sm">
                <span className="material-symbols-outlined text-[24px]">cyclone</span>
              </div>
              <div>
                <h5 className="font-headline-sm text-headline-sm text-on-surface uppercase font-bold">
                  Up to 45 Refill Cycles Per Bottle
                </h5>
                <p className="font-body-sm text-body-sm text-on-surface-variant">
                  Medical-grade thermal borosilicate glass lasts up to 6 years in continuous rotation.
                </p>
              </div>
            </div>
            <button
              onClick={onRequestReturnPouch}
              className="px-5 py-2.5 rounded-full bg-secondary text-on-secondary font-label-lg text-label-lg uppercase tracking-wider shadow-[3px_3px_0px_#1b1b1f] border-2 border-on-surface hover:bg-secondary-container transition-all active:translate-x-0.5 active:translate-y-0.5 active:shadow-none cursor-pointer whitespace-nowrap"
              type="button"
            >
              Request Extra Return Pouch
            </button>
          </div>
        </div>
      </section>

      {/* SECTION 5: CREATOR & MUSIC POP-UP COLLECTIVE */}
      <section id="chill-tent" className="w-full px-gutter md:px-gutter-desktop max-w-7xl mx-auto py-space-xl">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-space-xl gap-space-md">
          <div>
            <span className="font-label-badge text-label-badge bg-primary-fixed text-on-primary-fixed px-3 py-1 rounded-full uppercase tracking-wider font-bold border border-on-surface">
              Culture • Sound • Community
            </span>
            <h2 className="font-headline-lg text-headline-md md:text-headline-lg text-on-surface uppercase tracking-tight mt-2 font-bold">
              THE ROAD &amp; DROP LAB
            </h2>
          </div>
          <p className="font-body-md text-body-md text-on-surface-variant max-w-md">
            We don’t sponsor boring corporate 5K runs. We bring ice-cold hydration oases to festival desert fields, warehouse DJ sets, and underground skate jams.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-space-md">
          {/* Major Feature Card */}
          <div className="md:col-span-8 bg-surface-container-lowest rounded-xl overflow-hidden shadow-xl flex flex-col border-2 border-on-surface">
            <div className="relative h-72 md:h-96 w-full">
              <img
                className="w-full h-full object-cover"
                alt="Coachella Hydration Oasis Chill Tent Tour"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCCnC6tc5b3j2s6o5ZE7Xdl6I0LL7K2Uu8-tddHsn4IbF7WeZ-Xb1VIyEv2kSwjDdg8Zj-EBc3WoVbvUxbmWiXpGg6z3H-MXmuLpfKScno9ZzL5NUM8kQIBJC1dxVPrjYMZMvFizAQil1x_QmMl6jAnKAG4jy-x90v-1kv-FR4_FyIdUMnbopC7WSmFZBBvlUmjRXXiIcfdQMJydzdmDM4aFowgPjls7IVMLT-Scqt5Faifn3RiDLAF"
              />
              <div className="absolute top-4 left-4 flex gap-2">
                <span className="bg-surface-container-lowest/95 backdrop-blur-md text-on-surface font-label-badge text-label-badge px-3 py-1 rounded-full uppercase font-bold shadow-sm border border-on-surface">
                  Coachella Hydration Oasis
                </span>
                <span className="bg-secondary text-on-secondary font-label-badge text-label-badge px-3 py-1 rounded-full uppercase font-bold border border-on-surface">
                  April 2025
                </span>
              </div>
            </div>
            <div className="p-space-lg flex flex-col justify-between flex-1">
              <div>
                <h3 className="font-headline-md text-headline-md text-on-surface uppercase mb-space-xs font-bold">
                  THE CHILL TENT TOUR '25
                </h3>
                <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                  Find our custom neon-wrapped refrigerated truck at Coachella, Governors Ball, Pitchfork Music Fest, and Portola. Free adaptogenic cold shots for anyone in need of nervous system restoration.
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-space-md mt-space-md pt-space-sm border-t border-outline-variant/30">
                <span className="font-label-md text-label-md text-on-surface font-bold uppercase">
                  Next Stops:
                </span>
                <span className="font-label-badge text-label-badge bg-surface-container px-2.5 py-1 rounded-full text-on-surface border border-on-surface font-bold">
                  Indio, CA
                </span>
                <span className="font-label-badge text-label-badge bg-surface-container px-2.5 py-1 rounded-full text-on-surface border border-on-surface font-bold">
                  Austin, TX
                </span>
                <span className="font-label-badge text-label-badge bg-surface-container px-2.5 py-1 rounded-full text-on-surface border border-on-surface font-bold">
                  Brooklyn, NY
                </span>
                <span className="font-label-badge text-label-badge bg-surface-container px-2.5 py-1 rounded-full text-on-surface border border-on-surface font-bold">
                  Seattle, WA
                </span>
              </div>
            </div>
          </div>

          {/* Discord Drop Lab Side Bento with Interactive Voting */}
          <div className="md:col-span-4 bg-surface-container rounded-xl p-space-lg shadow-xl flex flex-col justify-between border-2 border-on-surface">
            <div>
              <div className="flex items-center justify-between mb-space-md">
                <span className="w-10 h-10 rounded-full bg-tertiary-fixed text-on-tertiary-fixed flex items-center justify-center font-bold border border-on-surface">
                  <span className="material-symbols-outlined text-[20px]">how_to_vote</span>
                </span>
                <span className="font-label-badge text-label-badge bg-surface-container-lowest text-on-surface px-2.5 py-1 rounded-full font-bold shadow-sm border border-on-surface">
                  Discord VIPs
                </span>
              </div>

              <span className="font-label-badge text-label-badge text-primary uppercase font-bold tracking-wider">
                Interactive Community Vote
              </span>
              <h4 className="font-headline-md text-headline-md text-on-surface uppercase mt-1 mb-space-sm font-bold">
                DROP LAB #09
              </h4>
              <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                Our Discord members craft and vote on our micro-batch releases. Cast your token for next month’s limited release:
              </p>

              {/* Micro-poll interactive UI */}
              <div className="flex flex-col gap-space-sm mt-space-md" id="voteContainer">
                <button
                  onClick={() => handleVote('opt1')}
                  className={`w-full text-left p-3 rounded-lg shadow-sm flex items-center justify-between transition-all border-2 border-on-surface cursor-pointer ${
                    votedOption === 'opt1'
                      ? 'bg-surface-container-high ring-2 ring-primary'
                      : 'bg-surface-container-lowest hover:bg-surface-bright'
                  }`}
                  type="button"
                >
                  <div>
                    <span className="font-label-md text-label-md text-on-surface block font-bold">
                      Electric Yuzu + Blue Spirulina
                    </span>
                    <span className="font-body-sm text-body-sm text-on-surface-variant">
                      Cognitive Clarity • {voteStats.opt1.votes}% ({voteStats.opt1.count} votes)
                    </span>
                  </div>
                  <span className="material-symbols-outlined text-tertiary text-[20px]">
                    {votedOption === 'opt1' ? 'check_circle' : 'radio_button_unchecked'}
                  </span>
                </button>

                <button
                  onClick={() => handleVote('opt2')}
                  className={`w-full text-left p-3 rounded-lg shadow-sm flex items-center justify-between transition-all border-2 border-on-surface cursor-pointer ${
                    votedOption === 'opt2'
                      ? 'bg-surface-container-high ring-2 ring-secondary'
                      : 'bg-surface-container-lowest hover:bg-surface-bright'
                  }`}
                  type="button"
                >
                  <div>
                    <span className="font-label-md text-label-md text-on-surface block font-bold">
                      Guava Habanero + Chaga
                    </span>
                    <span className="font-body-sm text-body-sm text-on-surface-variant">
                      Metabolic Ignite • {voteStats.opt2.votes}% ({voteStats.opt2.count} votes)
                    </span>
                  </div>
                  <span className="material-symbols-outlined text-tertiary text-[20px]">
                    {votedOption === 'opt2' ? 'check_circle' : 'radio_button_unchecked'}
                  </span>
                </button>

                {showVoteSuccess && (
                  <div className="bg-tertiary-fixed text-on-tertiary-fixed p-2 rounded text-center text-xs font-bold border border-on-surface">
                    ✓ Your community vote token has been recorded!
                  </div>
                )}
              </div>
            </div>

            <div className="mt-space-lg pt-space-md">
              <button
                onClick={() => onNavigate('drop-lab')}
                className="w-full py-3 rounded-full bg-primary text-on-primary font-label-lg text-label-lg uppercase tracking-wider shadow-[3px_3px_0px_#1b1b1f] border-2 border-on-surface hover:bg-primary-container transition-all active:translate-x-0.5 active:translate-y-0.5 active:shadow-none flex items-center justify-center gap-2 cursor-pointer"
              >
                <span className="material-symbols-outlined text-[18px]">forum</span>
                Join Discord Tasting Room
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 6: COMMUNITY MANIFESTO CTA BANNER */}
      <section className="w-full px-gutter md:px-gutter-desktop max-w-7xl mx-auto py-space-xl">
        <div className="relative bg-primary text-on-primary rounded-xl p-space-lg md:p-space-2xl shadow-xl overflow-hidden text-center flex flex-col items-center border-2 border-on-surface">
          {/* Decorative Backdrop Blurs */}
          <div className="absolute -right-16 -top-16 w-80 h-80 rounded-full bg-secondary/30 blur-3xl pointer-events-none"></div>
          <div className="absolute -left-16 -bottom-16 w-80 h-80 rounded-full bg-tertiary-fixed/20 blur-3xl pointer-events-none"></div>

          <span className="bg-tertiary-fixed text-on-tertiary-fixed font-label-badge text-label-badge px-3 py-1 rounded-full uppercase tracking-wider mb-space-sm rotate-[-1deg] shadow-sm font-bold border border-on-surface">
            Raw • Alive • Conscious
          </span>
          <h2 className="font-display-hero text-headline-lg md:text-display-hero uppercase max-w-3xl leading-none text-on-primary font-black">
            TASTE THE DIFFERENCE OF LIVING NUTRITION.
          </h2>
          <p className="font-body-lg text-body-lg text-on-primary/90 max-w-2xl mt-space-md leading-relaxed">
            Start with our best-selling 6-bottle Curated Discovery Crate, or build a bespoke rotation packed in temperature-controlled mycelium coolers.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-space-sm mt-space-xl w-full sm:w-auto">
            <button
              onClick={() => onNavigate('shop-juices')}
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-surface text-on-surface font-label-lg text-label-lg uppercase tracking-wider font-bold shadow-[3px_3px_0px_#1b1b1f] border-2 border-on-surface hover:bg-surface-bright transition-all active:translate-x-0.5 active:translate-y-0.5 active:shadow-none cursor-pointer"
            >
              Explore Raw Elixirs
            </button>
            <button
              onClick={() => onNavigate('build-a-box')}
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-secondary text-on-secondary font-label-lg text-label-lg uppercase tracking-wider font-bold shadow-[3px_3px_0px_#1b1b1f] border-2 border-on-surface hover:bg-secondary-container transition-all active:translate-x-0.5 active:translate-y-0.5 active:shadow-none cursor-pointer"
            >
              Build Your Custom Crate
            </button>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-space-lg mt-space-xl text-on-primary/90 font-label-badge text-label-badge uppercase tracking-wider font-bold">
            <span className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[16px]">ac_unit</span> Shipped On Dry Ice
            </span>
            <span className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[16px]">autorenew</span> Free Bottle Returns
            </span>
            <span className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[16px]">cancel</span> Cancel Subscription Anytime
            </span>
          </div>
        </div>
      </section>
    </div>
  );
};
