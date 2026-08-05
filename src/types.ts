export type GamePackageId = 'seeds' | 'weaver' | 'sound' | 'mirror';

export interface DigitalPet {
  id: string;
  name: string;
  childName: string;
  speciesEmoji: string;
  color: string;
  hatchDate: string;
  schoolName: string;
  hungerLevel: number; // 0..100
  favoriteSnack: string;
  personality: string;
  seedHex: string;
}

export interface TotemEntry {
  id: string;
  childName: string;
  totemName: string;
  totemEmoji: string;
  totemTraits: string;
  timestamp: string;
  parentWisdom: string;
  seedHex: string;
}

export interface LivingCharm {
  id: string;
  name: string;
  description: string;
  category: 'element' | 'creature' | 'flora' | 'celestial' | 'rare';
  icon: string; // Emoji or SVG character key
  color: string;
  bgGradient: string;
  soundPitch: number; // Hz multiplier
  personality: string;
  unlockedAt?: string;
  isRare?: boolean;
  specialCondition?: string;
}

export interface ArtworkEntry {
  id: string;
  childName: string;
  title: string;
  dataUrl: string; // Base64 snapshot of canvas
  timestamp: string;
  seedsConnected: number;
  creatureName: string;
  charmEarned: LivingCharm;
  notes?: string;
  parentLiked?: boolean;
  teacherPraise?: string;
  seedHex: string;
  melodyNotes: number[]; // Frequencies played during session
  patternDiscovered?: string; // e.g. "Symmetry & Spatial Harmony", "Fibonacci Golden Spiral", "Color Synthesis Logic"
  geniusInsight?: string; // Parent Insight report
}

export interface EnergySeed {
  id: number;
  x: number; // 0..1 relative canvas ratio
  y: number; // 0..1 relative canvas ratio
  radius: number;
  color: string;
  pulsePhase: number;
  type: string; // 'sun', 'water', 'leaf', 'star', 'spark'
  connected: boolean;
  connections: number[]; // Indices of connected seeds
}

export interface ConnectionLine {
  fromId: number;
  toId: number;
  color: string;
  timestamp: number;
  bloomType: 'fractal' | 'ripple' | 'vine' | 'starburst';
}

export interface SchoolConfig {
  schoolName: string;
  tagline: string;
  primaryColor: string;
  accentColor: string;
  logoEmoji: string;
  contactEmail: string;
  parentMessage: string;
}

export interface TeacherPing {
  id: string;
  childName: string;
  artworkTitle: string;
  dataUrl: string;
  timestamp: string;
  creatureName: string;
  status: 'pending' | 'praised';
  praiseComment?: string;
}
