import React, { useRef, useEffect, useState, useCallback } from 'react';
import { Sparkles, RefreshCw, Heart, Award, Egg, Info } from 'lucide-react';
import { soundEngine } from '../utils/sound';
import { SchoolConfig, DigitalPet } from '../types';
import { saveDigitalPet } from '../utils/storage';

interface WorldWeaverGameProps {
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

interface StarParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  baseRadius: number;
  color: string;
  alpha: number;
  pulseSpeed: number;
  phase: number;
}

interface CrystallizedShape {
  id: number;
  x: number;
  y: number;
  symbol: string;
  size: number;
  color: string;
  rotation: number;
  scale: number;
}

const PET_SPECIES_CATALOG = [
  { species: 'Star-Bunny', emoji: '🐰', snacks: ['Cosmic Carrots', 'Stardust Berries'], color: '#EC4899', personality: 'Playful & Bouncy' },
  { species: 'Orbit-Dragon', emoji: '🐲', snacks: ['Flame Sparks', 'Solar Fruit'], color: '#8B5CF6', personality: 'Brave & Glowing' },
  { species: 'Cloud-Pup', emoji: '🐶', snacks: ['Cotton Clouds', 'Lunar Biscuits'], color: '#3B82F6', personality: 'Loyal & Warm' },
  { species: 'Galaxy-Kitten', emoji: '🐱', snacks: ['Moon Milk', 'Nova Fish'], color: '#10B981', personality: 'Curious & Musical' },
  { species: 'Sun-Panda', emoji: '🐼', snacks: ['Bamboo Shoots', 'Golden Rays'], color: '#F59E0B', personality: 'Gentle & Loving' },
];

export const WorldWeaverGame: React.FC<WorldWeaverGameProps> = ({
  childName,
  schoolConfig,
  onWinGame,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationFrameRef = useRef<number | null>(null);

  // Derive seed physics parameters from Child's Name + Current Session
  const seedHash = useCallback(() => {
    let hash = 0;
    const str = (childName || 'Explorer') + 'WEAVER';
    for (let i = 0; i < str.length; i++) {
      hash = (hash << 5) - hash + str.charCodeAt(i);
      hash |= 0;
    }
    return Math.abs(hash);
  }, [childName]);

  const hashVal = seedHash();
  const gravityCoeff = 0.15 + (hashVal % 50) / 100; // 0.15 to 0.65
  const bounceCoeff = 0.5 + (hashVal % 45) / 100; // 0.5 to 0.95
  const orbitResonance = 1.5 + (hashVal % 30) / 10; // 1.5 to 4.5 Hz
  const hexSeed = (hashVal.toString(16) + 'abcdef').slice(0, 6).toUpperCase();

  // Color theme palettes based on hash
  const colorSchemes = [
    ['#F43F5E', '#8B5CF6', '#3B82F6', '#10B981', '#F59E0B'],
    ['#EC4899', '#A855F7', '#6366F1', '#14B8A6', '#FBBF24'],
    ['#FB7185', '#C084FC', '#818CF8', '#34D399', '#FCD34D'],
  ];
  const activePalette = colorSchemes[hashVal % colorSchemes.length];

  // Game Progress State
  const [energyProgress, setEnergyProgress] = useState<number>(0);
  const [crystallizedCount, setCrystallizedCount] = useState<number>(0);
  const [isEggFormed, setIsEggFormed] = useState<boolean>(false);
  const [eggTapCount, setEggTapCount] = useState<number>(0);
  const [hatchedPet, setHatchedPet] = useState<DigitalPet | null>(null);
  const [showAlgorithmInfo, setShowAlgorithmInfo] = useState<boolean>(false);
  const [petFedMessage, setPetFedMessage] = useState<string | null>(null);

  // Particles & Shapes ref
  const particlesRef = useRef<StarParticle[]>([]);
  const shapesRef = useRef<CrystallizedShape[]>([]);
  const pointerRef = useRef<{ x: number; y: number; active: boolean; lastSwirl: number }>({
    x: 0,
    y: 0,
    active: false,
    lastSwirl: Date.now(),
  });

  // Initialize Canvas Particles
  useEffect(() => {
    const particles: StarParticle[] = [];
    const count = 220;
    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random(),
        y: Math.random(),
        vx: (Math.random() - 0.5) * 0.002,
        vy: (Math.random() - 0.5) * 0.002,
        baseRadius: Math.random() * 3 + 1.5,
        color: activePalette[i % activePalette.length],
        alpha: Math.random() * 0.7 + 0.3,
        pulseSpeed: Math.random() * 0.05 + 0.02,
        phase: Math.random() * Math.PI * 2,
      });
    }
    particlesRef.current = particles;
  }, [activePalette]);

  // Main Canvas Render Loop
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

      // Background - Warm night/cosmic gradient canvas
      const bgGradient = ctx.createLinearGradient(0, 0, width, height);
      bgGradient.addColorStop(0, '#261605');
      bgGradient.addColorStop(0.5, '#1A0E05');
      bgGradient.addColorStop(1, '#0D0602');
      ctx.fillStyle = bgGradient;
      ctx.fillRect(0, 0, width, height);

      // Render Stardust Particles & Apply Tug Physics
      const pointer = pointerRef.current;
      const ptrX = pointer.x / width;
      const ptrY = pointer.y / height;

      particlesRef.current.forEach((p, idx) => {
        p.phase += p.pulseSpeed;

        if (pointer.active) {
          const dx = ptrX - p.x;
          const dy = ptrY - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 0.35 && dist > 0.001) {
            // Tugging force toward finger based on Name Gravity Coefficient
            const force = (0.35 - dist) * gravityCoeff * 0.08;
            p.vx += (dx / dist) * force;
            p.vy += (dy / dist) * force;

            // Spiral orbit based on Orbit Resonance
            p.vx += (-dy / dist) * force * (orbitResonance * 0.3);
            p.vy += (dx / dist) * force * (orbitResonance * 0.3);
          }
        }

        // Apply velocities & bounce off canvas walls
        p.x += p.vx;
        p.y += p.vy;
        p.vx *= 0.94; // damping
        p.vy *= 0.94;

        if (p.x < 0.02) { p.x = 0.02; p.vx *= -bounceCoeff; }
        if (p.x > 0.98) { p.x = 0.98; p.vx *= -bounceCoeff; }
        if (p.y < 0.02) { p.y = 0.02; p.vy *= -bounceCoeff; }
        if (p.y > 0.98) { p.y = 0.98; p.vy *= -bounceCoeff; }

        // Draw particle
        const renderX = p.x * width;
        const renderY = p.y * height;
        const radius = p.baseRadius + Math.sin(p.phase) * 1.0;

        ctx.beginPath();
        ctx.arc(renderX, renderY, Math.max(0.5, radius), 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 8;
        ctx.fill();
        ctx.shadowBlur = 0;
        ctx.globalAlpha = 1.0;

        // Draw subtle connector lines between close tugged particles
        if (idx % 3 === 0) {
          const nextP = particlesRef.current[(idx + 1) % particlesRef.current.length];
          const distNext = Math.hypot((p.x - nextP.x) * width, (p.y - nextP.y) * height);
          if (distNext < 45) {
            ctx.beginPath();
            ctx.moveTo(renderX, renderY);
            ctx.lineTo(nextP.x * width, nextP.y * height);
            ctx.strokeStyle = p.color;
            ctx.globalAlpha = 0.15 * (1 - distNext / 45);
            ctx.lineWidth = 1;
            ctx.stroke();
            ctx.globalAlpha = 1.0;
          }
        }
      });

      // Render Crystallized Physical Objects
      shapesRef.current.forEach((shape) => {
        ctx.save();
        ctx.translate(shape.x * width, shape.y * height);
        ctx.rotate(shape.rotation);
        ctx.scale(shape.scale, shape.scale);

        ctx.font = `${shape.size}px sans-serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';

        ctx.shadowColor = shape.color;
        ctx.shadowBlur = 15;
        ctx.fillText(shape.symbol, 0, 0);

        ctx.restore();
      });

      // Render Floating Digital Egg in Center if formed
      if (isEggFormed) {
        ctx.save();
        ctx.translate(width / 2, height / 2);

        const eggScale = 1 + Math.sin(now * 0.004) * 0.05 + eggTapCount * 0.08;
        ctx.scale(eggScale, eggScale);

        // Egg Glow Aura
        const glowGrad = ctx.createRadialGradient(0, 0, 10, 0, 0, 80);
        glowGrad.addColorStop(0, 'rgba(251, 191, 36, 0.8)');
        glowGrad.addColorStop(0.5, 'rgba(245, 158, 11, 0.3)');
        glowGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
        ctx.fillStyle = glowGrad;
        ctx.beginPath();
        ctx.arc(0, 0, 80, 0, Math.PI * 2);
        ctx.fill();

        // Egg Graphic
        ctx.font = '72px sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.shadowColor = '#F59E0B';
        ctx.shadowBlur = 20;
        ctx.fillText(eggTapCount >= 3 ? '🐣' : '🥚', 0, 0);

        ctx.restore();
      }

      animationFrameRef.current = requestAnimationFrame(render);
    };

    animationFrameRef.current = requestAnimationFrame(render);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [gravityCoeff, bounceCoeff, orbitResonance, activePalette, isEggFormed, eggTapCount]);

  // Pointer Movement Logic & Shape-Shift Crystallization Trigger
  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas || isEggFormed) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    pointerRef.current = {
      x,
      y,
      active: true,
      lastSwirl: pointerRef.current.lastSwirl,
    };

    // Play pentatonic chime sound occasionally on movement
    if (Math.random() < 0.12) {
      const noteIdx = Math.floor((x / canvas.width) * 12);
      soundEngine.playNote(noteIdx, 0.3, 'sine');
    }

    // Swirl pattern detection to trigger shape crystallization
    const now = Date.now();
    if (now - pointerRef.current.lastSwirl > 350) {
      pointerRef.current.lastSwirl = now;

      // Add progress
      setEnergyProgress((prev) => {
        const next = Math.min(100, prev + 6);
        if (next >= 100 && !isEggFormed) {
          setIsEggFormed(true);
          soundEngine.playVictoryMelody([523.25, 659.25, 783.99, 1046.5]);
        }
        return next;
      });

      // Spawn a crystallized shape object
      const symbols = ['🚗', '🕊️', '🌸', '💎', '🚀', '⭐', '🎈', '🎨'];
      const newShape: CrystallizedShape = {
        id: Date.now() + Math.random(),
        x: x / canvas.width,
        y: y / canvas.height,
        symbol: symbols[Math.floor(Math.random() * symbols.length)],
        size: Math.floor(Math.random() * 16 + 28),
        color: activePalette[Math.floor(Math.random() * activePalette.length)],
        rotation: (Math.random() - 0.5) * 0.5,
        scale: 1,
      };

      shapesRef.current = [...shapesRef.current.slice(-12), newShape];
      setCrystallizedCount((c) => c + 1);
    }
  };

  const handlePointerUp = () => {
    pointerRef.current.active = false;
  };

  // Egg Tap Handler (Hatching Digital Pet)
  const handleEggTap = () => {
    if (!isEggFormed) return;

    soundEngine.playCharmChirp(1.2 + eggTapCount * 0.2);
    const nextTap = eggTapCount + 1;
    setEggTapCount(nextTap);

    if (nextTap >= 3 && !hatchedPet) {
      // Hatch the creature!
      const spec = PET_SPECIES_CATALOG[hashVal % PET_SPECIES_CATALOG.length];
      const petName = `${childName}'s ${spec.species}`;

      const newPet: DigitalPet = {
        id: `pet-${Date.now()}`,
        name: petName,
        childName,
        speciesEmoji: spec.emoji,
        color: spec.color,
        hatchDate: new Date().toISOString(),
        schoolName: schoolConfig.schoolName,
        hungerLevel: 85,
        favoriteSnack: spec.snacks[0],
        personality: spec.personality,
        seedHex: hexSeed,
      };

      setHatchedPet(newPet);
      saveDigitalPet(newPet);

      // Trigger victory sound
      soundEngine.playVictoryMelody([523.25, 659.25, 783.99, 880.0, 1046.5]);

      // Snapshot canvas & trigger global win callback
      const canvas = canvasRef.current;
      if (canvas) {
        const dataUrl = canvas.toDataURL('image/png');
        onWinGame({
          dataUrl,
          seedsConnected: crystallizedCount || 10,
          creatureName: newPet.name,
          seedHex: hexSeed,
          melodyNotes: [523.25, 659.25, 783.99, 1046.5],
        });
      }
    }
  };

  // Feed Pet Handler
  const handleFeedPet = () => {
    if (!hatchedPet) return;
    soundEngine.playCharmChirp(1.5);
    setPetFedMessage(`Yum! ${hatchedPet.name} loved eating ${hatchedPet.favoriteSnack}! 🍓`);
    setTimeout(() => setPetFedMessage(null), 3000);
  };

  // Reset World-Weaver Canvas
  const handleReset = () => {
    setEnergyProgress(0);
    setCrystallizedCount(0);
    setIsEggFormed(false);
    setEggTapCount(0);
    setHatchedPet(null);
    shapesRef.current = [];
  };

  return (
    <div className="relative w-full h-[calc(100vh-8.5rem)] bg-[#0D0602] flex flex-col overflow-hidden">
      
      {/* Top Controls & Physics Parameters Bar */}
      <div className="absolute top-4 inset-x-4 z-20 flex flex-wrap items-center justify-between gap-3 bg-white/95 backdrop-blur-md px-4 py-3 rounded-2xl shadow-md border-2 border-amber-300">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-2xl bg-orange-500 text-white flex items-center justify-center text-xl shadow-md shadow-orange-200 font-bold">
            🌌
          </div>
          <div>
            <div className="text-xs font-black text-orange-500 uppercase tracking-widest">
              World-Weaver Playground
            </div>
            <div className="text-sm font-black text-orange-950">
              Swirl star-dust to tug <span className="text-orange-600 underline decoration-amber-400">{childName}'s</span> Name Forces! ✨
            </div>
          </div>
        </div>

        {/* Physics Force Parameters Badge */}
        <div className="flex items-center gap-2">
          <div className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-amber-50 rounded-xl text-xs font-mono font-bold text-orange-900 border-2 border-amber-200">
            <span>Gravity: <strong className="text-orange-600">{gravityCoeff.toFixed(2)}</strong></span>
            <span>•</span>
            <span>Bounce: <strong className="text-orange-600">{bounceCoeff.toFixed(2)}</strong></span>
            <span>•</span>
            <span>Resonance: <strong className="text-orange-600">{orbitResonance.toFixed(1)}Hz</strong></span>
          </div>

          <div className="flex items-center gap-1.5 px-3.5 py-1.5 bg-amber-100 rounded-xl text-xs font-black text-orange-950 border-2 border-amber-300 shadow-xs">
            <span>Shape Energy:</span>
            <span className="text-orange-600">{energyProgress}%</span>
          </div>

          <button
            onClick={handleReset}
            className="px-3 py-2 rounded-xl bg-orange-500 text-white hover:bg-orange-600 transition-all active:scale-95 flex items-center gap-1 text-xs font-black shadow-md shadow-orange-200"
            id="reset-weaver-btn"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>New Session</span>
          </button>

          <button
            onClick={() => setShowAlgorithmInfo(!showAlgorithmInfo)}
            className="p-2 rounded-xl bg-amber-100 text-orange-900 border-2 border-amber-300 hover:bg-amber-200 transition-colors"
            id="weaver-info-btn"
          >
            <Info className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Algorithm Modal Info */}
      {showAlgorithmInfo && (
        <div className="absolute top-20 right-4 z-30 max-w-sm bg-white p-5 rounded-2xl shadow-xl border-2 border-amber-300 text-xs text-orange-950 space-y-2 animate-fadeIn">
          <div className="font-black text-orange-950 text-sm flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-orange-500" />
            <span>Name-Force Source Code Algorithm</span>
          </div>
          <p className="font-medium text-orange-900">
            In World-Weaver, <span className="font-bold text-orange-600">{childName}'s</span> letters are converted directly into physical constants (gravity vector, bounce coefficient, and orbital resonance).
          </p>
          <p className="text-orange-800/80">
            Swirling your finger tugs at these forces, crystallizing star-dust into physical shapes and birthing a Digital Pet Egg!
          </p>
          <button
            onClick={() => setShowAlgorithmInfo(false)}
            className="mt-2 w-full py-2 bg-orange-500 text-white font-black rounded-xl text-center shadow-md shadow-orange-200 hover:bg-orange-600"
          >
            Awesome!
          </button>
        </div>
      )}

      {/* Canvas Element */}
      <canvas
        ref={canvasRef}
        onPointerDown={handlePointerMove}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        className="w-full h-full cursor-crosshair touch-none"
      />

      {/* Egg Hatching Overlay Prompt */}
      {isEggFormed && !hatchedPet && (
        <div className="absolute inset-x-4 bottom-8 z-30 max-w-md mx-auto bg-white/95 backdrop-blur-md p-6 rounded-3xl shadow-2xl border-4 border-amber-300 text-center space-y-4 animate-bounce">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-100 text-orange-950 rounded-full text-xs font-black uppercase border border-amber-300">
            <Egg className="w-4 h-4 text-amber-600 animate-spin" />
            <span>Digital Egg Ready!</span>
          </div>

          <h3 className="text-xl font-black text-orange-950">
            Tap the Egg to Hatch <span className="text-orange-600">{childName}'s</span> Pet! 🐣
          </h3>

          <p className="text-xs font-bold text-orange-900/80">
            Tap {3 - eggTapCount} more time{3 - eggTapCount !== 1 ? 's' : ''} to crack the cosmic shell!
          </p>

          <button
            onClick={handleEggTap}
            className="w-full py-3.5 bg-orange-500 text-white font-black text-base rounded-2xl shadow-md shadow-orange-200 hover:bg-orange-600 active:scale-95 transition-all"
            id="hatch-egg-btn"
          >
            Tap Egg! ({eggTapCount}/3)
          </button>
        </div>
      )}

      {/* Hatched Digital Pet Celebration Card */}
      {hatchedPet && (
        <div className="absolute inset-x-4 bottom-6 z-30 max-w-md mx-auto bg-white p-6 rounded-3xl shadow-2xl border-4 border-amber-300 text-center space-y-4 animate-fadeIn">
          <div className="text-5xl animate-bounce">{hatchedPet.speciesEmoji}</div>

          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-100 text-orange-950 rounded-full text-xs font-black border border-amber-300">
              <Sparkles className="w-3.5 h-3.5 text-orange-500" />
              <span>Digital Pet Born!</span>
            </div>
            <h3 className="text-2xl font-black text-orange-950 mt-1">
              {hatchedPet.name}
            </h3>
            <p className="text-xs font-bold text-orange-900/80">
              "{hatchedPet.personality}" • Lives at {hatchedPet.schoolName}
            </p>
          </div>

          <div className="bg-amber-50 p-3 rounded-2xl border-2 border-amber-200 text-xs font-bold text-orange-950 italic">
            "Hi {childName}! I live at {hatchedPet.schoolName}. Come back tomorrow to give me a snack!" 🍓
          </div>

          {petFedMessage && (
            <div className="p-2.5 bg-emerald-100 border-2 border-emerald-300 text-emerald-950 font-black text-xs rounded-xl animate-fadeIn">
              {petFedMessage}
            </div>
          )}

          <div className="flex gap-2">
            <button
              onClick={handleFeedPet}
              className="flex-1 py-3 bg-emerald-500 hover:bg-emerald-600 text-white font-black text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-1.5"
              id="feed-pet-btn"
            >
              <Heart className="w-4 h-4 fill-white" />
              <span>Feed Pet Snack</span>
            </button>

            <button
              onClick={handleReset}
              className="py-3 px-4 bg-orange-500 hover:bg-orange-600 text-white font-black text-xs rounded-xl shadow-md transition-all"
              id="play-again-weaver-btn"
            >
              Play Again
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
