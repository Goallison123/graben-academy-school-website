import React, { useState } from 'react';
import { ChevronDown, Volume2, VolumeX, Menu, X, ArrowUpRight } from 'lucide-react';
import { SchoolConfig } from '../types';
import { SubPageType } from './GrabenSchoolWebsite';

interface NavbarProps {
  schoolConfig: SchoolConfig;
  activeTab: 'website' | 'canvas' | 'sanctuary' | 'fridge' | 'teacher';
  setActiveTab: (tab: 'website' | 'canvas' | 'sanctuary' | 'fridge' | 'teacher') => void;
  websiteSubPage: SubPageType;
  setWebsiteSubPage: (subPage: SubPageType) => void;
  childName: string;
  onChangeNameClick: () => void;
  unseenFridgeCount: number;
  isMuted: boolean;
  onToggleMute: () => void;
  onOpenPWAInfo: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  schoolConfig,
  activeTab,
  setActiveTab,
  websiteSubPage,
  setWebsiteSubPage,
  childName,
  onChangeNameClick,
  unseenFridgeCount,
  isMuted,
  onToggleMute,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  const handleNavWebsite = (subPage: SubPageType) => {
    setActiveTab('website');
    setWebsiteSubPage(subPage);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavTab = (tab: 'canvas' | 'sanctuary' | 'fridge' | 'teacher') => {
    setActiveTab(tab);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-amber-200 shadow-sm font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-3">
          
          {/* Brand & School Logo */}
          <button
            onClick={() => handleNavWebsite('home')}
            className="flex items-center gap-2.5 text-left group focus:outline-none shrink-0"
            id="school-brand-btn"
          >
            <span className="w-10 h-10 rounded-xl bg-orange-600 text-white flex items-center justify-center text-xl shadow-xs font-bold border border-amber-300 group-hover:scale-105 transition-transform">
              {schoolConfig.logoEmoji}
            </span>
            <div>
              <div className="font-black text-slate-900 text-sm sm:text-base leading-tight truncate uppercase tracking-tight">
                {schoolConfig.schoolName}
              </div>
              <div className="text-[10px] sm:text-xs font-bold text-orange-600 tracking-wider uppercase mt-0.5">
                Rugerero • Rubavu District
              </div>
            </div>
          </button>

          {/* Desktop Dropdown Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            
            {/* Home */}
            <button
              onClick={() => handleNavWebsite('home')}
              className={`px-3 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'website' && websiteSubPage === 'home'
                  ? 'bg-amber-100 text-orange-700 font-black'
                  : 'text-slate-700 hover:text-orange-600 hover:bg-amber-50'
              }`}
            >
              Home
            </button>

            {/* About & Classes Dropdown */}
            <div className="relative group">
              <button
                className={`px-3 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1 ${
                  activeTab === 'website' && ['about', 'programs', 'milestones'].includes(websiteSubPage)
                    ? 'bg-amber-100 text-orange-700 font-black'
                    : 'text-slate-700 hover:text-orange-600 hover:bg-amber-50'
                }`}
              >
                <span>About & Classes</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400 group-hover:rotate-180 transition-transform" />
              </button>

              <div className="absolute top-full left-0 pt-1.5 w-64 hidden group-hover:block hover:block z-50">
                <div className="bg-white rounded-2xl shadow-2xl border border-amber-200 p-2 space-y-1">
                  <button
                    onClick={() => handleNavWebsite('about')}
                    className="w-full text-left p-2.5 rounded-xl hover:bg-amber-50 text-slate-800 hover:text-orange-600 text-xs font-bold transition-colors flex items-center gap-2"
                  >
                    <span>🏫</span>
                    <span>About Graben & Directress</span>
                  </button>
                  <button
                    onClick={() => handleNavWebsite('programs')}
                    className="w-full text-left p-2.5 rounded-xl hover:bg-amber-50 text-slate-800 hover:text-orange-600 text-xs font-bold transition-colors flex items-center gap-2"
                  >
                    <span>📚</span>
                    <span>Baby, Middle & Top Streams</span>
                  </button>
                  <button
                    onClick={() => handleNavWebsite('milestones')}
                    className="w-full text-left p-2.5 rounded-xl hover:bg-amber-50 text-slate-800 hover:text-orange-600 text-xs font-bold transition-colors flex items-center gap-2"
                  >
                    <span>⭐</span>
                    <span>Child Growth & Milestones</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Play & Discovery Dropdown */}
            <div className="relative group">
              <button
                className={`px-3 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1 ${
                  activeTab === 'canvas' || activeTab === 'sanctuary' || (activeTab === 'website' && ['sports', 'facilities', 'gallery'].includes(websiteSubPage))
                    ? 'bg-amber-100 text-orange-700 font-black'
                    : 'text-slate-700 hover:text-orange-600 hover:bg-amber-50'
                }`}
              >
                <span>Play & Discovery</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400 group-hover:rotate-180 transition-transform" />
              </button>

              <div className="absolute top-full left-0 pt-1.5 w-72 hidden group-hover:block hover:block z-50">
                <div className="bg-white rounded-2xl shadow-2xl border border-amber-200 p-2 space-y-1">
                  <button
                    onClick={() => handleNavTab('canvas')}
                    className="w-full text-left p-2.5 rounded-xl bg-amber-50 hover:bg-amber-100 text-orange-950 font-black text-xs transition-colors flex items-center justify-between border border-amber-200/80"
                  >
                    <span className="flex items-center gap-2">
                      <span>🌸</span>
                      <span>Peítho Discovery Canvas</span>
                    </span>
                    <span className="px-2 py-0.5 bg-orange-600 text-white text-[9px] font-black rounded-full uppercase">Game</span>
                  </button>

                  <button
                    onClick={() => handleNavTab('sanctuary')}
                    className="w-full text-left p-2.5 rounded-xl hover:bg-emerald-50 text-slate-800 hover:text-emerald-700 text-xs font-bold transition-colors flex items-center gap-2"
                  >
                    <span>🏡</span>
                    <span>Living Sanctuary World</span>
                  </button>

                  <button
                    onClick={() => handleNavWebsite('sports')}
                    className="w-full text-left p-2.5 rounded-xl hover:bg-amber-50 text-slate-800 hover:text-orange-600 text-xs font-bold transition-colors flex items-center gap-2"
                  >
                    <span>⚽</span>
                    <span>Outdoor Playground & Sports</span>
                  </button>

                  <button
                    onClick={() => handleNavWebsite('facilities')}
                    className="w-full text-left p-2.5 rounded-xl hover:bg-amber-50 text-slate-800 hover:text-orange-600 text-xs font-bold transition-colors flex items-center gap-2"
                  >
                    <span>☀️</span>
                    <span>Campus & Care Facilities</span>
                  </button>

                  <button
                    onClick={() => handleNavWebsite('gallery')}
                    className="w-full text-left p-2.5 rounded-xl hover:bg-amber-50 text-slate-800 hover:text-orange-600 text-xs font-bold transition-colors flex items-center gap-2"
                  >
                    <span>📷</span>
                    <span>Nursery Picture Gallery</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Portals & Fridge Dropdown */}
            <div className="relative group">
              <button
                className={`px-3 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1 ${
                  ['fridge', 'teacher', 'owner'].includes(activeTab)
                    ? 'bg-amber-100 text-orange-700 font-black'
                    : 'text-slate-700 hover:text-orange-600 hover:bg-amber-50'
                }`}
              >
                <span>Portals & Fridge</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400 group-hover:rotate-180 transition-transform" />
              </button>

              <div className="absolute top-full left-0 pt-1.5 w-64 hidden group-hover:block hover:block z-50">
                <div className="bg-white rounded-2xl shadow-2xl border border-amber-200 p-2 space-y-1">
                  <button
                    onClick={() => handleNavTab('fridge')}
                    className="w-full text-left p-2.5 rounded-xl hover:bg-rose-50 text-slate-800 hover:text-rose-700 text-xs font-bold transition-colors flex items-center justify-between"
                  >
                    <span className="flex items-center gap-2">
                      <span>❤️</span>
                      <span>Digital Fridge Gallery</span>
                    </span>
                    {unseenFridgeCount > 0 && (
                      <span className="px-1.5 py-0.5 text-[9px] font-black rounded-full bg-rose-500 text-white">
                        {unseenFridgeCount}
                      </span>
                    )}
                  </button>

                  <button
                    onClick={() => handleNavTab('teacher')}
                    className="w-full text-left p-2.5 rounded-xl hover:bg-sky-50 text-slate-800 hover:text-sky-700 text-xs font-bold transition-colors flex items-center gap-2"
                  >
                    <span>👩‍🏫</span>
                    <span>Teacher Praise Portal</span>
                  </button>
                </div>
              </div>
            </div>

            {/* News & Admissions Dropdown */}
            <div className="relative group">
              <button
                className={`px-3 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1 ${
                  activeTab === 'website' && ['news', 'enrollment'].includes(websiteSubPage)
                    ? 'bg-amber-100 text-orange-700 font-black'
                    : 'text-slate-700 hover:text-orange-600 hover:bg-amber-50'
                }`}
              >
                <span>News & Admissions</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400 group-hover:rotate-180 transition-transform" />
              </button>

              <div className="absolute top-full left-0 pt-1.5 w-64 hidden group-hover:block hover:block z-50">
                <div className="bg-white rounded-2xl shadow-2xl border border-amber-200 p-2 space-y-1">
                  <button
                    onClick={() => handleNavWebsite('news')}
                    className="w-full text-left p-2.5 rounded-xl hover:bg-amber-50 text-slate-800 hover:text-orange-600 text-xs font-bold transition-colors flex items-center gap-2"
                  >
                    <span>📰</span>
                    <span>Nursery News & Bulletins</span>
                  </button>
                  <button
                    onClick={() => handleNavWebsite('enrollment')}
                    className="w-full text-left p-2.5 rounded-xl hover:bg-amber-50 text-slate-800 hover:text-orange-600 text-xs font-bold transition-colors flex items-center gap-2"
                  >
                    <span>📝</span>
                    <span>Online Enrollment Desk</span>
                  </button>
                </div>
              </div>
            </div>

          </nav>

          {/* Right Action Area */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => handleNavTab('canvas')}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 bg-amber-400 hover:bg-amber-300 text-orange-950 font-black text-xs rounded-full shadow-xs border border-amber-300 transition-all active:scale-95"
            >
              <span>🌸 Play Peítho</span>
            </button>

            <button
              onClick={() => handleNavWebsite('enrollment')}
              className="px-3.5 py-1.5 bg-orange-600 hover:bg-orange-500 text-white font-black text-xs rounded-full shadow-md flex items-center gap-1 transition-all active:scale-95"
            >
              <span>Enroll Now</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>

            {/* Audio Toggle */}
            <button
              onClick={onToggleMute}
              className={`p-1.5 rounded-xl border transition-colors ${
                isMuted
                  ? 'bg-amber-50 text-amber-500 border-amber-200'
                  : 'bg-orange-100 text-orange-700 border-orange-300 hover:bg-orange-200'
              }`}
              title={isMuted ? 'Unmute Audio' : 'Mute Audio'}
            >
              {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </button>

            {/* Child Name Badge */}
            <button
              onClick={onChangeNameClick}
              className="hidden md:flex items-center px-2.5 py-1 rounded-xl bg-amber-100 border border-amber-300 text-orange-950 text-xs font-bold hover:bg-amber-200 transition-colors"
              title="Click to change child name"
            >
              <span>👶 <strong className="text-orange-600">{childName}</strong></span>
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-slate-700 hover:text-orange-600 rounded-xl bg-slate-100"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-amber-200 p-4 space-y-4 shadow-xl text-left max-h-[85vh] overflow-y-auto animate-fadeIn">
          {/* Main Pages */}
          <div className="space-y-1">
            <div className="text-[10px] font-black text-orange-600 uppercase tracking-wider px-2">
              Main Website Pages
            </div>
            <button onClick={() => handleNavWebsite('home')} className="w-full text-left p-2 rounded-xl hover:bg-amber-50 text-xs font-bold text-slate-800 flex items-center gap-2">
              🏠 Home Page
            </button>
            <button onClick={() => handleNavWebsite('about')} className="w-full text-left p-2 rounded-xl hover:bg-amber-50 text-xs font-bold text-slate-800 flex items-center gap-2">
              🏫 About Graben & Directress
            </button>
            <button onClick={() => handleNavWebsite('programs')} className="w-full text-left p-2 rounded-xl hover:bg-amber-50 text-xs font-bold text-slate-800 flex items-center gap-2">
              📚 Baby, Middle & Top Streams
            </button>
            <button onClick={() => handleNavWebsite('milestones')} className="w-full text-left p-2 rounded-xl hover:bg-amber-50 text-xs font-bold text-slate-800 flex items-center gap-2">
              ⭐ Child Growth Milestones
            </button>
          </div>

          {/* Play & Discovery */}
          <div className="space-y-1">
            <div className="text-[10px] font-black text-amber-600 uppercase tracking-wider px-2">
              Play & Discovery Games
            </div>
            <button onClick={() => handleNavTab('canvas')} className="w-full text-left p-2 rounded-xl bg-amber-100 text-xs font-black text-orange-950 flex items-center justify-between">
              <span>🌸 Peítho Discovery Canvas</span>
              <span className="px-2 py-0.5 bg-orange-600 text-white text-[9px] rounded-full uppercase">Play Game</span>
            </button>
            <button onClick={() => handleNavTab('sanctuary')} className="w-full text-left p-2 rounded-xl hover:bg-amber-50 text-xs font-bold text-slate-800 flex items-center gap-2">
              🏡 Living Sanctuary
            </button>
            <button onClick={() => handleNavWebsite('sports')} className="w-full text-left p-2 rounded-xl hover:bg-amber-50 text-xs font-bold text-slate-800 flex items-center gap-2">
              ⚽ Outdoor Playground & Sports
            </button>
            <button onClick={() => handleNavWebsite('facilities')} className="w-full text-left p-2 rounded-xl hover:bg-amber-50 text-xs font-bold text-slate-800 flex items-center gap-2">
              ☀️ Campus & Care Facilities
            </button>
            <button onClick={() => handleNavWebsite('gallery')} className="w-full text-left p-2 rounded-xl hover:bg-amber-50 text-xs font-bold text-slate-800 flex items-center gap-2">
              📷 Nursery Picture Gallery
            </button>
          </div>

          {/* Community & Portals */}
          <div className="space-y-1">
            <div className="text-[10px] font-black text-rose-600 uppercase tracking-wider px-2">
              Portals & Fridge
            </div>
            <button onClick={() => handleNavTab('fridge')} className="w-full text-left p-2 rounded-xl hover:bg-rose-50 text-xs font-bold text-slate-800 flex items-center justify-between">
              <span>❤️ Digital Fridge Gallery</span>
              {unseenFridgeCount > 0 && <span className="px-1.5 py-0.5 text-[9px] bg-rose-500 text-white font-black rounded-full">{unseenFridgeCount}</span>}
            </button>
            <button onClick={() => handleNavTab('teacher')} className="w-full text-left p-2 rounded-xl hover:bg-sky-50 text-xs font-bold text-slate-800 flex items-center gap-2">
              👩‍🏫 Teacher Portal
            </button>
          </div>

          {/* News & Admissions */}
          <div className="space-y-1">
            <div className="text-[10px] font-black text-orange-600 uppercase tracking-wider px-2">
              News & Admissions
            </div>
            <button onClick={() => handleNavWebsite('news')} className="w-full text-left p-2 rounded-xl hover:bg-amber-50 text-xs font-bold text-slate-800 flex items-center gap-2">
              📰 News & Bulletins
            </button>
            <button onClick={() => handleNavWebsite('enrollment')} className="w-full text-left p-2.5 rounded-xl bg-orange-600 text-white font-black text-xs flex items-center justify-between">
              <span>📝 Online Enrollment Desk</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
