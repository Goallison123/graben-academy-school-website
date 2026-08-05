import React from 'react';
import { GamePackageId } from '../types';
import { Sparkles, Compass, Music, Egg, Layers } from 'lucide-react';

interface GamePackageSelectorProps {
  selectedGame: GamePackageId;
  onSelectGame: (gameId: GamePackageId) => void;
  childName: string;
}

const GAME_PACKAGES: {
  id: GamePackageId;
  title: string;
  emoji: string;
  activeBg: string;
  borderColor: string;
}[] = [
  {
    id: 'seeds',
    title: 'Connection Canvas',
    emoji: '✨',
    activeBg: 'bg-orange-500 text-white',
    borderColor: 'border-orange-400',
  },
  {
    id: 'weaver',
    title: 'World Weaver',
    emoji: '🌌',
    activeBg: 'bg-amber-500 text-white',
    borderColor: 'border-amber-400',
  },
  {
    id: 'sound',
    title: 'Sound Snatcher',
    emoji: '🎵',
    activeBg: 'bg-indigo-600 text-white',
    borderColor: 'border-indigo-400',
  },
  {
    id: 'mirror',
    title: 'Mirror World',
    emoji: '🪞',
    activeBg: 'bg-rose-500 text-white',
    borderColor: 'border-rose-400',
  },
];

export const GamePackageSelector: React.FC<GamePackageSelectorProps> = ({
  selectedGame,
  onSelectGame,
  childName,
}) => {
  return (
    <div className="bg-amber-100/90 border-b border-amber-300 px-4 py-2">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
        
        {/* Selector Title */}
        <div className="flex items-center gap-2 self-start sm:self-auto">
          <div className="w-7 h-7 rounded-lg bg-orange-500 text-white flex items-center justify-center font-black text-xs shadow-xs shrink-0">
            <Layers className="w-3.5 h-3.5" />
          </div>
          <div className="text-xs font-bold text-orange-950">
            Player: <strong className="text-orange-600">{childName}</strong>
          </div>
        </div>

        {/* Game Package Tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 w-full sm:w-auto">
          {GAME_PACKAGES.map((pkg) => {
            const isSelected = selectedGame === pkg.id;
            return (
              <button
                key={pkg.id}
                onClick={() => onSelectGame(pkg.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all border text-left flex items-center gap-2 ${
                  isSelected
                    ? `${pkg.activeBg} ${pkg.borderColor} shadow-xs font-black`
                    : 'bg-white text-slate-800 border-amber-300 hover:bg-amber-50'
                }`}
                id={`select-game-${pkg.id}`}
              >
                <span className="text-base shrink-0">{pkg.emoji}</span>
                <span className="truncate">{pkg.title}</span>
              </button>
            );
          })}
        </div>

      </div>
    </div>
  );
};
