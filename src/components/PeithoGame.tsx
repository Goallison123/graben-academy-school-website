import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import LucideIcon from "./LucideIcon";
import { SchoolConfig } from "../types";

interface PeithoGameProps {
  isOpen: boolean;
  onClose: () => void;
  config: SchoolConfig;
}

interface Seed {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  color: string;
  size: number;
  connected: boolean;
  pulseOffset: number;
}

interface Connection {
  fromId: number;
  toId: number;
  bloomType: "flower" | "ripple" | "creature" | "sparkle";
  color: string;
}

interface Charm {
  id: string;
  name: string;
  icon: string;
  color: string;
  description: string;
  unlockedAt: string;
  rarity: "Common" | "Rare" | "Legendary";
}

interface FridgeArtwork {
  id: string;
  date: string;
  title: string;
  childName: string;
  charmsEarned: string[];
  seedColor: string;
  svgData?: string;
}

// Pentatonic scale frequencies for Web Audio API
const PENTATONIC_FREQS = [261.63, 293.66, 329.63, 392.00, 440.00, 523.25, 587.33, 659.25, 783.99, 880.00];

// Seeded PRNG for never-repeat algorithm
function pseudoRandom(seedStr: string) {
  let h = 2166136261 >>> 0;
  for (let i = 0; i < seedStr.length; i++) {
    h = Math.imul(h ^ seedStr.charCodeAt(i), 16777619);
  }
  return function () {
    h += h << 13;
    h ^= h >>> 7;
    h += h << 3;
    h ^= h >>> 17;
    return (h += h << 5) >>> 0 / 4294967296;
  };
}

const AVAILABLE_CHARMS: Charm[] = [
  { id: "dancing_sprout", name: "Dancing Sprout", icon: "Sprout", color: "#10b981", description: "Bounces with joy whenever connected!", unlockedAt: "", rarity: "Common" },
  { id: "giggling_cloud", name: "Giggling Cloud", icon: "CloudSun", color: "#38bdf8", description: "Rains magical rainbow sparkles.", unlockedAt: "", rarity: "Common" },
  { id: "sleeping_star", name: "Sleeping Star", icon: "Star", color: "#f59e0b", description: "Glows softly when lullabies play.", unlockedAt: "", rarity: "Common" },
  { id: "friday_firefly", name: "Friday Firefly", icon: "Zap", color: "#ec4899", description: "A super rare glowing firefly of friendship!", unlockedAt: "", rarity: "Rare" },
  { id: "sunbeam_sparkle", name: "Sunbeam Sparkle", icon: "Sun", color: "#eab308", description: "Warm rays that light up the Canvas.", unlockedAt: "", rarity: "Common" },
  { id: "rainbow_butterfly", name: "Rainbow Butterfly", icon: "Sparkles", color: "#a855f7", description: "Flutters off the canvas leaving magic trails!", unlockedAt: "", rarity: "Legendary" }
];

export default function PeithoGame({ isOpen, onClose, config }: PeithoGameProps) {
  const [activeTab, setActiveTab] = useState<"canvas" | "fridge" | "charms">("canvas");
  const [childName, setChildName] = useState<string>("");
  const [inputName, setInputName] = useState<string>("");
  const [isNameSubmitted, setIsNameSubmitted] = useState<boolean>(false);
  const [gameSessionCount, setGameSessionCount] = useState<number>(1);
  const [seeds, setSeeds] = useState<Seed[]>([]);
  const [connections, setConnections] = useState<Connection[]>([]);
  const [draggingFrom, setDraggingFrom] = useState<Seed | null>(null);
  const [mousePos, setMousePos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [wonState, setWonState] = useState<boolean>(false);
  const [wonCreature, setWonCreature] = useState<{ name: string; icon: string; text: string } | null>(null);
  const [savedCharms, setSavedCharms] = useState<Charm[]>([]);
  const [fridgeArtworks, setFridgeArtworks] = useState<FridgeArtwork[]>([]);
  const [recentAwardedCharm, setRecentAwardedCharm] = useState<Charm | null>(null);
  const [showTeacherToast, setShowTeacherToast] = useState<boolean>(false);

  const canvasRef = useRef<HTMLDivElement>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);

  // Initialize Audio Context on user interaction
  const playPentatonicNote = (index: number) => {
    try {
      if (!audioCtxRef.current) {
        const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
        if (AudioCtx) audioCtxRef.current = new AudioCtx();
      }
      if (audioCtxRef.current && audioCtxRef.current.state === "suspended") {
        audioCtxRef.current.resume();
      }

      if (audioCtxRef.current) {
        const ctx = audioCtxRef.current;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        const freq = PENTATONIC_FREQS[index % PENTATONIC_FREQS.length];
        osc.type = "sine";
        osc.frequency.setValueAtTime(freq, ctx.currentTime);

        gain.gain.setValueAtTime(0.2, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.6);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start();
        osc.stop(ctx.currentTime + 0.6);
      }
    } catch (e) {
      console.log("Audio play error", e);
    }
  };

  const playVictoryArpeggio = () => {
    PENTATONIC_FREQS.slice(0, 6).forEach((freq, idx) => {
      setTimeout(() => {
        playPentatonicNote(idx);
      }, idx * 120);
    });
  };

  // Load local data on mount
  useEffect(() => {
    const storedName = localStorage.getItem("peitho_child_name");
    if (storedName) {
      setChildName(storedName);
      setIsNameSubmitted(true);
    }

    const storedCharms = localStorage.getItem("peitho_charms");
    if (storedCharms) {
      try {
        setSavedCharms(JSON.parse(storedCharms));
      } catch (e) {
        setSavedCharms([AVAILABLE_CHARMS[0]]);
      }
    } else {
      const defaultCharms = [AVAILABLE_CHARMS[0], AVAILABLE_CHARMS[1]];
      setSavedCharms(defaultCharms);
      localStorage.setItem("peitho_charms", JSON.stringify(defaultCharms));
    }

    const storedFridge = localStorage.getItem("peitho_digital_fridge");
    if (storedFridge) {
      try {
        setFridgeArtworks(JSON.parse(storedFridge));
      } catch (e) {
        setFridgeArtworks([]);
      }
    }
  }, []);

  // Generate new PRNG level seeds whenever session or name changes
  const initializeSeeds = () => {
    const nameToUse = childName || "Little Explorer";
    const seedString = `${Date.now()}_${nameToUse}_${gameSessionCount}`;
    const rng = pseudoRandom(seedString);

    const colors = ["#ef4444", "#3b82f6", "#eab308", "#10b981", "#ec4899", "#8b5cf6", "#f97316"];
    const seedCount = 5 + Math.floor(rng() * 3); // 5 to 7 seeds

    const newSeeds: Seed[] = [];
    for (let i = 0; i < seedCount; i++) {
      newSeeds.push({
        id: i + 1,
        x: 15 + rng() * 70, // percentage 15-85%
        y: 20 + rng() * 60, // percentage 20-80%
        vx: (rng() - 0.5) * 0.15,
        vy: (rng() - 0.5) * 0.15,
        color: colors[Math.floor(rng() * colors.length)],
        size: 28 + Math.floor(rng() * 14),
        connected: false,
        pulseOffset: rng() * Math.PI * 2
      });
    }

    setSeeds(newSeeds);
    setConnections([]);
    setWonState(false);
    setWonCreature(null);
  };

  useEffect(() => {
    if (isOpen && isNameSubmitted) {
      initializeSeeds();
    }
  }, [isOpen, isNameSubmitted, gameSessionCount]);

  // Handle Name Submit
  const handleNameSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = inputName.trim() || "Little Explorer";
    setChildName(clean);
    localStorage.setItem("peitho_child_name", clean);
    setIsNameSubmitted(true);
  };

  // Dragging connection handlers
  const handleSeedMouseDown = (seed: Seed, e: React.MouseEvent | React.TouchEvent) => {
    e.stopPropagation();
    setDraggingFrom(seed);
    playPentatonicNote(seed.id);
  };

  const handleMouseMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!canvasRef.current || !draggingFrom) return;
    const rect = canvasRef.current.getBoundingClientRect();
    const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
    const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;

    const x = ((clientX - rect.left) / rect.width) * 100;
    const y = ((clientY - rect.top) / rect.height) * 100;
    setMousePos({ x, y });
  };

  const handleSeedMouseUp = (targetSeed: Seed) => {
    if (draggingFrom && draggingFrom.id !== targetSeed.id) {
      // Check if connection already exists
      const exists = connections.some(
        (c) =>
          (c.fromId === draggingFrom.id && c.toId === targetSeed.id) ||
          (c.fromId === targetSeed.id && c.toId === draggingFrom.id)
      );

      if (!exists) {
        const bloomTypes: Array<"flower" | "ripple" | "creature" | "sparkle"> = ["flower", "ripple", "creature", "sparkle"];
        const randomBloom = bloomTypes[Math.floor(Math.random() * bloomTypes.length)];

        const newConn: Connection = {
          fromId: draggingFrom.id,
          toId: targetSeed.id,
          bloomType: randomBloom,
          color: draggingFrom.color
        };

        const updatedConns = [...connections, newConn];
        setConnections(updatedConns);

        // Mark seeds as connected
        setSeeds((prev) =>
          prev.map((s) => (s.id === draggingFrom.id || s.id === targetSeed.id ? { ...s, connected: true } : s))
        );

        playPentatonicNote(updatedConns.length);

        // Check Win Condition: if connections count >= seeds.length - 1
        if (updatedConns.length >= seeds.length - 1 && !wonState) {
          triggerWinSequence();
        }
      }
    }
    setDraggingFrom(null);
  };

  const triggerWinSequence = () => {
    setWonState(true);
    playVictoryArpeggio();

    const creatures = [
      { name: "Rainbow Butterfly", icon: "Sparkles", text: "flunked its wings and flew with magic!" },
      { name: "Dancing Flower Sprout", icon: "Sprout", text: "bloomed into a joyful musical garden!" },
      { name: "Star Firefly", icon: "Sun", text: "lit up the sky with friendship!" }
    ];
    const chosenCreature = creatures[Math.floor(Math.random() * creatures.length)];
    setWonCreature(chosenCreature);

    // Award a random charm
    const unearned = AVAILABLE_CHARMS.filter((c) => !savedCharms.some((sc) => sc.id === c.id));
    let awarded: Charm;
    if (unearned.length > 0) {
      awarded = { ...unearned[0], unlockedAt: new Date().toLocaleDateString() };
    } else {
      awarded = { ...AVAILABLE_CHARMS[Math.floor(Math.random() * AVAILABLE_CHARMS.length)], unlockedAt: new Date().toLocaleDateString() };
    }

    setRecentAwardedCharm(awarded);

    const updatedCharms = [...savedCharms.filter((c) => c.id !== awarded.id), awarded];
    setSavedCharms(updatedCharms);
    localStorage.setItem("peitho_charms", JSON.stringify(updatedCharms));

    // Auto save to Digital Fridge
    saveToDigitalFridge(chosenCreature.name, awarded.name);
  };

  const saveToDigitalFridge = (creatureName: string, charmName: string) => {
    const newArt: FridgeArtwork = {
      id: `art_${Date.now()}`,
      date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
      title: `${childName}'s ${creatureName}`,
      childName: childName || "Little Explorer",
      charmsEarned: [charmName],
      seedColor: seeds[0]?.color || "#ea580c"
    };

    const updatedFridge = [newArt, ...fridgeArtworks.slice(0, 15)];
    setFridgeArtworks(updatedFridge);
    localStorage.setItem("peitho_digital_fridge", JSON.stringify(updatedFridge));
  };

  const handleShowTeacher = () => {
    setShowTeacherToast(true);
    setTimeout(() => {
      setShowTeacherToast(false);
    }, 4500);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-950/80 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: 15 }}
          className="bg-white rounded-3xl shadow-2xl border border-orange-200 w-full max-w-4xl h-[92vh] max-h-[780px] flex flex-col overflow-hidden relative"
        >
          {/* Top Header Bar */}
          <div className="bg-gradient-to-r from-[#ea580c] via-[#f59e0b] to-[#ea580c] text-white px-4 sm:px-6 py-3.5 flex items-center justify-between shrink-0 shadow-sm">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-white shadow-inner">
                <LucideIcon name="Sparkles" size={22} />
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <h3 className="font-black text-base sm:text-lg tracking-tight">Peítho: Connection Canvas</h3>
                  <span className="bg-white/20 text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                    PWA Interactive Game
                  </span>
                </div>
                <p className="text-orange-100 text-xs font-light">
                  {config.name} • Creative Generative Play
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="w-9 h-9 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center transition-colors cursor-pointer shrink-0"
              aria-label="Close Game"
            >
              <LucideIcon name="X" size={18} />
            </button>
          </div>

          {/* Sub Navigation Bar: Game Canvas | Digital Fridge | Charm Garden */}
          {isNameSubmitted && (
            <div className="bg-amber-50/80 border-b border-amber-200/60 px-4 py-2 flex items-center justify-between gap-2 overflow-x-auto">
              <div className="flex items-center space-x-1 sm:space-x-2">
                <button
                  onClick={() => setActiveTab("canvas")}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-black transition-all cursor-pointer flex items-center space-x-1.5 ${
                    activeTab === "canvas"
                      ? "bg-[#ea580c] text-white shadow-sm"
                      : "text-gray-700 hover:bg-amber-100/60"
                  }`}
                >
                  <LucideIcon name="Gamepad2" size={14} />
                  <span>Connection Canvas</span>
                </button>

                <button
                  onClick={() => setActiveTab("fridge")}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-black transition-all cursor-pointer flex items-center space-x-1.5 ${
                    activeTab === "fridge"
                      ? "bg-[#ea580c] text-white shadow-sm"
                      : "text-gray-700 hover:bg-amber-100/60"
                  }`}
                >
                  <LucideIcon name="Image" size={14} />
                  <span>Digital Fridge ({fridgeArtworks.length})</span>
                </button>

                <button
                  onClick={() => setActiveTab("charms")}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-black transition-all cursor-pointer flex items-center space-x-1.5 ${
                    activeTab === "charms"
                      ? "bg-[#ea580c] text-white shadow-sm"
                      : "text-gray-700 hover:bg-amber-100/60"
                  }`}
                >
                  <LucideIcon name="Smile" size={14} />
                  <span>Living Charms ({savedCharms.length})</span>
                </button>
              </div>

              {/* Greeting Badge & Name Switch */}
              <div className="flex items-center space-x-2 text-xs font-bold text-gray-700 shrink-0">
                <span className="hidden sm:inline text-gray-500">Explorer:</span>
                <span className="bg-white px-2.5 py-1 rounded-lg border border-amber-200 text-[#ea580c]">
                  🎈 {childName}
                </span>
                <button
                  onClick={() => setIsNameSubmitted(false)}
                  className="text-[11px] text-amber-700 hover:underline cursor-pointer"
                >
                  Change
                </button>
              </div>
            </div>
          )}

          {/* Main Body Content */}
          <div className="flex-1 relative overflow-hidden bg-slate-50 flex flex-col">
            
            {/* Step 1: Welcome & Name Entry screen if name not set */}
            {!isNameSubmitted ? (
              <div className="flex-1 flex flex-col items-center justify-center p-6 text-center bg-gradient-to-b from-amber-50/60 via-orange-50/40 to-white">
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="max-w-md w-full bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-orange-200 space-y-5"
                >
                  <div className="w-16 h-16 mx-auto rounded-3xl bg-gradient-to-tr from-[#ea580c] to-[#f59e0b] text-white flex items-center justify-center shadow-lg animate-bounce">
                    <LucideIcon name="Sparkles" size={32} />
                  </div>

                  <div className="space-y-2">
                    <span className="text-xs font-extrabold uppercase tracking-widest text-[#ea580c]">
                      PEÍTHO • CONNECTION CANVAS
                    </span>
                    <h4 className="text-2xl font-black text-gray-900 tracking-tight">
                      Welcome to the Game!
                    </h4>
                    <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
                      Connect floating energy seeds to create magical flowers, musical chords, and dancing creatures!
                    </p>
                  </div>

                  <form onSubmit={handleNameSubmit} className="space-y-4 pt-2">
                    <div className="text-left space-y-1">
                      <label className="text-xs font-bold text-gray-700">What's your name, little explorer?</label>
                      <input
                        type="text"
                        required
                        value={inputName}
                        onChange={(e) => setInputName(e.target.value)}
                        placeholder="e.g. Maya, Ethan, Chloe..."
                        className="w-full px-4 py-3 rounded-2xl border border-amber-300 focus:outline-none focus:ring-2 focus:ring-[#ea580c] bg-amber-50/40 font-bold text-gray-800 text-sm"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3.5 rounded-2xl bg-[#ea580c] hover:bg-[#c2410c] text-white font-black text-sm shadow-lg hover:shadow-xl transition-all cursor-pointer flex items-center justify-center space-x-2"
                    >
                      <span>Let's Play!</span>
                      <LucideIcon name="ArrowRight" size={16} />
                    </button>
                  </form>

                  <div className="pt-2 text-[11px] text-gray-500 flex items-center justify-center space-x-1.5">
                    <LucideIcon name="WifiOff" size={13} className="text-emerald-600" />
                    <span>Works offline in Airplane Mode • PWA Saved</span>
                  </div>
                </motion.div>
              </div>
            ) : (
              <>
                {/* TAB 1: Connection Canvas Game */}
                {activeTab === "canvas" && (
                  <div
                    ref={canvasRef}
                    onMouseMove={handleMouseMove}
                    onTouchMove={handleMouseMove}
                    className="flex-1 relative w-full h-full bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 overflow-hidden select-none cursor-crosshair"
                  >
                    {/* Floating Instruction Banner */}
                    <div className="absolute top-4 left-4 right-4 z-20 flex items-center justify-between pointer-events-none">
                      <div className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-4 py-2 rounded-2xl text-xs font-bold shadow-lg flex items-center space-x-2">
                        <LucideIcon name="Hand" size={15} className="text-amber-300 animate-pulse" />
                        <span>Drag your finger from one energy seed to another!</span>
                      </div>

                      <button
                        onClick={() => setGameSessionCount((prev) => prev + 1)}
                        className="pointer-events-auto bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-400/40 px-3 py-1.5 rounded-xl text-xs font-bold backdrop-blur-md transition-all cursor-pointer flex items-center space-x-1.5"
                      >
                        <LucideIcon name="RotateCcw" size={13} />
                        <span>New Never-Repeat Level</span>
                      </button>
                    </div>

                    {/* SVG Connections & Drag Beam */}
                    <svg className="absolute inset-0 w-full h-full pointer-events-none z-10">
                      {/* Completed Connections */}
                      {connections.map((conn, idx) => {
                        const s1 = seeds.find((s) => s.id === conn.fromId);
                        const s2 = seeds.find((s) => s.id === conn.toId);
                        if (!s1 || !s2) return null;

                        return (
                          <g key={idx}>
                            {/* Glowing line */}
                            <line
                              x1={`${s1.x}%`}
                              y1={`${s1.y}%`}
                              x2={`${s2.x}%`}
                              y2={`${s2.y}%`}
                              stroke={conn.color}
                              strokeWidth="4"
                              strokeLinecap="round"
                              className="filter drop-shadow-[0_0_8px_rgba(245,158,11,0.8)]"
                            />
                            {/* Generative Bloom at midpoint */}
                            <circle
                              cx={`${(s1.x + s2.x) / 2}%`}
                              cy={`${(s1.y + s2.y) / 2}%`}
                              r="16"
                              fill={conn.color}
                              fillOpacity="0.25"
                              stroke={conn.color}
                              strokeWidth="2"
                              className="animate-ping"
                            />
                          </g>
                        );
                      })}

                      {/* Active Dragging Energy Beam */}
                      {draggingFrom && (
                        <line
                          x1={`${draggingFrom.x}%`}
                          y1={`${draggingFrom.y}%`}
                          x2={`${mousePos.x}%`}
                          y2={`${mousePos.y}%`}
                          stroke={draggingFrom.color}
                          strokeWidth="5"
                          strokeDasharray="6,6"
                          strokeLinecap="round"
                          className="animate-pulse"
                        />
                      )}
                    </svg>

                    {/* Render Energy Seeds */}
                    {seeds.map((seed) => (
                      <div
                        key={seed.id}
                        onMouseDown={(e) => handleSeedMouseDown(seed, e)}
                        onTouchStart={(e) => handleSeedMouseDown(seed, e)}
                        onMouseUp={() => handleSeedMouseUp(seed)}
                        onTouchEnd={() => handleSeedMouseUp(seed)}
                        style={{
                          left: `${seed.x}%`,
                          top: `${seed.y}%`,
                          width: `${seed.size * 2}px`,
                          height: `${seed.size * 2}px`,
                          backgroundColor: seed.color,
                          boxShadow: `0 0 24px ${seed.color}`
                        }}
                        className={`absolute -translate-x-1/2 -translate-y-1/2 rounded-full cursor-pointer z-20 flex items-center justify-center transition-transform hover:scale-125 ${
                          seed.connected ? "ring-4 ring-white/60 animate-bounce" : "animate-pulse"
                        }`}
                      >
                        <div className="w-3 h-3 rounded-full bg-white opacity-80" />
                      </div>
                    ))}

                    {/* Win Overlay Modal */}
                    <AnimatePresence>
                      {wonState && wonCreature && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.8 }}
                          className="absolute inset-0 z-30 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md"
                        >
                          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-sm w-full text-center space-y-4 shadow-2xl border border-amber-300">
                            <div className="w-20 h-20 mx-auto rounded-full bg-amber-100 text-[#ea580c] flex items-center justify-center shadow-lg animate-bounce">
                              <LucideIcon name="Sparkles" size={40} />
                            </div>

                            <div className="space-y-1">
                              <span className="text-xs font-black text-amber-600 uppercase tracking-widest">
                                THE BIG REVEAL!
                              </span>
                              <h4 className="text-2xl font-black text-gray-900 tracking-tight">
                                {wonCreature.name} Bloomed!
                              </h4>
                              <p className="text-gray-600 text-xs">
                                {childName}, your connections created magic! {wonCreature.text}
                              </p>
                            </div>

                            {/* Awarded Living Charm Badge */}
                            {recentAwardedCharm && (
                              <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-left flex items-center space-x-3">
                                <div
                                  className="w-10 h-10 rounded-xl flex items-center justify-center text-white shrink-0 shadow-md"
                                  style={{ backgroundColor: recentAwardedCharm.color }}
                                >
                                  <LucideIcon name={recentAwardedCharm.icon} size={20} />
                                </div>
                                <div>
                                  <span className="text-[10px] font-black uppercase tracking-wider text-amber-700">
                                    New Living Charm Unlocked!
                                  </span>
                                  <div className="font-black text-sm text-gray-900">{recentAwardedCharm.name}</div>
                                  <div className="text-[11px] text-gray-500">{recentAwardedCharm.description}</div>
                                </div>
                              </div>
                            )}

                            {/* Action Buttons */}
                            <div className="space-y-2 pt-2">
                              <button
                                onClick={handleShowTeacher}
                                className="w-full py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs shadow-md transition-all cursor-pointer flex items-center justify-center space-x-2"
                              >
                                <LucideIcon name="Send" size={15} />
                                <span>Show My Teacher!</span>
                              </button>

                              <button
                                onClick={() => setGameSessionCount((prev) => prev + 1)}
                                className="w-full py-3 rounded-2xl bg-[#ea580c] hover:bg-[#c2410c] text-white font-black text-xs shadow-md transition-all cursor-pointer flex items-center justify-center space-x-2"
                              >
                                <LucideIcon name="RotateCcw" size={15} />
                                <span>Play Next Never-Repeat Game</span>
                              </button>

                              <button
                                onClick={() => setActiveTab("fridge")}
                                className="w-full py-2.5 rounded-2xl bg-amber-100 hover:bg-amber-200 text-amber-900 font-bold text-xs transition-all cursor-pointer"
                              >
                                View in Digital Fridge
                              </button>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Teacher Sent Toast Notification */}
                    <AnimatePresence>
                      {showTeacherToast && (
                        <motion.div
                          initial={{ opacity: 0, y: 50 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 50 }}
                          className="absolute bottom-6 left-6 right-6 z-40 bg-emerald-900 text-white p-4 rounded-2xl shadow-2xl border border-emerald-400 flex items-center space-x-3"
                        >
                          <div className="w-10 h-10 rounded-xl bg-emerald-500 text-slate-950 flex items-center justify-center shrink-0 font-bold">
                            <LucideIcon name="CheckCircle" size={22} />
                          </div>
                          <div>
                            <h5 className="font-black text-xs sm:text-sm">Sent to Graben Highlight Academy Teacher!</h5>
                            <p className="text-emerald-200 text-[11px]">
                              Miss Marie-Claire and caregivers have received {childName}'s generative creation on the school portal!
                            </p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                )}

                {/* TAB 2: The Digital Fridge (Digital Gallery) */}
                {activeTab === "fridge" && (
                  <div className="flex-1 p-4 sm:p-6 overflow-y-auto bg-amber-50/40 space-y-6">
                    <div className="text-center max-w-xl mx-auto space-y-1">
                      <span className="text-xs font-black uppercase tracking-widest text-[#ea580c]">
                        THE DIGITAL FRIDGE
                      </span>
                      <h4 className="text-2xl font-black text-gray-900 tracking-tight">
                        {childName}'s Generative Keepsakes
                      </h4>
                      <p className="text-gray-600 text-xs sm:text-sm">
                        Every game played saves generative artwork onto your device. See what {childName} created today!
                      </p>
                    </div>

                    {fridgeArtworks.length === 0 ? (
                      <div className="text-center py-12 bg-white rounded-3xl border border-dashed border-amber-300 p-8 space-y-3">
                        <LucideIcon name="Image" size={40} className="mx-auto text-amber-400" />
                        <h5 className="font-bold text-gray-800 text-sm">No Fridge Artworks Saved Yet</h5>
                        <p className="text-gray-500 text-xs">Play the Connection Canvas game to create artwork for your fridge!</p>
                        <button
                          onClick={() => setActiveTab("canvas")}
                          className="px-5 py-2.5 rounded-xl bg-[#ea580c] text-white font-bold text-xs"
                        >
                          Start Playing
                        </button>
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {fridgeArtworks.map((art) => (
                          <div key={art.id} className="bg-white rounded-2xl p-4 shadow-sm border border-amber-200/80 space-y-3">
                            <div
                              className="w-full h-36 rounded-xl flex items-center justify-center relative overflow-hidden"
                              style={{ backgroundColor: `${art.seedColor}20`, border: `2px border ${art.seedColor}` }}
                            >
                              <LucideIcon name="Sparkles" size={48} style={{ color: art.seedColor }} className="animate-pulse" />
                              <div className="absolute top-2 right-2 bg-white/80 backdrop-blur-md px-2 py-0.5 rounded-full text-[10px] font-bold text-gray-700">
                                {art.date}
                              </div>
                            </div>

                            <div>
                              <div className="font-extrabold text-sm text-gray-900">{art.title}</div>
                              <div className="text-[11px] text-gray-500 font-medium">By {art.childName}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {/* TAB 3: Living Charm Garden */}
                {activeTab === "charms" && (
                  <div className="flex-1 p-4 sm:p-6 overflow-y-auto bg-gradient-to-br from-emerald-50/50 to-teal-50/50 space-y-6">
                    <div className="text-center max-w-xl mx-auto space-y-1">
                      <span className="text-xs font-black uppercase tracking-widest text-emerald-600">
                        THE LIVING CHARM GARDEN
                      </span>
                      <h4 className="text-2xl font-black text-gray-900 tracking-tight">
                        {childName}'s Collected Charms
                      </h4>
                      <p className="text-gray-600 text-xs sm:text-sm">
                        Charms populate your home screen and bounce with life as you play more games!
                      </p>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                      {savedCharms.map((charm) => (
                        <div key={charm.id} className="bg-white rounded-2xl p-4 shadow-sm border border-emerald-200 space-y-2 text-center">
                          <div
                            className="w-14 h-14 mx-auto rounded-2xl flex items-center justify-center text-white shadow-md animate-bounce"
                            style={{ backgroundColor: charm.color }}
                          >
                            <LucideIcon name={charm.icon} size={28} />
                          </div>
                          <div className="font-extrabold text-xs sm:text-sm text-gray-900">{charm.name}</div>
                          <div className="text-[10px] text-gray-500">{charm.description}</div>
                          <span className="inline-block text-[9px] font-black uppercase px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                            {charm.rarity}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
