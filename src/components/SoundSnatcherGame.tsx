import React, { useRef, useEffect, useState, useCallback } from 'react';
import { Music, RefreshCw, Camera, Download, Heart, Award, Sparkles, Wind, Waves, Disc } from 'lucide-react';
import { soundEngine, PENTATONIC_FREQUENCIES } from '../utils/sound';
import { SchoolConfig } from '../types';

interface SoundSnatcherGameProps {
  childName: string;
  schoolConfig: SchoolConfig;
  onWinGame: (winData: {
    dataUrl: string;
    seedsConnected: number;
    creatureName: string;
    seedHex: string;
    melodyNotes: number[];
  }) => void;
}

interface FallingLetter {
  id: number;
  char: string;
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  bounciness: number; // 0.6..0.98
  weight: number; // 0.8..1.8
  color: string;
  pitchIdx: number;
  rot: number;
}

interface BouncerPebble {
  id: number;
  x: number;
  y: number;
  radius: number;
  color: string;
  type: 'bell' | 'star' | 'drum';
  bounceCount: number;
}

interface HitRipple {
  id: number;
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  color: string;
  alpha: number;
}

type TerrainType = 'windy' | 'underwater' | 'bounce';

const TERRAIN_CONFIGS: Record<TerrainType, { title: string; icon: string; gravity: number; wind: number; buoyancy: number; bg: string }> = {
  windy: {
    title: 'Windy Plains',
    icon: '💨',
    gravity: 0.28,
    wind: -0.12,
    buoyancy: 1.0,
    bg: 'linear-gradient(to bottom, #1E1B4B, #312E81)',
  },
  underwater: {
    title: 'Underwater Cave',
    icon: '🫧',
    gravity: 0.1,
    wind: 0.0,
    buoyancy: 0.85,
    bg: 'linear-gradient(to bottom, #064E3B, #022C22)',
  },
  bounce: {
    title: 'Bounce Valley',
    icon: '⛰️',
    gravity: 0.35,
    wind: 0.05,
    buoyancy: 1.2,
    bg: 'linear-gradient(to bottom, #7C2D12, #451A03)',
  },
};

export const SoundSnatcherGame: React.FC<SoundSnatcherGameProps> = ({
  childName,
  schoolConfig,
  onWinGame,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationFrameRef = useRef<number | null>(null);

  // Terrain State
  const [terrain, setTerrain] = useState<TerrainType>('windy');
  const [totalBounces, setTotalBounces] = useState<number>(0);
  const [isSymphonyActive, setIsSymphonyActive] = useState<boolean>(false);
  const [polaroidDataUrl, setPolaroidDataUrl] = useState<string | null>(null);
  const [recordedNotes, setRecordedNotes] = useState<number[]>([]);

  // Physics Elements Refs
  const lettersRef = useRef<FallingLetter[]>([]);
  const pebblesRef = useRef<BouncerPebble[]>([]);
  const ripplesRef = useRef<HitRipple[]>([]);
  const dancePhaseRef = useRef<number>(0);

  // Initialize Name Letters with Letter Traits
  const initLetters = useCallback(() => {
    const lettersStr = (childName.replace(/\s+/g, '') || 'MAYA').toUpperCase();
    const chars = lettersStr.split('');
    const newLetters: FallingLetter[] = [];

    const colors = ['#F43F5E', '#EC4899', '#8B5CF6', '#3B82F6', '#10B981', '#F59E0B'];

    chars.forEach((char, idx) => {
      const code = char.charCodeAt(0);
      newLetters.push({
        id: idx + 1,
        char,
        x: 0.15 + (idx / Math.max(1, chars.length)) * 0.7,
        y: 0.08 + Math.random() * 0.1,
        vx: (Math.random() - 0.5) * 0.004,
        vy: Math.random() * 0.002,
        radius: 22 + (code % 10),
        bounciness: 0.7 + (code % 25) / 100, // E.g. Rubber vs lead
        weight: 0.8 + (code % 15) / 10,
        color: colors[idx % colors.length],
        pitchIdx: idx % PENTATONIC_FREQUENCIES.length,
        rot: 0,
      });
    });

    lettersRef.current = newLetters;
  }, [childName]);

  useEffect(() => {
    initLetters();
  }, [initLetters]);

  // Main Physics Canvas Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let lastTime = performance.now();

    const render = (now: number) => {
      const dt = Math.min((now - lastTime) / 1000, 0.1);
      lastTime = now;

      const width = canvas.clientWidth;
      const height = canvas.clientHeight;
      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
      }

      const env = TERRAIN_CONFIGS[terrain];

      // Render Background
      const bgGrad = ctx.createLinearGradient(0, 0, 0, height);
      if (terrain === 'windy') {
        bgGrad.addColorStop(0, '#1E1B4B');
        bgGrad.addColorStop(1, '#312E81');
      } else if (terrain === 'underwater') {
        bgGrad.addColorStop(0, '#064E3B');
        bgGrad.addColorStop(1, '#022C22');
      } else {
        bgGrad.addColorStop(0, '#7C2D12');
        bgGrad.addColorStop(1, '#451A03');
      }
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, width, height);

      // Render Bouncer Pebbles
      pebblesRef.current.forEach((pebble) => {
        ctx.save();
        ctx.translate(pebble.x * width, pebble.y * height);

        // Glow aura
        const glow = ctx.createRadialGradient(0, 0, 4, 0, 0, pebble.radius * 1.6);
        glow.addColorStop(0, pebble.color);
        glow.addColorStop(1, 'rgba(0,0,0,0)');
        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.arc(0, 0, pebble.radius * 1.6, 0, Math.PI * 2);
        ctx.fill();

        // Pebble body
        ctx.beginPath();
        ctx.arc(0, 0, pebble.radius, 0, Math.PI * 2);
        ctx.fillStyle = isSymphonyActive ? '#FBBF24' : '#FFFFFF';
        ctx.shadowColor = pebble.color;
        ctx.shadowBlur = 12;
        ctx.fill();

        ctx.lineWidth = 3;
        ctx.strokeStyle = pebble.color;
        ctx.stroke();

        ctx.restore();
      });

      // Render & Update Hit Ripples
      ripplesRef.current.forEach((r) => {
        r.radius += 2.5;
        r.alpha -= 0.025;

        if (r.alpha > 0) {
          ctx.beginPath();
          ctx.arc(r.x * width, r.y * height, r.radius, 0, Math.PI * 2);
          ctx.strokeStyle = r.color;
          ctx.globalAlpha = Math.max(0, r.alpha);
          ctx.lineWidth = 3;
          ctx.stroke();
          ctx.globalAlpha = 1.0;
        }
      });
      ripplesRef.current = ripplesRef.current.filter((r) => r.alpha > 0);

      // Render & Update Falling Name Letters
      lettersRef.current.forEach((l) => {
        if (isSymphonyActive) {
          // Dance Mode: Hop and wiggle to music
          dancePhaseRef.current += 0.05;
          l.y = 0.45 + Math.sin(dancePhaseRef.current * 3 + l.id) * 0.08;
          l.rot = Math.sin(dancePhaseRef.current * 2 + l.id) * 0.3;
        } else {
          // Physics Mode
          l.vy += env.gravity * 0.0003 * l.weight;
          l.vx += env.wind * 0.0002;

          l.x += l.vx;
          l.y += l.vy;
          l.rot += l.vx * 2;

          // Wall Bounces
          const rNormX = l.radius / width;
          const rNormY = l.radius / height;

          if (l.x - rNormX < 0.02) {
            l.x = 0.02 + rNormX;
            l.vx *= -l.bounciness;
          }
          if (l.x + rNormX > 0.98) {
            l.x = 0.98 - rNormX;
            l.vx *= -l.bounciness;
          }
          if (l.y + rNormY > 0.92) {
            l.y = 0.92 - rNormY;
            l.vy *= -l.bounciness;
            l.vx *= 0.92;
          }

          // Collisions with Bouncer Pebbles
          pebblesRef.current.forEach((peb) => {
            const dx = (l.x - peb.x) * width;
            const dy = (l.y - peb.y) * height;
            const dist = Math.hypot(dx, dy);
            const minDist = l.radius + peb.radius;

            if (dist < minDist && dist > 0.001) {
              // Elastic response
              const nx = dx / dist;
              const ny = dy / dist;

              l.x = peb.x + (nx * minDist) / width;
              l.y = peb.y + (ny * minDist) / height;

              const bounceVel = 0.008 * env.buoyancy;
              l.vx = nx * bounceVel * l.bounciness;
              l.vy = ny * bounceVel * l.bounciness;

              peb.bounceCount += 1;

              // Sound note
              const noteFreq = soundEngine.playNote(l.pitchIdx, 0.4, 'triangle');
              setRecordedNotes((prev) => [...prev.slice(-15), noteFreq]);

              // Ripple effect
              ripplesRef.current.push({
                id: Date.now() + Math.random(),
                x: peb.x,
                y: peb.y,
                radius: peb.radius,
                maxRadius: 50,
                color: l.color,
                alpha: 0.9,
              });

              setTotalBounces((b) => {
                const nextB = b + 1;
                if (nextB >= 10 && !isSymphonyActive) {
                  triggerNameSymphony();
                }
                return nextB;
              });
            }
          });
        }

        // Draw Letter Physics Sphere
        ctx.save();
        ctx.translate(l.x * width, l.y * height);
        ctx.rotate(l.rot);

        ctx.beginPath();
        ctx.arc(0, 0, l.radius, 0, Math.PI * 2);
        ctx.fillStyle = l.color;
        ctx.shadowColor = l.color;
        ctx.shadowBlur = 15;
        ctx.fill();

        ctx.lineWidth = 3;
        ctx.strokeStyle = '#FFFFFF';
        ctx.stroke();

        ctx.font = `bold ${l.radius * 1.1}px sans-serif`;
        ctx.fillStyle = '#FFFFFF';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.shadowBlur = 0;
        ctx.fillText(l.char, 0, 0);

        ctx.restore();
      });

      animationFrameRef.current = requestAnimationFrame(render);
    };

    animationFrameRef.current = requestAnimationFrame(render);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [terrain, isSymphonyActive]);

  // Tap Canvas to Place Bouncer Pebbles
  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas || isSymphonyActive) return;

    const rect = canvas.getBoundingClientRect();
    const x = (e.clientX - rect.left) / canvas.width;
    const y = (e.clientY - rect.top) / canvas.height;

    const colors = ['#F59E0B', '#10B981', '#EC4899', '#3B82F6', '#8B5CF6'];
    const newPebble: BouncerPebble = {
      id: Date.now() + Math.random(),
      x,
      y,
      radius: Math.floor(Math.random() * 10 + 18),
      color: colors[pebblesRef.current.length % colors.length],
      type: 'bell',
      bounceCount: 0,
    };

    soundEngine.playNote(pebblesRef.current.length, 0.3, 'sine');
    pebblesRef.current = [...pebblesRef.current.slice(-9), newPebble];
  };

  // Trigger Name Symphony Victory Explosion & Dance Track
  const triggerNameSymphony = () => {
    setIsSymphonyActive(true);
    soundEngine.playVictoryMelody(recordedNotes.length > 0 ? recordedNotes : [261.63, 329.63, 392.0, 523.25]);

    // Generate Polaroid Snapshot Canvas
    setTimeout(() => {
      generatePolaroidSnapshot();
    }, 1800);
  };

  // Render Souvenir Polaroid Canvas Snapshot
  const generatePolaroidSnapshot = () => {
    const mainCanvas = canvasRef.current;
    if (!mainCanvas) return;

    const pCanvas = document.createElement('canvas');
    pCanvas.width = 600;
    pCanvas.height = 720;
    const pCtx = pCanvas.getContext('2d');
    if (!pCtx) return;

    // Polaroid frame background
    pCtx.fillStyle = '#FFFFFF';
    pCtx.fillRect(0, 0, 600, 720);

    // Inner photo
    pCtx.drawImage(mainCanvas, 30, 30, 540, 540);

    // School Branding Banner on Polaroid bottom
    pCtx.fillStyle = '#1E1B4B';
    pCtx.font = 'black 24px sans-serif';
    pCtx.fillText(`${schoolConfig.logoEmoji} ${schoolConfig.schoolName}`, 40, 610);

    pCtx.fillStyle = '#475569';
    pCtx.font = 'bold 18px sans-serif';
    pCtx.fillText(`Name Symphony Created by ${childName}`, 40, 645);

    pCtx.font = '14px monospace';
    pCtx.fillStyle = '#94A3B8';
    pCtx.fillText(`Date: ${new Date().toLocaleDateString()} • Peítho Sound Garden`, 40, 675);

    const polaroidUrl = pCanvas.toDataURL('image/png');
    setPolaroidDataUrl(polaroidUrl);

    // Win Callback
    onWinGame({
      dataUrl: polaroidUrl,
      seedsConnected: totalBounces,
      creatureName: `Dancing Symphony of ${childName}`,
      seedHex: 'SOUNDGARDEN',
      melodyNotes: recordedNotes,
    });
  };

  // Reset Game
  const handleReset = () => {
    setTotalBounces(0);
    setIsSymphonyActive(false);
    setPolaroidDataUrl(null);
    setRecordedNotes([]);
    pebblesRef.current = [];
    ripplesRef.current = [];
    initLetters();
  };

  return (
    <div className="relative w-full h-[calc(100vh-8.5rem)] bg-[#1E1B4B] flex flex-col overflow-hidden">
      
      {/* Top Header & Terrain Selection Bar */}
      <div className="absolute top-4 inset-x-4 z-20 flex flex-wrap items-center justify-between gap-3 bg-white/95 backdrop-blur-md px-4 py-3 rounded-2xl shadow-md border-2 border-amber-300">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-2xl bg-indigo-600 text-white flex items-center justify-center text-xl shadow-md font-bold">
            🎵
          </div>
          <div>
            <div className="text-xs font-black text-indigo-600 uppercase tracking-widest">
              Sound-Snatcher Garden
            </div>
            <div className="text-sm font-black text-orange-950">
              Tap canvas to place bouncy pebbles for <span className="text-indigo-600 underline decoration-amber-400">{childName}'s</span> letters!
            </div>
          </div>
        </div>

        {/* Terrain Buttons */}
        <div className="flex items-center gap-2">
          <div className="flex items-center bg-amber-50 p-1 rounded-xl border-2 border-amber-200">
            {(['windy', 'underwater', 'bounce'] as TerrainType[]).map((t) => (
              <button
                key={t}
                onClick={() => setTerrain(t)}
                className={`px-3 py-1.5 rounded-lg text-xs font-black transition-all flex items-center gap-1 ${
                  terrain === t
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'text-orange-950 hover:bg-amber-100'
                }`}
              >
                <span>{TERRAIN_CONFIGS[t].icon}</span>
                <span className="hidden sm:inline">{TERRAIN_CONFIGS[t].title}</span>
              </button>
            ))}
          </div>

          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-100 rounded-xl text-xs font-black text-orange-950 border-2 border-amber-300 shadow-xs">
            <span>Bounces:</span>
            <span className="text-indigo-600">{totalBounces}/10</span>
          </div>

          <button
            onClick={handleReset}
            className="px-3 py-2 rounded-xl bg-indigo-600 text-white hover:bg-indigo-700 transition-all active:scale-95 flex items-center gap-1 text-xs font-black shadow-md shadow-indigo-200"
            id="reset-sound-btn"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Reset</span>
          </button>
        </div>
      </div>

      {/* Physics Canvas */}
      <canvas
        ref={canvasRef}
        onClick={handleCanvasClick}
        className="w-full h-full cursor-pointer touch-none"
      />

      {/* Polaroid Souvenir Celebration Overlay */}
      {polaroidDataUrl && (
        <div className="absolute inset-x-4 bottom-6 z-30 max-w-lg mx-auto bg-white p-6 rounded-3xl shadow-2xl border-4 border-amber-300 text-center space-y-4 animate-fadeIn max-h-[85vh] overflow-y-auto">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-100 text-orange-950 rounded-full text-xs font-black border border-amber-300">
            <Camera className="w-3.5 h-3.5 text-indigo-600" />
            <span>Nursery School Souvenir Polaroid!</span>
          </div>

          <h3 className="text-2xl font-black text-orange-950">
            {childName}'s Name Symphony! 📸
          </h3>

          {/* Render Polaroid Image */}
          <div className="relative mx-auto rounded-2xl overflow-hidden border-4 border-amber-200 shadow-lg max-h-64 flex items-center justify-center">
            <img src={polaroidDataUrl} alt="Polaroid Souvenir" className="max-h-60 object-contain" />
          </div>

          <p className="text-xs font-bold text-orange-900/80">
            Branded souvenir with {schoolConfig.schoolName} logo saved to Digital Fridge!
          </p>

          <div className="flex gap-2 pt-1">
            <a
              href={polaroidDataUrl}
              download={`${childName}_Polaroid_Symphony.png`}
              className="flex-1 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-black text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-1.5"
              id="download-polaroid-btn"
            >
              <Download className="w-4 h-4" />
              <span>Download Polaroid 📷</span>
            </a>

            <button
              onClick={handleReset}
              className="py-3 px-5 bg-orange-500 hover:bg-orange-600 text-white font-black text-xs rounded-xl shadow-md transition-all"
              id="play-again-sound-btn"
            >
              Play Again
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
