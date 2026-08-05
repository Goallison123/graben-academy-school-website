import React, { useState } from 'react';
import {
  BookOpen,
  Sparkles,
  CheckCircle2,
  ChevronRight,
  Info,
  Heart,
  Palette,
  Award,
  Clock,
  Calendar
} from 'lucide-react';
import { SubPageType } from '../GrabenSchoolWebsite';

interface ProgramsPageProps {
  onNavigate: (page: SubPageType) => void;
  onOpenEnrollModal: () => void;
}

export const ProgramsPage: React.FC<ProgramsPageProps> = ({ onNavigate, onOpenEnrollModal }) => {
  const [activeSyllabusModal, setActiveSyllabusModal] = useState<string | null>(null);

  const programs = [
    {
      id: 'baby',
      title: 'Baby Class (Ages 1.5 – 3 Years)',
      tag: 'COMBINATION: BABY CLASS',
      icon: Info,
      color: 'amber',
      description: 'Gentle sensory exploration, nursery rhymes, motor-skills development, social bonding, and attentive care in a cozy, safe space.',
      subjects: ['Sensory Exploration & Tactile Play', 'Basic Nursery Rhymes & Vocalization', 'Fine & Gross Motor Skill Practice', 'Social Bonding & Napping Routine'],
      schedule: '8:00 AM – 12:00 PM (Mon – Fri)',
    },
    {
      id: 'middle',
      title: 'Middle Class (Ages 3 – 4 Years)',
      tag: 'COMBINATION: MIDDLE CLASS',
      icon: Sparkles,
      color: 'orange',
      description: 'Interactive learning through building blocks, color sorting, initial vocabulary, creative painting, and cooperative peer activities.',
      subjects: ['Vocabulary Expansion & Phonics Sounds', 'Color & Shape Recognition', 'Building Blocks & Logic Puzzles', 'Group Storytelling & Music Circles'],
      schedule: '8:00 AM – 12:30 PM (Mon – Fri)',
    },
    {
      id: 'top',
      title: 'Top Class / Reception (Ages 4 – 6 Years)',
      tag: 'COMBINATION: TOP CLASS',
      icon: BookOpen,
      color: 'sky',
      description: 'Early phonics literacy, basic counting & arithmetic, environmental awareness, story comprehension, and primary school readiness.',
      subjects: ['Phonics Reading & Letter Writing', 'Early Number Operations (1–50)', 'Environmental & Nature Science', 'Primary School Transition Readiness'],
      schedule: '8:00 AM – 1:00 PM (Mon – Fri)',
    },
    {
      id: 'arts',
      title: 'Creative Arts, Music & Storytelling Atelier',
      tag: 'COMBINATION: ARTS & PLAY',
      icon: Palette,
      color: 'purple',
      description: 'Finger painting, rhythm band instruments, puppet storytelling, dramatic play, and imaginative art projects.',
      subjects: ['Expressive Finger Painting & Clay Work', 'Rhythm Instruments & Nursery Choirs', 'Puppet Theatre & Role Playing', 'Weekly Creative Art Exhibition'],
      schedule: 'Integrated Daily & Afternoon Clubs',
    },
  ];

  return (
    <div className="w-full bg-slate-50 min-h-screen text-slate-900 pb-16">
      
      {/* 1. DARK BLUE HEADER BANNER (Matches Screenshot 7 Header) */}
      <section className="bg-[#0B1528] text-white py-14 px-4 sm:px-6 lg:px-8 border-b-4 border-amber-500 text-left">
        <div className="max-w-7xl mx-auto space-y-3">
          
          <div className="text-xs font-black text-amber-400 tracking-widest uppercase flex items-center gap-2">
            <span>SCHOOL PORTAL</span>
            <span>/</span>
            <span className="text-amber-200">NURSERY PROGRAMS & EARLY CHILDHOOD CURRICULUM</span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-black text-white tracking-tight">
            Nursery Programs & Early Childhood Curriculum
          </h1>

          <p className="text-slate-300 text-base sm:text-lg max-w-3xl font-medium leading-relaxed">
            Discover Baby Class, Middle Class, and Top Class programs designed for joyful, play-based learning and primary school readiness.
          </p>

        </div>
      </section>

      {/* 2. PAGE SUBHEADER TITLE */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 text-center max-w-4xl mx-auto space-y-3">
        <div className="text-xs font-black text-amber-600 tracking-wider uppercase">
          NURTURING EARLY CHILDHOOD GROWTH
        </div>
        <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
          Nursery Programs & Early Childhood Curriculum
        </h2>
        <div className="w-16 h-1 bg-slate-300 mx-auto rounded-full"></div>
        <p className="text-slate-600 text-sm sm:text-base font-medium leading-relaxed max-w-2xl mx-auto">
          Graben Highlight Academy offers structured, play-based nursery programs in Rubavu District designed to cultivate social confidence, emotional intelligence, and cognitive milestones.
        </p>
      </section>

      {/* 3. TERRACOTTA HERO CARD BANNER (Matches Screenshot 7 & 8) */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mb-12">
        <div className="bg-[#3D1405] text-white rounded-[32px] p-8 sm:p-10 shadow-2xl border-4 border-amber-600/40 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center text-left">
          
          {/* Left Column */}
          <div className="lg:col-span-7 space-y-5">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-600 text-white font-black text-xs uppercase tracking-wider shadow-sm">
              <Sparkles className="w-3.5 h-3.5" />
              <span>NURTURING EARLY CHILDHOOD EDUCATION</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              Graben Highlight Nursery Curriculum
            </h2>

            <p className="text-amber-100/90 text-sm sm:text-base font-medium leading-relaxed">
              Graben Highlight Academy is dedicated to providing quality early childhood education. We create a safe, engaging, and supportive environment where children learn through play, creativity, and exploration. Our trained caregivers focus on holistic development—social, emotional, and cognitive—helping every child build a strong foundation for future learning and success.
            </p>

            {/* 3 Stream Stat Pills */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-3 border border-white/20">
                <div className="text-xs font-black text-amber-300">Baby & Toddler Stream</div>
                <div className="text-[11px] text-slate-300">Sensory play, songs, & gentle care</div>
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-3 border border-white/20">
                <div className="text-xs font-black text-amber-300">Middle & Top Stream</div>
                <div className="text-[11px] text-slate-300">Phonics, counting, & art projects</div>
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-3 border border-white/20">
                <div className="text-xs font-black text-amber-300">Trained Caregivers</div>
                <div className="text-[11px] text-slate-300">100% certified child welfare experts</div>
              </div>
            </div>
          </div>

          {/* Right Column: Quality & Safety Guarantee Box (Matches Screenshot 8) */}
          <div className="lg:col-span-5">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border-2 border-white/20 space-y-4 text-left">
              <div className="flex items-center gap-2 text-amber-300 font-black text-sm">
                <Info className="w-4 h-4 text-amber-400" />
                <span>QUALITY & SAFETY GUARANTEE</span>
              </div>
              <p className="text-slate-200 text-xs font-medium leading-relaxed">
                Our nursery facilities in Rubavu District strictly enforce child safety, hygienic nutrition, and loving individual care for every pupil.
              </p>
              <button
                onClick={() => onNavigate('enrollment')}
                className="w-full py-3.5 bg-orange-600 hover:bg-orange-500 text-white font-black text-xs sm:text-sm rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
              >
                <span>Inquire for Nursery Admission</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* 4. THE 4 DETAILED CLASS CARDS GRID (Matches Screenshot 8 & 9) */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
          
          {programs.map((prog) => {
            const IconComp = prog.icon;
            return (
              <div
                key={prog.id}
                className="bg-white rounded-3xl p-6 border-2 border-orange-500/80 shadow-md hover:shadow-xl transition-all flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="w-12 h-12 rounded-2xl bg-orange-500 text-white flex items-center justify-center shadow-md">
                    <IconComp className="w-6 h-6" />
                  </div>

                  <div className="inline-block px-3 py-1 bg-amber-100 text-orange-950 font-black text-[10px] rounded-full uppercase tracking-wider">
                    {prog.tag}
                  </div>

                  <h3 className="text-xl font-black text-slate-900 leading-tight">
                    {prog.title}
                  </h3>

                  <p className="text-slate-600 text-xs leading-relaxed font-medium">
                    {prog.description}
                  </p>
                </div>

                <div className="pt-2 border-t border-slate-100">
                  <button
                    onClick={() => setActiveSyllabusModal(prog.id)}
                    className="text-orange-600 font-black text-xs flex items-center gap-1 hover:underline"
                  >
                    <span>View Curriculum Focus</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}

        </div>
      </section>

      {/* SYLLABUS MODAL */}
      {activeSyllabusModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl border-4 border-amber-300 text-slate-900 text-left space-y-5 animate-fadeIn">
            
            {(() => {
              const prog = programs.find((p) => p.id === activeSyllabusModal)!;
              return (
                <>
                  <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                    <div>
                      <div className="text-[10px] font-black text-orange-600 uppercase tracking-wider">{prog.tag}</div>
                      <h3 className="text-xl font-black text-slate-900">{prog.title}</h3>
                    </div>
                    <button
                      onClick={() => setActiveSyllabusModal(null)}
                      className="text-slate-400 hover:text-slate-700 font-black text-lg"
                    >
                      ✕
                    </button>
                  </div>

                  <div className="space-y-3 text-xs">
                    <div className="flex items-center gap-2 text-slate-600 font-bold">
                      <Clock className="w-4 h-4 text-orange-600" />
                      <span>{prog.schedule}</span>
                    </div>

                    <div className="font-bold text-slate-800 text-sm pt-1">Key Curriculum Modules:</div>
                    <ul className="space-y-2 font-medium text-slate-700">
                      {prog.subjects.map((sub, i) => (
                        <li key={i} className="flex items-center gap-2 bg-slate-50 p-2.5 rounded-xl border border-slate-200">
                          <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                          <span>{sub}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex items-center gap-3 pt-2">
                    <button
                      onClick={() => {
                        setActiveSyllabusModal(null);
                        onNavigate('enrollment');
                      }}
                      className="flex-1 py-3 bg-orange-600 hover:bg-orange-500 text-white font-black text-xs rounded-xl shadow-md transition-all text-center"
                    >
                      Enroll in this Stream
                    </button>
                    <button
                      onClick={() => setActiveSyllabusModal(null)}
                      className="py-3 px-5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-black text-xs rounded-xl transition-all"
                    >
                      Close
                    </button>
                  </div>
                </>
              );
            })()}

          </div>
        </div>
      )}

    </div>
  );
};
