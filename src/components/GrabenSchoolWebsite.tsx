import React, { useState } from 'react';
import {
  Phone,
  Mail,
  MapPin,
  Info,
  ChevronRight,
  ChevronDown,
  ArrowUpRight,
  CheckCircle,
  Users,
  Award,
  BookOpen,
  Trophy,
  Camera,
  Newspaper,
  Menu,
  X
} from 'lucide-react';
import { SchoolConfig } from '../types';
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { ProgramsPage } from './pages/ProgramsPage';
import { SportsPage } from './pages/SportsPage';
import { NewsPage } from './pages/NewsPage';
import { EnrollmentPage } from './pages/EnrollmentPage';
import { FacilitiesPage } from './pages/FacilitiesPage';
import { MilestonesPage } from './pages/MilestonesPage';
import { GalleryPage } from './pages/GalleryPage';

export type SubPageType =
  | 'home'
  | 'about'
  | 'programs'
  | 'sports'
  | 'news'
  | 'enrollment'
  | 'facilities'
  | 'milestones'
  | 'gallery';

interface GrabenSchoolWebsiteProps {
  schoolConfig: SchoolConfig;
  onOpenCanvas: () => void;
  onOpenSanctuary: () => void;
  onOpenFridge: () => void;
  onOpenTeacher: () => void;
  currentSubPage?: SubPageType;
  onNavigateSubPage?: (page: SubPageType) => void;
}

export const GrabenSchoolWebsite: React.FC<GrabenSchoolWebsiteProps> = ({
  schoolConfig,
  onOpenCanvas,
  onOpenSanctuary,
  onOpenFridge,
  onOpenTeacher,
  currentSubPage: externalSubPage,
  onNavigateSubPage,
}) => {
  // Current active website sub-page (fallback to local if not provided)
  const [localSubPage, setLocalSubPage] = useState<SubPageType>('home');
  const activeSubPage = externalSubPage ?? localSubPage;

  // Quick Enrollment Modal state & form inputs
  const [showEnrollModal, setShowEnrollModal] = useState<boolean>(false);
  const [enrollFormSuccess, setEnrollFormSuccess] = useState<boolean>(false);
  const [modalParentName, setModalParentName] = useState<string>('');
  const [modalChildInfo, setModalChildInfo] = useState<string>('');
  const [modalPhone, setModalPhone] = useState<string>('');
  const [modalStream, setModalStream] = useState<string>('Baby Class (Ages 1.5 – 3 Years)');

  const handleNavigate = (page: SubPageType) => {
    if (onNavigateSubPage) {
      onNavigateSubPage(page);
    } else {
      setLocalSubPage(page);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleModalWhatsAppSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const whatsappNum = '250788123456';
    const msg = `*GRABEN HIGHLIGHT ACADEMY - ENROLLMENT APPLICATION*\n\n` +
      `👤 *Parent/Guardian:* ${modalParentName}\n` +
      `👶 *Child Name & Age:* ${modalChildInfo}\n` +
      `📱 *Phone:* ${modalPhone}\n` +
      `📚 *Nursery Stream:* ${modalStream}\n` +
      `📍 *Location:* Rugerero Sector, Rubavu District`;
    const whatsappUrl = `https://wa.me/${whatsappNum}?text=${encodeURIComponent(msg)}`;
    window.open(whatsappUrl, '_blank');
    setEnrollFormSuccess(true);
  };

  return (
    <div className="w-full bg-[#7C2D12] text-white font-sans min-h-screen flex flex-col selection:bg-amber-400 selection:text-orange-950">
      
      {/* ACTIVE SUB-PAGE CONTAINER */}
      <main className="flex-1 w-full">
        {activeSubPage === 'home' && (
          <HomePage
            onNavigate={handleNavigate}
            onOpenCanvas={onOpenCanvas}
            onOpenEnrollModal={() => setShowEnrollModal(true)}
          />
        )}
        {activeSubPage === 'about' && (
          <AboutPage
            onNavigate={handleNavigate}
            onOpenEnrollModal={() => setShowEnrollModal(true)}
          />
        )}
        {activeSubPage === 'programs' && (
          <ProgramsPage
            onNavigate={handleNavigate}
            onOpenEnrollModal={() => setShowEnrollModal(true)}
          />
        )}
        {activeSubPage === 'sports' && (
          <SportsPage
            onNavigate={handleNavigate}
            onOpenEnrollModal={() => setShowEnrollModal(true)}
          />
        )}
        {activeSubPage === 'news' && (
          <NewsPage
            onNavigate={handleNavigate}
            onOpenEnrollModal={() => setShowEnrollModal(true)}
          />
        )}
        {activeSubPage === 'enrollment' && (
          <EnrollmentPage onNavigate={handleNavigate} />
        )}
        {activeSubPage === 'facilities' && (
          <FacilitiesPage
            onNavigate={handleNavigate}
            onOpenEnrollModal={() => setShowEnrollModal(true)}
          />
        )}
        {activeSubPage === 'milestones' && (
          <MilestonesPage
            onNavigate={handleNavigate}
            onOpenEnrollModal={() => setShowEnrollModal(true)}
          />
        )}
        {activeSubPage === 'gallery' && (
          <GalleryPage
            onNavigate={handleNavigate}
            onOpenEnrollModal={() => setShowEnrollModal(true)}
          />
        )}
      </main>

      {/* 4. FOOTER (Matches Image 1 & 2 Footer) */}
      <footer className="bg-[#0B1528] text-white pt-16 pb-12 px-4 sm:px-6 lg:px-8 border-t-4 border-amber-500 text-left">
        <div className="max-w-7xl mx-auto space-y-12">
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-xs">
            
            {/* Col 1: Brand & Contact Summary */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-amber-500 text-white flex items-center justify-center text-xl shadow-md font-bold">
                  🏫
                </div>
                <div>
                  <div className="font-black text-white text-base tracking-tight uppercase">
                    GRABEN HIGHLIGHT ACADEMY
                  </div>
                  <div className="text-[10px] font-bold text-amber-400 tracking-wider uppercase">
                    RUBAVU DISTRICT • EST. 2018
                  </div>
                </div>
              </div>

              <p className="text-slate-400 text-xs font-medium leading-relaxed">
                A premier nursery school in Rubavu District dedicated to joyful, play-based learning, early literacy, and certified early childhood care.
              </p>

              <div className="p-3 bg-slate-900/80 rounded-2xl border border-slate-800 text-[11px] text-amber-300 font-bold">
                🎗 Motto: Nurturing Young Minds • Learning Through Play & Discovery
              </div>

              <button
                onClick={onOpenCanvas}
                className="w-full py-3 bg-amber-400 hover:bg-amber-300 text-orange-950 font-black rounded-2xl shadow-md flex items-center justify-center gap-2 transition-all"
                id="footer-play-peitho-btn"
              >
                <Info className="w-4 h-4 text-orange-900" />
                <span>Play Peítho Connection Game</span>
              </button>
            </div>

            {/* Col 2: Full Site Navigation */}
            <div className="space-y-3">
              <h4 className="font-black text-white text-xs uppercase tracking-widest text-slate-300">
                FULL SITE NAVIGATION
              </h4>
              <ul className="space-y-2 font-medium text-slate-400">
                <li><button onClick={() => handleNavigate('home')} className="hover:text-amber-400">• Home Page</button></li>
                <li><button onClick={() => handleNavigate('about')} className="hover:text-amber-400">• About Academy & Directress</button></li>
                <li><button onClick={() => handleNavigate('programs')} className="hover:text-amber-400">• Nursery Programs (Baby/Middle/Top)</button></li>
                <li><button onClick={() => handleNavigate('sports')} className="hover:text-amber-400">• Playground & Outdoor Sports</button></li>
                <li><button onClick={() => handleNavigate('facilities')} className="hover:text-amber-400">• Campus & Care Facilities</button></li>
                <li><button onClick={() => handleNavigate('milestones')} className="hover:text-amber-400">• Child Growth Milestones</button></li>
                <li><button onClick={() => handleNavigate('gallery')} className="hover:text-amber-400">• Picture Gallery</button></li>
                <li><button onClick={() => handleNavigate('news')} className="hover:text-amber-400">• Nursery News & Bulletins</button></li>
                <li><button onClick={() => handleNavigate('enrollment')} className="hover:text-amber-400">• Enrollment & Care Fees</button></li>
              </ul>
            </div>

            {/* Col 3: Nursery Streams */}
            <div className="space-y-3">
              <h4 className="font-black text-white text-xs uppercase tracking-widest text-slate-300">
                NURSERY STREAMS
              </h4>
              <ul className="space-y-2.5 font-medium text-slate-400">
                <li className="flex items-center gap-2 cursor-pointer" onClick={() => handleNavigate('programs')}>
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-400"></span>
                  <span>Baby Class (Ages 1.5 – 3 Years)</span>
                </li>
                <li className="flex items-center gap-2 cursor-pointer" onClick={() => handleNavigate('programs')}>
                  <span className="w-2.5 h-2.5 rounded-full bg-orange-500"></span>
                  <span>Middle Class (Ages 3 – 4 Years)</span>
                </li>
                <li className="flex items-center gap-2 cursor-pointer" onClick={() => handleNavigate('programs')}>
                  <span className="w-2.5 h-2.5 rounded-full bg-sky-400"></span>
                  <span>Top Class (Ages 4 – 6 Years)</span>
                </li>
                <li className="flex items-center gap-2 cursor-pointer" onClick={() => handleNavigate('sports')}>
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400"></span>
                  <span>Outdoor Mini Sports & Agility</span>
                </li>
              </ul>
            </div>

            {/* Col 4: Registrar Channels */}
            <div className="space-y-3">
              <h4 className="font-black text-white text-xs uppercase tracking-widest text-slate-300">
                REGISTRAR CHANNELS
              </h4>
              <ul className="space-y-3 font-medium text-slate-400">
                <li className="flex items-start gap-2">
                  <Phone className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <span>+250 788 123 456</span>
                </li>
                <li className="flex items-start gap-2">
                  <Mail className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <span>admissions@grabenhighlight.edu.rw</span>
                </li>
                <li className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <span>Rugerero Sector, Rubavu District, Western Province, Rwanda</span>
                </li>
              </ul>
            </div>

          </div>

          {/* Bottom Copyright & Registrar Bar */}
          <div className="pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-500 text-[11px] font-medium">
            <div>
              © 2026 Graben Highlight Academy. All rights reserved.
            </div>
            <div>
              Service provided by <span className="text-slate-300 font-bold">Sybella Systems</span> | Rep: Bessora neema Hirwa
            </div>
          </div>

        </div>
      </footer>

      {/* ENROLLMENT MODAL */}
      {showEnrollModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl border-4 border-amber-300 text-orange-950 text-left space-y-4 animate-fadeIn">
            
            <div className="flex items-center justify-between border-b border-amber-200 pb-3">
              <h3 className="text-xl font-black text-orange-950">
                Enroll at Graben Highlight Academy
              </h3>
              <button
                onClick={() => { setShowEnrollModal(false); setEnrollFormSuccess(false); }}
                className="text-slate-400 hover:text-slate-700 font-black text-lg"
              >
                ✕
              </button>
            </div>

            {enrollFormSuccess ? (
              <div className="p-4 bg-emerald-100 border-2 border-emerald-300 rounded-2xl text-emerald-950 text-center space-y-2">
                <CheckCircle className="w-8 h-8 text-emerald-600 mx-auto" />
                <div className="font-black text-base">Application Sent to WhatsApp!</div>
                <p className="text-xs font-medium">
                  Thank you! WhatsApp has opened with your pre-filled application details. Our registrar team in Rugerero, Rubavu District will assist you right away.
                </p>
                <button
                  onClick={() => { setShowEnrollModal(false); setEnrollFormSuccess(false); }}
                  className="mt-2 w-full py-2 bg-emerald-600 text-white font-black rounded-xl text-xs shadow-md"
                >
                  Close
                </button>
              </div>
            ) : (
              <form
                onSubmit={handleModalWhatsAppSubmit}
                className="space-y-3 text-xs font-bold"
              >
                <div>
                  <label className="block text-orange-900 mb-1">Parent / Guardian Full Name</label>
                  <input
                    required
                    type="text"
                    value={modalParentName}
                    onChange={(e) => setModalParentName(e.target.value)}
                    placeholder="e.g. Bessora Neema"
                    className="w-full p-3 rounded-xl border-2 border-amber-200 focus:border-amber-400 outline-hidden font-medium"
                  />
                </div>

                <div>
                  <label className="block text-orange-900 mb-1">Child's Name & Age</label>
                  <input
                    required
                    type="text"
                    value={modalChildInfo}
                    onChange={(e) => setModalChildInfo(e.target.value)}
                    placeholder="e.g. Maya (Age 3)"
                    className="w-full p-3 rounded-xl border-2 border-amber-200 focus:border-amber-400 outline-hidden font-medium"
                  />
                </div>

                <div>
                  <label className="block text-orange-900 mb-1">Phone Number (+250)</label>
                  <input
                    required
                    type="tel"
                    value={modalPhone}
                    onChange={(e) => setModalPhone(e.target.value)}
                    placeholder="+250 788 123 456"
                    className="w-full p-3 rounded-xl border-2 border-amber-200 focus:border-amber-400 outline-hidden font-medium"
                  />
                </div>

                <div>
                  <label className="block text-orange-900 mb-1">Select Nursery Stream</label>
                  <select
                    value={modalStream}
                    onChange={(e) => setModalStream(e.target.value)}
                    className="w-full p-3 rounded-xl border-2 border-amber-200 focus:border-amber-400 outline-hidden font-medium bg-white"
                  >
                    <option value="Baby Class (Ages 1.5 – 3 Years)">Baby Class (Ages 1.5 – 3 Years)</option>
                    <option value="Middle Class (Ages 3 – 4 Years)">Middle Class (Ages 3 – 4 Years)</option>
                    <option value="Top Class (Ages 4 – 6 Years)">Top Class (Ages 4 – 6 Years)</option>
                    <option value="Play & Sports Agility Stream">Play & Sports Agility Stream</option>
                  </select>
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white font-black text-sm rounded-xl shadow-md transition-all mt-2 flex items-center justify-center gap-2 active:scale-95"
                >
                  <span>Send Application via WhatsApp 💬</span>
                </button>
              </form>
            )}

          </div>
        </div>
      )}

    </div>
  );
};
