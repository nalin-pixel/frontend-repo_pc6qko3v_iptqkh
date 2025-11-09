import React, { useEffect, useRef, useState, useMemo } from 'react';

// Simple atmospheric particle canvas with floating snippets
export default function MountainScene({ onNavigate, sections }) {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const [hoverLabel, setHoverLabel] = useState(null);

  const peaks = useMemo(() => {
    // Define clickable peak hotspots in percentages relative to container
    // id must match keys in sections
    return [
      { id: 'academic', x: 20, y: 55, size: 90, color: '#7c3aed', label: 'Academic Peak' },
      { id: 'tech', x: 45, y: 62, size: 70, color: '#0ea5e9', label: 'Tech Valley' },
      { id: 'entrepreneur', x: 70, y: 68, size: 65, color: '#f97316', label: "Entrepreneur's Post" },
      { id: 'adventure', x: 58, y: 48, size: 80, color: '#22c55e', label: 'Adventure Ridge' },
      { id: 'contact', x: 85, y: 40, size: 60, color: '#eab308', label: 'Contact Summit' },
    ];
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationId;
    let particles = [];

    function resize() {
      const rect = canvas.parentElement.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
      // regenerate particles based on area
      const count = Math.min(160, Math.floor((rect.width * rect.height) / 8000));
      particles = new Array(count).fill(0).map(() => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        r: Math.random() * 1.8 + 0.2,
        a: Math.random() * Math.PI * 2,
      }));
    }

    function drawMountains() {
      const h = canvas.height;
      const w = canvas.width;
      // Low-poly layered mountains
      const layers = [
        { color: '#0b1220', offset: 0.75, rough: 90 },
        { color: '#0f172a', offset: 0.7, rough: 120 },
        { color: '#111827', offset: 0.62, rough: 160 },
      ];
      layers.forEach((layer, i) => {
        ctx.fillStyle = layer.color;
        ctx.beginPath();
        ctx.moveTo(0, h);
        const points = 10;
        for (let p = 0; p <= points; p++) {
          const x = (w / points) * p;
          const y = h * layer.offset + Math.sin((p + i) * 0.9) * layer.rough + (Math.random() - 0.5) * 20;
          ctx.lineTo(x, Math.min(h - 10, y));
        }
        ctx.lineTo(w, h);
        ctx.closePath();
        ctx.fill();
      });
    }

    function render() {
      const w = canvas.width;
      const h = canvas.height;
      ctx.clearRect(0, 0, w, h);

      // gradient night sky
      const grd = ctx.createLinearGradient(0, 0, 0, h);
      grd.addColorStop(0, '#0b0f1a');
      grd.addColorStop(1, '#0b132b');
      ctx.fillStyle = grd;
      ctx.fillRect(0, 0, w, h);

      // particles (snow/mist/code bits)
      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        p.a += 0.01;
        if (p.x < 0) p.x = w; if (p.x > w) p.x = 0;
        if (p.y < 0) p.y = h; if (p.y > h) p.y = 0;
        ctx.globalAlpha = 0.6;
        ctx.fillStyle = 'white';
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      });
      ctx.globalAlpha = 1;

      drawMountains();

      animationId = requestAnimationFrame(render);
    }

    resize();
    render();
    window.addEventListener('resize', resize);
    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  function getPeakRect(peak) {
    const el = containerRef.current;
    if (!el) return null;
    const rect = el.getBoundingClientRect();
    const x = (peak.x / 100) * rect.width;
    const y = (peak.y / 100) * rect.height;
    const size = (peak.size / 1000) * Math.min(rect.width, rect.height) * 2.2;
    return { x, y, size };
  }

  function handleClick(e) {
    const bounds = containerRef.current.getBoundingClientRect();
    const mx = e.clientX - bounds.left;
    const my = e.clientY - bounds.top;
    for (const peak of peaks) {
      const pr = getPeakRect(peak);
      if (!pr) continue;
      const dx = mx - pr.x;
      const dy = my - pr.y;
      if (Math.sqrt(dx * dx + dy * dy) <= pr.size * 0.6) {
        onNavigate(peak.id);
        break;
      }
    }
  }

  function handleMove(e) {
    const bounds = containerRef.current.getBoundingClientRect();
    const mx = e.clientX - bounds.left;
    const my = e.clientY - bounds.top;
    let found = null;
    for (const peak of peaks) {
      const pr = getPeakRect(peak);
      if (!pr) continue;
      const dx = mx - pr.x;
      const dy = my - pr.y;
      if (Math.sqrt(dx * dx + dy * dy) <= pr.size * 0.6) {
        found = peak;
        break;
      }
    }
    setHoverLabel(found ? found.label : null);
  }

  return (
    <div ref={containerRef} className="relative h-[90vh] w-full overflow-hidden rounded-xl border border-white/10 bg-slate-900">
      <canvas ref={canvasRef} className="absolute inset-0" />

      <div className="relative z-10 flex h-full flex-col items-center justify-center text-center px-6">
        <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white/90">
          SENNEN ALDWINCKLE-CARR
        </h1>
        <p className="mt-3 text-base sm:text-lg md:text-xl text-slate-300">
          Builder. Learner. Explorer.
        </p>
        <button
          onClick={() => onNavigate('academic')}
          className="mt-6 rounded-full bg-white/10 px-5 py-2 text-sm font-medium text-white backdrop-blur hover:bg-white/20 transition"
        >
          Begin the ascent
        </button>
      </div>

      {/* Clickable peaks */}
      <div
        className="absolute inset-0 cursor-crosshair"
        onClick={handleClick}
        onMouseMove={handleMove}
      >
        {peaks.map((p) => {
          const pr = getPeakRect(p) || { x: 0, y: 0, size: 0 };
          return (
            <div
              key={p.id}
              style={{ left: pr.x, top: pr.y }}
              className="absolute -translate-x-1/2 -translate-y-1/2"
            >
              <Mountain color={p.color} size={pr.size} glow={hoverLabel === p.label} />
            </div>
          );
        })}
      </div>

      {/* Hover label */}
      {hoverLabel && (
        <div className="pointer-events-none absolute bottom-6 left-1/2 z-20 -translate-x-1/2 rounded-full bg-black/50 px-4 py-1 text-sm text-white backdrop-blur">
          {hoverLabel}
        </div>
      )}

      {/* Atmospheric gradient overlay that doesn't block clicks */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent" />
    </div>
  );
}

function Mountain({ color = '#64748b', size = 60, glow = false }) {
  const s = Math.max(40, size);
  const shadow = glow ? `0 0 30px ${color}` : '0 10px 40px rgba(0,0,0,0.45)';
  return (
    <svg width={s} height={s} viewBox="0 0 100 100" style={{ filter: glow ? 'saturate(1.2)' : 'none' }}>
      <defs>
        <linearGradient id="peakGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.95" />
          <stop offset="100%" stopColor={color} stopOpacity="0.6" />
        </linearGradient>
      </defs>
      <g style={{ transform: 'translate(0, 5px)' }}>
        <polygon
          points="10,90 50,20 90,90"
          fill="url(#peakGrad)"
          stroke="rgba(255,255,255,0.08)"
          strokeWidth="2"
          style={{ boxShadow: shadow }}
        />
        <polygon points="50,20 65,45 50,40 35,55" fill="rgba(255,255,255,0.25)" />
      </g>
    </svg>
  );
}
