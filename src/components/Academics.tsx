import React, { useState } from "react";
import { SchoolConfig, AcademicProgram } from "../types";
import LucideIcon from "./LucideIcon";

interface AcademicsProps {
  config: SchoolConfig;
  onNavigate?: (sectionId: string) => void;
}

export default function Academics({ config, onNavigate }: AcademicsProps) {
  const [selectedProgram, setSelectedProgram] = useState<AcademicProgram | null>(null);

  return (
    <section id="academics" className="py-16 sm:py-24 bg-white" h-id="academics-section">
      <div className="max-w-[1400px] mx-auto px-2 sm:px-4 lg:px-5">
        
        {/* Header Intro */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span 
            className="text-xs font-extrabold tracking-widest uppercase inline-block"
            style={{ color: config.secondaryColor }}
          >
            NURTURING EARLY CHILDHOOD GROWTH
          </span>
          <h2 className="font-sans font-extrabold text-3xl sm:text-4xl text-gray-900 tracking-tight">
            Nursery Programs & Early Learning
          </h2>
          <div className="h-1 w-16 bg-gray-200 mx-auto rounded-full" />
          <p className="text-gray-500 text-sm sm:text-base leading-relaxed">
            {config.name} offers loving, play-based nursery programs designed to build social confidence, early literacy, creativity, and joy for your little ones.
          </p>
        </div>

        {/* Nursery Learning Philosophy Callout Banner */}
        <div 
          className="mb-12 rounded-3xl p-6 sm:p-10 text-white shadow-xl relative overflow-hidden border border-white/20"
          style={{
            background: `linear-gradient(135deg, ${config.primaryColor} 0%, ${config.secondaryColor} 100%)`
          }}
        >
          <div 
            className="absolute top-0 right-0 -mr-12 -mt-12 w-64 h-64 rounded-full blur-3xl pointer-events-none opacity-30"
            style={{ backgroundColor: config.secondaryColor }}
          />
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <div 
                className="inline-flex items-center space-x-2 text-white px-3.5 py-1 rounded-full text-[11px] font-extrabold uppercase tracking-wider shadow-sm"
                style={{ backgroundColor: config.secondaryColor }}
              >
                <LucideIcon name="Sparkles" size={13} />
                <span>Play-Based Learning & Exploration</span>
              </div>
              <h3 className="font-sans font-extrabold text-2xl sm:text-3xl text-white tracking-tight leading-snug">
                Early Childhood Curriculum
              </h3>
              <p className="text-white/90 text-xs sm:text-sm leading-relaxed font-light">
                We create a safe, vibrant, and loving environment where toddlers learn through play, story time, music, and hands-on discovery. Our certified caregivers focus on holistic development—emotional, social, motor skills, and creative play—giving every child a happy start.
              </p>
              <div className="pt-2 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                <div className="bg-white/10 backdrop-blur-md p-3 rounded-xl border border-white/10">
                  <span className="font-bold block mb-0.5 text-white">Baby & Toddler Class</span>
                  <span className="text-white/80 text-[11px]">Sensory play, songs, & gentle care</span>
                </div>
                <div className="bg-white/10 backdrop-blur-md p-3 rounded-xl border border-white/10">
                  <span className="font-bold block mb-0.5 text-white">Middle & Top Class</span>
                  <span className="text-white/80 text-[11px]">Phonics, numbers, & art projects</span>
                </div>
                <div className="bg-white/10 backdrop-blur-md p-3 rounded-xl border border-white/10">
                  <span className="font-bold block mb-0.5 text-white">Loving Caregivers</span>
                  <span className="text-white/80 text-[11px]">Certified early education staff</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/15 space-y-3">
              <div className="flex items-center space-x-2 font-bold text-xs uppercase tracking-wider text-white">
                <LucideIcon name="ShieldCheck" size={16} />
                <span>Safe & Nurturing Environment</span>
              </div>
              <p className="text-xs text-white/90 leading-relaxed font-light">
                Our nursery facilities strictly enforce child safety, hygienic meals, active playtime, and individual attention for every child.
              </p>
              <button
                onClick={() => onNavigate && onNavigate("contact")}
                className="w-full py-2.5 rounded-xl text-white font-extrabold text-xs transition-all shadow-md cursor-pointer flex items-center justify-center space-x-1.5"
                style={{ backgroundColor: config.secondaryColor }}
              >
                <span>Inquire for Nursery Admission</span>
                <LucideIcon name="ArrowRight" size={13} />
              </button>
            </div>
          </div>
        </div>

        {/* Programs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {config.academicPrograms.map((program) => {
            const isSelected = selectedProgram?.code === program.code;
            return (
              <div
                key={program.code}
                onClick={() => setSelectedProgram(isSelected ? null : program)}
                className="group relative bg-gray-50 hover:bg-white rounded-2xl p-6 sm:p-8 border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer flex flex-col justify-between"
                style={{
                  borderTop: `4px solid ${config.primaryColor}`
                }}
              >
                <div>
                  {/* Floating icon */}
                  <div 
                    className="w-10 h-10 rounded-xl flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform duration-300"
                    style={{ backgroundColor: config.primaryColor }}
                  >
                    <LucideIcon name={program.icon || "Smile"} size={18} />
                  </div>

                  {/* Level / Class Badge */}
                  <span 
                    className="inline-block px-2.5 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wide mb-3"
                    style={{ 
                      backgroundColor: `${config.secondaryColor}15`, 
                      color: config.secondaryColor 
                    }}
                  >
                    LEVEL: {program.code}
                  </span>

                  {/* Title */}
                  <h3 className="font-bold text-gray-950 text-base sm:text-lg mb-3 tracking-tight group-hover:text-gray-900 transition-colors">
                    {program.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-500 text-xs sm:text-sm leading-relaxed mb-6 font-light">
                    {program.description}
                  </p>
                </div>

                {/* Bottom Trigger Link */}
                <div className="flex items-center text-xs font-semibold" style={{ color: config.primaryColor }}>
                  <span>{isSelected ? "Hide details" : "View Program Highlights"}</span>
                  <LucideIcon 
                    name={isSelected ? "ChevronRight" : "ArrowRight"} 
                    size={12} 
                    className={`ml-1.5 transition-transform duration-300 ${isSelected ? "-rotate-90" : "group-hover:translate-x-1"}`} 
                  />
                </div>

                {/* Expanded Details Overlay */}
                {isSelected && (
                  <div className="absolute inset-0 bg-white/95 rounded-2xl p-6 border border-gray-100 flex flex-col justify-between z-10 animate-fade-in">
                    <div>
                      <div className="flex justify-between items-center mb-4">
                        <span className="text-xs font-bold uppercase text-gray-400">CLASS HIGHLIGHTS</span>
                        <button onClick={(e) => { e.stopPropagation(); setSelectedProgram(null); }} className="text-gray-400 hover:text-gray-600">
                          <LucideIcon name="X" size={16} />
                        </button>
                      </div>
                      <h4 className="font-bold text-gray-900 text-sm sm:text-base mb-3">{program.title} Focus</h4>
                      <ul className="space-y-2.5">
                        <li className="flex items-start text-xs text-gray-600">
                          <span className="text-emerald-500 mr-2 font-bold">✓</span>
                          <span>Interactive storytelling & phonics practice</span>
                        </li>
                        <li className="flex items-start text-xs text-gray-600">
                          <span className="text-emerald-500 mr-2 font-bold">✓</span>
                          <span>Creative art, motor skill activities & music</span>
                        </li>
                        <li className="flex items-start text-xs text-gray-600">
                          <span className="text-emerald-500 mr-2 font-bold">✓</span>
                          <span>Guided social play & emotional development</span>
                        </li>
                      </ul>
                    </div>
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        if (onNavigate) {
                          onNavigate("contact");
                        } else {
                          const contactSec = document.getElementById("contact");
                          if (contactSec) contactSec.scrollIntoView({ behavior: "smooth" });
                        }
                      }}
                      className="w-full text-center py-2 rounded-lg text-xs font-bold text-white tracking-wide cursor-pointer"
                      style={{ backgroundColor: config.primaryColor }}
                    >
                      Enquire for Enrollment
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}