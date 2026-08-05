import React, { useState, useEffect } from 'react';
import { Smartphone, Wifi, WifiOff, X, CheckCircle, Download } from 'lucide-react';

interface PWAInstallBannerProps {
  isOpen: boolean;
  onClose: () => void;
  childName: string;
}

export const PWAInstallBanner: React.FC<PWAInstallBannerProps> = ({ isOpen, onClose, childName }) => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-orange-950/70 backdrop-blur-md animate-fadeIn">
      <div className="bg-white rounded-[32px] max-w-md w-full p-6 sm:p-8 shadow-2xl border-4 border-amber-300 relative space-y-6">
        
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-orange-800/60 hover:text-orange-950 rounded-full hover:bg-amber-100 transition-colors"
          id="close-pwa-modal-btn"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3">
          <div className="w-14 h-14 rounded-2xl bg-amber-100 border-2 border-amber-300 text-orange-950 flex items-center justify-center text-3xl shrink-0">
            📱
          </div>
          <div>
            <div className="text-xs font-black text-orange-600 uppercase tracking-wider">PWA Status</div>
            <h3 className="text-xl font-black text-orange-950">
              Progressive Web App Ready
            </h3>
          </div>
        </div>

        {/* Online / Offline Status Badge */}
        <div className={`p-4 rounded-2xl flex items-center gap-3 border-2 ${
          isOnline
            ? 'bg-emerald-100 border-emerald-300 text-emerald-950'
            : 'bg-amber-100 border-amber-300 text-orange-950'
        }`}>
          {isOnline ? (
            <Wifi className="w-6 h-6 text-emerald-600 shrink-0" />
          ) : (
            <WifiOff className="w-6 h-6 text-orange-600 shrink-0" />
          )}
          <div className="min-w-0">
            <div className="font-black text-sm">
              {isOnline ? 'Online Mode Active' : 'Airplane / Offline Mode Active'}
            </div>
            <p className="text-xs font-medium text-orange-900/80">
              {isOnline
                ? 'All canvas features, sound synthesis, and local storage are synced.'
                : `Peítho is running smoothly offline! Welcome back, ${childName}!`}
            </p>
          </div>
        </div>

        {/* Feature Checkmarks */}
        <div className="space-y-2 text-xs text-orange-950 font-bold">
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Zero internet required for sound synthesis or PRNG algorithm</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Child name & Digital Fridge artwork persisted in localStorage</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Home screen installation supported (Add to Home Screen)</span>
          </div>
        </div>

        <button
          onClick={onClose}
          className="w-full py-3.5 bg-orange-500 text-white font-black text-sm rounded-2xl hover:bg-orange-600 transition-colors shadow-md shadow-orange-200"
          id="pwa-got-it-btn"
        >
          Got it!
        </button>

      </div>
    </div>
  );
};
