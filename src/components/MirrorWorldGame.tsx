import React, { useRef, useEffect, useState, useCallback } from 'react';
import { Sparkles, RefreshCw, Battery, Compass, Heart, Share2, MessageCircle, Info } from 'lucide-react';
import { soundEngine } from '../utils/sound';
import { SchoolConfig, TotemEntry } from '../types';
import { saveTotem } from '../utils/storage';

interface MirrorWorldGameProps {
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

interface MandalaParticle {
  angle: number;
  radius: number;
  speed: number;
  size: number;
  color: string;
}

const TOTEM_CATALOG = [
  { name: 'Swift Deer', emoji: '🦌', traits: 'Focus, Grace & Speed', wisdomPrompt: 'Ask them what color the deer\'s glowing eyes were at school today!' },
  { name: 'Cosmic Owl', emoji: '🦉', traits: 'Wisdom, Curiosity & Harmony', wisdomPrompt: 'Ask them what secret musical song the owl sang in the garden!' },
  { name: 'Glowing Phoenix', emoji: '🦅', traits: 'Creativity, Warmth & Joy', wisdomPrompt: 'Ask them how many golden feathers they painted on the phoenix!' },
  { name: 'Solar Turtle', emoji: '🐢', traits: 'Patience, Protection & Calm', wisdomPrompt: 'Ask them where the turtle swims when the stars come out!' },
];

export const MirrorWorldGame: React.FC<MirrorWorldGameProps> = ({
  childName,
  schoolConfig,
  onWinGame,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationFrameRef = useRef<number | null>(null);

  // Simulated Device Battery & Orientation Status
  const [batteryLevel, setBatteryLevel] = useState<number>(88);
  const [deviceTilt, setDeviceTilt] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [resonanceMode, setResonanceMode] = useState<'bright' | 'sleepy'>('bright');

  // Game Progress State
  const [crystallizeProgress, setCrystallizeProgress] = useState<number>(0);
  const [bornTotem, setBornTotem] = useState<TotemEntry | null>(null);
  const [showWisdomCopied, setShowWisdomCopied] = useState<boolean>(false);

  // Touches & Particles Ref
  const touchesRef = useRef<{ x: number; y: number }[]>([]);
  const particlesRef = useRef<MandalaParticle[]>([]);

  // Calculate Seed Hash from Child Name + Battery
  const seedHash = useCallback(() => {
    let hash = 0;
    const str = (childName || 'Explorer') + batteryLevel.toString();
    for (let i = 0; i < str.length; i++) {
      hash = (hash << 5) - hash + str.charCodeAt(i);
      hash |= 0;
    }
    return Math.abs(hash);
  }, [childName, batteryLevel]);

  const hashVal = seedHash();
  const hexSeed = (hashVal.toString(16) + '123456').slice(0, 6).toUpperCase();

  // Color Palettes
  const colors = resonanceMode === 'bright'
    ? ['#F43F5E', '#8B5CF6', '#3B82F6', '#10B981', '#F59E0B']
    : ['#818CF8', '#C084FC', '#F472B6', '#38BDF8', '#4ADE80'];

  // Initialize Particles
  useEffect(() => {
    const parts: MandalaParticle[] = [];
    for (let i = 0; i < 180; i++) {
      parts.push({
        angle: (i / 180) * Math.PI * 2,
        radius: 40 + Math.random() * 120,
        speed: (Math.random() - 0.5) * 0.02,
        size: Math.random() * 3 + 2,
        color: colors[i % colors.length],
      });
    }
    particlesRef.current = parts;
  }, [resonanceMode]);

  // Handle Gyroscope / Mouse Orientation
  useEffect(() => {
    const handleOrientation = (e: DeviceOrientationEvent) => {
      if (e.beta !== null && e.gamma !== null) {
        setDeviceTilt({ x: e.gamma / 45, y: e.beta / 45 });
      }
    };

    window.addEventListener('deviceorientation', handleOrientation);
    return () => window.removeEventListener('deviceorientation', handleOrientation);
  }, []);

  // Canvas Rendering Loop
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

      // Background - Dark cosmic mirror canvas
      const bgGrad = ctx.createRadialGradient(
        width / 2, height / 2, 20,
        width / 2, height / 2, width * 0.7
      );
      bgGrad.addColorStop(0, resonanceMode === 'bright' ? '#1E1B4B' : '#0F172A');
      bgGrad.addColorStop(1, '#020617');
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, width, height);

      const centerX = width / 2 + deviceTilt.x * 50;
      const centerY = height / 2 + deviceTilt.y * 50;

      // Draw Mandala Symmetry (8-fold symmetry)
      const symmetryFolds = 8;
      const touches = touchesRef.current;

      ctx.save();
      ctx.translate(centerX, centerY);

      particlesRef.current.forEach((p, idx) => {
        p.angle += p.speed;

        // Gravity well effect if touch active
        if (touches.length > 0) {
          p.radius += (Math.sin(now * 0.002 + idx) * 2);
        }

        const x = Math.cos(p.angle) * p.radius;
        const y = Math.sin(p.angle) * p.radius;

        for (let s = 0; s < symmetryFolds; s++) {
          const symAngle = (s / symmetryFolds) * Math.PI * 2;
          const sx = x * Math.cos(symAngle) - y * Math.sin(symAngle);
          const sy = x * Math.sin(symAngle) + y * Math.cos(symAngle);

          ctx.beginPath();
          ctx.arc(sx, sy, p.size, 0, Math.PI * 2);
          ctx.fillStyle = p.color;
          ctx.shadowColor = p.color;
          ctx.shadowBlur = 10;
          ctx.fill();
        }
      });

      ctx.restore();

      animationFrameRef.current = requestAnimationFrame(render);
    };

    animationFrameRef.current = requestAnimationFrame(render);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [resonanceMode, deviceTilt]);

  // Touch / Drag Interaction
  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas || bornTotem) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    touchesRef.current = [{ x, y }];

    // Sound chime
    if (Math.random() < 0.1) {
      soundEngine.playNote(Math.floor((x / canvas.width) * 10), 0.3, 'sine');
    }

    // Increase progress
    setCrystallizeProgress((prev) => {
      const next = Math.min(100, prev + 2.5);
      if (next >= 100 && !bornTotem) {
        birthTotem();
      }
      return next;
    });
  };

  const handlePointerUp = () => {
    touchesRef.current = [];
  };

  // Birth Totem & AI Parent Wisdom Generator
  const birthTotem = () => {
    const tDef = TOTEM_CATALOG[hashVal % TOTEM_CATALOG.length];

    const wisdom = `Today, ${childName} created a '${tDef.name}' Totem at ${schoolConfig.schoolName}. This reflects their ${tDef.traits}! ${tDef.wisdomPrompt}`;

    const newTotem: TotemEntry = {
      id: `totem-${Date.now()}`,
      childName,
      totemName: tDef.name,
      totemEmoji: tDef.emoji,
      totemTraits: tDef.traits,
      timestamp: new Date().toISOString(),
      parentWisdom: wisdom,
      seedHex: hexSeed,
    };

    setBornTotem(newTotem);
    saveTotem(newTotem);

    soundEngine.playVictoryMelody([261.63, 329.63, 392.0, 523.25, 659.25]);

    const canvas = canvasRef.current;
    if (canvas) {
      onWinGame({
        dataUrl: canvas.toDataURL('image/png'),
        seedsConnected: 180,
        creatureName: `${tDef.name} Totem`,
        seedHex: hexSeed,
        melodyNotes: [261.63, 329.63, 392.0, 523.25],
      });
    }
  };

  // Copy Parent Wisdom to Clipboard
  const handleCopyWisdom = () => {
    if (!bornTotem) return;
    navigator.clipboard.writeText(bornTotem.parentWisdom);
    setShowWisdomCopied(true);
    setTimeout(() => setShowWisdomCopied(false), 3000);
  };

  // Reset Game
  const handleReset = () => {
    setCrystallizeProgress(0);
    setBornTotem(null);
    touchesRef.current = [];
  };

  return (
    <div className="relative w-full h-[calc(100vh-8.5rem)] bg-[#0F172A] flex flex-col overflow-hidden">
      
      {/* Top Header & Battery Mode Bar */}
      <div className="absolute top-4 inset-x-4 z-20 flex flex-wrap items-center justify-between gap-3 bg-white/95 backdrop-blur-md px-4 py-3 rounded-2xl shadow-md border-2 border-amber-300">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-2xl bg-rose-500 text-white flex items-center justify-center text-xl shadow-md font-bold">
            🪞
          </div>
          <div>
            <div className="text-xs font-black text-rose-500 uppercase tracking-widest">
              The Mirror-World
            </div>
            <div className="text-sm font-black text-orange-950">
              Paint stardust mandalas to birth <span className="text-rose-600 underline decoration-amber-400">{childName}'s</span> Totem!
            </div>
          </div>
        </div>

        {/* Battery & Orientation Badge */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setResonanceMode(resonanceMode === 'bright' ? 'sleepy' : 'bright')}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-50 rounded-xl text-xs font-black text-orange-950 border-2 border-amber-200 hover:bg-amber-100 transition-colors"
          >
            <Battery className="w-3.5 h-3.5 text-orange-600" />
            <span>Battery: {batteryLevel}% ({resonanceMode === 'bright' ? 'Bright Mode' : 'Sleepy Lullaby Mode'})</span>
          </button>

          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-100 rounded-xl text-xs font-black text-orange-950 border-2 border-amber-300 shadow-xs">
            <span>Totem Energy:</span>
            <span className="text-rose-600">{Math.floor(crystallizeProgress)}%</span>
          </div>

          <button
            onClick={handleReset}
            className="px-3 py-2 rounded-xl bg-rose-500 text-white hover:bg-rose-600 transition-all active:scale-95 flex items-center gap-1 text-xs font-black shadow-md shadow-rose-200"
            id="reset-mirror-btn"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Reset</span>
          </button>
        </div>
      </div>

      {/* Canvas */}
      <canvas
        ref={canvasRef}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        className="w-full h-full cursor-crosshair touch-none"
      />

      {/* Born Totem & AI Parent Wisdom Card */}
      {bornTotem && (
        <div className="absolute inset-x-4 bottom-6 z-30 max-w-lg mx-auto bg-white p-6 rounded-3xl shadow-2xl border-4 border-amber-300 text-center space-y-4 animate-fadeIn">
          <div className="text-5xl animate-bounce">{bornTotem.totemEmoji}</div>

          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-100 text-orange-950 rounded-full text-xs font-black border border-amber-300">
              <Sparkles className="w-3.5 h-3.5 text-rose-500" />
              <span>Totem Birthed!</span>
            </div>
            <h3 className="text-2xl font-black text-orange-950 mt-1">
              {bornTotem.totemName}
            </h3>
            <p className="text-xs font-bold text-orange-900/80">
              Traits: {bornTotem.totemTraits}
            </p>
          </div>

          {/* AI Parent Wisdom Box */}
          <div className="bg-amber-50 p-4 rounded-2xl border-2 border-amber-200 text-left space-y-1.5 shadow-inner">
            <div className="flex items-center gap-1.5 text-xs font-black text-orange-950">
              <MessageCircle className="w-4 h-4 text-orange-600" />
              <span>Daily AI Parent Conversation Starter:</span>
            </div>
            <p className="text-xs font-medium text-orange-900 leading-relaxed italic">
              "{bornTotem.parentWisdom}"
            </p>
          </div>

          {showWisdomCopied && (
            <div className="p-2 bg-emerald-100 border border-emerald-300 text-emerald-950 font-black text-xs rounded-xl animate-fadeIn">
              Parent Wisdom Copied to Clipboard! 📋
            </div>
          )}

          <div className="flex gap-2">
            <button
              onClick={handleCopyWisdom}
              className="flex-1 py-3 bg-rose-500 hover:bg-rose-600 text-white font-black text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-1.5"
              id="copy-wisdom-btn"
            >
              <Share2 className="w-4 h-4" />
              <span>Copy Conversation Starter</span>
            </button>

            <button
              onClick={handleReset}
              className="py-3 px-5 bg-orange-500 hover:bg-orange-600 text-white font-black text-xs rounded-xl shadow-md transition-all"
              id="play-again-mirror-btn"
            >
              Play Again
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
