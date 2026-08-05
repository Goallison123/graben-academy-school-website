import React from 'react';
import {
  Users,
  Award,
  BookOpen,
  CheckCircle2,
  Heart,
  Sparkles,
  Info,
  ChevronRight,
  ShieldCheck,
  Smile
} from 'lucide-react';
import { SubPageType } from '../GrabenSchoolWebsite';
import { DirectressAvatarSvg } from '../illustrations/SchoolIllustrations';

interface AboutPageProps {
  onNavigate: (page: SubPageType) => void;
  onOpenEnrollModal: () => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate, onOpenEnrollModal }) => {
  return (
    <div className="w-full bg-slate-50 min-h-screen text-slate-900 pb-16">
      
      {/* 1. DARK BLUE HEADER BANNER (Matches Screenshot 4 Header) */}
      <section className="bg-[#0B1528] text-white py-14 px-4 sm:px-6 lg:px-8 border-b-4 border-amber-500 text-left">
        <div className="max-w-7xl mx-auto space-y-3">
          
          <div className="text-xs font-black text-amber-400 tracking-widest uppercase flex items-center gap-2">
            <span>SCHOOL PORTAL</span>
            <span>/</span>
            <span className="text-amber-200">ABOUT GRABEN HIGHLIGHT ACADEMY</span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-black text-white tracking-tight">
            About Graben Highlight Academy
          </h1>

          <p className="text-slate-300 text-base sm:text-lg max-w-3xl font-medium leading-relaxed">
            Founded in 2018, Graben Highlight Academy is a premier nursery school in Rubavu District dedicated to play-based early childhood education.
          </p>

        </div>
      </section>

      {/* 2. STATS BAR CARD */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-20">
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border-2 border-amber-100 text-slate-900 grid grid-cols-2 lg:grid-cols-4 gap-6 text-center divide-y lg:divide-y-0 lg:divide-x divide-slate-100">
          
          <div className="flex flex-col items-center justify-center p-2">
            <div className="w-10 h-10 rounded-full bg-amber-500 text-white flex items-center justify-center mb-2 shadow-sm">
              <Users className="w-5 h-5" />
            </div>
            <div className="text-3xl font-black text-slate-900 tracking-tight">180+</div>
            <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mt-0.5">
              ENROLLED TODDLERS
            </div>
          </div>

          <div className="flex flex-col items-center justify-center p-2">
            <div className="w-10 h-10 rounded-full bg-orange-500 text-white flex items-center justify-center mb-2 shadow-sm">
              <Award className="w-5 h-5" />
            </div>
            <div className="text-3xl font-black text-slate-900 tracking-tight">100% Certified</div>
            <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mt-0.5">
              TRAINED CAREGIVERS
            </div>
          </div>

          <div className="flex flex-col items-center justify-center p-2 pt-4 lg:pt-2">
            <div className="w-10 h-10 rounded-full bg-sky-500 text-white flex items-center justify-center mb-2 shadow-sm">
              <BookOpen className="w-5 h-5" />
            </div>
            <div className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">Baby, Middle & Top</div>
            <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mt-0.5">
              NURSERY STREAMS
            </div>
          </div>

          <div className="flex flex-col items-center justify-center p-2 pt-4 lg:pt-2">
            <div className="w-10 h-10 rounded-full bg-emerald-500 text-white flex items-center justify-center mb-2 shadow-sm">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">100% Secure Campus</div>
            <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mt-0.5">
              SAFETY STANDARD
            </div>
          </div>

        </div>
      </section>

      {/* 3. MAIN ABOUT SECTION & DIRECTRESS SPOTLIGHT (Matches Screenshot 5) */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center text-left">
          
          {/* LEFT: Directress Card Showcase */}
          <div className="lg:col-span-5">
            <div className="relative bg-white rounded-3xl p-6 sm:p-8 shadow-xl border-2 border-amber-200 space-y-6">
              
              {/* Directress Portrait Vector Frame */}
              <div className="relative w-full h-72 sm:h-80 rounded-2xl bg-gradient-to-br from-amber-900 via-orange-900 to-amber-950 overflow-hidden flex flex-col justify-between p-6 border-2 border-amber-300 shadow-lg">
                
                <div className="flex justify-between items-start z-10">
                  <div className="px-3 py-1 bg-white/90 backdrop-blur-md rounded-full text-xs font-black text-orange-950 border border-amber-300 shadow-xs">
                    FOUNDED 2018
                  </div>
                  <div className="w-12 h-12 rounded-full bg-amber-400 text-orange-950 flex items-center justify-center font-bold shadow-md border-2 border-white">
                    <DirectressAvatarSvg className="w-10 h-10" />
                  </div>
                </div>

                <div className="flex items-center justify-center py-2 z-10">
                  <DirectressAvatarSvg className="w-28 h-28 shadow-xl drop-shadow-md" />
                </div>

                <div className="space-y-1 bg-white/90 backdrop-blur-md p-4 rounded-xl border border-amber-200 shadow-md z-10">
                  <div className="text-base font-black text-slate-900">Marie-Claire Mukamana</div>
                  <div className="text-xs font-bold text-orange-600">Directress & Early Childhood Lead</div>
                  <div className="text-[11px] text-slate-600 italic">"Nurturing every child with love & dignity"</div>
                </div>

                <div className="absolute bottom-4 right-4 z-20">
                  <div className="px-4 py-2 bg-orange-600 text-white text-xs font-black rounded-full shadow-md flex items-center gap-1.5">
                    <Heart className="w-3.5 h-3.5 fill-white" />
                    <span>Nurturing Nursery</span>
                  </div>
                </div>

              </div>

              <div className="flex items-center justify-between pt-2 text-xs font-bold text-slate-600">
                <span>Directress & Early Childhood Lead</span>
                <span className="italic text-amber-700 font-serif text-sm">“ Excellence & Integrity ”</span>
              </div>

            </div>
          </div>

          {/* RIGHT: Academy Story & Highlight Cards */}
          <div className="lg:col-span-7 space-y-6">
            
            <div className="text-xs font-black text-amber-600 tracking-wider uppercase">
              FOUNDED IN 2018 • GISENYI SECTOR, RUBAVU DISTRICT
            </div>

            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight leading-tight">
              Welcome to Graben Highlight Academy
            </h2>

            <div className="w-16 h-1 bg-orange-600 rounded-full"></div>

            <p className="text-slate-600 text-base leading-relaxed font-medium">
              Graben Highlight Academy is a nurturing nursery school in Rubavu District, dedicated to providing quality early childhood education. We create a safe, engaging, and supportive environment where children learn through play, creativity, and exploration. Our trained caregivers focus on holistic development—social, emotional, and cognitive—helping every child build a strong foundation for future learning and success.
            </p>

            {/* 2 Sub-Feature Cards (Matches Screenshot 5) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              
              <div className="bg-amber-50 rounded-2xl p-5 border border-amber-200 space-y-2 text-left">
                <div className="flex items-center gap-2 text-orange-950 font-black text-sm">
                  <Sparkles className="w-4 h-4 text-amber-600" />
                  <span>Baby, Middle & Top Classes</span>
                </div>
                <p className="text-slate-600 text-xs font-medium leading-relaxed">
                  Play-based curriculum, interactive building blocks, phonics, and storytelling.
                </p>
              </div>

              <div className="bg-amber-50 rounded-2xl p-5 border border-amber-200 space-y-2 text-left">
                <div className="flex items-center gap-2 text-orange-950 font-black text-sm">
                  <Info className="w-4 h-4 text-amber-600" />
                  <span>Outdoor Play Lawn & Games</span>
                </div>
                <p className="text-slate-600 text-xs font-medium leading-relaxed">
                  Mini sports, soft balance beams, lawn soccer, and physical motor skills fun.
                </p>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* 4. PHILOSOPHY & CORE PILLARS SECTION (Matches Screenshot 6) */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-slate-200">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 text-left items-start">
          
          {/* Left Column: Early Childhood Philosophy */}
          <div className="lg:col-span-6 space-y-5">
            <h3 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Our Early Childhood Philosophy
            </h3>
            
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-medium">
              At Graben Highlight Academy, we believe that early childhood is the most crucial foundation for a lifetime of learning and joy. Our nursery environment in Rubavu District balances structured play, sensory exploration, phonics, numbers, creative arts, and gentle physical outdoor games.
            </p>

            <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-medium">
              Our certified caregivers nurture every child with individual care, fostering social confidence, emotional security, and curiosity.
            </p>

            <div className="pt-2">
              <button
                onClick={() => onNavigate('programs')}
                className="px-6 py-3 bg-orange-600 hover:bg-orange-500 text-white font-black text-xs sm:text-sm rounded-full shadow-md flex items-center gap-2 transition-all active:scale-95"
              >
                <span>View Full Curriculum & Streams</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Right Column: Core Pillars of Excellence (Matches Screenshot 6 Box) */}
          <div className="lg:col-span-6">
            <div className="bg-amber-50/80 rounded-3xl p-6 sm:p-8 border-2 border-amber-200 space-y-6">
              <h4 className="text-xl font-black text-slate-900">
                Our Core Pillars of Excellence
              </h4>

              <div className="space-y-4">
                
                {/* Pillar 1 */}
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-orange-600 text-white font-black text-sm flex items-center justify-center shrink-0 shadow-sm mt-0.5">
                    1
                  </div>
                  <div>
                    <h5 className="font-black text-slate-900 text-base">Play-Based Learning</h5>
                    <p className="text-slate-600 text-xs font-medium leading-relaxed mt-0.5">
                      Interactive phonics, building blocks, story nooks, and art ateliers.
                    </p>
                  </div>
                </div>

                {/* Pillar 2 */}
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-orange-600 text-white font-black text-sm flex items-center justify-center shrink-0 shadow-sm mt-0.5">
                    2
                  </div>
                  <div>
                    <h5 className="font-black text-slate-900 text-base">Safe & Nurturing Care</h5>
                    <p className="text-slate-600 text-xs font-medium leading-relaxed mt-0.5">
                      100% certified early childhood caregivers and secure campus environment.
                    </p>
                  </div>
                </div>

                {/* Pillar 3 */}
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-orange-600 text-white font-black text-sm flex items-center justify-center shrink-0 shadow-sm mt-0.5">
                    3
                  </div>
                  <div>
                    <h5 className="font-black text-slate-900 text-base">Holistic Development</h5>
                    <p className="text-slate-600 text-xs font-medium leading-relaxed mt-0.5">
                      Balanced social, emotional, cognitive, and motor-skills growth.
                    </p>
                  </div>
                </div>

              </div>

            </div>
          </div>

        </div>
      </section>

    </div>
  );
};
