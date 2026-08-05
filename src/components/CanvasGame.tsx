import React, { useRef, useEffect, useState, useCallback } from 'react';
import confetti from 'canvas-confetti';
import { Sparkles, RotateCcw, Info, Volume2 } from 'lucide-react';
import { generateGameLevel } from '../utils/prng';
import { soundEngine } from '../utils/sound';
import { EnergySeed, ConnectionLine } from '../types';

interface CanvasGameProps {
  childName: string;
  onWinGame: (artwork: {
    dataUrl: string;
    seedsConnected: number;
    creatureName: string;
    seedHex: string;
    melodyNotes: number[];
    patternDiscovered?: string;
    geniusInsight?: string;
  }) => void;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  alpha: number;
  life: number;
}

interface BloomEffect {
  x: number;
  y: number;
  color: string;
  maxRadius: number;
  currentRadius: number;
  petals: number;
  rotation: number;
}

export const CanvasGame: React.FC<CanvasGameProps> = ({ childName, onWinGame }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Level State
  const [level, setLevel] = useState(() => generateGameLevel(childName));
  const [seeds, setSeeds] = useState<EnergySeed[]>(level.seeds);
  const [connections, setConnections] = useState<ConnectionLine[]>([]);
  const [dragStartSeed, setDragStartSeed] = useState<EnergySeed | null>(null);
  const [dragPos, setDragPos] = useState<{ x: number; y: number } | null>(null);
  const [isWon, setIsWon] = useState<boolean>(false);
  const [showAlgorithmInfo, setShowAlgorithmInfo] = useState<boolean>(false);

  // Animation & Audio State
  const particlesRef = useRef<Particle[]>([]);
  const bloomsRef = useRef<BloomEffect[]>([]);
  const playedNotesRef = useRef<number[]>([]);
  const butterflyPosRef = useRef<{ x: number; y: number; angle: number }>({ x: 0.5, y: 0.5, angle: 0 });

  // Reset Level function
  const handleNewLevel = useCallback(() => {
    const newLvl = generateGameLevel(childName);
    setLevel(newLvl);
    setSeeds(newLvl.seeds);
    setConnections([]);
    setDragStartSeed(null);
    setDragPos(null);
    setIsWon(false);
    particlesRef.current = [];
    bloomsRef.current = [];
    playedNotesRef.current = [];
  }, [childName]);

  // Spawn visual sparkles
  const addSparkles = (x: number, y: number, color: string, count: number = 15) => {
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = 1 + Math.random() * 4;
      particlesRef.current.push({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        size: Math.random() * 5 + 2,
        color,
        alpha: 1.0,
        life: 0.02 + Math.random() * 0.03,
      });
    }
  };

  // Spawn fractal bloom
  const addBloom = (x: number, y: number, color: string) => {
    bloomsRef.current.push({
      x,
      y,
      color,
      maxRadius: 45 + Math.random() * 30,
      currentRadius: 5,
      petals: Math.floor(5 + Math.random() * 4),
      rotation: Math.random() * Math.PI,
    });
  };

  // Check connection state & trigger win
  const triggerWin = useCallback(
    (finalConnections: ConnectionLine[]) => {
      setIsWon(true);

      // Fire confetti celebration
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#FF6B6B', '#4ECDC4', '#FFE66D', '#A29BFE', '#2ECC71'],
      });

      const patternName = level.shadowGuide?.name || 'Geometric Discovery';
      const insight = level.shadowGuide?.insightTemplate
        ? `Today, ${childName} ${level.shadowGuide.insightTemplate}`
        : `Today, ${childName} connected ${finalConnections.length} seeds in a brilliant natural sequence! This strengthens spatial awareness and geometric intuition.`;

      // Victory Pentatonic melody playback
      soundEngine.playVictoryMelody(playedNotesRef.current, () => {
        // Capture snapshot
        const canvas = canvasRef.current;
        if (canvas) {
          const dataUrl = canvas.toDataURL('image/png');
          onWinGame({
            dataUrl,
            seedsConnected: finalConnections.length,
            creatureName: level.creature.name,
            seedHex: level.seedHex,
            melodyNotes: playedNotesRef.current,
            patternDiscovered: patternName,
            geniusInsight: insight,
          });
        }
      });
    },
    [level, childName, onWinGame]
  );

  // Main Canvas Render Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;

    const render = () => {
      const width = canvas.width;
      const height = canvas.height;

      // 1. Clear background with soft radial glow
      const bgGrad = ctx.createRadialGradient(
        width / 2,
        height / 2,
        50,
        width / 2,
        height / 2,
        Math.max(width, height) / 1.2
      );
      bgGrad.addColorStop(0, '#FAFCFF');
      bgGrad.addColorStop(0.5, '#F3F7FC');
      bgGrad.addColorStop(1, '#EBF2FB');
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, width, height);

      // Draw subtle grid dots for design structure
      ctx.fillStyle = 'rgba(203, 213, 225, 0.4)';
      for (let x = 20; x < width; x += 40) {
        for (let y = 20; y < height; y += 40) {
          ctx.beginPath();
          ctx.arc(x, y, 1.2, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      const now = Date.now() * 0.002;

      // 1.5. Render Faint Glowing "Shadow Guide" Layer (Guided Discovery)
      if (level.shadowGuide && level.shadowGuide.lines) {
        ctx.save();
        ctx.strokeStyle = 'rgba(245, 158, 11, 0.35)'; // Faint glowing golden amber
        ctx.lineWidth = 2.5;
        ctx.setLineDash([6, 8]);

        level.shadowGuide.lines.forEach((line) => {
          const s1 = seeds[line.from % seeds.length];
          const s2 = seeds[line.to % seeds.length];
          if (s1 && s2) {
            ctx.beginPath();
            ctx.moveTo(s1.x * width, s1.y * height);
            ctx.lineTo(s2.x * width, s2.y * height);
            ctx.stroke();
          }
        });
        ctx.restore();
      }

      // 2. Render Blooms / Fractal Petals
      bloomsRef.current.forEach((b) => {
        if (b.currentRadius < b.maxRadius) {
          b.currentRadius += 1.5;
        }
        ctx.save();
        ctx.translate(b.x, b.y);
        ctx.rotate(b.rotation);
        ctx.fillStyle = b.color + '33'; // 20% opacity
        ctx.strokeStyle = b.color + 'AA';
        ctx.lineWidth = 1.5;

        for (let i = 0; i < b.petals; i++) {
          const angle = (i * Math.PI * 2) / b.petals;
          const px = Math.cos(angle) * b.currentRadius;
          const py = Math.sin(angle) * b.currentRadius;

          ctx.beginPath();
          ctx.ellipse(px / 2, py / 2, b.currentRadius / 2, b.currentRadius / 4, angle, 0, Math.PI * 2);
          ctx.fill();
          ctx.stroke();
        }
        ctx.restore();
      });

      // 3. Render Drawn Connections
      connections.forEach((conn) => {
        const s1 = seeds.find((s) => s.id === conn.fromId);
        const s2 = seeds.find((s) => s.id === conn.toId);
        if (!s1 || !s2) return;

        const x1 = s1.x * width;
        const y1 = s1.y * height;
        const x2 = s2.x * width;
        const y2 = s2.y * height;

        ctx.save();
        ctx.beginPath();
        ctx.moveTo(x1, y1);

        // Curved energy connection line
        const midX = (x1 + x2) / 2 + Math.sin(now + conn.fromId) * 15;
        const midY = (y1 + y2) / 2 + Math.cos(now + conn.toId) * 15;
        ctx.quadraticCurveTo(midX, midY, x2, y2);

        ctx.strokeStyle = conn.color;
        ctx.lineWidth = isWon ? 6 : 4;
        ctx.shadowColor = conn.color;
        ctx.shadowBlur = 12;
        ctx.stroke();

        ctx.restore();
      });

      // 4. Render Active Dragging Line
      if (dragStartSeed && dragPos) {
        const x1 = dragStartSeed.x * width;
        const y1 = dragStartSeed.y * height;

        ctx.save();
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(dragPos.x, dragPos.y);
        ctx.strokeStyle = dragStartSeed.color;
        ctx.lineWidth = 3;
        ctx.setLineDash([8, 6]);
        ctx.stroke();
        ctx.restore();
      }

      // 5. Render Floating Energy Seeds
      seeds.forEach((s) => {
        const sx = s.x * width;
        const sy = s.y * height;
        const pulse = Math.sin(now * 2 + s.pulsePhase) * 3;
        const r = s.radius + pulse;

        ctx.save();

        // Glowing outer halo
        const haloGrad = ctx.createRadialGradient(sx, sy, r * 0.5, sx, sy, r * 2);
        haloGrad.addColorStop(0, s.color + '66');
        haloGrad.addColorStop(1, s.color + '00');
        ctx.fillStyle = haloGrad;
        ctx.beginPath();
        ctx.arc(sx, sy, r * 2, 0, Math.PI * 2);
        ctx.fill();

        // Main seed circle
        ctx.fillStyle = s.color;
        ctx.beginPath();
        ctx.arc(sx, sy, r, 0, Math.PI * 2);
        ctx.fill();

        // Inner shine highlight
        ctx.fillStyle = 'rgba(255,255,255,0.6)';
        ctx.beginPath();
        ctx.arc(sx - r * 0.3, sy - r * 0.3, r * 0.35, 0, Math.PI * 2);
        ctx.fill();

        // If connected, show energetic star/ring
        if (s.connected) {
          ctx.strokeStyle = '#FFFFFF';
          ctx.lineWidth = 2.5;
          ctx.beginPath();
          ctx.arc(sx, sy, r + 4, 0, Math.PI * 2);
          ctx.stroke();
        }

        ctx.restore();
      });

      // 6. Win State Animated Creature (Butterfly fluttering)
      if (isWon) {
        const b = butterflyPosRef.current;
        b.angle += 0.03;
        b.x = 0.5 + Math.cos(b.angle * 1.5) * 0.3;
        b.y = 0.5 + Math.sin(b.angle * 2.2) * 0.25;

        const bx = b.x * width;
        const by = b.y * height;

        // Leave glittering particles behind creature
        addSparkles(bx, by, level.creature.color, 2);

        ctx.save();
        ctx.translate(bx, by);
        const wingFlap = Math.sin(now * 15);
        ctx.scale(wingFlap < 0 ? -0.8 : 0.8, 1);

        // Draw Creature Emoji / Icon
        ctx.font = '54px sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(level.creature.icon, 0, 0);

        ctx.restore();
      }

      // 7. Render Particle Sparkles
      for (let i = particlesRef.current.length - 1; i >= 0; i--) {
        const p = particlesRef.current[i];
        p.x += p.vx;
        p.y += p.vy;
        p.alpha -= p.life;

        if (p.alpha <= 0) {
          particlesRef.current.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.globalAlpha = Math.max(p.alpha, 0);
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => cancelAnimationFrame(animId);
  }, [seeds, connections, dragStartSeed, dragPos, isWon, level]);

  // Canvas Resize Observer
  useEffect(() => {
    const updateSize = () => {
      const container = containerRef.current;
      const canvas = canvasRef.current;
      if (container && canvas) {
        canvas.width = container.clientWidth;
        canvas.height = container.clientHeight;
      }
    };
    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  // Pointer Interaction Logic
  const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (isWon) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const px = e.clientX - rect.left;
    const py = e.clientY - rect.top;

    // Check if clicked near a seed
    const clickedSeed = seeds.find((s) => {
      const sx = s.x * canvas.width;
      const sy = s.y * canvas.height;
      const dist = Math.hypot(sx - px, sy - py);
      return dist <= s.radius * 1.8;
    });

    if (clickedSeed) {
      setDragStartSeed(clickedSeed);
      setDragPos({ x: px, y: py });
      const freq = soundEngine.playNote(clickedSeed.id, 0.4);
      playedNotesRef.current.push(freq);
      addSparkles(px, py, clickedSeed.color, 12);
    }
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!dragStartSeed || isWon) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const px = e.clientX - rect.left;
    const py = e.clientY - rect.top;
    setDragPos({ x: px, y: py });

    // Sparkle trail during drag
    if (Math.random() < 0.4) {
      addSparkles(px, py, dragStartSeed.color, 1);
    }
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!dragStartSeed || isWon) {
      setDragStartSeed(null);
      setDragPos(null);
      return;
    }

    const canvas = canvasRef.current;
    if (canvas && dragPos) {
      const rect = canvas.getBoundingClientRect();
      const px = e.clientX - rect.left;
      const py = e.clientY - rect.top;

      // Check if dropped on a DIFFERENT target seed
      const targetSeed = seeds.find((s) => {
        if (s.id === dragStartSeed.id) return false;
        const sx = s.x * canvas.width;
        const sy = s.y * canvas.height;
        return Math.hypot(sx - px, sy - py) <= s.radius * 2.2;
      });

      if (targetSeed) {
        // Prevent duplicate connection
        const exists = connections.some(
          (c) =>
            (c.fromId === dragStartSeed.id && c.toId === targetSeed.id) ||
            (c.fromId === targetSeed.id && c.toId === dragStartSeed.id)
        );

        if (!exists) {
          const newConn: ConnectionLine = {
            fromId: dragStartSeed.id,
            toId: targetSeed.id,
            color: dragStartSeed.color,
            timestamp: Date.now(),
            bloomType: 'fractal',
          };

          const newConnections = [...connections, newConn];
          setConnections(newConnections);

          // Update seed connected flags
          setSeeds((prev) =>
            prev.map((s) => {
              if (s.id === dragStartSeed.id || s.id === targetSeed.id) {
                return { ...s, connected: true, connections: [...s.connections, targetSeed.id] };
              }
              return s;
            })
          );

          // Trigger sound chord & generative bloom
          const chordFreqs = soundEngine.playConnectionChord(dragStartSeed.id, targetSeed.id);
          playedNotesRef.current.push(...chordFreqs);

          const midX = (dragStartSeed.x + targetSeed.x) * 0.5 * canvas.width;
          const midY = (dragStartSeed.y + targetSeed.y) * 0.5 * canvas.height;
          addBloom(midX, midY, dragStartSeed.color);
          addSparkles(midX, midY, targetSeed.color, 25);

          // Check if win condition met
          if (newConnections.length >= level.totalRequiredConnections) {
            triggerWin(newConnections);
          }
        }
      }
    }

    setDragStartSeed(null);
    setDragPos(null);
  };

  return (
    <div className="relative w-full h-[calc(100vh-4rem)] bg-[#FFFBF0] flex flex-col overflow-hidden">
      
      {/* Top Game Controls & Instructions Banner */}
      <div className="absolute top-4 inset-x-4 z-20 flex flex-wrap items-center justify-between gap-3 bg-white/95 backdrop-blur-md px-4 py-3 rounded-2xl shadow-md border-2 border-amber-300">
        
        {/* Child Greeting & Instruction */}
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-2xl bg-amber-200 flex items-center justify-center text-xl shadow-xs border-2 border-amber-300">
            ✨
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-black text-orange-500 uppercase tracking-widest">
                Discovery Machine
              </span>
              {level.shadowGuide && (
                <span className="px-2 py-0.5 bg-amber-100 text-orange-950 font-black text-[10px] rounded-full border border-amber-300 shadow-2xs">
                  ✨ {level.shadowGuide.name}
                </span>
              )}
            </div>
            <div className="text-sm font-black text-orange-950">
              Hi <span className="text-orange-600 underline decoration-amber-400 decoration-2">{childName}</span>! Follow glowing seeds! 🌸
            </div>
          </div>
        </div>

        {/* Progress & Seed Hash Badge */}
        <div className="flex items-center gap-2">
          
          <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 bg-amber-50 rounded-xl text-xs font-mono font-bold text-orange-800 border-2 border-amber-200">
            <span>Seed:</span>
            <span className="text-orange-600 font-black">#{level.seedHex.slice(0, 6)}</span>
          </div>

          <div className="flex items-center gap-1.5 px-3.5 py-1.5 bg-emerald-100 rounded-xl text-xs font-black text-emerald-950 border-2 border-emerald-300 shadow-xs">
            <span>Connections:</span>
            <span className="text-sm text-emerald-700">{connections.length}/{level.totalRequiredConnections}</span>
          </div>

          <button
            onClick={handleNewLevel}
            className="px-3.5 py-2 rounded-xl bg-orange-500 text-white hover:bg-orange-600 transition-all active:scale-95 flex items-center gap-1.5 text-xs font-black shadow-md shadow-orange-200"
            title="New canvas"
            id="new-seed-canvas-btn"
          >
            <RotateCcw className="w-4 h-4" />
            <span>New Canvas</span>
          </button>

        </div>

      </div>

      {/* Main Interactive Canvas Surface */}
      <div ref={containerRef} className="w-full h-full cursor-crosshair touch-none relative">
        <canvas
          ref={canvasRef}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          className="w-full h-full block"
          id="peitho-canvas-surface"
        />

        {/* Floating Hint Helper */}
        {connections.length === 0 && (
          <div className="absolute bottom-8 inset-x-0 mx-auto max-w-xs text-center pointer-events-none animate-bounce">
            <span className="inline-block px-4 py-2 bg-slate-900/80 text-white text-xs font-semibold rounded-full backdrop-blur-md shadow-lg border border-white/20">
              👉 Drag your finger between glowing seeds!
            </span>
          </div>
        )}
      </div>

    </div>
  );
};
