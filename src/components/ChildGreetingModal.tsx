import React, { useState, useEffect } from 'react';
import { Sparkles, Heart, Check, X } from 'lucide-react';
import { SchoolConfig } from '../types';

interface ChildGreetingModalProps {
  isOpen: boolean;
  onClose: () => void;
  schoolConfig: SchoolConfig;
  currentName: string;
  onSaveName: (name: string) => void;
}

export const ChildGreetingModal: React.FC<ChildGreetingModalProps> = ({
  isOpen,
  onClose,
  schoolConfig,
  currentName,
  onSaveName,
}) => {
  const [step, setStep] = useState<'prompt' | 'input'>('prompt');
  const [nameInput, setNameInput] = useState(currentName === 'Little Explorer' ? '' : currentName);

  useEffect(() => {
    if (isOpen) {
      setStep('prompt');
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handlePromptYes = () => {
    setStep('input');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (nameInput.trim()) {
      onSaveName(nameInput.trim());
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-orange-950/70 backdrop-blur-md animate-fadeIn">
      <div className="bg-white rounded-[32px] p-6 sm:p-8 max-w-md w-full shadow-2xl border-4 border-amber-300 relative text-center overflow-hidden">
        
        {/* Top Decorative Sparkles */}
        <div className="absolute top-0 inset-x-0 h-3.5 bg-gradient-to-r from-amber-400 via-orange-400 to-rose-400"></div>

        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full text-orange-800/60 hover:text-orange-950 hover:bg-amber-100 transition-colors"
          id="close-greeting-modal-btn"
        >
          <X className="w-5 h-5" />
        </button>

        {step === 'prompt' ? (
          <div className="space-y-5 my-2">
            <div className="w-20 h-20 mx-auto rounded-3xl bg-amber-200 border-2 border-amber-300 flex items-center justify-center text-4xl shadow-inner animate-bounce">
              {schoolConfig.logoEmoji}
            </div>

            <div>
              <span className="inline-block px-3.5 py-1 bg-amber-100 border border-amber-300 text-orange-950 text-xs font-black rounded-full mb-2 shadow-xs">
                Welcome to School Games
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-orange-950 leading-tight">
                Play with {schoolConfig.schoolName}?
              </h2>
              <p className="text-orange-900/80 text-sm font-medium mt-2">
                Help colorful energy seeds find each other and compose magical music!
              </p>
            </div>

            <div className="flex flex-col gap-3 pt-2">
              <button
                onClick={handlePromptYes}
                className="w-full py-4 px-6 bg-orange-500 text-white font-black text-lg rounded-2xl shadow-md shadow-orange-200 hover:bg-orange-600 active:scale-98 transition-all flex items-center justify-center gap-2"
                id="greeting-yes-btn"
              >
                <Sparkles className="w-5 h-5 text-amber-200 animate-spin" />
                <span>Yes! Let's Play!</span>
              </button>

              <button
                onClick={onClose}
                className="w-full py-3 px-4 bg-amber-100 text-orange-950 font-black text-sm rounded-xl hover:bg-amber-200 border border-amber-300 transition-colors"
                id="greeting-skip-btn"
              >
                Maybe Later
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5 my-2">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-amber-100 border-2 border-amber-300 text-orange-950 flex items-center justify-center text-3xl">
              👦
            </div>

            <div>
              <h3 className="text-xl sm:text-2xl font-black text-orange-950">
                What's your name, little explorer?
              </h3>
              <p className="text-orange-900/80 text-xs font-medium mt-1">
                We'll save your creations to your Digital Fridge!
              </p>
            </div>

            <div>
              <input
                type="text"
                value={nameInput}
                onChange={(e) => setNameInput(e.target.value)}
                placeholder="e.g. Maya, Leo, Oliver..."
                autoFocus
                className="w-full px-4 py-3.5 text-center text-lg font-black text-orange-950 bg-amber-50 border-2 border-amber-300 rounded-2xl focus:border-orange-500 focus:bg-white focus:outline-hidden transition-all"
                id="child-name-input"
              />
            </div>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setStep('prompt')}
                className="w-1/3 py-3 px-4 bg-amber-100 text-orange-950 font-black rounded-xl text-sm border border-amber-300 hover:bg-amber-200"
              >
                Back
              </button>
              <button
                type="submit"
                disabled={!nameInput.trim()}
                className="w-2/3 py-3 px-4 bg-emerald-500 text-white font-black text-base rounded-xl shadow-md shadow-emerald-200 hover:bg-emerald-600 disabled:opacity-50 transition-all flex items-center justify-center gap-2"
                id="save-child-name-btn"
              >
                <Check className="w-5 h-5" />
                <span>Start Canvas</span>
              </button>
            </div>
          </form>
        )}

      </div>
    </div>
  );
};
