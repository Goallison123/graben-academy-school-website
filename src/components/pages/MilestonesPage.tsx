import React, { useState } from 'react';
import {
  Sparkles,
  CheckCircle2,
  ChevronRight,
  Info,
  Star,
  BookOpen,
  Award
} from 'lucide-react';
import { SubPageType } from '../GrabenSchoolWebsite';

interface MilestonesPageProps {
  onNavigate: (page: SubPageType) => void;
  onOpenEnrollModal: () => void;
}

export const MilestonesPage: React.FC<MilestonesPageProps> = ({ onNavigate, onOpenEnrollModal }) => {
  const [activeTab, setActiveTab] = useState<'baby' | 'middle' | 'top'>('baby');

  const milestonesData = {
    baby: {
      title: 'Baby Class Milestones (Ages 1.5 – 3)',
      goals: [
        'Recognizes familiar songs, rhymes, and caregiver voices',
        'Improves finger pincer grasp through building block stacking',
        'Expresses emotions constructively and practices turn-taking',
        'Develops early balance, walking agility, and spatial awareness',
      ]
    },
    middle: {
      title: 'Middle Class Milestones (Ages 3 – 4)',
      goals: [
        'Identifies basic shapes, primary colors, and initial phonics sounds',
        'Demonstrates self-independence during snack time and handwashing',
        'Participates actively in group story circles and puppet plays',
        'Builds motor control for holding crayons, scissors, and paintbrushes',
      ]
    },
    top: {
      title: 'Top Class Milestones (Ages 4 – 6)',
      goals: [
        'Reads initial 3-letter words and writes upper/lower case letters',
        'Performs simple number counting (1–50) and basic spatial addition',
        'Displays strong social cooperation, empathy, and leadership skills',
        'Full readiness for primary school transition with high academic confidence',
      ]
    }
  };

  const current = milestonesData[activeTab];

  return (
    <div className="w-full bg-slate-50 min-h-screen text-slate-900 pb-16">
      
      {/* 1. HEADER BANNER */}
      <section className="bg-[#0B1528] text-white py-14 px-4 sm:px-6 lg:px-8 border-b-4 border-amber-500 text-left">
        <div className="max-w-7xl mx-auto space-y-3">
          <div className="text-xs font-black text-amber-400 tracking-widest uppercase flex items-center gap-2">
            <span>SCHOOL PORTAL</span>
            <span>/</span>
            <span className="text-amber-200">CHILD GROWTH & MILESTONES</span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-black text-white tracking-tight">
            Child Growth & Milestones Tracker
          </h1>

          <p className="text-slate-300 text-base sm:text-lg max-w-3xl font-medium leading-relaxed">
            Track early developmental milestones in communication, emotional confidence, creativity, and primary school readiness.
          </p>
        </div>
      </section>

      {/* 2. INTERACTIVE TRACKER */}
      <section className="py-14 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto space-y-8 text-left">
        
        <div className="flex justify-center gap-3">
          {(['baby', 'middle', 'top'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 rounded-2xl font-black text-xs uppercase tracking-wider transition-all ${
                activeTab === tab
                  ? 'bg-orange-600 text-white shadow-lg ring-2 ring-orange-300'
                  : 'bg-white text-slate-600 border border-slate-300 hover:bg-slate-100'
              }`}
            >
              {tab === 'baby' ? 'Baby Class (1.5–3 yrs)' : tab === 'middle' ? 'Middle Class (3–4 yrs)' : 'Top Class (4–6 yrs)'}
            </button>
          ))}
        </div>

        <div className="bg-white rounded-3xl p-8 shadow-xl border-2 border-amber-200 space-y-6">
          <div className="flex items-center justify-between border-b border-slate-200 pb-4">
            <h2 className="text-2xl font-black text-slate-900">{current.title}</h2>
            <div className="px-3.5 py-1 bg-amber-100 text-orange-950 font-black text-xs rounded-full uppercase">
              EARLY MILESTONES
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {current.goals.map((g, i) => (
              <div key={i} className="flex items-start gap-3 bg-slate-50 p-4 rounded-2xl border border-slate-200">
                <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                <span className="text-slate-800 text-xs font-bold leading-relaxed">{g}</span>
              </div>
            ))}
          </div>

          <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-slate-500 font-medium">
              Caregivers provide term progress reports to parents in Rubavu District.
            </p>
            <button
              onClick={() => onNavigate('enrollment')}
              className="px-6 py-3 bg-orange-600 text-white font-black text-xs rounded-xl shadow-md hover:bg-orange-500 transition-all shrink-0"
            >
              Enroll My Child Now →
            </button>
          </div>
        </div>

      </section>

    </div>
  );
};
