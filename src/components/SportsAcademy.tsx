import React from "react";
import { SchoolConfig } from "../types";
import LucideIcon from "./LucideIcon";

interface SportsAcademyProps {
  config: SchoolConfig;
  onNavigate?: (sectionId: string) => void;
}

export default function SportsAcademy({ config, onNavigate }: SportsAcademyProps) {
  return (
    <section id="sports-academy" className="py-12 sm:py-20 bg-white" h-id="sports-academy-section">
      <div className="max-w-[1400px] mx-auto px-2 sm:px-4 lg:px-5 space-y-16">
        
        {/* BIG FULL ATHLETE HERO FEATURE BOX */}
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-[#38180c] via-[#5c2a18] to-[#1a0a04] border border-[#ea580c]/30 shadow-2xl text-white p-6 sm:p-10 lg:p-12">
          
          {/* Background Ambient Warm Lighting */}
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#ea580c]/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#ea580c]/15 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center relative z-10">
            
            {/* FULL BIG ATHLETE IMAGE SHOWCASE (Takes 6 cols on desktop and is displayed huge) */}
            <div className="lg:col-span-6 relative order-1 lg:order-2">
              <div className="relative rounded-2xl overflow-hidden bg-gradient-to-t from-black via-transparent to-transparent p-1.5 border border-white/20 shadow-2xl group">
                <img
                  src={config.sportsAcademy.image || "/src/assets/images/graben_play_sports_1784728024192.jpg"}
                  alt="Graben Highlight Academy Young Athlete Playing Outdoors"
                  referrerPolicy="no-referrer"
                  className="w-full h-[480px] sm:h-[600px] lg:h-[680px] object-cover object-top rounded-xl filter brightness-105 contrast-105 transition-transform duration-700 group-hover:scale-[1.02]"
                />
                
                {/* Floating Badge top right */}
                <div className="absolute top-4 right-4 bg-[#ea580c] text-white text-xs font-black uppercase tracking-wider px-3.5 py-1.5 rounded-full shadow-lg flex items-center space-x-1.5">
                  <LucideIcon name="Trophy" size={14} />
                  <span>Young Athlete #1</span>
                </div>

                {/* Floating Bottom Card on Image */}
                <div className="absolute bottom-4 left-4 right-4 bg-slate-950/85 backdrop-blur-md p-4 rounded-xl border border-white/20 shadow-xl space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-extrabold text-[#ea580c] uppercase tracking-widest">
                      Rubavu Nursery Play Lawn
                    </span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                      Co-Ed Play & Sports
                    </span>
                  </div>
                  <h4 className="font-extrabold text-sm sm:text-base text-white">
                    Outdoor Physical Development & Team Games
                  </h4>
                  <p className="text-[11px] text-gray-300 font-light">
                    Building gross motor coordination, health, and peer friendship through structured play activities at Graben Highlight Academy.
                  </p>
                </div>
              </div>
            </div>

            {/* Left Column Content */}
            <div className="lg:col-span-6 space-y-6 order-2 lg:order-1 text-left">
              
              {/* Tag */}
              <div className="flex items-center space-x-2">
                <span className="text-xs font-extrabold tracking-widest uppercase inline-block px-3.5 py-1 rounded-full bg-[#ea580c] text-white shadow-md">
                  OUTDOOR PLAY & SPORTS ACADEMY
                </span>
              </div>

              {/* Title */}
              <h1 className="font-sans font-black text-3xl sm:text-5xl text-white tracking-tight leading-tight">
                {config.sportsAcademy.title}
              </h1>

              {/* Accent Divider */}
              <div className="h-1.5 w-24 rounded-full bg-[#ea580c]" />

              {/* Description */}
              <p className="text-gray-200 text-sm sm:text-base leading-relaxed font-light">
                {config.sportsAcademy.description}
              </p>

              {/* Key Features list */}
              <div className="space-y-3.5 pt-2">
                {config.sportsAcademy.features.map((feature, idx) => (
                  <div key={idx} className="flex items-start space-x-3">
                    <div className="p-1.5 rounded-full bg-[#ea580c] text-white shrink-0 mt-0.5 shadow-sm">
                      <LucideIcon name="Check" size={14} className="stroke-[3]" />
                    </div>
                    <span className="text-gray-100 text-xs sm:text-sm font-medium leading-relaxed">
                      {feature}
                    </span>
                  </div>
                ))}
              </div>

              {/* Stats Grid Bar */}
              <div className="pt-6 grid grid-cols-3 gap-4 border-t border-white/15 text-white">
                <div>
                  <div className="font-black text-xl sm:text-2xl text-[#ea580c]">100%</div>
                  <div className="text-[11px] text-gray-300 font-light">Safe Green Lawn</div>
                </div>
                <div className="border-l border-white/15 pl-4">
                  <div className="font-black text-xl sm:text-2xl text-white">Mini Sports</div>
                  <div className="text-[11px] text-gray-300 font-light">Hoops & Football</div>
                </div>
                <div className="border-l border-white/15 pl-4">
                  <div className="font-black text-xl sm:text-2xl text-[#ea580c]">Rubavu</div>
                  <div className="text-[11px] text-gray-300 font-light">Top Nursery Campus</div>
                </div>
              </div>

              {/* Call to Action */}
              {onNavigate && (
                <div className="pt-4">
                  <button
                    onClick={() => onNavigate("contact")}
                    className="inline-flex items-center text-xs sm:text-sm font-extrabold px-6 py-3.5 rounded-xl bg-[#ea580c] hover:bg-[#c2410c] text-white shadow-lg transition-all transform active:scale-95 cursor-pointer space-x-2"
                  >
                    <span>Inquire for Nursery Enrollment & Campus Visit</span>
                    <LucideIcon name="ArrowRight" size={14} />
                  </button>
                </div>
              )}

            </div>

          </div>
        </div>

        {/* SECONDARY SPORTS & PLAY DISCIPLINES GRID */}
        <div className="space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-extrabold tracking-widest uppercase text-[#ea580c]">
              PHYSICAL ACTIVITIES AT GRABEN HIGHLIGHT ACADEMY
            </span>
            <h3 className="font-sans font-extrabold text-2xl sm:text-3xl text-gray-900 tracking-tight">
              Early Motor Skills & Active Play
            </h3>
            <p className="text-gray-500 text-xs sm:text-sm font-light">
              Designing fun, age-appropriate physical play for toddlers and nursery scholars in Rubavu District.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Mini Basketball & Hoops Card */}
            <div className="bg-white rounded-2xl p-6 border border-gray-150 shadow-sm space-y-4 hover:shadow-md transition-all group">
              <div className="w-12 h-12 rounded-xl bg-[#5c2a18] text-white flex items-center justify-center shadow-md">
                <LucideIcon name="Trophy" size={22} />
              </div>
              <h4 className="font-extrabold text-lg text-gray-900">Mini Basketball & Ball Games</h4>
              <p className="text-gray-600 text-xs leading-relaxed font-light">
                Lowered hoops and soft balls allowing toddlers to build hand-eye coordination, throwing balance, and team spirit.
              </p>
              <div className="pt-2 flex items-center space-x-1.5 text-[11px] font-bold text-[#ea580c]">
                <span>Supervised Daily Play Sessions</span>
                <LucideIcon name="ChevronRight" size={12} />
              </div>
            </div>

            {/* Outdoor Lawn Football & Running Card */}
            <div className="bg-white rounded-2xl p-6 border border-gray-150 shadow-sm space-y-4 hover:shadow-md transition-all group">
              <div className="w-12 h-12 rounded-xl bg-[#ea580c] text-white flex items-center justify-center shadow-md">
                <LucideIcon name="Activity" size={22} />
              </div>
              <h4 className="font-extrabold text-lg text-gray-900">Lawn Soccer & Sprint Races</h4>
              <p className="text-gray-600 text-xs leading-relaxed font-light">
                Fun relay races and soft-ball kicks on smooth green turf that build leg strength, agility, and cardiovascular health.
              </p>
              <div className="pt-2 flex items-center space-x-1.5 text-[11px] font-bold text-[#ea580c]">
                <span>Gentle Physical Conditioning</span>
                <LucideIcon name="ChevronRight" size={12} />
              </div>
            </div>

            {/* Balance Tracks & Playground Fun Card */}
            <div className="bg-white rounded-2xl p-6 border border-gray-150 shadow-sm space-y-4 hover:shadow-md transition-all group">
              <div className="w-12 h-12 rounded-xl bg-[#5c2a18] text-white flex items-center justify-center shadow-md">
                <LucideIcon name="Users" size={22} />
              </div>
              <h4 className="font-extrabold text-lg text-gray-900">Balance Tracks & Rhythmic Movement</h4>
              <p className="text-gray-600 text-xs leading-relaxed font-light">
                Music-guided movement, balance beams, and group games encouraging physical confidence, rhythm, and joy.
              </p>
              <div className="pt-2 flex items-center space-x-1.5 text-[11px] font-bold text-[#ea580c]">
                <span>100% Caregiver Safety Supervision</span>
                <LucideIcon name="ChevronRight" size={12} />
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}

