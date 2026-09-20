import React, { useState } from 'react';

interface ChatMessage {
  sender: 'bot' | 'user';
  text: string;
}

export const VibeCheckDrawer: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      sender: 'bot',
      text: 'Hey sipper! 🌿 Welcome to SIP DRIFT Botanicals. Ask me anything about our raw 3-hour cold-press process, bottle return rewards, or personalized juice pairing.',
    },
  ]);
  const [inputVal, setInputVal] = useState('');

  const quickPrompts = [
    'Why unpasteurized vs pasteurized?',
    'How do I earn $10 bottle return credit?',
    'Best elixir for brain fog?',
    'How is it shipped cold?',
  ];

  const handleSend = (textToSend?: string) => {
    const query = textToSend || inputVal;
    if (!query.trim()) return;

    const userMsg: ChatMessage = { sender: 'user', text: query };
    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputVal('');

    setTimeout(() => {
      let reply =
        "Our botanist team confirms all our juices are cold-pressed under 12-ton hydraulic pressure and HPP-sealed under 87,000 PSI with zero heat. Need a personalized recommendation? Try Electric Yuzu for focus or Glacial Lavender for evening calm!";

      const lower = query.toLowerCase();
      if (lower.includes('unpasteurized') || lower.includes('pasteur')) {
        reply =
          "Supermarket juice is flash-heated to 160°F+, which kills volatile live enzymes and degrades vitamins. SIP DRIFT keeps everything at 0°C to 3°C and applies sub-zero 87,000 PSI water pressure. You get 99.4% bio-active enzyme retention!";
      } else if (lower.includes('return') || lower.includes('credit') || lower.includes('$10') || lower.includes('bottle')) {
        reply =
          "Every order comes with a return pouch. Save 12 empties, rinse them with warm water, and set them on your porch for courier pickup. Once scanned at our autoclave sanitization lab, $10 is loaded directly into your Sipper account!";
      } else if (lower.includes('brain') || lower.includes('focus') || lower.includes('fog')) {
        reply =
          "For sharp mental clarity, our #1 recommendation is Electric Yuzu Morning (1,500mg Cordyceps + Blue Spirulina) paired with Emerald Matcha Surge (Ceremonial Uji Tencha + Wild Sea Moss)!";
      } else if (lower.includes('ship') || lower.includes('cold') || lower.includes('ice')) {
        reply =
          "We ship in temperature-controlled mycelium or recycled cellulose coolers with regenerative dry-ice blocks. Your bottles arrive chilled at 36°F, ready for your refrigerator!";
      }

      setMessages((prev) => [...prev, { sender: 'bot', text: reply }]);
    }, 600);
  };

  return (
    <>
      {/* Floating Pill Button */}
      <div className="fixed bottom-6 right-6 z-40">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2.5 px-4 py-3 rounded-full bg-surface-container-lowest border-2 border-on-surface shadow-[4px_4px_0px_#1b1b1f] hover:bg-surface-container-high transition-all active:translate-x-0.5 active:translate-y-0.5 active:shadow-none cursor-pointer"
          aria-label="Open Vibe Check and Support"
        >
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-tertiary opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-tertiary"></span>
          </span>
          <span className="material-symbols-outlined text-[20px] text-on-surface">
            {isOpen ? 'close' : 'forum'}
          </span>
          <span className="font-label-md text-label-md uppercase font-bold text-on-surface tracking-wider">
            Vibe Check &amp; Support
          </span>
        </button>
      </div>

      {/* Live Concierge Popover Window */}
      {isOpen && (
        <div className="fixed bottom-20 right-6 z-40 w-96 max-w-[calc(100vw-3rem)] bg-surface-container-lowest rounded-xl shadow-2xl border-2 border-on-surface flex flex-col h-[480px] overflow-hidden">
          {/* Header */}
          <div className="p-3 bg-primary text-on-primary flex items-center justify-between border-b-2 border-on-surface">
            <div className="flex items-center gap-2">
              <span className="w-8 h-8 rounded-full bg-surface-container-lowest flex items-center justify-center text-primary font-bold border border-on-surface">
                🌿
              </span>
              <div>
                <h4 className="font-headline-sm text-[13px] uppercase font-bold leading-none">
                  SIP DRIFT Botanist Desk
                </h4>
                <span className="text-[10px] text-tertiary-fixed font-bold flex items-center gap-1 mt-0.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-tertiary-fixed animate-pulse"></span>
                  Live Bio-Specialist Online
                </span>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-on-primary hover:opacity-80 p-1 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[20px]">close</span>
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 p-3 overflow-y-auto flex flex-col gap-2.5 bg-surface">
            {messages.map((m, idx) => (
              <div
                key={idx}
                className={`max-w-[85%] p-2.5 rounded-xl text-xs leading-relaxed ${
                  m.sender === 'user'
                    ? 'ml-auto bg-secondary text-on-secondary border-2 border-on-surface font-medium'
                    : 'mr-auto bg-surface-container-lowest text-on-surface border border-on-surface/20 shadow-xs'
                }`}
              >
                {m.text}
              </div>
            ))}
          </div>

          {/* Quick suggestions pills */}
          <div className="p-2 bg-surface-container border-t border-on-surface/10 flex gap-1.5 overflow-x-auto no-scrollbar">
            {quickPrompts.map((q, i) => (
              <button
                key={i}
                onClick={() => handleSend(q)}
                className="whitespace-nowrap px-2.5 py-1 rounded-full bg-surface-container-lowest text-on-surface text-[10px] font-bold uppercase border border-on-surface hover:bg-surface-bright transition-colors cursor-pointer shrink-0"
              >
                {q}
              </button>
            ))}
          </div>

          {/* Input field */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="p-2.5 bg-surface-container-lowest border-t-2 border-on-surface flex gap-1.5"
          >
            <input
              type="text"
              placeholder="Ask about cold-press, brix, returns..."
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              className="flex-1 px-3 py-1.5 text-xs bg-surface border border-on-surface rounded-lg focus:outline-none focus:ring-1 focus:ring-primary"
            />
            <button
              type="submit"
              className="px-3 py-1.5 bg-primary text-on-primary font-bold text-xs uppercase rounded-lg border border-on-surface shadow-xs hover:bg-primary-container cursor-pointer"
            >
              Send
            </button>
          </form>
        </div>
      )}
    </>
  );
};
