import React, { useState } from 'react';
import { Sparkles, Heart, Send, RotateCcw, Check, Music } from 'lucide-react';
import { LivingCharm, SchoolConfig } from '../types';
import { soundEngine } from '../utils/sound';

interface BigRevealOverlayProps {
  isOpen: boolean;
  artworkDataUrl: string;
  childName: string;
  creatureName: string;
  charmEarned: LivingCharm;
  schoolConfig: SchoolConfig;
  onSendToTeacher: () => void;
  onSaveToFridge: () => void;
  onPlayAgain: () => void;
}

export const BigRevealOverlay: React.FC<BigRevealOverlayProps> = ({
  isOpen,
  artworkDataUrl,
  childName,
  creatureName,
  charmEarned,
  schoolConfig,
  onSendToTeacher,
  onSaveToFridge,
  onPlayAgain,
}) => {
  const [teacherSent, setTeacherSent] = useState(false);
  const [fridgeSaved, setFridgeSaved] = useState(false);

  if (!isOpen) return null;

  const handleTeacherClick = () => {
    onSendToTeacher();
    setTeacherSent(true);
    soundEngine.playCharmChirp(1.5);
  };

  const handleFridgeClick = () => {
    onSaveToFridge();
    setFridgeSaved(true);
    soundEngine.playCharmChirp(1.2);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-orange-950/70 backdrop-blur-md animate-fadeIn overflow-y-auto">
      <div className="bg-white rounded-[32px] max-w-lg w-full p-6 sm:p-8 shadow-2xl border-4 border-amber-300 relative text-center space-y-6 my-auto">
        
        {/* Celebration Header */}
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-amber-100 text-orange-950 border-2 border-amber-300 rounded-full text-xs font-black tracking-wide uppercase">
            <Sparkles className="w-4 h-4 text-orange-500 animate-spin" />
            <span>The Big Reveal!</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-black text-orange-950">
            A {creatureName} Is Born!
          </h2>
          <p className="text-orange-900/80 text-sm font-medium">
            {childName}'s lines transformed into a magical living creation!
          </p>
        </div>

        {/* Artwork Snapshot Preview */}
        <div className="relative mx-auto rounded-3xl overflow-hidden border-4 border-amber-200 shadow-md bg-amber-50 max-h-56 flex items-center justify-center">
          <img
            src={artworkDataUrl}
            alt="Child Generative Artwork"
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-2 right-2 bg-orange-950/80 backdrop-blur-sm px-3 py-1 rounded-full text-[10px] text-white font-mono flex items-center gap-1 font-bold">
            <Music className="w-3 h-3 text-amber-300" />
            <span>Pentatonic Sound Composed</span>
          </div>
        </div>

        {/* Living Charm Award Box */}
        <div className="bg-amber-100/80 border-2 border-amber-300 rounded-2xl p-4 text-left flex items-center gap-4 shadow-inner">
          <div className="w-16 h-16 rounded-2xl bg-white border-2 border-amber-200 shadow-md flex items-center justify-center text-3xl shrink-0 animate-bounce">
            {charmEarned.icon}
          </div>
          <div className="min-w-0 flex-1">
            <div className="text-xs font-black text-orange-600 uppercase tracking-wider flex items-center gap-1">
              <span>Charm Awarded</span>
              {charmEarned.isRare && (
                <span className="px-2 py-0.5 bg-amber-300 text-orange-950 rounded-md text-[9px] font-black">
                  RARE
                </span>
              )}
            </div>
            <div className="font-black text-orange-950 text-base truncate">
              {charmEarned.name}
            </div>
            <div className="text-orange-900/80 text-xs font-medium mt-0.5 line-clamp-1">
              {charmEarned.description}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3 pt-1">
          
          {/* Show my Teacher Button */}
          <button
            onClick={handleTeacherClick}
            disabled={teacherSent}
            className={`w-full py-3.5 px-5 font-black text-sm rounded-2xl transition-all flex items-center justify-center gap-2 shadow-md ${
              teacherSent
                ? 'bg-emerald-100 text-emerald-900 border-2 border-emerald-300'
                : 'bg-emerald-500 text-white hover:bg-emerald-600 active:scale-98 shadow-emerald-200'
            }`}
            id="show-teacher-btn"
          >
            {teacherSent ? (
              <>
                <Check className="w-5 h-5 text-emerald-700" />
                <span>Sent to Teacher! 🍎</span>
              </>
            ) : (
              <>
                <Send className="w-5 h-5" />
                <span>Show my Teacher! 🍎</span>
              </>
            )}
          </button>

          {/* Keep on Digital Fridge Button */}
          <button
            onClick={handleFridgeClick}
            disabled={fridgeSaved}
            className={`w-full py-3.5 px-5 font-black text-sm rounded-2xl transition-all flex items-center justify-center gap-2 border-2 ${
              fridgeSaved
                ? 'bg-rose-100 text-rose-900 border-rose-300'
                : 'bg-rose-500 text-white border-rose-600 hover:bg-rose-600 shadow-md shadow-rose-200'
            }`}
            id="save-fridge-btn"
          >
            {fridgeSaved ? (
              <>
                <Check className="w-4 h-4 text-rose-600" />
                <span>Saved on Digital Fridge! 🧊</span>
              </>
            ) : (
              <>
                <Heart className="w-4 h-4 text-white fill-white" />
                <span>Save to Digital Fridge Gallery 🧊</span>
              </>
            )}
          </button>

          {/* Play New Connection Button */}
          <button
            onClick={onPlayAgain}
            className="w-full py-3.5 px-5 bg-orange-500 text-white font-black text-sm rounded-2xl hover:bg-orange-600 transition-all flex items-center justify-center gap-2 shadow-md shadow-orange-200"
            id="play-again-btn"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Play New Connection Canvas! 🌸</span>
          </button>

        </div>

      </div>
    </div>
  );
};
