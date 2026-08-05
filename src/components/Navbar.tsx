import React, { useState } from "react";
import { SchoolConfig } from "../types";
import LucideIcon from "./LucideIcon";
import { motion, AnimatePresence } from "motion/react";

interface NavbarProps {
  config: SchoolConfig;
  onNavigate: (sectionId: string) => void;
  activeSection: string;
  onOpenGame?: () => void;
}

export default function Navbar({ config, onNavigate, activeSection, onOpenGame }: NavbarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const navGroups = [
    {
      id: "home",
      label: "Home",
      directId: "home"
    },
    {
      id: "about-group",
      label: "About & Classes",
      items: [
        { id: "about", label: "About Academy", icon: "Heart" },
        { id: "academics", label: "Nursery Programs (Baby/Middle/Top)", icon: "Sparkles" },
        { id: "outcomes", label: "Child Milestones & Growth", icon: "Smile" }
      ]
    },
    {
      id: "play-group",
      label: "Play & Facilities",
      items: [
        { id: "sports-academy", label: "Outdoor Play & Mini Sports", icon: "Trophy" },
        { id: "campus", label: "Campus & Care Facilities", icon: "Home" },
        { id: "gallery", label: "Picture Gallery", icon: "Image" }
      ]
    },
    {
      id: "news-group",
      label: "News & Admissions",
      items: [
        { id: "news", label: "Nursery Bulletins & News", icon: "Newspaper" },
        { id: "contact", label: "Enrollment & Care Fees", icon: "ClipboardList" }
      ]
    }
  ];

  const handleMenuClick = (sectionId: string) => {
    onNavigate(sectionId);
    setIsMobileMenuOpen(false);
    setOpenDropdown(null);
  };

  return (
    <header 
      className="sticky top-0 z-40 bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100 transition-all duration-300"
      id="school-navbar"
    >
      <div className="max-w-[1400px] mx-auto px-2 sm:px-4 lg:px-5">
        <div className="flex justify-between items-center h-16 sm:h-18 gap-2 flex-nowrap">
          
          {/* School Brand Identity (Logo + Name) */}
          <div 
            className="flex items-center space-x-2.5 cursor-pointer shrink-0" 
            onClick={() => onNavigate("home")}
          >
            {config.logoUrl ? (
              <img 
                src={config.logoUrl} 
                alt={`${config.name} Logo`} 
                referrerPolicy="no-referrer"
                className="h-10 sm:h-11 w-10 sm:w-11 object-contain filter drop-shadow-sm transition-transform duration-300 hover:scale-105 shrink-0"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = "none";
                }}
              />
            ) : null}

            {(!config.logoUrl) && (
              <div 
                className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold text-sm tracking-widest shadow-sm border border-white/20 shrink-0"
                style={{ backgroundColor: config.primaryColor }}
              >
                <LucideIcon name="School" size={18} />
              </div>
            )}

            <div className="shrink-0">
              <div className="font-sans font-extrabold text-gray-900 text-xs sm:text-sm md:text-base leading-tight tracking-tight uppercase whitespace-nowrap">
                {config.name}
              </div>
              <div 
                className="text-[9px] sm:text-[10px] font-bold tracking-wide uppercase transition-colors whitespace-nowrap"
                style={{ color: config.secondaryColor }}
              >
                {config.district} District • Est. {config.established}
              </div>
            </div>
          </div>

          {/* Desktop Grouped Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-1 xl:space-x-3 shrink min-w-0 flex-nowrap">
            {navGroups.map((group) => {
              if (group.directId) {
                const isActive = activeSection === group.directId;
                return (
                  <button
                    key={group.id}
                    onClick={() => onNavigate(group.directId!)}
                    className={`text-xs xl:text-sm font-black tracking-tight transition-all duration-200 relative px-3 py-2 whitespace-nowrap cursor-pointer rounded-xl hover:bg-amber-50 ${
                      isActive ? "text-[#ea580c]" : "text-gray-700 hover:text-gray-900"
                    }`}
                  >
                    {group.label}
                    {isActive && (
                      <motion.div
                        layoutId="activeNavIndicator"
                        className="absolute bottom-0 left-2 right-2 h-0.5 rounded-full bg-[#ea580c]"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                  </button>
                );
              }

              const isGroupActive = group.items?.some((item) => item.id === activeSection);

              return (
                <div
                  key={group.id}
                  className="relative"
                  onMouseEnter={() => setOpenDropdown(group.id)}
                  onMouseLeave={() => setOpenDropdown(null)}
                >
                  <button
                    onClick={() => setOpenDropdown(openDropdown === group.id ? null : group.id)}
                    className={`text-xs xl:text-sm font-black tracking-tight transition-all duration-200 px-3 py-2 whitespace-nowrap cursor-pointer rounded-xl hover:bg-amber-50 flex items-center space-x-1 ${
                      isGroupActive ? "text-[#ea580c]" : "text-gray-700 hover:text-gray-900"
                    }`}
                  >
                    <span>{group.label}</span>
                    <LucideIcon name="ChevronDown" size={14} className={`transition-transform duration-200 ${openDropdown === group.id ? "rotate-180" : ""}`} />
                  </button>

                  <AnimatePresence>
                    {openDropdown === group.id && (
                      <motion.div
                        initial={{ opacity: 0, y: 8, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 8, scale: 0.95 }}
                        transition={{ duration: 0.15 }}
                        className="absolute top-full left-0 mt-1 w-64 bg-white rounded-2xl shadow-xl border border-amber-200/80 p-2 z-50 space-y-1"
                      >
                        {group.items?.map((item) => {
                          const isItemActive = activeSection === item.id;
                          return (
                            <button
                              key={item.id}
                              onClick={() => handleMenuClick(item.id)}
                              className={`w-full text-left px-3 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center space-x-2.5 ${
                                isItemActive
                                  ? "bg-amber-100/70 text-[#ea580c]"
                                  : "text-gray-700 hover:bg-amber-50 hover:text-gray-900"
                              }`}
                            >
                              <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${isItemActive ? "bg-[#ea580c] text-white" : "bg-amber-100 text-amber-800"}`}>
                                <LucideIcon name={item.icon} size={14} />
                              </div>
                              <span className="truncate">{item.label}</span>
                            </button>
                          );
                        })}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </nav>

          {/* Right Header Toolbar (Search + Play Peítho Game + CTA Button + Mobile Trigger) */}
          <div className="flex items-center space-x-2 shrink-0">
            
            {/* Play Peítho Game Button */}
            {onOpenGame && (
              <button
                onClick={onOpenGame}
                className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-300 hover:to-orange-400 text-slate-950 font-black text-xs shadow-md hover:shadow-lg transition-all active:scale-95 cursor-pointer shrink-0 animate-pulse"
              >
                <LucideIcon name="Gamepad2" size={16} className="text-slate-950" />
                <span className="hidden sm:inline">Play Peítho</span>
                <span className="sm:hidden">Game</span>
              </button>
            )}

            {/* Quick CTA - Enrollment Button */}
            <button
              onClick={() => onNavigate("contact")}
              className="hidden xl:inline-flex items-center text-xs font-bold px-3 py-2 rounded-xl text-white shadow-sm hover:shadow-md transition-all active:scale-95 cursor-pointer whitespace-nowrap shrink-0"
              style={{ backgroundColor: config.primaryColor }}
            >
              <span>Enroll Now</span>
              <LucideIcon name="ArrowUpRight" size={12} className="ml-1" />
            </button>

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-1.5 text-gray-600 hover:text-gray-900 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer shrink-0"
              aria-label="Toggle Menu"
            >
              <LucideIcon name={isMobileMenuOpen ? "X" : "Menu"} size={22} />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="lg:hidden bg-white border-t border-gray-100 overflow-hidden"
          >
            <div className="px-4 py-3.5 space-y-3">
              {onOpenGame && (
                <button
                  onClick={() => {
                    onOpenGame();
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full text-center py-3 rounded-2xl bg-gradient-to-r from-amber-400 via-orange-500 to-amber-400 text-slate-950 font-black text-sm shadow-md flex items-center justify-center space-x-2 cursor-pointer"
                >
                  <LucideIcon name="Gamepad2" size={18} />
                  <span>Play Peítho Connection Canvas Game</span>
                </button>
              )}

              {navGroups.map((group) => {
                if (group.directId) {
                  const isActive = activeSection === group.directId;
                  return (
                    <button
                      key={group.id}
                      onClick={() => handleMenuClick(group.directId!)}
                      className={`w-full text-left px-3.5 py-2.5 rounded-xl text-sm font-black transition-colors flex items-center justify-between cursor-pointer ${
                        isActive ? "bg-orange-100/70 text-[#ea580c]" : "text-gray-700"
                      }`}
                    >
                      <span>{group.label}</span>
                      {isActive && <LucideIcon name="ChevronRight" size={14} className="text-[#ea580c]" />}
                    </button>
                  );
                }

                return (
                  <div key={group.id} className="space-y-1 pl-1 border-l-2 border-amber-200">
                    <div className="text-[11px] font-black uppercase text-amber-700 px-3 pt-1">
                      {group.label}
                    </div>
                    {group.items?.map((item) => {
                      const isActive = activeSection === item.id;
                      return (
                        <button
                          key={item.id}
                          onClick={() => handleMenuClick(item.id)}
                          className={`w-full text-left px-3 py-2 rounded-xl text-xs font-bold transition-colors flex items-center space-x-2 cursor-pointer ${
                            isActive ? "bg-amber-100 text-[#ea580c]" : "text-gray-600"
                          }`}
                        >
                          <LucideIcon name={item.icon} size={14} />
                          <span>{item.label}</span>
                        </button>
                      );
                    })}
                  </div>
                );
              })}

              <div className="pt-2 border-t border-gray-100">
                <button
                  onClick={() => handleMenuClick("contact")}
                  className="w-full text-center py-2.5 rounded-xl text-sm font-semibold text-white shadow-sm hover:shadow transition-all cursor-pointer"
                  style={{ backgroundColor: config.primaryColor }}
                >
                  Join Us Today
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
