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
      className="relative min-h-[580px] sm:min-h-[640px] lg:min-h-[700px] bg-gradient-to-br from-[#7c2d12] via-[#ea580c] to-[#9a3412] overflow-hidden text-white flex items-center"
      h-id="innovative-hero-section"
    >
      {/* Background Animated Image Canvas with Ambient Gradients */}
      <AnimatePresence mode="wait">
        {config.heroSlides.map((slide, index) => {
          if (index !== currentSlide) return null;
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 1.08 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.02 }}
              transition={{ duration: 0.9, ease: "easeOut" }}
              className="absolute inset-0"
            >
              <img
                src={slide.image}
                alt={slide.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center opacity-35 filter brightness-95"
              />
              {/* Distinctive Cheerful Warm Orange mesh gradient overlays */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#7c2d12] via-[#7c2d12]/85 to-[#ea580c]/50" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#7c2d12] via-transparent to-[#7c2d12]/60" />
            </motion.div>
          );
        })}
      </AnimatePresence>

      {/* Decorative Glowing Mesh Orbs */}
      <div className="absolute top-1/4 -left-20 w-80 h-80 bg-amber-400/25 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-[#f59e0b]/20 rounded-full blur-[120px] pointer-events-none" />

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
                className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest bg-amber-400 text-slate-950 shadow-lg border border-amber-200/50 backdrop-blur-md"
              >
                <LucideIcon name="Sparkles" size={14} className="text-slate-950" />
                <span>{config.heroSlides[currentSlide].tag}</span>
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
                className="font-sans font-black text-3xl sm:text-5xl lg:text-6xl tracking-tight leading-[1.12] text-white"
              >
                {config.heroSlides[currentSlide].title}
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
                className="text-amber-100 text-sm sm:text-base md:text-lg leading-relaxed max-w-2xl font-normal"
              >
                {config.heroSlides[currentSlide].description}
              </motion.p>
            </AnimatePresence>

            {/* Action Buttons Row */}
            <div className="flex flex-wrap items-center gap-3.5 pt-2">
              <button
                onClick={() => onCtaClick("academics")}
                className="px-7 py-4 rounded-2xl font-black text-xs sm:text-sm shadow-xl transition-all active:scale-95 cursor-pointer bg-amber-400 hover:bg-amber-300 text-slate-950 flex items-center space-x-2"
              >
                <span>Explore Nursery Streams</span>
                <LucideIcon name="ArrowRight" size={16} />
              </button>

              <button
                onClick={() => onCtaClick("contact")}
                className="px-7 py-4 rounded-2xl font-bold text-xs sm:text-sm bg-white/15 hover:bg-white/25 text-white border border-white/30 backdrop-blur-md transition-all active:scale-95 cursor-pointer flex items-center space-x-2"
              >
                <LucideIcon name="Heart" size={16} className="text-amber-300" />
                <span>Enrollment & Care Fees</span>
              </button>
            </div>

            {/* Quick Metrics Bar at Bottom of Left Column */}
            <div className="pt-6 grid grid-cols-3 gap-4 border-t border-white/20 text-xs">
              <div>
                <div className="font-black text-white text-base sm:text-lg">Rubavu District</div>
                <div className="text-amber-100/90 text-[11px]">Western Province, Rwanda</div>
              </div>
              <div className="border-l border-white/20 pl-4">
                <div className="font-black text-amber-300 text-base sm:text-lg">100% Certified</div>
                <div className="text-amber-100/90 text-[11px]">Trained Caregivers</div>
              </div>
              <div className="border-l border-white/20 pl-4">
                <div className="font-black text-sky-300 text-base sm:text-lg">Safe & Happy</div>
                <div className="text-amber-100/90 text-[11px]">Play-Based Campus</div>
              </div>
            </div>

          </div>

          {/* Right Column: Prominent Nursery Feature & Interactive Streams Matrix */}
          <div className="lg:col-span-5 relative">
            <div className="bg-slate-950/80 backdrop-blur-xl border border-white/25 rounded-3xl p-5 sm:p-6 shadow-2xl space-y-5 relative overflow-hidden">
              
              {/* BIG Nursery Feature Badge & Image Box */}
              <div className="relative rounded-2xl overflow-hidden bg-gradient-to-t from-slate-950 via-slate-900 to-amber-950 border border-white/20 group">
                <img 
                  src="/assets/graben_classroom.jpg" 
                  alt="Graben Highlight Academy Nursery Classroom" 
                  className="w-full h-56 sm:h-64 object-cover object-center filter brightness-105 contrast-105 group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent" />
                
                <div className="absolute top-3 left-3 bg-amber-400 text-slate-950 text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full shadow-md flex items-center space-x-1">
                  <LucideIcon name="Smile" size={13} />
                  <span>Graben Highlight Academy</span>
                </div>

                <div className="absolute bottom-3 left-3 right-3 text-left space-y-0.5">
                  <span className="text-[10px] text-amber-300 font-bold uppercase tracking-wider">Early Childhood Excellence</span>
                  <h4 className="text-sm sm:text-base font-black text-white leading-tight">
                    Joyful Play & Early Phonics Learning
                  </h4>
                  <p className="text-[11px] text-slate-200 font-light line-clamp-1">
                    Nurturing curiosity, creativity, and confidence in every child.
                  </p>
                </div>
              </div>

              {/* Header inside Card */}
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <div className="flex items-center space-x-2.5">
                  <div className="w-7 h-7 rounded-lg bg-amber-500/30 border border-amber-400/40 flex items-center justify-center text-amber-300">
                    <LucideIcon name="Sparkles" size={16} />
                  </div>
                  <div>
                    <h3 className="font-black text-xs sm:text-sm text-white tracking-tight">Nursery Classes</h3>
                    <p className="text-[10px] text-amber-100/70">Select class to preview</p>
                  </div>
                </div>
                <span className="text-[10px] font-extrabold px-2.5 py-0.5 rounded-md bg-amber-400/20 text-amber-300 border border-amber-400/30">
                  Ages 1.5 – 6 Years
                </span>
              </div>

              {/* Pathway Tabs Bar */}
              <div className="grid grid-cols-4 gap-1.5 p-1 bg-white/10 rounded-xl border border-white/10">
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
                          : "text-amber-100/70 hover:text-white hover:bg-white/10"
                      }`}
                    >
                      {tab.label}
                    </button>
                  );
                })}
              </div>

              {/* Active Pathway Details Card */}
              {pathwayHighlights[selectedPathwayTab] && (
                <div className="bg-white/5 border border-white/10 p-4 rounded-2xl space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2 text-emerald-400 font-bold text-xs">
                      <LucideIcon name={pathwayHighlights[selectedPathwayTab].icon} size={16} />
                      <span>{pathwayHighlights[selectedPathwayTab].title}</span>
                    </div>
                    <span className="text-[10px] text-blue-200/60 font-medium">
                      {pathwayHighlights[selectedPathwayTab].badge}
                    </span>
                  </div>
                  <p className="text-xs text-blue-100 font-light leading-relaxed">
                    {pathwayHighlights[selectedPathwayTab].subtitle}
                  </p>
                  <div className="pt-2 flex items-center justify-between text-[11px] text-blue-300 font-semibold">
                    <span className="flex items-center space-x-1">
                      <LucideIcon name="CheckCircle2" size={13} className="text-emerald-400" />
                      <span>Full Lab & Class Facility</span>
                    </span>
                    <button
                      onClick={() => onCtaClick("academics")}
                      className="text-emerald-400 hover:underline flex items-center space-x-1 cursor-pointer font-bold"
                    >
                      <span>Syllabus Details</span>
                      <LucideIcon name="ChevronRight" size={12} />
                    </button>
                  </div>
                </div>
              )}

              {/* Slide Switcher Preview Row */}
              <div className="pt-2 border-t border-white/10 space-y-2">
                <div className="flex items-center justify-between text-[11px] text-blue-200/70">
                  <span className="font-semibold uppercase tracking-wider text-[10px] text-emerald-400">Campus Highlights</span>
                  <span>{currentSlide + 1} / {config.heroSlides.length}</span>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {config.heroSlides.map((slide, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentSlide(idx)}
                      className={`relative h-14 rounded-xl overflow-hidden border transition-all cursor-pointer group ${
                        idx === currentSlide
                          ? "border-emerald-400 ring-2 ring-emerald-500/40 opacity-100"
                          : "border-white/10 opacity-60 hover:opacity-100"
                      }`}
                    >
                      <img
                        src={slide.image}
                        alt={slide.tag}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-slate-950/40 group-hover:bg-transparent transition-all" />
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
        className="absolute left-4 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-slate-900/60 hover:bg-slate-900 text-white/80 hover:text-white transition-all border border-white/10 cursor-pointer hidden sm:block z-20 backdrop-blur-md"
        aria-label="Previous Slide"
      >
        <LucideIcon name="ChevronLeft" size={22} />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-slate-900/60 hover:bg-slate-900 text-white/80 hover:text-white transition-all border border-white/10 cursor-pointer hidden sm:block z-20 backdrop-blur-md"
        aria-label="Next Slide"
      >
        <LucideIcon name="ChevronRight" size={22} />
      </button>

      {/* Bottom Progress Bar */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/10 z-20">
        <motion.div
          key={currentSlide}
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ duration: 6.5, ease: "linear" }}
          className="h-full bg-emerald-500"
        />
      </div>
    </section>
  );
}

