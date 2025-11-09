import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Cpu, LineChart, Waves, Cloud } from 'lucide-react';

export default function SectionDetails({ active }) {
  const content = {
    academic: {
      title: 'Academic Peak',
      color: 'from-violet-500 to-fuchsia-500',
      bullets: [
        'GCSE predictions: Grade 9 in English',
        'Strong 8s across Sciences and Computer Science',
        'The Brilliant Club scholar recognition',
        'Floating grade badges that spin when hovered',
      ],
      icon: Star,
    },
    tech: {
      title: 'Tech Valley / Base Camp',
      color: 'from-sky-500 to-cyan-500',
      bullets: [
        'Computer components assemble into custom PCs',
        'SolidWorks 3D models spin in the air',
        'Server racks symbolize IT infrastructure work',
        'Python code snippets drift like leaves',
      ],
      icon: Cpu,
    },
    entrepreneur: {
      title: "Entrepreneur’s Trading Post",
      color: 'from-amber-500 to-orange-500',
      bullets: [
        'Watch reselling with data-driven pricing',
        'Animated market graphs tracking success',
        'Social media collab with a hairdresser',
        'Inventory and coins hint at business acumen',
      ],
      icon: LineChart,
    },
    adventure: {
      title: 'Adventure Ridge',
      color: 'from-emerald-500 to-lime-500',
      bullets: [
        'Wakeboarding on shimmering water',
        'Hiking trail markers and fitness silhouettes',
        'Wind and mist add mountain atmosphere',
        'Hidden easter eggs scattered along the trail',
      ],
      icon: Waves,
    },
    contact: {
      title: 'Contact Summit',
      color: 'from-yellow-400 to-rose-400',
      bullets: [
        'Email and phone glow like beacons',
        'Download CV as a flag planted at the top',
        'Ambient sound toggle for mountain wind',
        'Parallax scrolling as a backup navigation',
      ],
      icon: Cloud,
    },
  };

  const section = content[active];

  return (
    <div className="mt-6">
      <AnimatePresence mode="wait">
        <motion.div
          key={active}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.3 }}
          className="rounded-2xl border border-white/10 bg-white/5 p-5"
        >
          <div className={`inline-flex items-center gap-2 rounded-lg bg-gradient-to-r ${section.color} px-3 py-1 text-white`}>
            <section.icon size={16} />
            <span className="text-sm font-semibold">{section.title}</span>
          </div>

          <ul className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-white/80">
            {section.bullets.map((b, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="mt-1 h-1.5 w-1.5 rounded-full bg-white/60" />
                <span>{b}</span>
              </li>
            ))}
          </ul>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
