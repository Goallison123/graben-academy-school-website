import React from "react";
import { SchoolConfig } from "../types";
import LucideIcon from "./LucideIcon";

interface FooterProps {
  config: SchoolConfig;
  onNavigate: (sectionId: string) => void;
}

export default function Footer({ config, onNavigate }: FooterProps) {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 text-white pt-16 pb-8" id="school-footer">
      <div className="max-w-[1400px] mx-auto px-2 sm:px-4 lg:px-5">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12 pb-12 border-b border-white/10">
          
          {/* Column 1: Identity & Motto */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center space-x-3 cursor-pointer" onClick={() => onNavigate("home")}>
              {config.logoUrl ? (
                <img 
                  src={config.logoUrl} 
                  alt={`${config.name} logo`} 
                  referrerPolicy="no-referrer"
                  className="h-10 w-10 object-contain rounded-md"
                  onError={(e) => { (e.target as HTMLElement).style.display = "none"; }}
                />
              ) : null}
              {(!config.logoUrl) && (
                <div className="w-9 h-9 rounded-lg flex items-center justify-center text-white font-bold text-xs" style={{ backgroundColor: config.primaryColor }}>
                  <LucideIcon name="School" size={16} />
                </div>
              )}
              <span className="font-bold text-sm tracking-tight uppercase max-w-xs">{config.name}</span>
            </div>
            
            <p className="text-gray-400 text-xs sm:text-sm leading-relaxed font-light">
              Providing quality early childhood education, play-based learning, and holistic child development in Rubavu District.
            </p>

            <div className="text-xs text-white/90 italic font-medium flex items-center space-x-1.5" style={{ color: config.secondaryColor }}>
              <LucideIcon name="Award" size={13} />
              <span>Motto: {config.slogan}</span>
            </div>
          </div>

          {/* Column 2: Navigation Map Links */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Quick Navigation</h4>
            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-2.5">
              {[
                { id: "home", label: "Home" },
                { id: "about", label: "About Academy" },
                { id: "academics", label: "Nursery Programs" },
                { id: "sports-academy", label: "Play & Outdoor Sports" },
                { id: "campus", label: "Campus & Care" },
                { id: "outcomes", label: "Development Milestones" },
                { id: "gallery", label: "Campus Gallery" },
                { id: "news", label: "News & Bulletins" },
                { id: "contact", label: "Enrollment & Contact" }
              ].map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => onNavigate(item.id)}
                    className="text-gray-400 hover:text-white text-xs sm:text-sm cursor-pointer transition-colors block text-left"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Academic Combos */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Syllabus Combos</h4>
            <ul className="space-y-2.5 text-xs sm:text-sm text-gray-400">
              {config.academicPrograms.map((p) => (
                <li key={p.code} className="flex items-center space-x-1.5">
                  <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: config.secondaryColor }} />
                  <span>{p.title.split("(")[0]}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact Shortcut */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Registrar channels</h4>
            <div className="space-y-3.5 text-xs text-gray-400 font-light">
              <div className="flex items-center space-x-2">
                <LucideIcon name="Phone" size={12} className="text-white/60 shrink-0" />
                <span>{config.contact.phone}</span>
              </div>
              <div className="flex items-center space-x-2">
                <LucideIcon name="Mail" size={12} className="text-white/60 shrink-0" />
                <span className="truncate">{config.contact.email}</span>
              </div>
              <div className="flex items-center space-x-2">
                <LucideIcon name="MapPin" size={12} className="text-white/60 shrink-0" />
                <span>{config.location}</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom copyright & builder credit */}
        <div className="pt-8 flex flex-col sm:flex-row justify-between items-center text-xs text-gray-500 font-light text-center gap-4">
          <div>
            &copy; {year} {config.name}. All rights reserved.
          </div>
          <div className="flex items-center space-x-1.5">
            <span>Service provided by</span>
            <span className="font-bold text-gray-300 transition-colors hover:text-white">Sybella Systems</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
