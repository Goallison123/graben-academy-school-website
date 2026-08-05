import React from "react";
import { SchoolConfig } from "../types";
import LucideIcon from "./LucideIcon";

interface WelcomeProps {
  config: SchoolConfig;
}

export default function Welcome({ config }: WelcomeProps) {
  return (
    <section id="about" className="py-16 sm:py-24 bg-gray-50/50" h-id="welcome-section">
      <div className="max-w-[1400px] mx-auto px-2 sm:px-4 lg:px-5">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Visual Representative Side (Left on desktop) */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden shadow-xl bg-white p-2 border border-gray-100 group">
              <img
                src={config.welcome.authorImage}
                alt={config.welcome.authorName}
                referrerPolicy="no-referrer"
                className="w-full h-[320px] sm:h-[380px] object-cover rounded-xl transition-transform duration-500 group-hover:scale-[1.02]"
              />
              
              {/* Floating Badge */}
              <div 
                className="absolute bottom-6 right-6 text-white py-2 px-4 rounded-xl text-xs font-bold shadow-lg flex items-center space-x-1.5"
                style={{ backgroundColor: config.primaryColor }}
              >
                <LucideIcon name="Heart" size={13} />
                <span>Nurturing Nursery</span>
              </div>
            </div>

            {/* Background design elements */}
            <div 
              className="absolute -top-4 -left-4 w-24 h-24 rounded-2xl opacity-10 -z-10"
              style={{ backgroundColor: config.primaryColor }}
            />
            <div 
              className="absolute -bottom-4 -right-4 w-32 h-32 rounded-full opacity-10 -z-10"
              style={{ backgroundColor: config.secondaryColor }}
            />
          </div>

          {/* Texts Side (Right on desktop) */}
          <div className="lg:col-span-7">
            <div className="space-y-6">
              
              {/* Super Header Tag */}
              <span 
                className="text-xs font-extrabold tracking-widest uppercase inline-block"
                style={{ color: config.secondaryColor }}
              >
                FOUNDED IN {config.established} • GISENYI SECTOR, RUBAVU DISTRICT
              </span>

              {/* Title */}
              <h2 className="font-sans font-extrabold text-3xl sm:text-4xl text-gray-900 tracking-tight leading-tight">
                {config.welcome.title}
              </h2>

              {/* Border Divider Accent */}
              <div 
                className="h-1 w-20 rounded-full"
                style={{ backgroundColor: config.primaryColor }}
              />

              {/* Long Welcome Paragraph */}
              <p className="text-gray-600 text-sm sm:text-base leading-relaxed font-light">
                {config.welcome.message}
              </p>

              {/* Sub-card focusing on nursery values */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-xl bg-white border border-orange-100 shadow-xs flex items-start space-x-3">
                  <div 
                    className="p-2 rounded-lg text-white"
                    style={{ backgroundColor: `${config.primaryColor}de` }}
                  >
                    <LucideIcon name="Sparkles" size={16} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-xs sm:text-sm text-gray-900">Baby, Middle & Top Classes</h4>
                    <p className="text-gray-500 text-[11px] sm:text-xs mt-1">Play-based curriculum, interactive building blocks, phonics, and storytelling.</p>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-white border border-amber-100 shadow-xs flex items-start space-x-3">
                  <div 
                    className="p-2 rounded-lg text-slate-900"
                    style={{ backgroundColor: `${config.secondaryColor}30` }}
                  >
                    <LucideIcon name="Smile" size={16} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-xs sm:text-sm text-gray-900">Outdoor Play Lawn & Games</h4>
                    <p className="text-gray-500 text-[11px] sm:text-xs mt-1">Mini sports, soft balance beams, lawn soccer, and physical motor skills fun.</p>
                  </div>
                </div>
              </div>

              {/* Author Attribution Block */}
              <div className="pt-4 border-t border-gray-200/60 flex items-center justify-between">
                <div>
                  <div className="font-bold text-gray-900 text-sm sm:text-base">{config.welcome.authorName}</div>
                  <div className="text-gray-500 text-xs mt-0.5" style={{ color: config.primaryColor }}>
                    {config.welcome.authorRole}
                  </div>
                </div>
                
                <div className="text-gray-400 font-serif italic text-xl select-none opacity-60 font-semibold">
                  &ldquo; Excellence & Integrity &rdquo;
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
