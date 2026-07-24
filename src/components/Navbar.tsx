import React, { useState } from "react";
import { SchoolConfig } from "../types";
import LucideIcon from "./LucideIcon";
import { motion, AnimatePresence } from "motion/react";

interface NavbarProps {
  config: SchoolConfig;
  onNavigate: (sectionId: string) => void;
  activeSection: string;
}

export default function Navbar({ config, onNavigate, activeSection }: NavbarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const menuItems = [
    { id: "home", label: "Home" },
    { id: "about", label: "About Us" },
    { id: "academics", label: "Nursery Programs" },
    { id: "sports-academy", label: "Play & Outdoor Sports" },
    { id: "campus", label: "Campus & Care" },
    { id: "outcomes", label: "Child Milestones" },
    { id: "gallery", label: "Gallery" },
    { id: "news", label: "News" },
    { id: "contact", label: "Enrollment & Fees" }
  ];

  const handleMenuClick = (sectionId: string) => {
    onNavigate(sectionId);
    setIsMobileMenuOpen(false);
  };

  return (
    <header 
      className="sticky top-0 z-40 bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100 transition-all duration-300"
      id="school-navbar"
    >
      <div className="max-w-[1600px] mx-auto px-2 sm:px-4 lg:px-5">
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

          {/* Desktop Navigation Links - Single line flex */}
          <nav className="hidden lg:flex items-center space-x-0.5 xl:space-x-2 shrink min-w-0 flex-nowrap">
            {menuItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onNavigate(item.id)}
                  className={`text-xs xl:text-sm font-semibold tracking-tight transition-all duration-200 relative px-1.5 xl:px-2.5 py-1.5 whitespace-nowrap cursor-pointer rounded-lg hover:bg-gray-50/80 ${
                    isActive ? "text-gray-950 font-extrabold" : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <motion.div
                      layoutId="activeNavIndicator"
                      className="absolute bottom-0 left-1 right-1 h-0.5 rounded-full"
                      style={{ backgroundColor: config.primaryColor }}
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Header Toolbar (Search + CTA Button + Mobile Trigger) */}
          <div className="flex items-center space-x-2 shrink-0">
            
            {/* Interactive Search toggle */}
            <div className="relative flex items-center">
              <AnimatePresence>
                {isSearchOpen && (
                  <motion.input
                    initial={{ width: 0, opacity: 0 }}
                    animate={{ width: 140, opacity: 1 }}
                    exit={{ width: 0, opacity: 0 }}
                    type="text"
                    placeholder="Search..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="border border-gray-200 text-xs px-2.5 py-1.5 rounded-lg focus:outline-none focus:ring-1 focus:border-transparent mr-1.5 bg-gray-50 text-gray-800"
                    style={{ ["--tw-ring-color" as any]: config.primaryColor }}
                  />
                )}
              </AnimatePresence>
              <button
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="text-gray-500 hover:text-gray-800 p-1.5 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer shrink-0"
                aria-label="Search website"
              >
                <LucideIcon name={isSearchOpen ? "X" : "Search"} size={16} />
              </button>
            </div>

            {/* Quick CTA - Enrollment Button */}
            <button
              onClick={() => onNavigate("contact")}
              className="hidden sm:inline-flex items-center text-xs font-bold px-3 py-2 rounded-xl text-white shadow-sm hover:shadow-md transition-all active:scale-95 cursor-pointer whitespace-nowrap shrink-0"
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

      {/* Mobile Drawer Navigation (using framer motion) */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="lg:hidden bg-white border-t border-gray-100 overflow-hidden"
          >
            <div className="px-4 py-3.5 space-y-2">
              {menuItems.map((item) => {
                const isActive = activeSection === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleMenuClick(item.id)}
                    className="w-full text-left px-3 py-2.5 rounded-xl text-sm font-medium transition-colors flex items-center justify-between cursor-pointer"
                    style={{
                      backgroundColor: isActive ? `${config.primaryColor}10` : "transparent",
                      color: isActive ? config.primaryColor : "#4b5563"
                    }}
                  >
                    <span>{item.label}</span>
                    {isActive && <LucideIcon name="ChevronRight" size={14} style={{ color: config.primaryColor }} />}
                  </button>
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
