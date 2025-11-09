import React, { useState } from 'react';
import MountainScene from './components/MountainScene';
import PeaksPanel from './components/PeaksPanel';
import SectionDetails from './components/SectionDetails';
import SoundToggle from './components/SoundToggle';

export default function App() {
  const [active, setActive] = useState('academic');

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white">
      <div className="mx-auto max-w-6xl px-4 py-8">
        <header className="flex items-center justify-between py-3">
          <div className="text-sm text-white/60">Sennen Aldwinckle-Carr</div>
          <div className="flex items-center gap-3">
            <SoundToggle />
          </div>
        </header>

        <main className="space-y-6">
          <MountainScene onNavigate={setActive} sections={{}} />

          <div className="space-y-4">
            <PeaksPanel active={active} onNavigate={setActive} />
            <SectionDetails active={active} />
          </div>

          <footer className="pt-8 text-center text-xs text-white/50">
            Explore the peaks — click the beacons to navigate. Hidden items await.
          </footer>
        </main>
      </div>
    </div>
  );
}
