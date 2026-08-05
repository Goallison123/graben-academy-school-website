import { EnergySeed } from '../types';

/**
 * String hash function to convert string + timestamp into a numeric seed
 */
export function stringToSeed(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash |= 0; // Convert to 32bit integer
  }
  return Math.abs(hash) || 123456789;
}

/**
 * Mulberry32 Seeded Pseudo-Random Number Generator
 */
export class PRNG {
  private state: number;

  constructor(seed: number) {
    this.state = seed;
  }

  // Returns float in [0, 1)
  nextFloat(): number {
    let t = (this.state += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  }

  // Returns integer in [min, max]
  nextInt(min: number, max: number): number {
    return Math.floor(this.nextFloat() * (max - min + 1)) + min;
  }

  // Choose random element from array
  choice<T>(arr: T[]): T {
    return arr[this.nextInt(0, arr.length - 1)];
  }
}

export const COLOR_PALETTES = [
  { name: 'Sunrise Blossom', colors: ['#FF6B6B', '#4ECDC4', '#FFE66D', '#FF8E72', '#A8E6CF'] },
  { name: 'Enchanted Forest', colors: ['#2ECC71', '#27AE60', '#F1C40F', '#E67E22', '#1ABC9C'] },
  { name: 'Cosmic Starlight', colors: ['#9B59B6', '#8E44AD', '#3498DB', '#16A085', '#F39C12'] },
  { name: 'Rainbow Garden', colors: ['#FF7675', '#74B9FF', '#55EFC4', '#FFEAA7', '#A29BFE'] },
  { name: 'Oceanic Whims', colors: ['#00CEC9', '#0984E3', '#6C5CE7', '#81ECEC', '#74B9FF'] },
];

export const CREATURE_TYPES = [
  { name: 'Glow Butterfly', icon: '🦋', desc: 'Flutters gently with sparkling wings', color: '#FF7675' },
  { name: 'Friday Firefly', icon: '🪲', desc: 'Gleams warmly in twilight hues', color: '#F1C40F' },
  { name: 'Dancing Sprout', icon: '🌱', desc: 'Leaps joyfully with emerald leaves', color: '#2ECC71' },
  { name: 'Rainbow Cloud', icon: '☁️', desc: 'Sings soft pentatonic rainchimes', color: '#74B9FF' },
  { name: 'Starlight Phoenix', icon: '🦚', desc: 'Shines with brilliant cosmic feathers', color: '#A29BFE' },
  { name: 'Giggling Dragon', icon: '🐲', desc: 'Blows harmless glitter bubbles', color: '#FF8E72' },
];

export interface ShadowGuide {
  id: string;
  name: string;
  patternType: 'symmetry' | 'fibonacci' | 'triangle' | 'logic';
  description: string;
  insightTemplate: string;
  lines: Array<{ from: number; to: number }>;
}

export const SHADOW_GUIDE_CATALOG: ShadowGuide[] = [
  {
    id: 'symmetry_diamond',
    name: 'Symmetry Line',
    patternType: 'symmetry',
    description: 'Mirror Symmetry & Spatial Balancing',
    insightTemplate: 'discovered Symmetry! She connected seeds in a mirror pattern. This helps develop her spatial reasoning and math readiness. Ask her to show you something "symmetrical" in the kitchen!',
    lines: [
      { from: 0, to: 1 },
      { from: 1, to: 2 },
      { from: 2, to: 3 },
      { from: 3, to: 0 },
    ],
  },
  {
    id: 'fibonacci_spiral',
    name: 'Fibonacci Golden Spiral',
    patternType: 'fibonacci',
    description: 'Nature’s Mathematical Golden Ratio',
    insightTemplate: 'unlocked the Golden Spiral! Following nature’s Fibonacci sequence (1, 1, 2, 3...) teaches the brain to recognize mathematical patterns in flowers, leaves, and seashells.',
    lines: [
      { from: 0, to: 1 },
      { from: 1, to: 2 },
      { from: 2, to: 3 },
      { from: 3, to: 4 },
    ],
  },
  {
    id: 'golden_triangle',
    name: 'Geometric Triangle',
    patternType: 'triangle',
    description: 'Structural Physics & Geometric Strength',
    insightTemplate: 'constructed a Geometric Triangle! Triangles are nature’s strongest structural shape, building early intuition for architecture, engineering, and geometry.',
    lines: [
      { from: 0, to: 1 },
      { from: 1, to: 2 },
      { from: 2, to: 0 },
    ],
  },
  {
    id: 'color_logic',
    name: 'Conditional Color Synthesis',
    patternType: 'logic',
    description: 'Predictive System Logic (If/Then Coding)',
    insightTemplate: 'mastered Color Synthesis Logic! By combining Primary Colors to form Purple and Green, she learned conditional logic (If Red + Blue, Then Purple) — essential pre-coding thinking.',
    lines: [
      { from: 0, to: 1 },
      { from: 1, to: 2 },
    ],
  },
];

/**
 * Generate seed-based game level layout with Fibonacci ratio placement & Shadow Guide
 */
export function generateGameLevel(childName: string, sessionId?: string) {
  const timestamp = Date.now();
  const seedString = `${childName.trim().toLowerCase()}-${timestamp}-${sessionId || Math.random()}`;
  const seedHex = Math.abs(stringToSeed(seedString)).toString(16).toUpperCase();
  const rng = new PRNG(stringToSeed(seedString));

  const palette = rng.choice(COLOR_PALETTES);
  const seedCount = rng.nextInt(5, 7);
  const creature = rng.choice(CREATURE_TYPES);
  const shadowGuide = rng.choice(SHADOW_GUIDE_CATALOG);

  const seeds: EnergySeed[] = [];
  const minMargin = 0.18;
  const maxMargin = 0.82;

  // Primary color Palette for Color Synthesis Logic
  const logicColors = ['#FF4757', '#1E90FF', '#FFA502', '#2ED573', '#9B59B6'];

  for (let i = 0; i < seedCount; i++) {
    let attempts = 0;
    let x = 0;
    let y = 0;
    let valid = false;

    // Use Golden Angle (137.5 degrees) for Fibonacci natural spiral layout
    const goldenAngle = 2.399963; // ~137.5 degrees in radians
    const r = Math.sqrt((i + 1) / seedCount) * 0.32;
    const theta = i * goldenAngle + rng.nextFloat() * 0.5;

    const fibX = 0.5 + Math.cos(theta) * r;
    const fibY = 0.5 + Math.sin(theta) * r;

    while (!valid && attempts < 50) {
      attempts++;
      if (attempts < 20) {
        x = Math.max(minMargin, Math.min(maxMargin, fibX + (rng.nextFloat() - 0.5) * 0.1));
        y = Math.max(minMargin, Math.min(maxMargin, fibY + (rng.nextFloat() - 0.5) * 0.1));
      } else {
        x = minMargin + rng.nextFloat() * (maxMargin - minMargin);
        y = minMargin + rng.nextFloat() * (maxMargin - minMargin);
      }

      valid = seeds.every((existing) => {
        const dx = existing.x - x;
        const dy = existing.y - y;
        return Math.sqrt(dx * dx + dy * dy) > 0.20;
      });
    }

    const types = ['sun', 'water', 'leaf', 'star', 'spark'];
    seeds.push({
      id: i,
      x,
      y,
      radius: rng.nextInt(24, 32),
      color: logicColors[i % logicColors.length],
      pulsePhase: rng.nextFloat() * Math.PI * 2,
      type: types[i % types.length],
      connected: false,
      connections: [],
    });
  }

  return {
    seedHex,
    palette,
    seeds,
    creature,
    shadowGuide,
    totalRequiredConnections: Math.max(seedCount - 1, 4),
  };
}
