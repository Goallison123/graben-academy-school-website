import React, { useState } from 'react';
import {
  Newspaper,
  Calendar,
  Clock,
  ChevronRight,
  Sparkles,
  ArrowUpRight,
  BookOpen
} from 'lucide-react';
import { SubPageType } from '../GrabenSchoolWebsite';

interface NewsPageProps {
  onNavigate: (page: SubPageType) => void;
  onOpenEnrollModal: () => void;
}

export const NewsPage: React.FC<NewsPageProps> = ({ onNavigate, onOpenEnrollModal }) => {
  const [selectedArticle, setSelectedArticle] = useState<number | null>(null);

  const articles = [
    {
      id: 1,
      tag: 'NURSERY ANNOUNCEMENT',
      date: 'JULY 18, 2026',
      title: 'Graben Highlight Academy Welcomes New Nursery Cohort in Rubavu District',
      summary: 'Parents and toddlers gathered for Orientation Day as Graben Highlight Academy opened registration for Baby Class, Middle Class, and Top Class.',
      content: `Graben Highlight Academy officially welcomed new nursery scholars and their parents for the upcoming academic year in Rubavu District. During Orientation Day, Directress Marie-Claire Mukamana introduced our dedicated team of certified caregivers and walked families through our play-based learning atelier, outdoor sports turf, and nap rooms.

Registration remains open for Baby Class (ages 1.5–3), Middle Class (ages 3–4), and Top Class (ages 4–6). Parents are encouraged to complete our online enrollment form or visit our registrar desk in Rugerero Sector, Rubavu District.`
    },
    {
      id: 2,
      tag: 'PARENT GUIDANCE',
      date: 'JUNE 25, 2026',
      title: 'The Importance of Play-Based Early Literacy & Cognitive Growth',
      summary: 'Our early childhood experts share key insights on how play-based learning strengthens brain development, language acquisition, and social confidence.',
      content: `Research in early childhood development consistently shows that toddlers absorb language and foundational math concepts best through active, play-based exploration rather than rote memorization.

At Graben Highlight Academy, our curriculum integrates sensory building blocks, storytelling circles, and musical rhythm games. By surrounding children with structured play in a loving environment, we help them develop lifelong curiosity, emotional security, and confidence before transitioning to primary school.`
    },
    {
      id: 3,
      tag: 'CAMPUS UPGRADES',
      date: 'MAY 10, 2026',
      title: 'Upgraded Outdoor Playground & Safety Equipment',
      summary: 'Graben Highlight Academy has expanded its outdoor play area with soft turf, mini basketball courts, and balance play structures for healthy motor development.',
      content: `We are thrilled to announce the completion of our upgraded campus playground in Rugerero Sector, Rubavu District!

The new physical agility area features non-abrasive soft green turf, lowered mini basketball hoops, soft lawn soccer goals, and balance beam tracks designed specifically for nursery scholars. Safety remains our highest priority, with 100% caregiver supervision during every outdoor play period.`
    }
  ];

  return (
    <div className="w-full bg-slate-50 min-h-screen text-slate-900 pb-16">
      
      {/* 1. DARK BLUE HEADER BANNER (Matches Screenshot 13 Header) */}
      <section className="bg-[#0B1528] text-white py-14 px-4 sm:px-6 lg:px-8 border-b-4 border-amber-500 text-left">
        <div className="max-w-7xl mx-auto space-y-3">
          
          <div className="text-xs font-black text-amber-400 tracking-widest uppercase flex items-center gap-2">
            <span>SCHOOL PORTAL</span>
            <span>/</span>
            <span className="text-amber-200">NURSERY NEWS & ANNOUNCEMENTS</span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-black text-white tracking-tight">
            Nursery News & Announcements
          </h1>

          <p className="text-slate-300 text-base sm:text-lg max-w-3xl font-medium leading-relaxed">
            Stay updated with orientation announcements, parent workshop dates, campus upgrades, and nursery events.
          </p>

        </div>
      </section>

      {/* 2. SECTION TITLE & HEADER BUTTON (Matches Screenshot 13) */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8 text-left">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200 pb-6">
          <div className="space-y-2">
            <div className="text-xs font-black text-amber-600 tracking-wider uppercase">
              OFFICIAL BULLETINS & ANNOUNCEMENTS
            </div>
            <h2 className="text-3xl font-black text-slate-900 tracking-tight">
              School News & Press Releases
            </h2>
            <div className="w-16 h-1 bg-orange-600 rounded-full"></div>
          </div>

          <button
            onClick={() => setSelectedArticle(0)}
            className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-black text-xs rounded-xl transition-all border border-slate-300 flex items-center gap-1.5 self-start md:self-auto"
          >
            <span>Read Latest Official Bulletin</span>
            <ChevronRight className="w-4 h-4 text-orange-600" />
          </button>
        </div>

        {/* 3 ARTICLES GRID (Matches Screenshot 13) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {articles.map((art, idx) => (
            <div
              key={art.id}
              onClick={() => setSelectedArticle(idx)}
              className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between text-[10px] font-bold text-slate-400">
                  <span className="px-3 py-1 bg-orange-50 text-orange-950 font-black rounded-full border border-orange-200 uppercase tracking-wider">
                    {art.tag}
                  </span>
                  <span className="flex items-center gap-1 text-slate-500">
                    <Clock className="w-3 h-3 text-slate-400" />
                    {art.date}
                  </span>
                </div>

                <h3 className="text-lg font-black text-slate-900 group-hover:text-orange-600 transition-colors leading-tight">
                  {art.title}
                </h3>

                <p className="text-slate-600 text-xs leading-relaxed font-medium">
                  {art.summary}
                </p>
              </div>

              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs font-black text-orange-600">
                <span>Read Full Article</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>

      </section>

      {/* ARTICLE READER MODAL */}
      {selectedArticle !== null && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-2xl w-full shadow-2xl border-4 border-amber-300 text-slate-900 text-left space-y-4 max-h-[90vh] overflow-y-auto animate-fadeIn">
            
            {(() => {
              const art = articles[selectedArticle];
              return (
                <>
                  <div className="flex items-start justify-between border-b border-slate-200 pb-4 gap-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="px-3 py-1 bg-orange-100 text-orange-950 font-black text-[10px] rounded-full uppercase tracking-wider">
                          {art.tag}
                        </span>
                        <span className="text-xs font-bold text-slate-400">{art.date}</span>
                      </div>
                      <h3 className="text-2xl font-black text-slate-900 leading-tight pt-1">{art.title}</h3>
                    </div>
                    <button
                      onClick={() => setSelectedArticle(null)}
                      className="text-slate-400 hover:text-slate-700 font-black text-lg shrink-0"
                    >
                      ✕
                    </button>
                  </div>

                  <div className="space-y-3 text-slate-700 text-xs sm:text-sm leading-relaxed font-medium whitespace-pre-line py-2">
                    {art.content}
                  </div>

                  <div className="flex items-center justify-between border-t border-slate-200 pt-4">
                    <button
                      onClick={() => {
                        setSelectedArticle(null);
                        onNavigate('enrollment');
                      }}
                      className="px-6 py-2.5 bg-orange-600 hover:bg-orange-500 text-white font-black text-xs rounded-xl shadow-md transition-all"
                    >
                      Enroll Child Today
                    </button>
                    <button
                      onClick={() => setSelectedArticle(null)}
                      className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-black text-xs rounded-xl transition-all"
                    >
                      Close Bulletin
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
