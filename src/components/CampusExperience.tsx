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
      tagline: "Nurturing, Bright & Safe Classrooms in Rubavu",
      content: "Graben Highlight Academy features cozy, sunlit nursery classrooms designed specifically for early childhood scale. Equipped with ergonomic mini furniture, soft mats, colorful alphabet & number displays, and storybook nooks, every child feels secure, happy, and excited to learn.",
      highlights: [
        "Ergonomic toddler-sized wooden tables and mini chairs",
        "Richly illustrated storybook reading corners and puzzle stations",
        "Soft play mats and safe rounded furniture corners",
        "Constant temperature control and natural sunlight ventilation"
      ],
      image: "/src/assets/images/graben_classroom_1784728053793.jpg"
    },
    {
      id: "outdoor-play",
      title: "Green Outdoor Playground & Sports Lawn",
      icon: "Trophy",
      tagline: "Active Physical Play & Motor Skills Arena",
      content: "Physical exercise is central to early childhood health. Our expansive green play lawn includes mini basketball hoops, soft football goals, balance beams, and climbing tracks where toddlers build gross motor coordination under 100% caregiver supervision.",
      highlights: [
        "Soft green grass play area with cushioned safety borders",
        "Mini basketball hoops and toddler soccer equipment",
        "Motor skills balance tracks and obstacle fun",
        "Full caregiver supervision and child safety protocols"
      ],
      image: "/src/assets/images/graben_play_sports_1784728024192.jpg"
    },
    {
      id: "creative-atelier",
      title: "Creative Arts, Music & Finger-Painting Room",
      icon: "Palette",
      tagline: "Sparking Imagination & Fine Motor Skills",
      content: "At our creative atelier, toddlers explore sensory textures, finger painting, clay modeling, rhythm instruments, and dramatic play. Trained instructors guide self-expression and creative exploration in a relaxed, joyful environment.",
      highlights: [
        "Non-toxic washable paints, crayons, and clay materials",
        "Musical percussion instruments and nursery rhythm band",
        "Puppet theater and imaginative role-play costumes",
        "Display walls showcasing every child's daily artwork"
      ],
      image: "/src/assets/images/graben_creative_art_1784728038764.jpg"
    },
    {
      id: "wellness-health",
      title: "First Aid Station, Hygiene & Care Unit",
      icon: "ShieldCheck",
      tagline: "Loving Personal Hygiene, Rest & Health Care",
      content: "Child well-being is our highest priority. Our campus features clean hand-washing stations, hygienic dining spaces for healthy snacks, quiet rest/nap zones, and trained caregiver first-aid support.",
      highlights: [
        "Clean, toddler-accessible hand-washing and sanitation facilities",
        "Balanced daily nutritional snacks and hydration breaks",
        "Peaceful rest and nap room with clean individual cots",
        "First-aid attendant trained in pediatric care"
      ],
      image: "/src/assets/images/graben_nursery_hero_1784728007876.jpg"
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
            Graben Highlight Academy Campus & Care
          </h2>
          <div className="h-1 w-16 bg-gray-200 mx-auto rounded-full" />
          <p className="text-gray-500 text-sm sm:text-base leading-relaxed">
            Designed to foster safety, happiness, and holistic growth for toddlers and nursery scholars in Rubavu District.
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
                    ? "bg-[#5c2a18] text-white shadow-md scale-105" 
                    : "bg-gray-50 hover:bg-gray-100 text-gray-600 hover:text-gray-900"
                }`}
              >
                <LucideIcon name={pillar.icon} size={16} />
                <span>{pillar.title.split("&")[0]}</span>
              </button>
            );
          })}
        </div>

        {/* Active Pillar Details Card */}
        <div className="bg-gradient-to-br from-slate-900 via-[#38180c] to-[#1a0a04] border border-[#ea580c]/30 rounded-3xl p-6 sm:p-10 text-white shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Column 1: Image */}
            <div className="lg:col-span-6 relative">
              <div className="relative rounded-2xl overflow-hidden border border-white/20 shadow-xl group">
                <img
                  src={currentPillar.image}
                  alt={currentPillar.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-[320px] sm:h-[400px] object-cover rounded-xl transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute top-4 left-4 bg-[#ea580c] text-white text-xs font-black uppercase tracking-wider px-3 py-1 rounded-full shadow-md">
                  {currentPillar.tagline}
                </div>
              </div>
            </div>

            {/* Column 2: Text Description & Highlights */}
            <div className="lg:col-span-6 space-y-6">
              <div className="space-y-2">
                <span className="text-amber-400 font-extrabold text-xs uppercase tracking-widest">
                  CAMPUS HIGHLIGHT
                </span>
                <h3 className="font-sans font-extrabold text-2xl sm:text-3xl text-white tracking-tight">
                  {currentPillar.title}
                </h3>
              </div>

              <p className="text-gray-200 text-xs sm:text-sm leading-relaxed font-light">
                {currentPillar.content}
              </p>

              <div className="space-y-3 pt-2">
                <div className="text-xs font-extrabold uppercase tracking-wider text-amber-300">
                  Key Features & Safety Provisions:
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {currentPillar.highlights.map((item, idx) => (
                    <div key={idx} className="flex items-start space-x-2 text-xs text-gray-200">
                      <LucideIcon name="CheckCircle" size={14} className="text-[#ea580c] shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {onNavigate && (
                <div className="pt-2">
                  <button
                    onClick={() => onNavigate("contact")}
                    className="px-5 py-2.5 rounded-xl bg-[#ea580c] hover:bg-[#c2410c] text-white font-extrabold text-xs transition-all shadow-md cursor-pointer flex items-center space-x-2"
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
        <div className="bg-gradient-to-br from-[#2c1308] via-[#5c2a18] to-[#1e0a04] border border-[#ea580c]/30 rounded-3xl p-6 sm:p-10 text-white shadow-xl space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-amber-400 font-extrabold text-xs uppercase tracking-widest">
              GRABEN HIGHLIGHT NURSERY ROUTINE
            </span>
            <h3 className="font-sans font-extrabold text-2xl sm:text-3xl text-white tracking-tight">
              A Day in the Life of a Graben Toddler
            </h3>
            <p className="text-gray-300 text-xs sm:text-sm font-light">
              Structured play, learning, rest, and outdoor recreation designed for balanced child development.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {dailySchedule.map((slot, idx) => (
              <div 
                key={idx} 
                className="bg-white/10 backdrop-blur-md p-4 rounded-xl border border-white/10 space-y-1 hover:bg-white/15 transition-all"
              >
                <div className="text-xs font-black text-[#ea580c] tracking-wider">{slot.time}</div>
                <div className="text-xs text-gray-100 font-medium leading-relaxed">{slot.activity}</div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
