import { ArtworkEntry, DigitalPet, LivingCharm, SchoolConfig, TeacherPing, TotemEntry } from '../types';
import { CHARM_CATALOG } from '../data/charmsData';

const KEYS = {
  CHILD_NAME: 'peitho_child_name',
  PLAY_COUNT: 'peitho_play_count',
  ARTWORKS: 'peitho_digital_fridge_artworks',
  CHARMS: 'peitho_unlocked_charms',
  SCHOOL_CONFIG: 'peitho_school_config',
  TEACHER_PINGS: 'peitho_teacher_pings',
  FIRST_VISIT: 'peitho_has_visited',
  DIGITAL_PETS: 'peitho_digital_pets',
  TOTEMS: 'peitho_totems',
};

export const DEFAULT_SCHOOL_CONFIG: SchoolConfig = {
  schoolName: 'Graben Highlight Academy',
  tagline: 'Nurturing Young Minds • Learning Through Play & Discovery',
  primaryColor: '#7C2D12', // Terracotta Rust
  accentColor: '#F59E0B', // Warm Amber
  logoEmoji: '🏫',
  contactEmail: 'admissions@grabenhighlight.edu.rw',
  parentMessage: 'Providing quality early childhood education, play-based learning, and holistic child development in Rubavu District.',
};

export function getStoredChildName(): string {
  return localStorage.getItem(KEYS.CHILD_NAME) || 'Little Explorer';
}

export function setStoredChildName(name: string) {
  localStorage.setItem(KEYS.CHILD_NAME, name.trim() || 'Little Explorer');
}

export function getStoredPlayCount(): number {
  return parseInt(localStorage.getItem(KEYS.PLAY_COUNT) || '0', 10);
}

export function incrementPlayCount(): number {
  const current = getStoredPlayCount() + 1;
  localStorage.setItem(KEYS.PLAY_COUNT, current.toString());
  return current;
}

export function getStoredArtworks(): ArtworkEntry[] {
  try {
    const raw = localStorage.getItem(KEYS.ARTWORKS);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveArtwork(artwork: ArtworkEntry): ArtworkEntry[] {
  const existing = getStoredArtworks();
  const updated = [artwork, ...existing];
  try {
    localStorage.setItem(KEYS.ARTWORKS, JSON.stringify(updated.slice(0, 30))); // Keep last 30 artworks
  } catch (e) {
    console.warn('LocalStorage limit reached', e);
  }
  return updated;
}

export function toggleParentLike(artworkId: string): ArtworkEntry[] {
  const existing = getStoredArtworks();
  const updated = existing.map((art) =>
    art.id === artworkId ? { ...art, parentLiked: !art.parentLiked } : art
  );
  localStorage.setItem(KEYS.ARTWORKS, JSON.stringify(updated));
  return updated;
}

export function addTeacherPraiseToArtwork(artworkId: string, praiseMessage: string): ArtworkEntry[] {
  const existing = getStoredArtworks();
  const updated = existing.map((art) =>
    art.id === artworkId ? { ...art, teacherPraise: praiseMessage } : art
  );
  localStorage.setItem(KEYS.ARTWORKS, JSON.stringify(updated));
  return updated;
}

export function getStoredCharms(): LivingCharm[] {
  try {
    const raw = localStorage.getItem(KEYS.CHARMS);
    if (!raw) {
      // Default initial charm: Sleeping Star
      const initial = [CHARM_CATALOG[0]];
      localStorage.setItem(KEYS.CHARMS, JSON.stringify(initial));
      return initial;
    }
    return JSON.parse(raw);
  } catch {
    return [CHARM_CATALOG[0]];
  }
}

export function unlockCharm(charm: LivingCharm): LivingCharm[] {
  const current = getStoredCharms();
  const exists = current.some((c) => c.id === charm.id);
  let updated = current;
  if (!exists) {
    updated = [...current, { ...charm, unlockedAt: new Date().toISOString() }];
  } else {
    // Update timestamp if rare custom name
    updated = current.map((c) => (c.id === charm.id ? { ...c, unlockedAt: new Date().toISOString() } : c));
  }
  localStorage.setItem(KEYS.CHARMS, JSON.stringify(updated));
  return updated;
}

export function getStoredSchoolConfig(): SchoolConfig {
  try {
    const raw = localStorage.getItem(KEYS.SCHOOL_CONFIG);
    return raw ? { ...DEFAULT_SCHOOL_CONFIG, ...JSON.parse(raw) } : DEFAULT_SCHOOL_CONFIG;
  } catch {
    return DEFAULT_SCHOOL_CONFIG;
  }
}

export function saveSchoolConfig(config: SchoolConfig) {
  localStorage.setItem(KEYS.SCHOOL_CONFIG, JSON.stringify(config));
}

export function getStoredTeacherPings(): TeacherPing[] {
  try {
    const raw = localStorage.getItem(KEYS.TEACHER_PINGS);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function sendTeacherPing(ping: TeacherPing): TeacherPing[] {
  const existing = getStoredTeacherPings();
  const updated = [ping, ...existing];
  localStorage.setItem(KEYS.TEACHER_PINGS, JSON.stringify(updated));
  return updated;
}

export function updateTeacherPingStatus(pingId: string, praiseComment: string): TeacherPing[] {
  const existing = getStoredTeacherPings();
  const updated = existing.map((p) =>
    p.id === pingId ? { ...p, status: 'praised' as const, praiseComment } : p
  );
  localStorage.setItem(KEYS.TEACHER_PINGS, JSON.stringify(updated));

  // Also update corresponding artwork in fridge
  const ping = existing.find((p) => p.id === pingId);
  if (ping) {
    addTeacherPraiseToArtwork(ping.id, praiseComment);
  }

  return updated;
}

export function isFirstVisit(): boolean {
  const visited = localStorage.getItem(KEYS.FIRST_VISIT);
  if (!visited) {
    localStorage.setItem(KEYS.FIRST_VISIT, 'true');
    return true;
  }
  return false;
}

export function getStoredDigitalPets(): DigitalPet[] {
  try {
    const raw = localStorage.getItem(KEYS.DIGITAL_PETS);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveDigitalPet(pet: DigitalPet): DigitalPet[] {
  const existing = getStoredDigitalPets();
  const updated = [pet, ...existing.filter((p) => p.id !== pet.id)];
  localStorage.setItem(KEYS.DIGITAL_PETS, JSON.stringify(updated));
  return updated;
}

export function feedDigitalPet(petId: string): DigitalPet[] {
  const existing = getStoredDigitalPets();
  const updated = existing.map((p) =>
    p.id === petId ? { ...p, hungerLevel: Math.min(100, p.hungerLevel + 35) } : p
  );
  localStorage.setItem(KEYS.DIGITAL_PETS, JSON.stringify(updated));
  return updated;
}

export function getStoredTotems(): TotemEntry[] {
  try {
    const raw = localStorage.getItem(KEYS.TOTEMS);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveTotem(totem: TotemEntry): TotemEntry[] {
  const existing = getStoredTotems();
  const updated = [totem, ...existing];
  localStorage.setItem(KEYS.TOTEMS, JSON.stringify(updated.slice(0, 20)));
  return updated;
}
