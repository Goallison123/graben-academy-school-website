import React from 'react';
import {
  Trophy,
  CheckCircle2,
  ChevronRight,
  Info,
  Sparkles,
  Users,
  Activity,
  Heart
} from 'lucide-react';
import { SubPageType } from '../GrabenSchoolWebsite';

interface SportsPageProps {
  onNavigate: (page: SubPageType) => void;
  onOpenEnrollModal: () => void;
}

export const SportsPage: React.FC<SportsPageProps> = ({ onNavigate, onOpenEnrollModal }) => {
  return (
    <div className="w-full bg-slate-50 min-h-screen text-slate-900 pb-16">
      
      {/* 1. DARK BLUE HEADER BANNER (Matches Screenshot 10 Header) */}
      <section className="bg-[#0B1528] text-white py-14 px-4 sm:px-6 lg:px-8 border-b-4 border-amber-500 text-left">
        <div className="max-w-7xl mx-auto space-y-3">
          
          <div className="text-xs font-black text-amber-400 tracking-widest uppercase flex items-center gap-2">
            <span>SCHOOL PORTAL</span>
            <span>/</span>
            <span className="text-amber-200">GRABEN HIGHLIGHT OUTDOOR PLAY & SPORTS</span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-black text-white tracking-tight">
            Graben Highlight Outdoor Play & Sports
          </h1>

          <p className="text-slate-300 text-base sm:text-lg max-w-3xl font-medium leading-relaxed">
            Developing toddler motor coordination, health, agility, and team play on our soft green lawn and mini sports equipment.
          </p>

        </div>
      </section>

      {/* 2. MAIN TERRACOTTA OUTDOOR SPORTS CONTAINER (Matches Screenshot 10 & 11) */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="bg-[#3D1405] text-white rounded-[32px] p-8 sm:p-10 shadow-2xl border-4 border-amber-600/40 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center text-left">
          
          {/* Left Column Content */}
          <div className="lg:col-span-6 space-y-6">
            
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-600 text-white font-black text-xs uppercase tracking-wider shadow-sm">
              <span>OUTDOOR PLAY & SPORTS ACADEMY</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight leading-tight">
              Graben Highlight Outdoor Play & Physical Development
            </h2>

            <div className="w-16 h-1 bg-amber-500 rounded-full"></div>

            <p className="text-amber-100/90 text-sm sm:text-base font-medium leading-relaxed">
              Physical activity and active outdoor games are essential for early childhood health. At Graben Highlight Academy, our spacious green playground features soft play equipment, balance beams, mini basketball hoops, and group ball games where toddlers run, jump, build balance, and develop motor coordination safely under loving supervision.
            </p>

            {/* Checklist */}
            <div className="space-y-3 font-bold text-xs sm:text-sm text-amber-50">
              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-orange-600 text-white flex items-center justify-center shrink-0 mt-0.5">
                  ✓
                </div>
                <span>Supervised outdoor play on soft, secure green lawns in Rubavu District</span>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-orange-600 text-white flex items-center justify-center shrink-0 mt-0.5">
                  ✓
                </div>
                <span>Mini basketball hoops, soft football kicks, and obstacle balance fun</span>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-orange-600 text-white flex items-center justify-center shrink-0 mt-0.5">
                  ✓
                </div>
                <span>Gross motor skill development and rhythmic physical movement exercises</span>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-orange-600 text-white flex items-center justify-center shrink-0 mt-0.5">
                  ✓
                </div>
                <span>Trained early childhood caregivers ensuring 100% child safety and hygiene</span>
              </div>
            </div>

            {/* Stats Bar & CTA */}
            <div className="pt-4 space-y-4 border-t border-amber-500/30">
              <div className="grid grid-cols-3 gap-4 text-left">
                <div>
                  <div className="text-xl font-black text-amber-300">100%</div>
                  <div className="text-[11px] text-amber-200">Safe Green Lawn</div>
                </div>
                <div className="border-l border-amber-500/30 pl-4">
                  <div className="text-xl font-black text-amber-300">Mini Sports</div>
                  <div className="text-[11px] text-amber-200">Hoops & Football</div>
                </div>
                <div className="border-l border-amber-500/30 pl-4">
                  <div className="text-xl font-black text-amber-300">Rubavu</div>
                  <div className="text-[11px] text-amber-200">Top Nursery Campus</div>
                </div>
              </div>

              <button
                onClick={() => onNavigate('enrollment')}
                className="px-6 py-3.5 bg-orange-600 hover:bg-orange-500 text-white font-black text-xs sm:text-sm rounded-xl shadow-lg flex items-center gap-2 transition-all active:scale-95"
              >
                <span>Inquire for Nursery Enrollment & Campus Visit</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

          </div>

          {/* Right Column Showcase Frame (Matches Screenshot 10 & 11) */}
          <div className="lg:col-span-6">
            <div className="relative rounded-3xl bg-slate-900 border-2 border-slate-700/80 p-6 h-96 flex flex-col justify-between overflow-hidden shadow-2xl bg-gradient-to-br from-amber-950 via-slate-900 to-emerald-950">
              
              <div className="flex justify-between items-start">
                <div className="text-xs font-medium text-slate-300 italic">
                  Graben Highlight Academy Young Athlete Playing Outdoors
                </div>
                <div className="px-3 py-1 bg-orange-600 text-white font-black text-[11px] rounded-full shadow-md flex items-center gap-1 uppercase">
                  <Trophy className="w-3.5 h-3.5" />
                  <span>YOUNG ATHLETE #1</span>
                </div>
              </div>

              <div className="bg-slate-900/90 backdrop-blur-md rounded-2xl p-4 border border-slate-700 space-y-1">
                <div className="flex items-center justify-between text-[11px] font-black">
                  <span className="text-amber-400 uppercase tracking-wider">RUBAVU NURSERY PLAY LAWN</span>
                  <span className="text-orange-400 bg-orange-950/80 px-2 py-0.5 rounded-full border border-orange-500/40">Co-Ed Play & Sports</span>
                </div>
                <h4 className="text-lg font-black text-white">Outdoor Physical Development & Team Games</h4>
                <p className="text-slate-300 text-xs font-medium">
                  Building gross motor coordination, health, and peer friendship through structured play activities at Graben Highlight Academy.
                </p>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* 3. 3 FEATURE CARDS SECTION (Matches Screenshot 12) */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
        
        <div className="text-center max-w-3xl mx-auto space-y-2">
          <div className="text-xs font-black text-amber-600 tracking-wider uppercase">
            PHYSICAL ACTIVITIES AT GRABEN HIGHLIGHT ACADEMY
          </div>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight">
            Early Motor Skills & Active Play
          </h2>
          <p className="text-slate-600 text-sm font-medium">
            Designing fun, age-appropriate physical play for toddlers and nursery scholars in Rubavu District.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
          
          {/* Feature 1 */}
          <div className="bg-white rounded-3xl p-6 border-2 border-slate-800 shadow-sm hover:shadow-md transition-all space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-orange-600 text-white flex items-center justify-center shadow-md">
              <Trophy className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-black text-slate-900">
              Mini Basketball & Ball Games
            </h3>
            <p className="text-slate-600 text-xs leading-relaxed font-medium">
              Lowered hoops and soft balls allowing toddlers to build hand-eye coordination, throwing balance, and team spirit.
            </p>
            <div className="pt-2 text-orange-600 text-xs font-black flex items-center gap-1">
              <span>Supervised Daily Play Sessions</span>
              <ChevronRight className="w-4 h-4" />
            </div>
          </div>

          {/* Feature 2 */}
          <div className="bg-white rounded-3xl p-6 border-2 border-slate-800 shadow-sm hover:shadow-md transition-all space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-orange-600 text-white flex items-center justify-center shadow-md">
              <Info className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-black text-slate-900">
              Lawn Soccer & Sprint Races
            </h3>
            <p className="text-slate-600 text-xs leading-relaxed font-medium">
              Fun relay races and soft-ball kicks on smooth green turf that build leg strength, agility, and cardiovascular health.
            </p>
            <div className="pt-2 text-orange-600 text-xs font-black flex items-center gap-1">
              <span>Gentle Physical Conditioning</span>
              <ChevronRight className="w-4 h-4" />
            </div>
          </div>

          {/* Feature 3 */}
          <div className="bg-white rounded-3xl p-6 border-2 border-slate-800 shadow-sm hover:shadow-md transition-all space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-orange-600 text-white flex items-center justify-center shadow-md">
              <Users className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-black text-slate-900">
              Balance Tracks & Rhythmic Movement
            </h3>
            <p className="text-slate-600 text-xs leading-relaxed font-medium">
              Music-guided movement, balance beams, and group games encouraging physical confidence, rhythm, and joy.
            </p>
            <div className="pt-2 text-orange-600 text-xs font-black flex items-center gap-1">
              <span>100% Caregiver Safety Supervision</span>
              <ChevronRight className="w-4 h-4" />
            </div>
          </div>

        </div>

      </section>

    </div>
  );
};
