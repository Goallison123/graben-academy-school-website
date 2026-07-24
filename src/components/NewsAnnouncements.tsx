import React, { useState, useEffect } from "react";
import { SchoolConfig, NewsItem } from "../types";
import LucideIcon from "./LucideIcon";

interface NewsAnnouncementsProps {
  config: SchoolConfig;
}

export default function NewsAnnouncements({ config }: NewsAnnouncementsProps) {
  const [selectedArticle, setSelectedArticle] = useState<NewsItem | null>(null);

  // Close modal on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSelectedArticle(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleNextArticle = () => {
    if (!selectedArticle) return;
    const currentIndex = config.news.findIndex((item) => item.id === selectedArticle.id);
    const nextIndex = (currentIndex + 1) % config.news.length;
    setSelectedArticle(config.news[nextIndex]);
  };

  const handlePrevArticle = () => {
    if (!selectedArticle) return;
    const currentIndex = config.news.findIndex((item) => item.id === selectedArticle.id);
    const prevIndex = (currentIndex - 1 + config.news.length) % config.news.length;
    setSelectedArticle(config.news[prevIndex]);
  };

  return (
    <section id="news" className="py-16 sm:py-24 bg-gray-50/50" h-id="news-section">
      <div className="max-w-[1400px] mx-auto px-2 sm:px-4 lg:px-5">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12 sm:mb-16">
          <div className="space-y-4 max-w-2xl">
            <span 
              className="text-xs font-extrabold tracking-widest uppercase inline-block"
              style={{ color: config.secondaryColor }}
            >
              OFFICIAL BULLETINS & ANNOUNCEMENTS
            </span>
            <h2 className="font-sans font-extrabold text-3xl sm:text-4xl text-gray-900 tracking-tight">
              School News & Press Releases
            </h2>
            <div className="h-1 w-16 rounded-full" style={{ backgroundColor: config.primaryColor }} />
          </div>
          
          <button 
            onClick={() => setSelectedArticle(config.news[0])}
            className="mt-4 md:mt-0 inline-flex items-center text-xs font-bold px-4 py-2.5 rounded-xl border border-gray-200 bg-white text-gray-700 hover:bg-gray-50 shadow-sm transition-all shrink-0 cursor-pointer"
          >
            <span>Read Latest Official Bulletin</span>
            <LucideIcon name="ArrowRight" size={13} className="ml-1.5" />
          </button>
        </div>

        {/* News Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {config.news.map((item) => (
            <article 
              key={item.id}
              onClick={() => setSelectedArticle(item)}
              className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group cursor-pointer"
            >
              <div>
                {/* News Metadata (Category + Date) */}
                <div className="flex items-center justify-between text-[11px] text-gray-400 font-semibold uppercase mb-4">
                  <span 
                    style={{ color: config.primaryColor }}
                    className="font-bold tracking-wider px-2.5 py-0.5 rounded-full bg-slate-50 border border-slate-100"
                  >
                    {item.category}
                  </span>
                  <div className="flex items-center space-x-1 font-light">
                    <LucideIcon name="Clock" size={11} className="text-gray-300" />
                    <span>{item.date}</span>
                  </div>
                </div>

                {/* News Title */}
                <h3 className="font-bold text-gray-950 text-base sm:text-lg mb-3 tracking-tight group-hover:text-slate-800 leading-snug">
                  <span className="bg-left-bottom bg-gradient-to-r from-gray-900 to-gray-900 bg-[length:0%_2px] bg-no-repeat group-hover:bg-[length:100%_2px] transition-all duration-300 pb-1">
                    {item.title}
                  </span>
                </h3>

                {/* Summary */}
                <p className="text-gray-500 text-xs sm:text-sm leading-relaxed mb-6 font-light line-clamp-3">
                  {item.summary}
                </p>
              </div>

              {/* Bottom detail action link */}
              <div 
                className="pt-4 border-t border-gray-100 flex items-center justify-between text-xs font-bold"
                style={{ color: config.primaryColor }}
              >
                <span>Read Full Article</span>
                <LucideIcon name="ArrowRight" size={13} className="transform group-hover:translate-x-1.5 transition-transform" />
              </div>
            </article>
          ))}
        </div>

      </div>

      {/* Almost Full-Screen Article Modal Reader */}
      {selectedArticle && (
        <div 
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-fade-in"
          onClick={() => setSelectedArticle(null)}
        >
          <div 
            className="bg-white rounded-3xl max-w-4xl w-full max-h-[92vh] overflow-y-auto my-auto shadow-2xl relative border border-gray-100 flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            
            {/* Top Navigation Control Bar */}
            <div className="sticky top-0 z-20 bg-slate-900 text-white px-6 py-4 flex items-center justify-between border-b border-white/10 shrink-0">
              <div className="flex items-center space-x-3">
                <span 
                  className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-widest text-slate-900"
                  style={{ backgroundColor: config.secondaryColor }}
                >
                  {selectedArticle.category}
                </span>
                <span className="text-xs text-slate-300 font-medium hidden sm:inline">
                  {selectedArticle.readTime || "4 min read"}
                </span>
              </div>

              <div className="flex items-center space-x-2">
                <button
                  onClick={handlePrevArticle}
                  className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-all cursor-pointer flex items-center space-x-1 text-xs font-semibold"
                  title="Previous Bulletin"
                >
                  <LucideIcon name="ChevronLeft" size={16} />
                  <span className="hidden sm:inline">Prev</span>
                </button>

                <button
                  onClick={handleNextArticle}
                  className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-all cursor-pointer flex items-center space-x-1 text-xs font-semibold"
                  title="Next Bulletin"
                >
                  <span className="hidden sm:inline">Next</span>
                  <LucideIcon name="ChevronRight" size={16} />
                </button>

                <div className="h-4 w-px bg-white/20 mx-1" />

                <button
                  onClick={() => setSelectedArticle(null)}
                  className="p-2 rounded-xl bg-white/10 hover:bg-red-500/80 text-white transition-colors cursor-pointer"
                  aria-label="Close Article"
                >
                  <LucideIcon name="X" size={18} />
                </button>
              </div>
            </div>

            {/* Article Content Area */}
            <div className="p-6 sm:p-10 md:p-12 space-y-8">
              
              {/* Header Title & Author */}
              <div className="space-y-4">
                <div className="flex items-center space-x-3 text-xs text-gray-500 font-medium">
                  <div className="flex items-center space-x-1">
                    <LucideIcon name="Calendar" size={14} className="text-gray-400" />
                    <span>{selectedArticle.date}</span>
                  </div>
                  <span>•</span>
                  <div className="flex items-center space-x-1">
                    <LucideIcon name="User" size={14} className="text-gray-400" />
                    <span>{selectedArticle.author || "School Press Bureau"}</span>
                  </div>
                </div>

                <h1 className="font-sans font-extrabold text-2xl sm:text-3xl md:text-4xl text-slate-900 tracking-tight leading-snug">
                  {selectedArticle.title}
                </h1>

                <div className="h-1 w-20 rounded-full" style={{ backgroundColor: config.primaryColor }} />
              </div>

              {/* Optional Hero Banner Image */}
              {selectedArticle.image && (
                <div className="rounded-2xl overflow-hidden h-64 sm:h-80 relative border border-gray-100 bg-slate-900 shadow-sm">
                  <img 
                    src={selectedArticle.image} 
                    alt={selectedArticle.title} 
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 text-white text-xs font-medium">
                    Graben Highlight Academy • Official Nursery Bulletin
                  </div>
                </div>
              )}

              {/* Lead Summary Callout */}
              <div className="p-5 rounded-2xl bg-orange-50/80 border-l-4 border-[#ea580c] text-slate-800 text-sm sm:text-base leading-relaxed font-medium">
                {selectedArticle.summary}
              </div>

              {/* Multi-Paragraph Article Body */}
              <div className="space-y-5 text-gray-700 text-sm sm:text-base leading-relaxed font-light">
                {selectedArticle.content && selectedArticle.content.length > 0 ? (
                  selectedArticle.content.map((paragraph, index) => (
                    <p key={index} className="first-letter:text-xl first-letter:font-bold">
                      {paragraph}
                    </p>
                  ))
                ) : (
                  <>
                    <p>
                      Graben Highlight Academy, located in Rubavu District, Western Province, continues its commitment to nurturing early childhood development and play-based learning.
                    </p>
                    <p>
                      Our dedicated early childhood caregivers and administration remain committed to equipping toddlers and nursery pupils with social confidence, creativity, phonics, and healthy habits.
                    </p>
                  </>
                )}
              </div>

              {/* Verified Institutional Footer inside Modal */}
              <div className="pt-8 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500">
                <div className="flex items-center space-x-2">
                  <LucideIcon name="ShieldCheck" size={16} className="text-emerald-600" />
                  <span className="font-semibold text-gray-700">Official Release from Graben Highlight Academy Registry</span>
                </div>

                <div className="flex items-center space-x-3">
                  <button
                    onClick={handleNextArticle}
                    className="px-4 py-2 rounded-xl text-white font-bold text-xs flex items-center space-x-1.5 transition-all shadow-sm hover:shadow"
                    style={{ backgroundColor: config.primaryColor }}
                  >
                    <span>Read Next Bulletin</span>
                    <LucideIcon name="ArrowRight" size={13} />
                  </button>
                </div>
              </div>

            </div>

          </div>
        </div>
      )}

    </section>
  );
}

