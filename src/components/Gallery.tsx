import React, { useState, useEffect, useCallback } from "react";
import { SchoolConfig } from "../types";
import LucideIcon from "./LucideIcon";

interface GalleryProps {
  config: SchoolConfig;
}

export default function Gallery({ config }: GalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const galleryItems = config.galleryItems || [];
  const totalItems = galleryItems.length;

  const handlePrev = useCallback(() => {
    if (selectedIndex === null || totalItems === 0) return;
    setSelectedIndex((prev) => (prev === null ? 0 : (prev - 1 + totalItems) % totalItems));
  }, [selectedIndex, totalItems]);

  const handleNext = useCallback(() => {
    if (selectedIndex === null || totalItems === 0) return;
    setSelectedIndex((prev) => (prev === null ? 0 : (prev + 1) % totalItems));
  }, [selectedIndex, totalItems]);

  // Keyboard navigation support
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedIndex === null) return;
      if (e.key === "ArrowLeft") {
        handlePrev();
      } else if (e.key === "ArrowRight") {
        handleNext();
      } else if (e.key === "Escape") {
        setSelectedIndex(null);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedIndex, handlePrev, handleNext]);

  const activeItem = selectedIndex !== null ? galleryItems[selectedIndex] : null;

  return (
    <section id="gallery" className="py-16 sm:py-24 bg-white min-h-[80vh] flex flex-col justify-center items-center" h-id="gallery-section">
      <div className="max-w-[1400px] w-full mx-auto px-2 sm:px-4 lg:px-5">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 space-y-4">
          <span 
            className="text-xs font-extrabold tracking-widest uppercase inline-block"
            style={{ color: config.secondaryColor }}
          >
            A GLIMPSE OF CAMPUS MOMENTS
          </span>
          <h2 className="font-sans font-extrabold text-3xl sm:text-4xl text-gray-900 tracking-tight">
            Our Interactive Campus Gallery
          </h2>
          <div className="h-1 w-16 bg-gray-200 mx-auto rounded-full" />
          <p className="text-gray-500 text-sm sm:text-base leading-relaxed font-light">
            Explore authentic photographs of our facilities, assembly gatherings, football pitches, and daily student life in Gisenyi. Click any photo to open the lightbox gallery viewer.
          </p>
        </div>

        {/* Gallery Grid Centered */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-center">
          {galleryItems.map((item, idx) => (
            <div
              key={idx}
              onClick={() => setSelectedIndex(idx)}
              className="group relative rounded-2xl overflow-hidden shadow-sm hover:shadow-xl border border-gray-100 bg-gray-50 cursor-pointer transition-all duration-300 flex flex-col"
            >
              {/* Image box */}
              <div className="h-64 overflow-hidden relative bg-slate-900">
                <img
                  src={item.src}
                  alt={item.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  onError={(e) => {
                    (e.target as HTMLElement).style.display = "none";
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-between p-6">
                  <div className="text-white flex items-center space-x-2">
                    <LucideIcon name="Eye" size={16} />
                    <span className="text-xs font-semibold">Open Gallery Viewer</span>
                  </div>
                  <span className="text-[10px] font-bold text-slate-300 bg-white/20 px-2.5 py-1 rounded-full backdrop-blur-md">
                    {idx + 1} / {totalItems}
                  </span>
                </div>
              </div>

              {/* Caption details box */}
              <div className="p-5 bg-white flex-1 flex flex-col justify-between">
                <div>
                  <span 
                    className="text-[10px] font-extrabold uppercase tracking-widest"
                    style={{ color: config.primaryColor }}
                  >
                    {item.category}
                  </span>
                  <h3 className="font-bold text-gray-950 text-sm sm:text-base mt-1 tracking-tight">
                    {item.title}
                  </h3>
                  <p className="text-gray-500 text-xs mt-2 line-clamp-2 leading-relaxed font-light">
                    {item.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Lightfoot Lightbox Modal - Perfectly centered in viewport */}
      {activeItem && selectedIndex !== null && (
        <div 
          className="fixed inset-0 z-50 bg-black/92 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-fade-in"
          onClick={() => setSelectedIndex(null)}
        >
          {/* Main Modal Card */}
          <div 
            className="bg-white rounded-3xl overflow-hidden max-w-5xl w-full shadow-2xl relative border border-white/20 flex flex-col max-h-[92vh] my-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header controls bar */}
            <div className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between border-b border-white/10 shrink-0">
              <div className="flex items-center space-x-3">
                <span 
                  className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-widest text-slate-900"
                  style={{ backgroundColor: config.secondaryColor }}
                >
                  {activeItem.category}
                </span>
                <span className="text-xs text-slate-300 font-medium hidden sm:inline">
                  Photo {selectedIndex + 1} of {totalItems}
                </span>
              </div>

              <div className="flex items-center space-x-2">
                {/* Prev/Next buttons in top bar */}
                <button
                  onClick={handlePrev}
                  className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-all cursor-pointer flex items-center space-x-1 text-xs font-semibold"
                  title="Previous Image (Left Arrow)"
                  aria-label="Previous image"
                >
                  <LucideIcon name="ChevronLeft" size={16} />
                  <span className="hidden sm:inline">Prev</span>
                </button>

                <button
                  onClick={handleNext}
                  className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-all cursor-pointer flex items-center space-x-1 text-xs font-semibold"
                  title="Next Image (Right Arrow)"
                  aria-label="Next image"
                >
                  <span className="hidden sm:inline">Next</span>
                  <LucideIcon name="ChevronRight" size={16} />
                </button>

                <div className="h-4 w-px bg-white/20 my-auto mx-1" />

                {/* Close button */}
                <button
                  onClick={() => setSelectedIndex(null)}
                  className="p-2 rounded-xl bg-white/10 hover:bg-red-500/80 text-white transition-colors cursor-pointer"
                  aria-label="Close Lightbox"
                >
                  <LucideIcon name="X" size={18} />
                </button>
              </div>
            </div>

            {/* Content Layout */}
            <div className="grid grid-cols-1 md:grid-cols-12 flex-1 overflow-y-auto">
              
              {/* Image Column with Overlay Navigation Arrows */}
              <div className="md:col-span-8 bg-slate-950 min-h-[300px] sm:min-h-[420px] md:min-h-[500px] relative flex items-center justify-center p-2 group">
                <img
                  src={activeItem.src}
                  alt={activeItem.title}
                  referrerPolicy="no-referrer"
                  className="max-h-[65vh] w-full object-contain transition-all duration-300"
                />

                {/* Left Floating Arrow Button */}
                <button
                  onClick={handlePrev}
                  className="absolute left-3 top-1/2 -translate-y-1/2 p-3 rounded-full bg-slate-900/80 hover:bg-black text-white shadow-lg transition-all cursor-pointer hover:scale-110 border border-white/20"
                  aria-label="Previous Image"
                >
                  <LucideIcon name="ChevronLeft" size={22} />
                </button>

                {/* Right Floating Arrow Button */}
                <button
                  onClick={handleNext}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-3 rounded-full bg-slate-900/80 hover:bg-black text-white shadow-lg transition-all cursor-pointer hover:scale-110 border border-white/20"
                  aria-label="Next Image"
                >
                  <LucideIcon name="ChevronRight" size={22} />
                </button>

                {/* Floating Image Counter */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-slate-900/80 text-slate-200 text-[11px] font-bold px-3 py-1 rounded-full border border-white/10 backdrop-blur-md">
                  {selectedIndex + 1} / {totalItems}
                </div>
              </div>

              {/* Sidebar Data Column */}
              <div className="md:col-span-4 p-6 sm:p-8 flex flex-col justify-between bg-white space-y-6">
                <div className="space-y-4">
                  <div className="text-[10px] font-bold tracking-widest text-slate-400 uppercase">
                    CAMPUS MOMENT DETAILS
                  </div>

                  <h3 className="font-sans font-extrabold text-xl text-gray-900 tracking-tight leading-snug">
                    {activeItem.title}
                  </h3>

                  <div className="h-1 w-12 rounded-full" style={{ backgroundColor: config.secondaryColor }} />
                  
                  <p className="text-gray-600 text-xs sm:text-sm leading-relaxed font-light">
                    {activeItem.description}
                  </p>
                </div>

                {/* Footer Navigation CTA inside Sidebar */}
                <div className="space-y-3 pt-6 border-t border-gray-100">
                  <div className="flex items-center justify-between gap-2">
                    <button
                      onClick={handlePrev}
                      className="flex-1 py-3 px-4 rounded-xl border border-gray-200 hover:bg-gray-50 text-gray-800 font-bold text-xs flex items-center justify-center space-x-2 transition-all cursor-pointer"
                    >
                      <LucideIcon name="ChevronLeft" size={16} />
                      <span>Previous</span>
                    </button>

                    <button
                      onClick={handleNext}
                      className="flex-1 py-3 px-4 rounded-xl text-white font-bold text-xs flex items-center justify-center space-x-2 transition-all cursor-pointer shadow-sm hover:shadow"
                      style={{ backgroundColor: config.primaryColor }}
                    >
                      <span>Next Photo</span>
                      <LucideIcon name="ChevronRight" size={16} />
                    </button>
                  </div>

                  <div className="text-center">
                    <span className="text-[10px] text-gray-400">
                      Use left & right keyboard arrows to cycle through all photos
                    </span>
                  </div>
                </div>

              </div>

            </div>
          </div>
        </div>
      )}
    </section>
  );
}

