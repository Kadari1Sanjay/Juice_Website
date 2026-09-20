import React, { useState, useEffect } from 'react';

export const DropLab: React.FC = () => {
  // Countdown timer state
  const [timeLeft, setTimeLeft] = useState({
    days: 4,
    hours: 18,
    minutes: 32,
    seconds: 45,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        if (prev.days > 0) return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Community vote state
  const [selectedVote, setSelectedVote] = useState<number | null>(null);
  const [votes, setVotes] = useState([
    { id: 1, name: 'Electric Yuzu + Wild Blue Spirulina', category: 'Cognitive', pct: 46, count: 1240 },
    { id: 2, name: 'Maui Pink Guava + Roasted Habanero & Chaga', category: 'Metabolic', pct: 34, count: 918 },
    { id: 3, name: 'Prickly Pear + Tremella Mushroom & Lime', category: 'Skin Radiance', pct: 20, count: 540 },
  ]);

  const [voteSubmitted, setVoteSubmitted] = useState(false);

  const handleCastVote = (id: number) => {
    setSelectedVote(id);
    setVoteSubmitted(true);
    setVotes((prev) =>
      prev.map((item) => (item.id === id ? { ...item, count: item.count + 1 } : item))
    );
  };

  // Submit Alchemy formulation form
  const [proposal, setProposal] = useState({
    name: '',
    baseFruit: 'Calamansi & Blood Orange',
    adaptogen: 'Tremella Mushroom & Blue Lotus',
    kick: 'Pink Peppercorn & Smoked Salt',
    creatorHandle: '',
  });
  const [alchemySubmitted, setAlchemySubmitted] = useState(false);

  const handleAlchemySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (proposal.name && proposal.creatorHandle) {
      setAlchemySubmitted(true);
    }
  };

  return (
    <div className="w-full px-gutter md:px-gutter-desktop max-w-7xl mx-auto py-space-xl">
      {/* Hero Banner */}
      <div className="bg-surface-container-lowest rounded-xl p-space-lg md:p-space-2xl shadow-xl border-2 border-on-surface mb-space-xl relative overflow-hidden">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-space-lg relative z-10">
          <div className="max-w-2xl">
            <span className="bg-primary text-on-primary font-label-badge text-label-badge px-3 py-1 rounded-full uppercase tracking-wider font-bold border border-on-surface inline-block mb-2">
              Experimental R&amp;D Incubator
            </span>
            <h1 className="font-display-hero text-headline-lg md:text-display-hero uppercase tracking-tight font-black leading-none text-on-surface">
              THE SIP DRIFT DROP LAB
            </h1>
            <p className="font-body-lg text-body-lg text-on-surface-variant mt-2">
              We never launch flavors in corporate boardroom focus groups. We test small 500-bottle experimental runs co-created and voted on by our Discord community.
            </p>
          </div>

          {/* Countdown Clock Box */}
          <div className="bg-surface-container p-space-md rounded-xl border-2 border-on-surface shadow-[4px_4px_0px_#1b1b1f] text-center min-w-[280px]">
            <span className="font-label-badge text-label-badge text-primary uppercase font-bold tracking-wider block mb-1">
              Next Micro-Batch Release
            </span>
            <h4 className="font-headline-sm text-headline-sm uppercase font-bold text-on-surface">
              DROP #09: UNTITLED CITRUS
            </h4>
            <div className="grid grid-cols-4 gap-2 mt-3 text-center">
              <div className="bg-surface-container-lowest p-2 rounded-lg border border-on-surface">
                <span className="font-headline-md text-headline-md font-bold text-on-surface block leading-none">
                  {String(timeLeft.days).padStart(2, '0')}
                </span>
                <span className="text-[9px] font-label-badge uppercase font-bold text-on-surface-variant">
                  Days
                </span>
              </div>
              <div className="bg-surface-container-lowest p-2 rounded-lg border border-on-surface">
                <span className="font-headline-md text-headline-md font-bold text-on-surface block leading-none">
                  {String(timeLeft.hours).padStart(2, '0')}
                </span>
                <span className="text-[9px] font-label-badge uppercase font-bold text-on-surface-variant">
                  Hours
                </span>
              </div>
              <div className="bg-surface-container-lowest p-2 rounded-lg border border-on-surface">
                <span className="font-headline-md text-headline-md font-bold text-on-surface block leading-none">
                  {String(timeLeft.minutes).padStart(2, '0')}
                </span>
                <span className="text-[9px] font-label-badge uppercase font-bold text-on-surface-variant">
                  Mins
                </span>
              </div>
              <div className="bg-surface-container-lowest p-2 rounded-lg border border-on-surface">
                <span className="font-headline-md text-headline-md font-bold text-secondary block leading-none">
                  {String(timeLeft.seconds).padStart(2, '0')}
                </span>
                <span className="text-[9px] font-label-badge uppercase font-bold text-on-surface-variant">
                  Secs
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Grid: Community Voting & Flavor Alchemy Submission */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg mb-space-xl">
        {/* Left Column: Community Voting */}
        <div className="lg:col-span-6 bg-surface-container-lowest rounded-xl p-space-lg shadow-xl border-2 border-on-surface flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="bg-tertiary-fixed text-on-tertiary-fixed font-label-badge text-label-badge px-2.5 py-1 rounded-full uppercase font-bold border border-on-surface">
                Active Community Ballot
              </span>
              <span className="font-body-sm text-body-sm text-on-surface-variant font-bold">
                2,698 votes recorded
              </span>
            </div>
            <h3 className="font-headline-md text-headline-md uppercase font-bold text-on-surface mb-2">
              WHICH ELIXIR ENTERS PRODUCTION?
            </h3>
            <p className="font-body-sm text-body-sm text-on-surface-variant mb-space-md">
              The winning formula will be cold-pressed at Ojai Valley, bottled in 500 numbered amber bottles, and shipped exclusively to Sipper VIPs.
            </p>

            <div className="flex flex-col gap-3">
              {votes.map((item) => {
                const isSelected = selectedVote === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleCastVote(item.id)}
                    className={`p-4 rounded-xl text-left border-2 border-on-surface transition-all cursor-pointer relative overflow-hidden ${
                      isSelected
                        ? 'bg-surface-container-high ring-2 ring-primary shadow-[3px_3px_0px_#1b1b1f]'
                        : 'bg-surface-container-lowest hover:bg-surface-bright shadow-sm'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-label-badge text-label-badge uppercase font-bold bg-surface-container px-2 py-0.5 rounded border border-on-surface">
                        {item.category}
                      </span>
                      <span className="font-headline-sm text-headline-sm text-primary font-bold">
                        {item.pct}%
                      </span>
                    </div>
                    <h5 className="font-headline-sm text-headline-sm uppercase font-bold text-on-surface">
                      {item.name}
                    </h5>
                    <div className="w-full bg-surface-container-highest rounded-full h-2 mt-2 overflow-hidden border border-on-surface/10">
                      <div
                        className="bg-primary h-full rounded-full transition-all duration-500"
                        style={{ width: `${item.pct}%` }}
                      ></div>
                    </div>
                  </button>
                );
              })}
            </div>

            {voteSubmitted && (
              <div className="mt-3 bg-tertiary-fixed text-on-tertiary-fixed p-2.5 rounded-lg text-center text-xs font-bold border border-on-surface">
                ✓ Ballot recorded on the Sipper Blockchain. Thank you for voting!
              </div>
            )}
          </div>

          <div className="mt-space-md pt-space-sm border-t border-on-surface/10 flex items-center justify-between">
            <span className="text-body-sm text-on-surface-variant font-medium">
              Want tasting samples before voting?
            </span>
            <a
              href="#discord"
              className="text-body-sm font-label-md uppercase font-bold text-secondary hover:underline"
            >
              Join VIP Discord →
            </a>
          </div>
        </div>

        {/* Right Column: Submit Your Flavor Alchemy Formulation */}
        <div className="lg:col-span-6 bg-surface-container rounded-xl p-space-lg shadow-xl border-2 border-on-surface flex flex-col justify-between">
          <div>
            <span className="bg-secondary-fixed text-on-secondary-fixed font-label-badge text-label-badge px-2.5 py-1 rounded-full uppercase font-bold border border-on-surface inline-block mb-1">
              Crowdsourced Botanical R&amp;D
            </span>
            <h3 className="font-headline-md text-headline-md uppercase font-bold text-on-surface mb-2">
              PROPOSE A MICRO-BATCH
            </h3>
            <p className="font-body-sm text-body-sm text-on-surface-variant mb-space-md">
              Have an obsession with a rare fruit or medicinal root? Submit your botanical formula. If selected by our lead food scientist, you receive 24 free bottles and 2% royalty.
            </p>

            {alchemySubmitted ? (
              <div className="bg-surface-container-lowest p-space-md rounded-xl border-2 border-on-surface text-center shadow-md">
                <span className="material-symbols-outlined text-[48px] text-tertiary mb-1">
                  check_circle
                </span>
                <h4 className="font-headline-md text-headline-md uppercase font-bold text-on-surface">
                  Formula Logged into the Lab Vault!
                </h4>
                <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">
                  Our botanical master will review "{proposal.name}" for hydraulic feasibility and brix balance. Watch your Discord DM (@{proposal.creatorHandle}).
                </p>
                <button
                  onClick={() => {
                    setAlchemySubmitted(false);
                    setProposal({
                      name: '',
                      baseFruit: 'Calamansi & Blood Orange',
                      adaptogen: 'Tremella Mushroom & Blue Lotus',
                      kick: 'Pink Peppercorn & Smoked Salt',
                      creatorHandle: '',
                    });
                  }}
                  className="mt-space-md px-4 py-2 rounded-full bg-primary text-on-primary font-label-md text-label-md uppercase font-bold border-2 border-on-surface shadow-[2px_2px_0px_#1b1b1f] cursor-pointer"
                >
                  Submit Another Recipe
                </button>
              </div>
            ) : (
              <form onSubmit={handleAlchemySubmit} className="flex flex-col gap-3">
                <div>
                  <label className="block text-[11px] font-label-badge uppercase font-bold text-on-surface mb-1">
                    Proposed Elixir Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Electric Calamansi Lightning"
                    value={proposal.name}
                    onChange={(e) => setProposal({ ...proposal, name: e.target.value })}
                    className="w-full px-3 py-2 text-body-sm bg-surface-container-lowest border-2 border-on-surface rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-label-badge uppercase font-bold text-on-surface mb-1">
                      Base Fruit &amp; Citrus
                    </label>
                    <select
                      value={proposal.baseFruit}
                      onChange={(e) => setProposal({ ...proposal, baseFruit: e.target.value })}
                      className="w-full px-3 py-2 text-body-sm bg-surface-container-lowest border-2 border-on-surface rounded-lg font-medium"
                    >
                      <option>Calamansi &amp; Blood Orange</option>
                      <option>Prickly Pear &amp; Passionfruit</option>
                      <option>Wild Blueberry &amp; Yuzu</option>
                      <option>Mangosteen &amp; Young Coconut</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-label-badge uppercase font-bold text-on-surface mb-1">
                      Medicinal Adaptogen
                    </label>
                    <select
                      value={proposal.adaptogen}
                      onChange={(e) => setProposal({ ...proposal, adaptogen: e.target.value })}
                      className="w-full px-3 py-2 text-body-sm bg-surface-container-lowest border-2 border-on-surface rounded-lg font-medium"
                    >
                      <option>Tremella Mushroom &amp; Blue Lotus</option>
                      <option>KSM-66 Ashwagandha</option>
                      <option>Wild Reishi Mushroom</option>
                      <option>Siberian Rhodiola Rosea</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-label-badge uppercase font-bold text-on-surface mb-1">
                    Your Discord / Instagram Handle
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="@sipper_botanist"
                    value={proposal.creatorHandle}
                    onChange={(e) => setProposal({ ...proposal, creatorHandle: e.target.value })}
                    className="w-full px-3 py-2 text-body-sm bg-surface-container-lowest border-2 border-on-surface rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>

                <button
                  type="submit"
                  className="mt-2 py-3 rounded-full bg-secondary text-on-secondary font-label-md text-label-md uppercase font-bold border-2 border-on-surface shadow-[3px_3px_0px_#1b1b1f] hover:bg-secondary-container transition-all active:translate-x-0.5 active:translate-y-0.5 cursor-pointer"
                >
                  Submit Recipe to Food Science Lab
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Verified Certificate of Analysis (COA) Transparency Inspector */}
      <div className="bg-surface-container-lowest rounded-xl p-space-lg md:p-space-xl shadow-xl border-2 border-on-surface">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-space-md">
          <div>
            <span className="font-label-badge text-label-badge bg-tertiary-fixed text-on-tertiary-fixed px-2.5 py-0.5 rounded-full uppercase font-bold border border-on-surface">
              Laboratory Certified
            </span>
            <h3 className="font-headline-md text-headline-md uppercase font-bold text-on-surface mt-1">
              CERTIFICATE OF ANALYSIS (COA) • BATCH #881-A
            </h3>
          </div>
          <span className="text-body-sm font-label-badge text-on-surface-variant font-bold">
            Audited by Eurofins BioDiagnostics
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-space-md text-center">
          <div className="bg-surface-container p-3 rounded-lg border border-on-surface/10">
            <span className="text-[11px] font-label-badge uppercase font-bold text-on-surface-variant block">
              Bio-Enzyme Retention
            </span>
            <span className="font-headline-md text-headline-md text-tertiary font-black">
              99.4%
            </span>
            <span className="text-[10px] text-tertiary font-bold block">Target &gt; 98.0%</span>
          </div>

          <div className="bg-surface-container p-3 rounded-lg border border-on-surface/10">
            <span className="text-[11px] font-label-badge uppercase font-bold text-on-surface-variant block">
              Aerobic Plate Count
            </span>
            <span className="font-headline-md text-headline-md text-primary font-black">
              &lt; 10 CFU/g
            </span>
            <span className="text-[10px] text-primary font-bold block">100% Sterile (Pass)</span>
          </div>

          <div className="bg-surface-container p-3 rounded-lg border border-on-surface/10">
            <span className="text-[11px] font-label-badge uppercase font-bold text-on-surface-variant block">
              Sub-Zero HPP Torque
            </span>
            <span className="font-headline-md text-headline-md text-secondary font-black">
              87,000 PSI
            </span>
            <span className="text-[10px] text-secondary font-bold block">Zero Heat Tested</span>
          </div>

          <div className="bg-surface-container p-3 rounded-lg border border-on-surface/10">
            <span className="text-[11px] font-label-badge uppercase font-bold text-on-surface-variant block">
              Synthetic Preservatives
            </span>
            <span className="font-headline-md text-headline-md text-on-surface font-black">
              0.000%
            </span>
            <span className="text-[10px] text-on-surface-variant font-bold block">None Detected</span>
          </div>
        </div>
      </div>
    </div>
  );
};
