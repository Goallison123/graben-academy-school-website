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
            Nursery Programs & Early Childhood Curriculum
          </h2>
          <div className="h-1 w-16 bg-gray-200 mx-auto rounded-full" />
          <p className="text-gray-500 text-sm sm:text-base leading-relaxed">
            Graben Highlight Academy offers structured, play-based nursery programs in Rubavu District designed to cultivate social confidence, emotional intelligence, and cognitive milestones.
          </p>
        </div>

        {/* Nursery Learning Philosophy Callout Banner */}
        <div className="mb-12 bg-gradient-to-r from-[#2c1308] via-[#5c2a18] to-[#1e0a04] rounded-3xl p-6 sm:p-10 text-white shadow-xl relative overflow-hidden border border-[#ea580c]/30">
          <div className="absolute top-0 right-0 -mr-12 -mt-12 w-64 h-64 bg-[#ea580c]/20 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center space-x-2 bg-[#ea580c] text-white px-3.5 py-1 rounded-full text-[11px] font-extrabold uppercase tracking-wider shadow-sm">
                <LucideIcon name="Sparkles" size={13} />
                <span>Nurturing Early Childhood Education</span>
              </div>
              <h3 className="font-sans font-extrabold text-2xl sm:text-3xl text-white tracking-tight leading-snug">
                Graben Highlight Nursery Curriculum
              </h3>
              <p className="text-amber-100 text-xs sm:text-sm leading-relaxed font-light">
                Graben Highlight Academy is dedicated to providing quality early childhood education. We create a safe, engaging, and supportive environment where children learn through play, creativity, and exploration. Our trained caregivers focus on holistic development—social, emotional, and cognitive—helping every child build a strong foundation for future learning and success.
              </p>
              <div className="pt-2 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                <div className="bg-white/10 backdrop-blur-md p-3 rounded-xl border border-white/10">
                  <span className="text-[#ea580c] font-bold block mb-0.5">Baby & Toddler Stream</span>
                  <span className="text-amber-100 text-[11px]">Sensory play, songs, & gentle care</span>
                </div>
                <div className="bg-white/10 backdrop-blur-md p-3 rounded-xl border border-white/10">
                  <span className="text-[#ea580c] font-bold block mb-0.5">Middle & Top Stream</span>
                  <span className="text-amber-100 text-[11px]">Phonics, counting, & art projects</span>
                </div>
                <div className="bg-white/10 backdrop-blur-md p-3 rounded-xl border border-white/10">
                  <span className="text-[#ea580c] font-bold block mb-0.5">Trained Caregivers</span>
                  <span className="text-amber-100 text-[11px]">100% certified child welfare experts</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/15 space-y-3">
              <div className="flex items-center space-x-2 text-[#ea580c] font-bold text-xs uppercase tracking-wider">
                <LucideIcon name="ShieldCheck" size={16} />
                <span>Quality & Safety Guarantee</span>
              </div>
              <p className="text-xs text-amber-100 leading-relaxed font-light">
                Our nursery facilities in Rubavu District strictly enforce child safety, hygienic nutrition, and loving individual care for every pupil.
              </p>
              <button
                onClick={() => onNavigate && onNavigate("contact")}
                className="w-full py-2.5 rounded-xl bg-[#ea580c] hover:bg-[#c2410c] text-white font-extrabold text-xs transition-all shadow-md cursor-pointer flex items-center justify-center space-x-1.5"
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
                  {/* Floating category */}
                  <div 
                    className="w-10 h-10 rounded-xl flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform duration-300"
                    style={{ backgroundColor: config.primaryColor }}
                  >
                    <LucideIcon name={program.icon} size={18} />
                  </div>

                  {/* Combination Code Badge */}
                  <span 
                    className="inline-block px-2.5 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wide mb-3"
                    style={{ 
                      backgroundColor: `${config.secondaryColor}15`, 
                      color: config.secondaryColor 
                    }}
                  >
                    COMBINATION: {program.code}
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
                  <span>{isSelected ? "Show less details" : "View Curriculum Focus"}</span>
                  <LucideIcon 
                    name={isSelected ? "ChevronRight" : "ArrowRight"} 
                    size={12} 
                    className={`ml-1.5 transition-transform duration-300 ${isSelected ? "-rotate-90" : "group-hover:translate-x-1"}`} 
                  />
                </div>

                {/* Expanded Details overlay drawer (in-card) */}
                {isSelected && (
                  <div className="absolute inset-0 bg-white/95 rounded-2xl p-6 border border-gray-100 flex flex-col justify-between z-10 animate-fade-in">
                    <div>
                      <div className="flex justify-between items-center mb-4">
                        <span className="text-xs font-bold uppercase text-gray-400">CURRICULUM BREAKDOWN</span>
                        <button onClick={(e) => { e.stopPropagation(); setSelectedProgram(null); }} className="text-gray-400 hover:text-gray-600">
                          <LucideIcon name="X" size={16} />
                        </button>
                      </div>
                      <h4 className="font-bold text-gray-900 text-sm sm:text-base mb-3">{program.code} Track Focus</h4>
                      <ul className="space-y-2.5">
                        <li className="flex items-start text-xs text-gray-600">
                          <span className="text-emerald-500 mr-2 font-bold">✓</span>
                          <span>National examination syllabus integration</span>
                        </li>
                        <li className="flex items-start text-xs text-gray-600">
                          <span className="text-emerald-500 mr-2 font-bold">✓</span>
                          <span>Practical weekly laboratory work & tests</span>
                        </li>
                        <li className="flex items-start text-xs text-gray-600">
                          <span className="text-emerald-500 mr-2 font-bold">✓</span>
                          <span>Dedicated career guidance mentoring panels</span>
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
                      Enquire for Admission
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
