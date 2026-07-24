import React, { useState, useEffect } from "react";
import { SchoolConfig } from "../types";
import LucideIcon from "./LucideIcon";
import { motion, AnimatePresence } from "motion/react";

interface HeroProps {
  config: SchoolConfig;
  onCtaClick: (sectionId: string) => void;
}

export default function Hero({ config, onCtaClick }: HeroProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [selectedPathwayTab, setSelectedPathwayTab] = useState<string>("baby");

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % config.heroSlides.length);
    }, 6500);
    return () => clearInterval(timer);
  }, [config.heroSlides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % config.heroSlides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + config.heroSlides.length) % config.heroSlides.length);
  };

  const pathwayHighlights: Record<string, { title: string; subtitle: string; icon: string; badge: string }> = {
    baby: {
      title: "Baby Class (Ages 1.5 – 3)",
      subtitle: "Sensory exploration, motor skills, nursery rhymes, and loving care.",
      icon: "Smile",
      badge: "Cozy & Safe Space"
    },
    middle: {
      title: "Middle Class (Ages 3 – 4)",
      subtitle: "Building blocks, color sorting, initial vocabulary & creative painting.",
      icon: "Sparkles",
      badge: "Interactive Learning"
    },
    top: {
      title: "Top Class (Ages 4 – 6)",
      subtitle: "Phonics literacy, counting arithmetic, and primary school readiness.",
      icon: "BookOpen",
      badge: "School Readiness"
    },
    sports: {
      title: "Outdoor Play & Mini Sports",
      subtitle: "Mini basketball hoops, lawn soccer, and physical coordination games.",
      icon: "Trophy",
      badge: "Green Turf Lawn"
    }
  };

  return (
    <section 
      id="home" 
      className="relative min-h-[580px] sm:min-h-[640px] lg:min-h-[700px] bg-gradient-to-br from-orange-600 via-emerald-700 to-amber-600 overflow-hidden text-white flex items-center"
      h-id="innovative-hero-section"
    >
      {/* Background Image & Seamless Orange-Green-Gold Gradient Canvas */}
      <div className="absolute inset-0 bg-gradient-to-r from-orange-600 via-emerald-700 to-amber-500 z-0" />

      <AnimatePresence mode="sync">
        {config.heroSlides.map((slide, index) => {
          if (index !== currentSlide) return null;
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
              className="absolute inset-0 z-0"
            >
              <img
                src={slide.image}
                alt={slide.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center opacity-40 filter brightness-105"
              />
              {/* Vibrantly blended overlays without any black/dark shadows */}
              <div className="absolute inset-0 bg-gradient-to-r from-orange-600/90 via-emerald-700/80 to-amber-600/85 mix-blend-multiply" />
              <div className="absolute inset-0 bg-gradient-to-t from-emerald-800/60 via-transparent to-orange-500/40" />
            </motion.div>
          );
        })}
      </AnimatePresence>

      {/* Decorative Vibrant Glowing Mesh Orbs */}
      <div className="absolute top-1/4 -left-20 w-80 h-80 rounded-full blur-[90px] pointer-events-none opacity-40 bg-amber-400 z-0" />
      <div className="absolute bottom-10 right-10 w-96 h-96 rounded-full blur-[110px] pointer-events-none opacity-35 bg-emerald-400 z-0" />

      {/* Main Content Container */}
      <div className="relative z-10 max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 w-full py-12 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Left Column: Dynamic Hero Messaging */}
          <div className="lg:col-span-7 space-y-6 text-left">
            
            {/* Top Category Tag Badge */}
            <AnimatePresence mode="wait">
              <motion.div
                key={`tag-${currentSlide}`}
                initial={{ opacity: 0, y: -12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 12 }}
                className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest text-slate-950 bg-amber-300 shadow-lg border border-amber-200/50 backdrop-blur-md"
              >
                <LucideIcon name="Sparkles" size={14} className="text-slate-950" />
                <span>{config.heroSlides[currentSlide]?.tag}</span>
              </motion.div>
            </AnimatePresence>

            {/* Slide Main Heading */}
            <AnimatePresence mode="wait">
              <motion.h1
                key={`title-${currentSlide}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.45, ease: "easeOut" }}
                className="font-sans font-black text-3xl sm:text-5xl lg:text-6xl tracking-tight leading-[1.12] text-white drop-shadow-md"
              >
                {config.heroSlides[currentSlide]?.title}
              </motion.h1>
            </AnimatePresence>

            {/* Slide Narrative Description */}
            <AnimatePresence mode="wait">
              <motion.p
                key={`desc-${currentSlide}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.45, delay: 0.1, ease: "easeOut" }}
                className="text-amber-100 text-sm sm:text-base md:text-lg leading-relaxed max-w-2xl font-normal drop-shadow-sm"
              >
                {config.heroSlides[currentSlide]?.description}
              </motion.p>
            </AnimatePresence>

            {/* Action Buttons Row */}
            <div className="flex flex-wrap items-center gap-3.5 pt-2">
              <button
                onClick={() => onCtaClick("academics")}
                className="px-7 py-4 rounded-2xl font-black text-xs sm:text-sm shadow-xl transition-all active:scale-95 cursor-pointer text-slate-950 bg-amber-400 hover:bg-amber-300 flex items-center space-x-2"
              >
                <span>Explore Nursery Streams</span>
                <LucideIcon name="ArrowRight" size={16} />
              </button>

              <button
                onClick={() => onCtaClick("contact")}
                className="px-7 py-4 rounded-2xl font-bold text-xs sm:text-sm bg-white/20 hover:bg-white/30 text-white border border-white/30 backdrop-blur-md transition-all active:scale-95 cursor-pointer flex items-center space-x-2"
              >
                <LucideIcon name="Heart" size={16} className="text-amber-300" />
                <span>Enrollment & Care Fees</span>
              </button>
            </div>

            {/* Quick Metrics Bar at Bottom of Left Column */}
            <div className="pt-6 grid grid-cols-3 gap-4 border-t border-white/30 text-xs">
              <div>
                <div className="font-black text-white text-base sm:text-lg truncate">{config.name}</div>
                <div className="text-amber-100 text-[11px] truncate">{config.contact.address}</div>
              </div>
              <div className="border-l border-white/30 pl-4">
                <div className="font-black text-amber-300 text-base sm:text-lg">100% Certified</div>
                <div className="text-amber-100 text-[11px]">Trained Caregivers</div>
              </div>
              <div className="border-l border-white/30 pl-4">
                <div className="font-black text-amber-200 text-base sm:text-lg">Safe & Happy</div>
                <div className="text-amber-100 text-[11px]">Play-Based Campus</div>
              </div>
            </div>

          </div>

          {/* Right Column: Prominent Nursery Feature & Interactive Streams Matrix */}
          <div className="lg:col-span-5 relative">
            <div className="bg-emerald-950/40 backdrop-blur-xl border border-white/30 rounded-3xl p-5 sm:p-6 shadow-2xl space-y-5 relative overflow-hidden">
              
              {/* BIG Nursery Feature Badge & Image Box (Full Edge Fit) */}
              <div className="relative rounded-2xl overflow-hidden border border-white/20 group">
                <img 
                  src={config.heroSlides[0]?.image || ""} 
                  alt={`${config.name} Nursery Classroom`} 
                  className="w-full h-[340px] sm:h-[420px] object-cover object-[center_20%] rounded-xl transition-transform duration-500 group-hover:scale-105 filter brightness-105 contrast-105"
                />
                
                <div className="absolute top-4 left-4 bg-amber-400 text-slate-950 text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full shadow-md flex items-center space-x-1 z-10">
                  <LucideIcon name="Smile" size={13} />
                  <span>{config.name}</span>
                </div>

                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-emerald-950/90 via-emerald-950/60 to-transparent text-left space-y-0.5 z-10">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-amber-300">
                    Early Childhood Excellence
                  </span>
                  <h4 className="text-sm sm:text-base font-black text-white leading-tight">
                    Joyful Play & Early Phonics Learning
                  </h4>
                  <p className="text-[11px] text-amber-100 font-light line-clamp-1">
                    Nurturing curiosity, creativity, and confidence in every child.
                  </p>
                </div>
              </div>

              {/* Header inside Card */}
              <div className="flex items-center justify-between border-b border-white/15 pb-3">
                <div className="flex items-center space-x-2.5">
                  <div className="w-7 h-7 rounded-lg bg-amber-400/20 border border-amber-300/40 flex items-center justify-center text-amber-300">
                    <LucideIcon name="Sparkles" size={16} />
                  </div>
                  <div>
                    <h3 className="font-black text-xs sm:text-sm text-white tracking-tight">Nursery Classes</h3>
                    <p className="text-[10px] text-amber-100/80">Select class to preview</p>
                  </div>
                </div>
                <span className="text-[10px] font-extrabold px-2.5 py-0.5 rounded-md bg-amber-400/20 text-amber-300 border border-amber-300/30">
                  Ages 1.5 – 6 Years
                </span>
              </div>

              {/* Pathway Tabs Bar */}
              <div className="grid grid-cols-4 gap-1.5 p-1 bg-white/15 rounded-xl border border-white/15">
                {[
                  { id: "baby", label: "Baby" },
                  { id: "middle", label: "Middle" },
                  { id: "top", label: "Top" },
                  { id: "sports", label: "Play" }
                ].map((tab) => {
                  const isSelected = tab.id === selectedPathwayTab;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setSelectedPathwayTab(tab.id)}
                      className={`py-1.5 text-[11px] font-black rounded-lg transition-all cursor-pointer ${
                        isSelected
                          ? "bg-amber-400 text-slate-950 shadow-md"
                          : "text-amber-100 hover:text-white hover:bg-white/10"
                      }`}
                    >
                      {tab.label}
                    </button>
                  );
                })}
              </div>

              {/* Active Pathway Details Card */}
              {pathwayHighlights[selectedPathwayTab] && (
                <div className="bg-white/10 border border-white/15 p-4 rounded-2xl space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2 font-bold text-xs text-amber-300">
                      <LucideIcon name={pathwayHighlights[selectedPathwayTab].icon} size={16} />
                      <span>{pathwayHighlights[selectedPathwayTab].title}</span>
                    </div>
                    <span className="text-[10px] text-amber-100/80 font-medium">
                      {pathwayHighlights[selectedPathwayTab].badge}
                    </span>
                  </div>
                  <p className="text-xs text-amber-100 font-light leading-relaxed">
                    {pathwayHighlights[selectedPathwayTab].subtitle}
                  </p>
                  <div className="pt-2 flex items-center justify-between text-[11px] font-semibold">
                    <span className="flex items-center space-x-1 text-emerald-300">
                      <LucideIcon name="CheckCircle2" size={13} />
                      <span>Full Lab & Class Facility</span>
                    </span>
                    <button
                      onClick={() => onCtaClick("academics")}
                      className="hover:underline flex items-center space-x-1 cursor-pointer font-bold text-amber-300"
                    >
                      <span>Syllabus Details</span>
                      <LucideIcon name="ChevronRight" size={12} />
                    </button>
                  </div>
                </div>
              )}

              {/* Slide Switcher Preview Row */}
              <div className="pt-2 border-t border-white/15 space-y-2">
                <div className="flex items-center justify-between text-[11px] text-amber-100/80">
                  <span className="font-semibold uppercase tracking-wider text-[10px] text-amber-300">
                    Campus Highlights
                  </span>
                  <span>{currentSlide + 1} / {config.heroSlides.length}</span>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {config.heroSlides.map((slide, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentSlide(idx)}
                      className={`relative h-14 rounded-xl overflow-hidden border transition-all cursor-pointer group ${
                        idx === currentSlide
                          ? "border-amber-400 ring-2 ring-amber-300/50 opacity-100"
                          : "border-white/20 opacity-70 hover:opacity-100"
                      }`}
                    >
                      <img
                        src={slide.image}
                        alt={slide.tag}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-emerald-950/20 group-hover:bg-transparent transition-all" />
                      <div className="absolute bottom-1 left-1.5 right-1.5 text-[9px] font-extrabold text-white truncate drop-shadow">
                        {slide.tag}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>

      {/* Slide Navigation Controls */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-emerald-900/40 hover:bg-emerald-900/70 text-white transition-all border border-white/20 cursor-pointer hidden sm:block z-20 backdrop-blur-md"
        aria-label="Previous Slide"
      >
        <LucideIcon name="ChevronLeft" size={22} />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-emerald-900/40 hover:bg-emerald-900/70 text-white transition-all border border-white/20 cursor-pointer hidden sm:block z-20 backdrop-blur-md"
        aria-label="Next Slide"
      >
        <LucideIcon name="ChevronRight" size={22} />
      </button>

      {/* Bottom Progress Bar */}
      <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-white/20 z-20">
        <motion.div
          key={currentSlide}
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ duration: 6.5, ease: "linear" }}
          className="h-full bg-amber-400"
        />
      </div>
    </section>
  );
}