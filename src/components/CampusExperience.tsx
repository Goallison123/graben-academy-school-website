import React, { useState } from "react";
import { SchoolConfig } from "../types";
import LucideIcon from "./LucideIcon";

interface CampusExperienceProps {
  config: SchoolConfig;
  onNavigate?: (sectionId: string) => void;
}

export default function CampusExperience({ config, onNavigate }: CampusExperienceProps) {
  const [activeTab, setActiveTab] = useState<string>("nursery-campus");

  const campusPillars = [
    {
      id: "nursery-campus",
      title: "Sunlit Nursery Classrooms & Reading Corner",
      icon: "Home",
      tagline: "Nurturing, Bright & Safe Classrooms",
      content:
        "Our nursery classrooms are cheerful spaces where curiosity blooms. Children learn through storytelling, puzzles, and guided reading in cozy corners filled with sunlight and color. Every detail—from mini tables to alphabet walls—encourages comfort and discovery.",
      highlights: [
        "Toddler-sized wooden tables and colorful mini chairs",
        "Storybook reading corners and alphabet learning walls",
        "Soft play mats and safe rounded furniture edges",
        "Natural light and calm ventilation for happy learning"
      ],
      image: "src/assets/images/campus-graduation-speech-child.jpg" 
    },
    {
      id: "outdoor-play",
      title: "Green Outdoor Playground & Play Lawn",
      icon: "Trophy",
      tagline: "Active Play, Joy & Motor Skills Growth",
      content:
        "Outdoor play is full of laughter and movement. Children run, play hide and seek, and enjoy group games that build coordination and teamwork. Our green lawns and safe play zones make every day an adventure in motion.",
      highlights: [
        "Soft green grass play area with safe borders",
        "Playful group games like running, hide and seek, and tag",
        "Encouraging teamwork, laughter, and social bonding",
        "Full caregiver supervision and child safety protocols"
      ],
      image: "src/assets/images/sports-outdoor-fun-group.jpg" 
    },
    {
      id: "creative-atelier",
      title: "Creative Arts, Music & Cultural Expression",
      icon: "Palette",
      tagline: "Sparking Imagination & Cultural Pride",
      content:
        "Our creative atelier celebrates imagination and culture. Children explore rhythm, dance, painting, and storytelling through joyful performances and art projects. Every activity builds confidence and expressive skills.",
      highlights: [
        "Colorful costumes for cultural dance and creative play",
        "Music, rhythm, and storytelling sessions",
        "Finger painting and imaginative art projects",
        "Display walls showcasing children’s artwork and crafts"
      ],
      image: "src/assets/images/cultural-dance-child.jpg"
    },
    {
      id: "wellness-health",
      title: "Hygiene, Rest & Child Wellness Care",
      icon: "ShieldCheck",
      tagline: "Loving Care & Healthy Daily Routines",
      content:
        "Child well-being is our top priority. We maintain clean hand-washing stations, nutritious snack breaks, and peaceful nap areas. Our caregivers ensure every child feels safe, rested, and cared for throughout the day.",
      highlights: [
        "Clean, toddler-accessible sanitation facilities",
        "Balanced daily snacks and hydration breaks",
        "Quiet nap zones with individual cots",
        "Trained caregivers providing first-aid and hygiene support"
      ],
      image: "src/assets/images/group-photo-campus.jpg" 
    }
  ];

  const currentPillar = campusPillars.find(p => p.id === activeTab) || campusPillars[0];

  const dailySchedule = [
    { time: "07:30 AM", activity: "Campus Arrival, Warm Caregiver Greetings & Free Play" },
    { time: "08:15 AM", activity: "Morning Circle Time, Nursery Songs & Attendance" },
    { time: "08:45 AM", activity: "Interactive Phonics, Early Numbers & Storytelling" },
    { time: "09:45 AM", activity: "Healthy Fruit Snack & Hydration Break" },
    { time: "10:15 AM", activity: "Outdoor Lawn Play, Mini Basketball & Motor Skills" },
    { time: "11:15 AM", activity: "Creative Arts Atelier: Painting, Clay & Building Blocks" },
    { time: "12:15 PM", activity: "Nutritious Lunch & Hand-Washing Routine" },
    { time: "01:00 PM", activity: "Rest & Quiet Story Nap Time" },
    { time: "02:30 PM", activity: "Evening Review, Parent Pickup & Departure" }
  ];

  return (
    <div className="py-12 sm:py-20 bg-white" id="campus-life-section">
      <div className="max-w-[1400px] mx-auto px-2 sm:px-4 lg:px-5 space-y-16">
        
        {/* Intro heading */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span 
            className="text-xs font-extrabold tracking-widest uppercase inline-block"
            style={{ color: config.secondaryColor }}
          >
            NURSERY CAMPUS & CHILD CARE FACILITIES
          </span>
          <h2 className="font-sans font-extrabold text-3xl sm:text-4xl text-gray-900 tracking-tight">
            {config.name} Campus & Care
          </h2>
          <div className="h-1 w-16 bg-gray-200 mx-auto rounded-full" />
          <p className="text-gray-500 text-sm sm:text-base leading-relaxed">
            Designed to foster safety, happiness, and holistic growth for toddlers and nursery scholars.
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-3 border-b border-gray-100 pb-4">
          {campusPillars.map((pillar) => {
            const isActive = pillar.id === activeTab;
            return (
              <button
                key={pillar.id}
                onClick={() => setActiveTab(pillar.id)}
                className={`flex items-center space-x-2 px-4 py-3 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                  isActive 
                    ? "text-white shadow-md scale-105" 
                    : "bg-gray-50 hover:bg-gray-100 text-gray-600 hover:text-gray-900"
                }`}
                style={isActive ? { backgroundColor: config.primaryColor } : {}}
              >
                <LucideIcon name={pillar.icon} size={16} />
                <span>{pillar.title.split("&")[0]}</span>
              </button>
            );
          })}
        </div>

        {/* Active Pillar Details Card */}
        <div 
          className="border border-white/20 rounded-3xl p-6 sm:p-10 text-white shadow-2xl"
          style={{
            background: `linear-gradient(135deg, ${config.primaryColor} 0%, ${config.secondaryColor} 100%)`
          }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Column 1: Image */}
            <div className="lg:col-span-6 relative">
              <div className="relative rounded-2xl overflow-hidden border border-white/20 shadow-xl group">
                <img
                  src={currentPillar.image}
                  alt={currentPillar.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-[320px] sm:h-[400px] object-cover object-[center_30%] rounded-xl transition-transform duration-500 group-hover:scale-105"
                />
                <div 
                  className="absolute top-4 left-4 text-white text-xs font-black uppercase tracking-wider px-3 py-1 rounded-full shadow-md"
                  style={{ backgroundColor: config.secondaryColor }}
                >
                  {currentPillar.tagline}
                </div>
              </div>
            </div>

            {/* Column 2: Text Description & Highlights */}
            <div className="lg:col-span-6 space-y-6">
              <div className="space-y-2">
                <span 
                  className="font-extrabold text-xs uppercase tracking-widest text-white/90"
                >
                  CAMPUS HIGHLIGHT
                </span>
                <h3 className="font-sans font-extrabold text-2xl sm:text-3xl text-white tracking-tight">
                  {currentPillar.title}
                </h3>
              </div>

              <p className="text-white/90 text-xs sm:text-sm leading-relaxed font-light">
                {currentPillar.content}
              </p>

              <div className="space-y-3 pt-2">
                <div className="text-xs font-extrabold uppercase tracking-wider text-white">
                  Key Features & Safety Provisions:
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {currentPillar.highlights.map((item, idx) => (
                    <div key={idx} className="flex items-start space-x-2 text-xs text-white/90">
                      <LucideIcon name="CheckCircle" size={14} className="text-white shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {onNavigate && (
                <div className="pt-2">
                  <button
                    onClick={() => onNavigate("contact")}
                    className="px-5 py-2.5 rounded-xl text-white font-extrabold text-xs transition-all shadow-md cursor-pointer flex items-center space-x-2"
                    style={{ backgroundColor: config.secondaryColor }}
                  >
                    <span>Schedule Campus Visit</span>
                    <LucideIcon name="ArrowRight" size={14} />
                  </button>
                </div>
              )}

            </div>

          </div>
        </div>

        {/* Daily Schedule Section */}
        <div 
          className="border border-white/20 rounded-3xl p-6 sm:p-10 text-white shadow-xl space-y-8"
          style={{
            background: `linear-gradient(135deg, ${config.primaryColor} 0%, ${config.secondaryColor} 100%)`
          }}
        >
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="font-extrabold text-xs uppercase tracking-widest text-white/90">
              {config.name.toUpperCase()} NURSERY ROUTINE
            </span>
            <h3 className="font-sans font-extrabold text-2xl sm:text-3xl text-white tracking-tight">
              A Day in the Life of a Toddler
            </h3>
            <p className="text-white/80 text-xs sm:text-sm font-light">
              Structured play, learning, rest, and outdoor recreation designed for balanced child development.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {dailySchedule.map((slot, idx) => (
              <div 
                key={idx} 
                className="bg-white/10 backdrop-blur-md p-4 rounded-xl border border-white/10 space-y-1 hover:bg-white/20 transition-all"
              >
                <div 
                  className="text-xs font-black tracking-wider text-white"
                >
                  {slot.time}
                </div>
                <div className="text-xs text-white/90 font-medium leading-relaxed">{slot.activity}</div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}