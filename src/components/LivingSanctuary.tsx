import React, { useState } from 'react';
import { Sparkles, Trophy, Lock, Heart, Volume2, Egg } from 'lucide-react';
import confetti from 'canvas-confetti';
import { LivingCharm, DigitalPet } from '../types';
import { CHARM_CATALOG } from '../data/charmsData';
import { soundEngine } from '../utils/sound';
import { getStoredDigitalPets, feedDigitalPet } from '../utils/storage';

interface LivingSanctuaryProps {
  unlockedCharms: LivingCharm[];
  childName: string;
  playCount: number;
  onPlayCanvasClick: () => void;
}

export const LivingSanctuary: React.FC<LivingSanctuaryProps> = ({
  unlockedCharms,
  childName,
  playCount,
  onPlayCanvasClick,
}) => {
  const [activeCharm, setActiveCharm] = useState<LivingCharm | null>(null);
  const [animatingId, setAnimatingId] = useState<string | null>(null);
  const [digitalPets, setDigitalPets] = useState<DigitalPet[]>(() => getStoredDigitalPets());
  const [fedPetMessage, setFedPetMessage] = useState<string | null>(null);

  const handleCharmTap = (charm: LivingCharm) => {
    setActiveCharm(charm);
    setAnimatingId(charm.id);

    // Play pitch sound & spawn confetti chirp
    soundEngine.playCharmChirp(charm.soundPitch || 1.0);

    confetti({
      particleCount: 25,
      spread: 50,
      origin: { y: 0.7 },
      colors: [charm.color || '#FFE66D', '#74B9FF', '#2ECC71'],
    });

    setTimeout(() => {
      setAnimatingId(null);
    }, 1000);
  };

  const handleFeedPet = (pet: DigitalPet) => {
    soundEngine.playCharmChirp(1.4);
    const updated = feedDigitalPet(pet.id);
    setDigitalPets(updated);
    setFedPetMessage(`Yum! ${pet.name} loved eating ${pet.favoriteSnack}! 🍎`);
    setTimeout(() => setFedPetMessage(null), 3500);
  };

  const unlockedIds = new Set(unlockedCharms.map((c) => c.id));
  const progressPercent = Math.min(Math.round((unlockedCharms.length / CHARM_CATALOG.length) * 100), 100);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fadeIn">
      
      {/* Sanctuary Hero Playground Banner */}
      <div className="bg-gradient-to-r from-emerald-500 via-teal-500 to-amber-500 rounded-[32px] p-6 sm:p-10 text-white shadow-xl border-4 border-amber-300 relative overflow-hidden">
        <div className="relative z-10 max-w-2xl space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/25 backdrop-blur-md rounded-full text-xs font-black text-amber-100 border border-white/20">
            <Sparkles className="w-4 h-4 text-amber-200" />
            <span>Living Charms Playground • Home Sanctuary</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-black tracking-tight">
            {childName}'s Living Sanctuary 🏡
          </h1>

          <p className="text-amber-50 text-sm sm:text-base leading-relaxed font-medium">
            Every connection you complete earns a new Living Charm! Tap your charms to hear them giggle, dance, and sing pentatonic melodies!
          </p>

          {/* Collection Progress Bar */}
          <div className="bg-black/20 backdrop-blur-md rounded-2xl p-4 max-w-md border border-white/20 space-y-2">
            <div className="flex items-center justify-between text-xs font-black text-amber-100">
              <span className="flex items-center gap-1.5">
                <Trophy className="w-4 h-4 text-amber-200" />
                <span>Collection Progress</span>
              </span>
              <span>{unlockedCharms.length} of {CHARM_CATALOG.length} Charms</span>
            </div>
            <div className="w-full bg-black/30 rounded-full h-3.5 overflow-hidden p-0.5 border border-white/10">
              <div
                className="bg-gradient-to-r from-amber-300 to-emerald-300 h-full rounded-full transition-all duration-700"
                style={{ width: `${progressPercent}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Living Sanctuary Canvas Grid (Active Floating Charms) */}
      <div className="bg-amber-100/80 rounded-[32px] p-6 sm:p-10 shadow-lg border-4 border-amber-300 space-y-6 relative overflow-hidden">
        
        <div className="flex items-center justify-between border-b-2 border-amber-200 pb-4">
          <div>
            <h2 className="text-xl font-black text-orange-950 flex items-center gap-2">
              <span>Living Sanctuary</span>
              <span className="text-xs font-bold text-orange-700">({unlockedCharms.length} Active)</span>
            </h2>
            <p className="text-orange-900/80 text-xs font-medium mt-0.5">
              Tap any charm to interact!
            </p>
          </div>

          <button
            onClick={onPlayCanvasClick}
            className="px-4 py-2.5 bg-orange-500 text-white font-black text-xs rounded-2xl shadow-md shadow-orange-200 hover:bg-orange-600 transition-all active:scale-95 flex items-center gap-1.5"
            id="sanctuary-play-btn"
          >
            <Sparkles className="w-4 h-4 text-amber-200" />
            <span>Earn More Charms</span>
          </button>
        </div>

        {/* Charms Playground Area */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 min-h-[220px]">
          {unlockedCharms.map((charm) => (
            <button
              key={charm.id}
              onClick={() => handleCharmTap(charm)}
              className={`relative bg-gradient-to-b ${charm.bgGradient} rounded-3xl p-5 border-4 border-white shadow-md hover:shadow-xl transition-all duration-300 flex flex-col items-center justify-center text-center gap-2 group cursor-pointer focus:outline-hidden ${
                animatingId === charm.id ? 'scale-110 -rotate-3 ring-4 ring-amber-400' : 'hover:scale-105'
              }`}
              id={`charm-card-${charm.id}`}
            >
              <div
                className={`text-5xl transition-transform ${
                  animatingId === charm.id ? 'animate-bounce' : 'group-hover:scale-110'
                }`}
              >
                {charm.icon}
              </div>

              <div className="font-black text-slate-900 text-sm truncate max-w-full">
                {charm.name}
              </div>

              <span className="text-[10px] font-black px-2 py-0.5 bg-white/80 text-slate-800 rounded-full border border-slate-200/50">
                {charm.personality}
              </span>

              {charm.isRare && (
                <span className="absolute top-2 right-2 px-2 py-0.5 bg-amber-400 text-orange-950 font-black text-[9px] rounded-lg shadow-xs border border-amber-500/30">
                  RARE
                </span>
              )}
            </button>
          ))}
        </div>

      </div>

      {/* Digital Pets Nursery Section */}
      {digitalPets.length > 0 && (
        <div className="bg-white rounded-[32px] p-6 sm:p-8 border-4 border-amber-300 shadow-md space-y-4">
          <div className="flex items-center justify-between border-b-2 border-amber-200 pb-3">
            <div>
              <h2 className="text-xl font-black text-orange-950 flex items-center gap-2">
                <Egg className="w-5 h-5 text-amber-500" />
                <span>{childName}'s Digital Pet Keys</span>
                <span className="text-xs font-bold text-orange-700">({digitalPets.length} Hatched)</span>
              </h2>
              <p className="text-orange-900/80 text-xs font-medium">
                Digital creatures hatched from World-Weaver star-dust! Feed your pets daily snacks.
              </p>
            </div>
          </div>

          {fedPetMessage && (
            <div className="p-3 bg-emerald-100 border-2 border-emerald-300 text-emerald-950 font-black text-xs rounded-2xl animate-fadeIn">
              {fedPetMessage}
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {digitalPets.map((pet) => (
              <div
                key={pet.id}
                className="bg-amber-50 rounded-2xl p-4 border-2 border-amber-300 flex items-center gap-4 shadow-xs"
              >
                <div className="w-16 h-16 rounded-2xl bg-white border-2 border-amber-200 text-4xl flex items-center justify-center shrink-0 shadow-xs animate-bounce">
                  {pet.speciesEmoji}
                </div>

                <div className="min-w-0 flex-1 space-y-1">
                  <div className="font-black text-orange-950 text-sm truncate">{pet.name}</div>
                  <div className="text-[11px] font-bold text-orange-900/80 line-clamp-1">
                    "{pet.personality}"
                  </div>
                  <div className="text-[10px] font-bold text-orange-700/70">
                    Lives at {pet.schoolName}
                  </div>

                  <button
                    onClick={() => handleFeedPet(pet)}
                    className="mt-2 w-full py-1.5 px-3 bg-emerald-500 hover:bg-emerald-600 text-white font-black text-xs rounded-xl shadow-xs transition-all flex items-center justify-center gap-1"
                    id={`feed-pet-${pet.id}`}
                  >
                    <Heart className="w-3.5 h-3.5 fill-white" />
                    <span>Feed {pet.favoriteSnack} 🍎</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Catalog & Locked Charms Overview */}
      <div className="bg-white rounded-[32px] p-6 sm:p-8 border-4 border-amber-200 shadow-sm space-y-4">
        <h3 className="font-black text-orange-950 text-lg">
          Living Charms Catalog
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {CHARM_CATALOG.map((charm) => {
            const isUnlocked = unlockedIds.has(charm.id);
            return (
              <div
                key={charm.id}
                className={`p-4 rounded-2xl border-2 flex items-center gap-4 transition-all ${
                  isUnlocked
                    ? 'bg-amber-50 border-amber-300 shadow-xs'
                    : 'bg-amber-50/40 border-dashed border-amber-200 opacity-60'
                }`}
              >
                <div
                  className={`w-14 h-14 rounded-2xl flex items-center justify-center text-3xl shrink-0 ${
                    isUnlocked ? 'bg-white shadow-xs border-2 border-amber-200' : 'bg-amber-100 text-orange-400 border border-amber-200'
                  }`}
                >
                  {isUnlocked ? charm.icon : <Lock className="w-6 h-6 text-amber-500" />}
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between">
                    <span className="font-black text-orange-950 text-sm truncate">{charm.name}</span>
                    {charm.isRare && (
                      <span className="text-[9px] font-black bg-amber-300 text-orange-950 px-1.5 py-0.5 rounded-md">
                        RARE
                      </span>
                    )}
                  </div>
                  <p className="text-orange-900/80 text-xs font-medium line-clamp-1 mt-0.5">{charm.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
};
