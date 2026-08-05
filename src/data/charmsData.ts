import { LivingCharm } from '../types';

export const CHARM_CATALOG: LivingCharm[] = [
  {
    id: 'sleeping-star',
    name: 'Sleeping Star',
    description: 'Drifts peacefully in a pillow of cosmic stardust.',
    category: 'celestial',
    icon: '⭐',
    color: '#FFE66D',
    bgGradient: 'from-amber-100 to-amber-200 dark:from-amber-900/40 dark:to-amber-800/20',
    soundPitch: 1.2,
    personality: 'Sleepy & gentle',
  },
  {
    id: 'giggling-cloud',
    name: 'Giggling Cloud',
    description: 'Puffs up with soft pentatonic rain sparkles whenever you say hello!',
    category: 'element',
    icon: '☁️',
    color: '#74B9FF',
    bgGradient: 'from-sky-100 to-blue-200 dark:from-sky-900/40 dark:to-sky-800/20',
    soundPitch: 0.9,
    personality: 'Bouncy & cheerful',
  },
  {
    id: 'dancing-sprout',
    name: 'Dancing Sprout',
    description: 'Wiggles its emerald leaves to the rhythm of new connections.',
    category: 'flora',
    icon: '🌱',
    color: '#2ECC71',
    bgGradient: 'from-emerald-100 to-teal-200 dark:from-emerald-900/40 dark:to-emerald-800/20',
    soundPitch: 1.0,
    personality: 'Lively & curious',
  },
  {
    id: 'friday-firefly',
    name: 'The Friday Firefly',
    description: 'A special golden firefly that glows brightest at the end of the week!',
    category: 'rare',
    icon: '🪲',
    color: '#F1C40F',
    bgGradient: 'from-yellow-100 to-amber-300 dark:from-yellow-900/40 dark:to-amber-700/30',
    soundPitch: 1.5,
    personality: 'Radiant & mysterious',
    isRare: true,
    specialCondition: 'Friday Special or 5th Play Milestone',
  },
  {
    id: 'rainbow-bubble',
    name: 'Rainbow Bubble',
    description: 'Floats weightlessly and sparkles in every color of the sunset.',
    category: 'element',
    icon: '🫧',
    color: '#A29BFE',
    bgGradient: 'from-purple-100 to-indigo-200 dark:from-purple-900/40 dark:to-indigo-800/20',
    soundPitch: 1.4,
    personality: 'Whimsical & light',
  },
  {
    id: 'sunbeam-puff',
    name: 'Sunbeam Puff',
    description: 'Warms the nursery room with soft glowing sunbeams.',
    category: 'celestial',
    icon: '☀️',
    color: '#FF8E72',
    bgGradient: 'from-orange-100 to-rose-200 dark:from-orange-900/40 dark:to-rose-800/20',
    soundPitch: 1.1,
    personality: 'Warm & friendly',
  },
  {
    id: 'cosmic-owl',
    name: 'Cosmic Owl',
    description: 'Wisely watches over the Digital Fridge gallery.',
    category: 'creature',
    icon: '🦉',
    color: '#6C5CE7',
    bgGradient: 'from-violet-100 to-purple-300 dark:from-violet-900/40 dark:to-purple-800/30',
    soundPitch: 0.8,
    personality: 'Thoughtful & wise',
  },
  {
    id: 'golden-petal',
    name: 'Golden Petal',
    description: 'Twirls in the breeze leaving a trail of fragrant blossom dust.',
    category: 'flora',
    icon: '🌸',
    color: '#FF7675',
    bgGradient: 'from-pink-100 to-rose-200 dark:from-pink-900/40 dark:to-rose-800/20',
    soundPitch: 1.3,
    personality: 'Graceful & sweet',
  },
  {
    id: 'magic-acorn',
    name: 'Magic Acorn',
    description: 'Holds the secret power to grow huge green trees of pride.',
    category: 'rare',
    icon: '🌰',
    color: '#D35400',
    bgGradient: 'from-amber-100 to-orange-200 dark:from-amber-900/40 dark:to-orange-800/20',
    soundPitch: 0.7,
    personality: 'Sturdy & hopeful',
    isRare: true,
  },
  {
    id: 'petal-dragon',
    name: 'Petal Dragon',
    description: 'A friendly mythical dragon made of colorful flower leaves!',
    category: 'rare',
    icon: '🐲',
    color: '#FF6B6B',
    bgGradient: 'from-red-100 to-orange-300 dark:from-red-900/40 dark:to-orange-800/30',
    soundPitch: 1.6,
    personality: 'Playful & heroic',
    isRare: true,
    specialCondition: '10th Play Celebration',
  },
];

/**
 * Determine which charm to award based on play count & child name
 */
export function getAwardCharm(playCount: number, childName: string): LivingCharm {
  const isFriday = new Date().getDay() === 5;

  if (isFriday || playCount % 5 === 0) {
    const rareCharm = CHARM_CATALOG.find((c) => c.id === 'friday-firefly') || CHARM_CATALOG[3];
    return {
      ...rareCharm,
      name: `${childName}'s Friday Firefly`,
      description: `A unique rare charm awarded to ${childName}!`,
    };
  }

  if (playCount % 10 === 0) {
    const dragonCharm = CHARM_CATALOG.find((c) => c.id === 'petal-dragon') || CHARM_CATALOG[9];
    return {
      ...dragonCharm,
      name: `${childName}'s Petal Dragon`,
      description: `A legendary rare dragon earned by ${childName}!`,
    };
  }

  // Pick standard charm based on play count cycle
  const standardCharms = CHARM_CATALOG.filter((c) => !c.isRare);
  const index = (playCount - 1) % standardCharms.length;
  return standardCharms[index];
}
