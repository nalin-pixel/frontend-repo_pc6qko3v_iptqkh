import React from 'react';
import { Star, Cpu, LineChart, Mountain, Compass, Mail } from 'lucide-react';

export default function PeaksPanel({ active, onNavigate }) {
  const items = [
    { id: 'academic', icon: Star, title: 'Academic Peak', color: 'from-violet-500 to-fuchsia-500', desc: 'GCSE predictions: 9s in English, strong 8s across sciences and CS. Brilliant Club scholar.' },
    { id: 'tech', icon: Cpu, title: 'Tech Valley', color: 'from-sky-500 to-cyan-500', desc: 'PC builds, SolidWorks models, server tinkering, and Python projects.' },
    { id: 'entrepreneur', icon: LineChart, title: "Entrepreneur's Post", color: 'from-amber-500 to-orange-500', desc: 'Watch reselling, market insights, social media collabs, inventory savvy.' },
    { id: 'adventure', icon: Compass, title: 'Adventure Ridge', color: 'from-emerald-500 to-lime-500', desc: 'Wakeboarding, hiking, and outdoor fitness with weathered grit.' },
    { id: 'contact', icon: Mail, title: 'Contact Summit', color: 'from-yellow-400 to-rose-400', desc: 'Reach out and grab the CV flag at the top.' },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
      {items.map(({ id, icon: Icon, title, color, desc }) => (
        <button
          key={id}
          onClick={() => onNavigate(id)}
          className={`group rounded-xl border border-white/10 bg-white/5 p-4 text-left transition hover:bg-white/10 ${active === id ? 'ring-2 ring-white/30' : ''}`}
        >
          <div className={`inline-flex items-center justify-center rounded-lg bg-gradient-to-r ${color} p-2 text-white`}>
            <Icon size={18} />
          </div>
          <div className="mt-3 font-semibold text-white/90">{title}</div>
          <div className="mt-1 text-xs text-white/60">{desc}</div>
        </button>
      ))}
    </div>
  );
}
