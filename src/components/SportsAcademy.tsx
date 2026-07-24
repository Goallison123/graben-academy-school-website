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
        
        {/* BIG FULL HERO FEATURE BOX */}
        <div 
          className="relative rounded-3xl overflow-hidden border border-white/20 shadow-2xl text-white p-6 sm:p-10 lg:p-12"
          style={{
            background: `linear-gradient(135deg, ${config.primaryColor} 0%, ${config.secondaryColor} 100%)`
          }}
        >
          {/* Background Ambient Warm Lighting */}
          <div 
            className="absolute top-0 right-1/4 w-96 h-96 rounded-full blur-3xl pointer-events-none opacity-20"
            style={{ backgroundColor: config.secondaryColor }}
          />
          <div 
            className="absolute bottom-0 left-0 w-80 h-80 rounded-full blur-3xl pointer-events-none opacity-20"
            style={{ backgroundColor: config.primaryColor }}
          />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center relative z-10">
            
            {/* BIG IMAGE SHOWCASE */}
            <div className="lg:col-span-6 relative order-1 lg:order-2">
              <div className="relative rounded-2xl overflow-hidden bg-gradient-to-t from-black via-transparent to-transparent p-1.5 border border-white/20 shadow-2xl group">
                <img
                  src={config.sportsAcademy?.image || "/src/assets/images/graben_play_sports_1784728024192.jpg"}
                  alt={`${config.name} Young Children Outdoor Play & Sports`}
                  referrerPolicy="no-referrer"
                  className="w-full h-[480px] sm:h-[600px] lg:h-[680px] object-cover object-top rounded-xl filter brightness-105 contrast-105 transition-transform duration-700 group-hover:scale-[1.02]"
                />
                
                {/* Floating Badge top right */}
                <div 
                  className="absolute top-4 right-4 text-white text-xs font-black uppercase tracking-wider px-3.5 py-1.5 rounded-full shadow-lg flex items-center space-x-1.5"
                  style={{ backgroundColor: config.secondaryColor }}
                >
                  <LucideIcon name="Trophy" size={14} />
                  <span>Active Tots</span>
                </div>

                {/* Floating Bottom Card on Image */}
                <div className="absolute bottom-4 left-4 right-4 bg-slate-950/85 backdrop-blur-md p-4 rounded-xl border border-white/20 shadow-xl space-y-1">
                  <div className="flex items-center justify-between">
                    <span 
                      className="text-[11px] font-extrabold uppercase tracking-widest"
                      style={{ color: config.secondaryColor }}
                    >
                      Safe Nursery Play Lawn
                    </span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-white/10 text-white border border-white/20">
                      Guided Motor Play
                    </span>
                  </div>
                  <h4 className="font-extrabold text-sm sm:text-base text-white">
                    Outdoor Physical Development & Fun Games
                  </h4>
                  <p className="text-[11px] text-gray-200 font-light">
                    Building gross motor coordination, balance, and peer friendships through safe, structured play.
                  </p>
                </div>
              </div>
            </div>

            {/* Left Column Content */}
            <div className="lg:col-span-6 space-y-6 order-2 lg:order-1 text-left">
              
              {/* Tag */}
              <div className="flex items-center space-x-2">
                <span 
                  className="text-xs font-extrabold tracking-widest uppercase inline-block px-3.5 py-1 rounded-full text-white shadow-md"
                  style={{ backgroundColor: config.secondaryColor }}
                >
                  OUTDOOR PLAY & MOTOR SKILLS
                </span>
              </div>

              {/* Title */}
              <h1 className="font-sans font-black text-3xl sm:text-5xl text-white tracking-tight leading-tight">
                {config.sportsAcademy?.title || "Active Play & Physical Development"}
              </h1>

              {/* Accent Divider */}
              <div 
                className="h-1.5 w-24 rounded-full"
                style={{ backgroundColor: config.secondaryColor }}
              />

              {/* Description */}
              <p className="text-white/90 text-sm sm:text-base leading-relaxed font-light">
                {config.sportsAcademy?.description || "At our nursery, physical activity is all about joy, exploration, and building physical confidence. Through fun games, obstacle courses, and playground activities, toddlers develop coordination and teamwork in a safe, supervised environment."}
              </p>

              {/* Key Features list */}
              <div className="space-y-3.5 pt-2">
                {(config.sportsAcademy?.features || [
                  "Age-appropriate mini-sports and balance tracks",
                  "Structured outdoor playtime supervised by trained caregivers",
                  "Focus on gross motor skills, coordination, and team interaction"
                ]).map((feature, idx) => (
                  <div key={idx} className="flex items-start space-x-3">
                    <div 
                      className="p-1.5 rounded-full text-white shrink-0 mt-0.5 shadow-sm"
                      style={{ backgroundColor: config.secondaryColor }}
                    >
                      <LucideIcon name="Check" size={14} className="stroke-[3]" />
                    </div>
                    <span className="text-white/90 text-xs sm:text-sm font-medium leading-relaxed">
                      {feature}
                    </span>
                  </div>
                ))}
              </div>

              {/* Stats Grid Bar */}
              <div className="pt-6 grid grid-cols-3 gap-4 border-t border-white/20 text-white">
                <div>
                  <div className="font-black text-xl sm:text-2xl text-white">100%</div>
                  <div className="text-[11px] text-white/80 font-light">Safe Green Turf</div>
                </div>
                <div className="border-l border-white/20 pl-4">
                  <div className="font-black text-xl sm:text-2xl text-white">Mini Games</div>
                  <div className="text-[11px] text-white/80 font-light">Hoops & Soft Balls</div>
                </div>
                <div className="border-l border-white/20 pl-4">
                  <div className="font-black text-xl sm:text-2xl text-white">Loving Care</div>
                  <div className="text-[11px] text-white/80 font-light">Full Supervision</div>
                </div>
              </div>

              {/* Call to Action */}
              {onNavigate && (
                <div className="pt-4">
                  <button
                    onClick={() => onNavigate("contact")}
                    className="inline-flex items-center text-xs sm:text-sm font-extrabold px-6 py-3.5 rounded-xl text-white shadow-lg transition-all transform active:scale-95 cursor-pointer space-x-2"
                    style={{ backgroundColor: config.secondaryColor }}
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
            <span 
              className="text-xs font-extrabold tracking-widest uppercase"
              style={{ color: config.secondaryColor }}
            >
              PHYSICAL ACTIVITIES & MOVEMENT
            </span>
            <h3 className="font-sans font-extrabold text-2xl sm:text-3xl text-gray-900 tracking-tight">
              Early Motor Skills & Active Fun
            </h3>
            <p className="text-gray-500 text-xs sm:text-sm font-light">
              Designing engaging, age-appropriate physical games for toddlers and nursery pupils.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Mini Basketball & Hoops Card */}
            <div className="bg-white rounded-2xl p-6 border border-gray-150 shadow-sm space-y-4 hover:shadow-md transition-all group">
              <div 
                className="w-12 h-12 rounded-xl text-white flex items-center justify-center shadow-md"
                style={{ backgroundColor: config.primaryColor }}
              >
                <LucideIcon name="Trophy" size={22} />
              </div>
              <h4 className="font-extrabold text-lg text-gray-900">Mini Hoops & Ball Games</h4>
              <p className="text-gray-600 text-xs leading-relaxed font-light">
                Lowered hoops and soft balls that allow toddlers to build hand-eye coordination, throwing balance, and sharing skills.
              </p>
              <div 
                className="pt-2 flex items-center space-x-1.5 text-[11px] font-bold"
                style={{ color: config.primaryColor }}
              >
                <span>Supervised Daily Play Sessions</span>
                <LucideIcon name="ChevronRight" size={12} />
              </div>
            </div>

            {/* Outdoor Lawn Football & Running Card */}
            <div className="bg-white rounded-2xl p-6 border border-gray-150 shadow-sm space-y-4 hover:shadow-md transition-all group">
              <div 
                className="w-12 h-12 rounded-xl text-white flex items-center justify-center shadow-md"
                style={{ backgroundColor: config.secondaryColor }}
              >
                <LucideIcon name="Activity" size={22} />
              </div>
              <h4 className="font-extrabold text-lg text-gray-900">Lawn Soccer & Gentle Races</h4>
              <p className="text-gray-600 text-xs leading-relaxed font-light">
                Fun relay games and soft-ball kicks on smooth green turf that help build leg strength, agility, and stamina.
              </p>
              <div 
                className="pt-2 flex items-center space-x-1.5 text-[11px] font-bold"
                style={{ color: config.secondaryColor }}
              >
                <span>Active Physical Exploration</span>
                <LucideIcon name="ChevronRight" size={12} />
              </div>
            </div>

            {/* Balance Tracks & Playground Fun Card */}
            <div className="bg-white rounded-2xl p-6 border border-gray-150 shadow-sm space-y-4 hover:shadow-md transition-all group">
              <div 
                className="w-12 h-12 rounded-xl text-white flex items-center justify-center shadow-md"
                style={{ backgroundColor: config.primaryColor }}
              >
                <LucideIcon name="Users" size={22} />
              </div>
              <h4 className="font-extrabold text-lg text-gray-900">Balance Tracks & Music Movement</h4>
              <p className="text-gray-600 text-xs leading-relaxed font-light">
                Music-guided movement, soft balance beams, and group games that encourage physical confidence and rhythm.
              </p>
              <div 
                className="pt-2 flex items-center space-x-1.5 text-[11px] font-bold"
                style={{ color: config.primaryColor }}
              >
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