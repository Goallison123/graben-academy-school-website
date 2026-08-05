import React, { useState } from 'react';
import { Camera, Sparkles, ChevronRight, X } from 'lucide-react';
import { SubPageType } from '../GrabenSchoolWebsite';

interface GalleryPageProps {
  onNavigate: (page: SubPageType) => void;
  onOpenEnrollModal: () => void;
}

export const GalleryPage: React.FC<GalleryPageProps> = ({ onNavigate, onOpenEnrollModal }) => {
  const [activeCategory, setActiveCategory] = useState<'all' | 'classrooms' | 'sports' | 'arts'>('all');
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const galleryItems = [
    {
      id: 1,
      category: 'classrooms',
      title: 'Baby Class Building Block Circle',
      subtitle: 'Toddlers exploring spatial shapes and colors',
      gradient: 'from-amber-400 to-orange-500',
    },
    {
      id: 2,
      category: 'sports',
      title: 'Lawn Soccer & Sprint Fun',
      subtitle: 'Outdoor play lawn in Rubavu District',
      gradient: 'from-emerald-400 to-teal-600',
    },
    {
      id: 3,
      category: 'arts',
      title: 'Finger Painting & Atelier',
      subtitle: 'Creative expression and color mixing',
      gradient: 'from-purple-400 to-pink-600',
    },
    {
      id: 4,
      category: 'classrooms',
      title: 'Top Class Phonics Story Nook',
      subtitle: 'Early reading literacy and comprehension',
      gradient: 'from-sky-400 to-indigo-600',
    },
    {
      id: 5,
      category: 'sports',
      title: 'Mini Basketball Agility Track',
      subtitle: 'Building hand-eye coordination & confidence',
      gradient: 'from-orange-400 to-amber-600',
    },
    {
      id: 6,
      category: 'arts',
      title: 'Puppet Storytelling & Music Choir',
      subtitle: 'Rhythm instruments and dramatic play',
      gradient: 'from-rose-400 to-red-600',
    },
  ];

  const filtered = activeCategory === 'all' ? galleryItems : galleryItems.filter((i) => i.category === activeCategory);

  return (
    <div className="w-full bg-slate-50 min-h-screen text-slate-900 pb-16">
      
      {/* 1. HEADER BANNER */}
      <section className="bg-[#0B1528] text-white py-14 px-4 sm:px-6 lg:px-8 border-b-4 border-amber-500 text-left">
        <div className="max-w-7xl mx-auto space-y-3">
          <div className="text-xs font-black text-amber-400 tracking-widest uppercase flex items-center gap-2">
            <span>SCHOOL PORTAL</span>
            <span>/</span>
            <span className="text-amber-200">NURSERY PICTURE GALLERY</span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-black text-white tracking-tight">
            Nursery Picture Gallery
          </h1>

          <p className="text-slate-300 text-base sm:text-lg max-w-3xl font-medium leading-relaxed">
            Enjoy vibrant, joyful photos of toddlers playing, painting, singing, reading, and exploring on campus.
          </p>
        </div>
      </section>

      {/* 2. GALLERY GRID */}
      <section className="py-14 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8 text-left">
        
        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-2">
          {(['all', 'classrooms', 'sports', 'arts'] as const).map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2.5 rounded-2xl font-black text-xs capitalize transition-all ${
                activeCategory === cat
                  ? 'bg-orange-600 text-white shadow-md'
                  : 'bg-white text-slate-600 border border-slate-300 hover:bg-slate-100'
              }`}
            >
              {cat === 'all' ? 'All Gallery Photos' : cat}
            </button>
          ))}
        </div>

        {/* Photos Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((item) => (
            <div
              key={item.id}
              onClick={() => setPreviewImage(item.title)}
              className="group relative rounded-3xl overflow-hidden shadow-md hover:shadow-xl transition-all cursor-pointer h-72 flex flex-col justify-end p-6 border-2 border-slate-200"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-95 group-hover:scale-105 transition-transform duration-500`}></div>
              
              <div className="relative z-10 space-y-1 text-white text-left">
                <div className="px-3 py-1 bg-black/40 backdrop-blur-md rounded-full text-[10px] font-black uppercase inline-block border border-white/20">
                  {item.category}
                </div>
                <h3 className="text-xl font-black text-white leading-tight">{item.title}</h3>
                <p className="text-amber-100 text-xs font-medium">{item.subtitle}</p>
              </div>
            </div>
          ))}
        </div>

      </section>

      {/* LIGHTBOX MODAL */}
      {previewImage && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 rounded-3xl p-6 sm:p-8 max-w-lg w-full text-white text-left space-y-4 border border-slate-700 animate-fadeIn">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-black text-white">{previewImage}</h3>
              <button onClick={() => setPreviewImage(null)} className="text-slate-400 hover:text-white font-black text-xl">
                ✕
              </button>
            </div>
            <div className="h-64 rounded-2xl bg-gradient-to-br from-orange-500 to-amber-600 flex items-center justify-center p-6 text-center text-amber-100 font-bold text-sm">
              [ High Resolution Nursery Photo Preview: {previewImage} ]
            </div>
            <div className="text-right">
              <button
                onClick={() => setPreviewImage(null)}
                className="px-5 py-2 bg-slate-800 hover:bg-slate-700 text-white font-black text-xs rounded-xl"
              >
                Close Preview
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
