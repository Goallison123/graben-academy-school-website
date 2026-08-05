import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Sparkles, ArrowUpRight, Play, Info } from 'lucide-react';
import { SubPageType } from './GrabenSchoolWebsite';
import {
  HeroSlideCampusSvg,
  HeroSlidePlaygroundSvg,
  HeroSlideClassroomSvg,
  HeroSlidePeithoSvg,
} from './illustrations/SchoolIllustrations';

interface HeroSliderProps {
  onNavigate: (page: SubPageType) => void;
  onOpenCanvas: () => void;
  onOpenEnrollModal: () => void;
}

export const HeroSlider: React.FC<HeroSliderProps> = ({
  onNavigate,
  onOpenCanvas,
  onOpenEnrollModal,
}) => {
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const [isPaused, setIsPaused] = useState<boolean>(false);

  const slides = [
    {
      id: 'campus',
      badge: '🏫 RUGERERO • RUBAVU DISTRICT',
      title: 'Nurturing Early Childhood Education in Rubavu',
      description: 'A safe, sunlit, and loving nursery environment where toddlers explore, build confidence, and grow through play-based discovery.',
      primaryBtnText: 'Enroll Child Now',
      primaryAction: () => onNavigate('enrollment'),
      secondaryBtnText: 'Directress Welcome',
      secondaryAction: () => onNavigate('about'),
      SvgComponent: HeroSlideCampusSvg,
      bgGradient: 'from-[#7C2D12] via-[#9A3412] to-[#6E260E]',
      accentColor: 'text-amber-300',
    },
    {
      id: 'playground',
      badge: '⚽ OUTDOOR PLAYGROUND & SPORTS',
      title: 'Active Physical Agility & Lawn Sports',
      description: 'Mini basketball hoops, soft lawn soccer, balance beam courses, and daily rhythm games designed for joyful physical development.',
      primaryBtnText: 'Explore Sports & Play',
      primaryAction: () => onNavigate('sports'),
      secondaryBtnText: 'View Campus Tour',
      secondaryAction: () => onNavigate('facilities'),
      SvgComponent: HeroSlidePlaygroundSvg,
      bgGradient: 'from-[#065F46] via-[#047857] to-[#064E3B]',
      accentColor: 'text-emerald-300',
    },
    {
      id: 'classroom',
      badge: '📚 BABY, MIDDLE & TOP STREAMS',
      title: 'Structured Early Literacy & Montessori Learning',
      description: 'Child-centered streams tailored from age 1.5 to 6 years, building early reading, vocabulary, counting, and creative art skills.',
      primaryBtnText: 'View Class Programs',
      primaryAction: () => onNavigate('programs'),
      secondaryBtnText: 'Growth Milestones',
      secondaryAction: () => onNavigate('milestones'),
      SvgComponent: HeroSlideClassroomSvg,
      bgGradient: 'from-[#1E3A8A] via-[#1D4ED8] to-[#172554]',
      accentColor: 'text-sky-300',
    },
    {
      id: 'peitho',
      badge: '🌸 INTERACTIVE PEÍTHO DISCOVERY',
      title: 'Digital Learning Game & Art Fridge',
      description: 'Engage children with our custom Peítho seed game, earning living charms while teachers send instant praise to parents!',
      primaryBtnText: 'Play Peítho Game',
      primaryAction: onOpenCanvas,
      secondaryBtnText: 'Digital Fridge Gallery',
      secondaryAction: () => onNavigate('gallery'),
      SvgComponent: HeroSlidePeithoSvg,
      bgGradient: 'from-[#581C87] via-[#6B21A8] to-[#3B0764]',
      accentColor: 'text-purple-300',
    },
  ];

  // Auto-play timer (6s)
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [isPaused, slides.length]);

  const slide = slides[currentSlide];

  return (
    <div
      className="relative w-full overflow-hidden shadow-2xl transition-all duration-700 font-sans select-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Background Gradient */}
      <div className={`w-full bg-gradient-to-br ${slide.bgGradient} transition-colors duration-700 py-10 lg:py-16 px-4 sm:px-6 lg:px-8 text-white relative`}>
        
        {/* Decorative Grid Pattern Overlay */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />

        {/* Carousel Prev/Next Buttons */}
        <button
          onClick={() => setCurrentSlide((prev) => (prev > 0 ? prev - 1 : slides.length - 1))}
          className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-black/40 hover:bg-black/70 text-white flex items-center justify-center backdrop-blur-md transition-all z-30 border border-white/20 active:scale-95 shadow-lg"
          aria-label="Previous Slide"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        <button
          onClick={() => setCurrentSlide((prev) => (prev + 1) % slides.length)}
          className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-black/40 hover:bg-black/70 text-white flex items-center justify-center backdrop-blur-md transition-all z-30 border border-white/20 active:scale-95 shadow-lg"
          aria-label="Next Slide"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* Slide Main Content Grid */}
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center relative z-10">
          
          {/* Left Text Content */}
          <div className="lg:col-span-6 space-y-5 text-left animate-fadeIn">
            
            {/* Top Badge */}
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/15 backdrop-blur-md text-white border border-white/20 text-xs font-black uppercase tracking-wider shadow-sm">
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>{slide.badge}</span>
            </div>

            {/* Title */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-[1.1]">
              {slide.title}
            </h1>

            {/* Description */}
            <p className="text-amber-50/90 text-sm sm:text-base font-medium leading-relaxed max-w-xl">
              {slide.description}
            </p>

            {/* Action CTAs */}
            <div className="flex flex-wrap items-center gap-3 pt-3">
              <button
                onClick={slide.primaryAction}
                className="px-6 py-3.5 bg-amber-400 hover:bg-amber-300 text-orange-950 font-black text-xs sm:text-sm rounded-2xl shadow-xl flex items-center gap-2 transition-all active:scale-95 border border-amber-300"
              >
                <span>{slide.primaryBtnText}</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>

              <button
                onClick={slide.secondaryAction}
                className="px-5 py-3.5 bg-white/10 hover:bg-white/20 text-white border border-white/30 font-bold text-xs sm:text-sm rounded-2xl backdrop-blur-md transition-all flex items-center gap-1.5 active:scale-95"
              >
                <Info className="w-4 h-4 text-amber-200" />
                <span>{slide.secondaryBtnText}</span>
              </button>
            </div>

            {/* Footer Trust Badges */}
            <div className="grid grid-cols-3 gap-3 pt-6 border-t border-white/15 text-xs font-medium">
              <div>
                <div className="font-black text-white text-sm">Rubavu District</div>
                <div className="text-white/70 text-[11px]">Western Province</div>
              </div>
              <div className="border-l border-white/20 pl-3">
                <div className={`font-black text-sm ${slide.accentColor}`}>100% Certified</div>
                <div className="text-white/70 text-[11px]">Trained Staff</div>
              </div>
              <div className="border-l border-white/20 pl-3">
                <div className="font-black text-emerald-300 text-sm">Safe Campus</div>
                <div className="text-white/70 text-[11px]">Play-Based Care</div>
              </div>
            </div>

          </div>

          {/* Right SVG Graphic Slide Illustration */}
          <div className="lg:col-span-6 flex items-center justify-center">
            <div className="w-full max-w-lg aspect-[16/10] bg-white/10 backdrop-blur-md rounded-3xl p-3 border-2 border-white/20 shadow-2xl overflow-hidden group hover:scale-[1.01] transition-transform">
              <div className="w-full h-full rounded-2xl overflow-hidden bg-slate-900 shadow-inner">
                <slide.SvgComponent className="w-full h-full object-cover" />
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Slide Indicators & Counter */}
        <div className="max-w-7xl mx-auto flex items-center justify-center gap-2 pt-8 relative z-20">
          {slides.map((s, idx) => (
            <button
              key={s.id}
              onClick={() => setCurrentSlide(idx)}
              className={`h-2.5 rounded-full transition-all duration-300 ${
                currentSlide === idx
                  ? 'w-10 bg-amber-400 shadow-md'
                  : 'w-2.5 bg-white/30 hover:bg-white/60'
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>

      </div>
    </div>
  );
};
