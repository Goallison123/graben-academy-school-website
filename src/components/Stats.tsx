import React from "react";
import { SchoolConfig } from "../types";
import LucideIcon from "./LucideIcon";

interface StatsProps {
  config: SchoolConfig;
  isSubpage?: boolean;
}

export default function Stats({ config, isSubpage = false }: StatsProps) {
  return (
    <section className={`relative z-10 ${isSubpage ? "py-10 max-w-[1400px] mx-auto px-2 sm:px-4 lg:px-5" : "-mt-10 max-w-[1400px] mx-auto px-2 sm:px-4 lg:px-5"}`} id="stats-section">
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 sm:p-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 divide-y-2 lg:divide-y-0 lg:divide-x-2 divide-gray-100/80">
          {config.stats.map((stat, idx) => (
            <div 
              key={idx} 
              className={`flex flex-col items-center text-center p-3 sm:p-4 ${
                idx > 1 ? "pt-6 lg:pt-3" : ""
              }`}
            >
              <div 
                className="w-12 h-12 rounded-xl flex items-center justify-center text-white mb-4 shadow-sm"
                style={{ backgroundColor: `${config.primaryColor}ea` }}
              >
                <LucideIcon name={stat.icon} size={22} />
              </div>
              
              <div className="font-sans font-extrabold text-2xl sm:text-3xl md:text-4xl text-gray-900 tracking-tight">
                {stat.value}
              </div>
              
              <div className="text-gray-500 text-xs sm:text-sm font-medium mt-1 uppercase tracking-wider">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
