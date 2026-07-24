import React, { useEffect, useState } from "react";
import { SchoolConfig } from "../types";
import LucideIcon from "./LucideIcon";

interface TopbarProps {
  config: SchoolConfig;
}

export default function Topbar({ config }: TopbarProps) {
  const [tickerIndex, setTickerIndex] = useState(0);

  const announcements = [
    `Welcome to the new digital portal of ${config.name}!`,
    `📢 Nursery admissions for Baby, Middle, and Top class at ${config.name} are now open.`,
    `🏆 Learn about the historic ${config.sportsAcademy.title} projects!`,
    `📞 Need support? Call our registrar at ${config.contact.phone}`
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setTickerIndex((prev) => (prev + 1) % announcements.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [config, announcements.length]);

  return (
    <div 
      className="text-white text-xs py-2 px-4 transition-colors duration-500 hidden md:block border-b border-white/10"
      style={{ backgroundColor: config.primaryColor }}
      id="school-topbar"
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Contact Info */}
        <div className="flex items-center space-x-6">
          <a href={`tel:${config.contact.phone}`} className="flex items-center space-x-1.5 hover:text-white/80 transition-colors">
            <LucideIcon name="Phone" size={13} className="opacity-80" />
            <span>{config.contact.phone}</span>
          </a>
          <a href={`mailto:${config.contact.email}`} className="flex items-center space-x-1.5 hover:text-white/80 transition-colors border-l border-white/20 pl-6">
            <LucideIcon name="Mail" size={13} className="opacity-80" />
            <span>{config.contact.email}</span>
          </a>
          <span className="flex items-center space-x-1.5 border-l border-white/20 pl-6 text-white/90">
            <LucideIcon name="MapPin" size={13} className="opacity-80" />
            <span>{config.location}</span>
          </span>
        </div>

        {/* Ticker Section */}
        <div className="flex-1 max-w-md mx-6 overflow-hidden relative h-5 hidden lg:flex items-center">
          <div className="flex items-center space-x-2 text-white/95 text-[11px] font-medium bg-white/15 px-2 py-0.5 rounded mr-2 shrink-0">
            <LucideIcon name="Sparkles" size={11} className="animate-pulse" />
            <span>NOTICE</span>
          </div>
          <div className="relative w-full h-full">
            {announcements.map((ann, idx) => (
              <div
                key={idx}
                className={`absolute inset-0 flex items-center transition-all duration-500 transform ${
                  idx === tickerIndex 
                    ? "opacity-100 translate-y-0" 
                    : "opacity-0 translate-y-4 pointer-events-none"
                }`}
              >
                <span className="truncate font-medium">{ann}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Socials & Settings Trigger indicator */}
        <div className="flex items-center space-x-3.5">
          {config.contact.facebook && (
            <a href={config.contact.facebook} target="_blank" rel="noopener noreferrer" className="hover:text-white/80 transition-colors p-0.5">
              <LucideIcon name="Facebook" size={14} />
            </a>
          )}
          {config.contact.twitter && (
            <a href={config.contact.twitter} target="_blank" rel="noopener noreferrer" className="hover:text-white/80 transition-colors p-0.5">
              <LucideIcon name="Twitter" size={14} />
            </a>
          )}
          {config.contact.instagram && (
            <a href={config.contact.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-white/80 transition-colors p-0.5">
              <LucideIcon name="Instagram" size={14} />
            </a>
          )}
          {config.contact.youtube && (
            <a href={config.contact.youtube} target="_blank" rel="noopener noreferrer" className="hover:text-white/80 transition-colors p-0.5">
              <LucideIcon name="Youtube" size={14} />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
