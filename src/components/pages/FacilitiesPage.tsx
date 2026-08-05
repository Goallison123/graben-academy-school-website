import React from 'react';
import {
  Info,
  Sparkles,
  BookOpen,
  Heart,
  ShieldCheck,
  ChevronRight,
  Sun,
  Palette,
  Coffee,
  CheckCircle2
} from 'lucide-react';
import { SubPageType } from '../GrabenSchoolWebsite';

interface FacilitiesPageProps {
  onNavigate: (page: SubPageType) => void;
  onOpenEnrollModal: () => void;
}

export const FacilitiesPage: React.FC<FacilitiesPageProps> = ({ onNavigate, onOpenEnrollModal }) => {
  const facilities = [
    {
      icon: Sun,
      title: 'Sunlit Learning Classrooms',
      description: 'Spacious, well-ventilated classrooms with ergonomic child-sized seating, natural daylight, and safety rounded furniture.',
    },
    {
      icon: BookOpen,
      title: 'Storybook Reading & Listening Nook',
      description: 'Cozy cushioned reading corners stocked with Kinyarwanda, English, and French early picture storybooks.',
    },
    {
      icon: Palette,
      title: 'Creative Arts & Expression Atelier',
      description: 'Dedicated space for finger painting, clay sculpting, collage crafting, and sensory color exploration.',
    },
    {
      icon: Coffee,
      title: 'Toddler Rest & Nap Haven',
      description: 'Quiet, climate-controlled, sanitized nap area with individual fresh bedding for restful afternoon recovery.',
    },
    {
      icon: Heart,
      title: 'First Aid & Health Hygiene Desk',
      description: 'On-site health station equipped with child safety first-aid supplies and trained caregiver hygiene staff.',
    },
    {
      icon: ShieldCheck,
      title: 'Secured Enclosed Campus Perimeter',
      description: 'Gated entrance with continuous caregiver presence ensuring complete child safety and peace of mind.',
    },
  ];

  return (
    <div className="w-full bg-slate-50 min-h-screen text-slate-900 pb-16">
      
      {/* 1. HEADER BANNER */}
      <section className="bg-[#0B1528] text-white py-14 px-4 sm:px-6 lg:px-8 border-b-4 border-amber-500 text-left">
        <div className="max-w-7xl mx-auto space-y-3">
          <div className="text-xs font-black text-amber-400 tracking-widest uppercase flex items-center gap-2">
            <span>SCHOOL PORTAL</span>
            <span>/</span>
            <span className="text-amber-200">CAMPUS & CARE FACILITIES</span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-black text-white tracking-tight">
            Campus & Care Facilities
          </h1>

          <p className="text-slate-300 text-base sm:text-lg max-w-3xl font-medium leading-relaxed">
            Tour our sunlit classrooms, storybook reading nooks, creative arts atelier, rest/nap zones, and healthcare standards in Rubavu District.
          </p>
        </div>
      </section>

      {/* 2. FACILITIES GRID */}
      <section className="py-14 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8 text-left">
        <div className="text-center max-w-3xl mx-auto space-y-2">
          <div className="text-xs font-black text-amber-600 tracking-wider uppercase">
            DESIGNED FOR CHILD COMFORT & SAFETY
          </div>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight">
            Our Campus Environment
          </h2>
          <p className="text-slate-600 text-sm font-medium">
            Every room at Graben Highlight Academy is thoughtfully crafted to feel like a warm, inspiring second home for toddlers.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {facilities.map((fac, idx) => {
            const IconComp = fac.icon;
            return (
              <div
                key={idx}
                className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-all space-y-3"
              >
                <div className="w-12 h-12 rounded-2xl bg-amber-500 text-white flex items-center justify-center shadow-md">
                  <IconComp className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-black text-slate-900">{fac.title}</h3>
                <p className="text-slate-600 text-xs leading-relaxed font-medium">{fac.description}</p>
                <div className="pt-2 text-amber-700 text-[11px] font-bold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                  <span>100% Certified Standard</span>
                </div>
              </div>
            );
          })}
        </div>

        <div className="pt-8 text-center">
          <button
            onClick={() => onNavigate('enrollment')}
            className="px-8 py-4 bg-orange-600 hover:bg-orange-500 text-white font-black text-sm rounded-full shadow-lg transition-all active:scale-95 inline-flex items-center gap-2"
          >
            <span>Schedule a Campus Tour</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </section>

    </div>
  );
};
