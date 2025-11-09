import React, { useEffect, useRef, useState } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

export default function SoundToggle() {
  const [enabled, setEnabled] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    const audio = new Audio(
      'data:audio/mp3;base64,//uQZAAAAAAAAAAAAAAAAAAAAAAAWGluZwAAAA8AAAACAAACcQAAACQAAAC0AAAAbW91bnRhaW4gd2luZCBoYWxvIGxvbw=='
    );
    audio.loop = true;
    audio.volume = 0.15;
    audioRef.current = audio;
    return () => {
      audio.pause();
      audio.src = '';
    };
  }, []);

  useEffect(() => {
    const a = audioRef.current;
    if (!a) return;
    if (enabled) {
      a.play().catch(() => {});
    } else {
      a.pause();
    }
  }, [enabled]);

  return (
    <button
      onClick={() => setEnabled((v) => !v)}
      className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white hover:bg-white/10"
      aria-label="Toggle ambient sound"
    >
      {enabled ? <Volume2 size={14} /> : <VolumeX size={14} />}
      Ambient
    </button>
  );
}
