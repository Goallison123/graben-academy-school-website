import React, { useState } from 'react';
import { Heart, Music, Sparkles, MessageCircle, Download, Share2, Calendar, Award, Trash2 } from 'lucide-react';
import { ArtworkEntry, SchoolConfig } from '../types';
import { soundEngine } from '../utils/sound';

interface DigitalFridgeProps {
  artworks: ArtworkEntry[];
  childName: string;
  schoolConfig: SchoolConfig;
  onToggleLike: (id: string) => void;
  onDeleteArtwork?: (id: string) => void;
}

export const DigitalFridge: React.FC<DigitalFridgeProps> = ({
  artworks,
  childName,
  schoolConfig,
  onToggleLike,
  onDeleteArtwork,
}) => {
  const [playingId, setPlayingId] = useState<string | null>(null);
  const [selectedArtwork, setSelectedArtwork] = useState<ArtworkEntry | null>(null);

  const handlePlayAudio = (art: ArtworkEntry) => {
    setPlayingId(art.id);
    soundEngine.playVictoryMelody(art.melodyNotes || [261.63, 329.63, 392.0, 523.25], () => {
      setPlayingId(null);
    });
  };

  const handleDownload = (art: ArtworkEntry) => {
    const link = document.createElement('a');
    link.download = `${childName}-peitho-creation-${art.id.slice(-4)}.png`;
    link.href = art.dataUrl;
    link.click();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fadeIn">
      
      {/* Fridge Banner Header */}
      <div className="bg-gradient-to-r from-orange-500 via-amber-500 to-rose-500 rounded-[32px] p-6 sm:p-10 text-white shadow-xl border-4 border-amber-300 relative overflow-hidden">
        <div className="absolute top-0 right-0 -mt-8 -mr-8 w-64 h-64 bg-white/10 rounded-full blur-2xl pointer-events-none"></div>

        <div className="relative z-10 max-w-2xl space-y-3">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/25 backdrop-blur-md rounded-full text-xs font-black text-amber-100 border border-white/20">
            <Heart className="w-4 h-4 text-rose-200 fill-rose-200" />
            <span>The Bridge of Pride • Digital Gallery</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-black tracking-tight">
            See what <span className="text-amber-200 underline decoration-white/40">{childName}</span> created today! 🧊
          </h1>

          <p className="text-amber-50 text-sm sm:text-base leading-relaxed font-medium">
            Welcome to {schoolConfig.schoolName}'s Digital Fridge! Every artwork here is an original generative creation with its own pentatonic melody.
          </p>
        </div>
      </div>

      {/* Empty State */}
      {artworks.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 text-center border-4 border-dashed border-amber-300 max-w-lg mx-auto space-y-4 shadow-sm">
          <div className="w-20 h-20 mx-auto rounded-3xl bg-amber-100 border-2 border-amber-300 flex items-center justify-center text-4xl shadow-inner">
            🧊
          </div>
          <h3 className="text-xl font-black text-orange-950">Your Digital Fridge is Empty</h3>
          <p className="text-orange-900/80 text-sm font-medium">
            Play the Peítho Connection Canvas with {childName} to save generative masterpieces here!
          </p>
        </div>
      ) : (
        /* Artwork Cards Grid */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {artworks.map((art) => (
            <div
              key={art.id}
              className="bg-white rounded-3xl overflow-hidden border-4 border-amber-200/90 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col group relative"
            >
              {/* Fridge Magnet Aesthetic Tape Top */}
              <div className="absolute -top-1 inset-x-1/3 h-3 bg-amber-300/80 rounded-b-md z-20 border-b border-amber-400/50 pointer-events-none"></div>

              {/* Canvas Image Snapshot Header */}
              <div className="relative h-64 bg-amber-50 overflow-hidden border-b-2 border-amber-200">
                <img
                  src={art.dataUrl}
                  alt={art.creatureName}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />

                {/* Like Button Badge */}
                <button
                  onClick={() => onToggleLike(art.id)}
                  className={`absolute top-3 right-3 p-2.5 rounded-full shadow-md backdrop-blur-md transition-transform active:scale-90 ${
                    art.parentLiked
                      ? 'bg-rose-500 text-white'
                      : 'bg-white/90 text-orange-900 hover:text-rose-500 hover:bg-white'
                  }`}
                  title={art.parentLiked ? 'Loved by Parent' : 'Save to Parent Favorites'}
                  id={`like-art-${art.id}`}
                >
                  <Heart className={`w-4 h-4 ${art.parentLiked ? 'fill-white' : ''}`} />
                </button>

                {/* Charm Earned Badge */}
                <div className="absolute bottom-3 left-3 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-2xl shadow-md flex items-center gap-2 border-2 border-amber-200">
                  <span className="text-xl">{art.charmEarned?.icon || '✨'}</span>
                  <div className="text-left">
                    <div className="text-[10px] font-black text-orange-500 uppercase tracking-wider">Charm</div>
                    <div className="text-xs font-black text-orange-950 truncate max-w-[100px]">
                      {art.charmEarned?.name || 'Living Charm'}
                    </div>
                  </div>
                </div>

                {/* Play Pentatonic Melody Button */}
                <button
                  onClick={() => handlePlayAudio(art)}
                  className={`absolute bottom-3 right-3 px-3.5 py-1.5 rounded-2xl shadow-md text-xs font-black flex items-center gap-1.5 transition-all ${
                    playingId === art.id
                      ? 'bg-amber-400 text-orange-950 animate-pulse'
                      : 'bg-orange-500 text-white hover:bg-orange-600'
                  }`}
                  id={`play-audio-${art.id}`}
                >
                  <Music className="w-3.5 h-3.5" />
                  <span>{playingId === art.id ? 'Playing...' : 'Play Tune'}</span>
                </button>
              </div>

              {/* Card Details Body */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4 bg-white">
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs text-orange-800/70 font-bold">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      {new Date(art.timestamp).toLocaleDateString(undefined, {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </span>
                    <span className="font-mono bg-amber-100 px-2 py-0.5 rounded-md text-orange-900 border border-amber-200">
                      #{art.seedHex?.slice(0, 5) || 'SEED'}
                    </span>
                  </div>

                  <h3 className="font-black text-orange-950 text-lg leading-snug flex items-center justify-between">
                    <span>{art.creatureName} Creation</span>
                    {art.patternDiscovered && (
                      <span className="px-2.5 py-0.5 bg-amber-100 text-orange-950 font-black text-[10px] rounded-full border border-amber-300">
                        ✨ {art.patternDiscovered}
                      </span>
                    )}
                  </h3>

                  <p className="text-orange-900/80 text-xs font-medium">
                    {childName} connected {art.seedsConnected} seeds on the Discovery Canvas.
                  </p>

                  {/* Genius Insight for Parents */}
                  {art.geniusInsight && (
                    <div className="bg-gradient-to-br from-amber-50 to-orange-50 border-2 border-amber-300 rounded-2xl p-3 space-y-1 text-xs text-orange-950 shadow-xs">
                      <div className="flex items-center gap-1.5 font-black text-orange-900 text-[11px] uppercase tracking-wider">
                        <Sparkles className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                        <span>Genius Insight for Parents</span>
                      </div>
                      <p className="text-orange-950/90 leading-relaxed font-semibold italic text-[11px]">
                        "{art.geniusInsight}"
                      </p>
                      <div className="pt-1 flex items-center justify-between text-[10px] font-bold text-orange-800/60 border-t border-amber-200/60">
                        <span>🏫 {schoolConfig.schoolName}</span>
                        <span>Rugerero, Rubavu</span>
                      </div>
                    </div>
                  )}

                  {/* Teacher Praise Box if present */}
                  {art.teacherPraise && (
                    <div className="bg-amber-100 border-2 border-amber-300 rounded-2xl p-3 flex items-start gap-2 text-xs text-orange-950 mt-2 shadow-xs">
                      <Award className="w-4 h-4 text-orange-600 shrink-0 mt-0.5" />
                      <div>
                        <span className="font-black block text-orange-900">Teacher Praise:</span>
                        <span className="font-medium">"{art.teacherPraise}"</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Card Bottom Actions */}
                <div className="pt-2 border-t border-amber-100 flex items-center justify-between gap-2">
                  <button
                    onClick={() => handleDownload(art)}
                    className="flex-1 py-2 px-3 bg-amber-100 hover:bg-amber-200 text-orange-950 font-black text-xs rounded-xl transition-colors border-2 border-amber-300 flex items-center justify-center gap-1.5 shadow-xs"
                    id={`download-art-${art.id}`}
                  >
                    <Download className="w-3.5 h-3.5 text-orange-700" />
                    <span>Download PNG</span>
                  </button>

                  {onDeleteArtwork && (
                    <button
                      onClick={() => onDeleteArtwork(art.id)}
                      className="p-2 text-amber-700 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-colors border border-transparent hover:border-rose-200"
                      title="Remove artwork"
                      id={`delete-art-${art.id}`}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>

              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
};
