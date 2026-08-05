import React, { useState } from 'react';
import {
  Info,
  ChevronRight,
  ChevronLeft,
  Sparkles,
  ArrowUpRight,
  Star,
  Users,
  Award,
  BookOpen,
  Trophy,
  Camera,
  Newspaper,
  CheckCircle2,
  Heart
} from 'lucide-react';
import { SubPageType } from '../GrabenSchoolWebsite';
import { HeroSlider } from '../HeroSlider';
import { DirectressAvatarSvg, HeroSlideCampusSvg, HeroSlidePlaygroundSvg } from '../illustrations/SchoolIllustrations';

interface HomePageProps {
  onNavigate: (page: SubPageType) => void;
  onOpenCanvas: () => void;
  onOpenEnrollModal: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  onNavigate,
  onOpenCanvas,
  onOpenEnrollModal,
}) => {
  return (
    <div className="w-full">
      
      {/* 1. HERO SLIDER CAROUSEL SECTION */}
      <HeroSlider
        onNavigate={onNavigate}
        onOpenCanvas={onOpenCanvas}
        onOpenEnrollModal={onOpenEnrollModal}
      />

      {/* 2. STATS BAR (Matches Image 2 Floating White Card) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 relative z-20">
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

      {/* 3. SECTION HEADER: "Welcome to Graben Highlight Academy" (Matches Image 2) */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 text-center max-w-4xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-amber-100 text-orange-950 font-black text-xs uppercase tracking-wider border border-amber-300/60">
          <span>📍 EXPLORE OUR NURSERY ACADEMY</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
          Welcome to Graben Highlight Academy
        </h2>
        <p className="text-slate-600 text-sm sm:text-base font-medium leading-relaxed max-w-2xl mx-auto">
          Click on any section below to explore our nursery classrooms, play areas, creative arts, child milestones, and admissions in Rubavu District.
        </p>
      </section>

      {/* 4. THE 8 FEATURE CARDS GRID (Matches Image 1 & 2 Cards Grid Perfectly!) */}
      <section className="pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-left">
          
          {/* Card 1: About Our Nursery */}
          <div
            onClick={() => onNavigate('about')}
            className="bg-amber-50/70 hover:bg-amber-50 rounded-3xl p-6 border border-amber-200/80 shadow-xs hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between space-y-4"
          >
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-amber-500 text-white flex items-center justify-center shadow-md">
                <Info className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-black text-slate-900 group-hover:text-amber-700 transition-colors">
                About Our Nursery
              </h3>
              <p className="text-slate-600 text-xs leading-relaxed font-medium">
                Discover our safe, loving early childhood environment, play-based learning approach, and certified caregiver team.
              </p>
            </div>
            <button className="text-amber-600 font-black text-xs flex items-center gap-1 group-hover:translate-x-1 transition-transform pt-2">
              <span>Read Directress Welcome</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Card 2: Nursery Streams & Curriculum */}
          <div
            onClick={() => onNavigate('programs')}
            className="bg-sky-50/70 hover:bg-sky-50 rounded-3xl p-6 border border-sky-200/80 shadow-xs hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between space-y-4"
          >
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-sky-500 text-white flex items-center justify-center shadow-md">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-black text-slate-900 group-hover:text-sky-700 transition-colors">
                Nursery Streams & Curriculum
              </h3>
              <p className="text-slate-600 text-xs leading-relaxed font-medium">
                Explore Baby Class, Middle Class, and Top Class programs focusing on early literacy, phonics, numbers, and social skills.
              </p>
            </div>
            <button className="text-sky-600 font-black text-xs flex items-center gap-1 group-hover:translate-x-1 transition-transform pt-2">
              <span>Explore Learning Programs</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Card 3: Play & Outdoor Sports */}
          <div
            onClick={() => onNavigate('sports')}
            className="bg-emerald-50/70 hover:bg-emerald-50 rounded-3xl p-6 border border-emerald-200/80 shadow-xs hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between space-y-4"
          >
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500 text-white flex items-center justify-center shadow-md">
                <Trophy className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-black text-slate-900 group-hover:text-emerald-700 transition-colors">
                Play & Outdoor Sports
              </h3>
              <p className="text-slate-600 text-xs leading-relaxed font-medium">
                Discover our mini basketball hoops, soft lawn soccer, balance obstacle courses, and active physical play.
              </p>
            </div>
            <button className="text-emerald-600 font-black text-xs flex items-center gap-1 group-hover:translate-x-1 transition-transform pt-2">
              <span>View Playground & Sports</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Card 4: Campus & Care Facilities */}
          <div
            onClick={() => onNavigate('facilities')}
            className="bg-purple-50/70 hover:bg-purple-50 rounded-3xl p-6 border border-purple-200/80 shadow-xs hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between space-y-4"
          >
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-purple-500 text-white flex items-center justify-center shadow-md">
                <Info className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-black text-slate-900 group-hover:text-purple-700 transition-colors">
                Campus & Care Facilities
              </h3>
              <p className="text-slate-600 text-xs leading-relaxed font-medium">
                Tour our sunlit classrooms, storybook reading nooks, creative arts atelier, rest/nap zones, and health care.
              </p>
            </div>
            <button className="text-purple-600 font-black text-xs flex items-center gap-1 group-hover:translate-x-1 transition-transform pt-2">
              <span>Explore Campus Facilities</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Card 5: Child Growth & Milestones */}
          <div
            onClick={() => onNavigate('milestones')}
            className="bg-amber-50/70 hover:bg-amber-50 rounded-3xl p-6 border border-amber-200/80 shadow-xs hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between space-y-4"
          >
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-amber-500 text-white flex items-center justify-center shadow-md">
                <Info className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-black text-slate-900 group-hover:text-amber-700 transition-colors">
                Child Growth & Milestones
              </h3>
              <p className="text-slate-600 text-xs leading-relaxed font-medium">
                Track early developmental milestones in communication, emotional confidence, creativity, and primary readiness.
              </p>
            </div>
            <button className="text-amber-600 font-black text-xs flex items-center gap-1 group-hover:translate-x-1 transition-transform pt-2">
              <span>View Child Milestones</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Card 6: Nursery Picture Gallery */}
          <div
            onClick={() => onNavigate('gallery')}
            className="bg-orange-50/70 hover:bg-orange-50 rounded-3xl p-6 border border-orange-200/80 shadow-xs hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between space-y-4"
          >
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-orange-500 text-white flex items-center justify-center shadow-md">
                <Camera className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-black text-slate-900 group-hover:text-orange-700 transition-colors">
                Nursery Picture Gallery
              </h3>
              <p className="text-slate-600 text-xs leading-relaxed font-medium">
                Enjoy vibrant, joyful photos of toddlers playing, painting, singing, reading, and exploring on campus.
              </p>
            </div>
            <button className="text-orange-600 font-black text-xs flex items-center gap-1 group-hover:translate-x-1 transition-transform pt-2">
              <span>Browse Picture Gallery</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Card 7: Nursery News & Bulletins */}
          <div
            onClick={() => onNavigate('news')}
            className="bg-cyan-50/70 hover:bg-cyan-50 rounded-3xl p-6 border border-cyan-200/80 shadow-xs hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between space-y-4"
          >
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-cyan-500 text-white flex items-center justify-center shadow-md">
                <Newspaper className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-black text-slate-900 group-hover:text-cyan-700 transition-colors">
                Nursery News & Bulletins
              </h3>
              <p className="text-slate-600 text-xs leading-relaxed font-medium">
                Read about upcoming orientation days, parent workshops, playground updates, and school announcements.
              </p>
            </div>
            <button className="text-cyan-600 font-black text-xs flex items-center gap-1 group-hover:translate-x-1 transition-transform pt-2">
              <span>Read School Bulletins</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Card 8: Nursery Enrollment Desk (Solid Orange Card matching Screenshot 1) */}
          <div
            onClick={() => onNavigate('enrollment')}
            className="bg-gradient-to-br from-orange-500 to-amber-600 rounded-3xl p-6 text-white shadow-lg hover:shadow-xl transition-all cursor-pointer group flex flex-col justify-between space-y-4 border-2 border-amber-300 md:col-span-2 lg:col-span-2"
          >
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-white text-orange-600 flex items-center justify-center shadow-md">
                <Info className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-black text-white">
                Nursery Enrollment Desk
              </h3>
              <p className="text-amber-100 text-xs sm:text-sm leading-relaxed font-medium max-w-xl">
                Enroll your child for Baby, Middle, or Top Class. Schedule a campus visit or contact our friendly team!
              </p>
            </div>

            <div className="pt-2">
              <button className="px-6 py-3 bg-white hover:bg-amber-50 text-orange-950 font-black text-xs sm:text-sm rounded-full shadow-md flex items-center gap-2 transition-all active:scale-95 border-2 border-amber-200">
                <span>Start Enrollment Form</span>
                <ChevronRight className="w-4 h-4 text-orange-600" />
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* 5. CALLOUT BANNER (Matches Image 2 Middle Banner) */}
      <section className="py-10 px-4 sm:px-6 lg:px-8 bg-amber-50">
        <div className="max-w-6xl mx-auto bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600 rounded-[32px] p-8 sm:p-10 shadow-2xl text-white text-left relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6 border-4 border-amber-300">
          
          <div className="space-y-3 max-w-2xl z-10">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-200 text-orange-950 font-black text-xs uppercase tracking-wider">
              <Star className="w-3.5 h-3.5 text-amber-600 fill-amber-600" />
              <span>BABY, MIDDLE & TOP CLASS OPEN</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              Enroll Your Child at Graben Highlight Academy
            </h2>

            <p className="text-amber-100 text-sm sm:text-base font-medium leading-relaxed">
              Applications are open for nursery admission in Rubavu District. Give your child the gift of joyful, play-based learning!
            </p>
          </div>

          <div className="z-10 shrink-0">
            <button
              onClick={() => onNavigate('enrollment')}
              className="px-8 py-4 bg-white hover:bg-amber-50 text-orange-950 font-black text-base rounded-full shadow-xl flex items-center gap-2 transition-all active:scale-95 border-2 border-amber-200"
            >
              <span>Enroll My Child Today</span>
              <ChevronRight className="w-5 h-5 text-orange-600" />
            </button>
          </div>

        </div>
      </section>

    </div>
  );
};
