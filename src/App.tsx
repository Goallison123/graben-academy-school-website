import React, { useState, useEffect } from "react";
import { SCHOOLS_DATA } from "./data/schools";
import Topbar from "./components/Topbar";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Welcome from "./components/Welcome";
import Stats from "./components/Stats";
import Academics from "./components/Academics";
import SportsAcademy from "./components/SportsAcademy";
import CampusExperience from "./components/CampusExperience";
import OutcomesExperience from "./components/OutcomesExperience";
import Gallery from "./components/Gallery";
import NewsAnnouncements from "./components/NewsAnnouncements";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import LucideIcon from "./components/LucideIcon";

// Custom Subpage Banner Component
function SubpageHeader({ title, subtitle, config }: { title: string; subtitle: string; config: any }) {
  return (
    <div 
      className="relative py-12 sm:py-16 text-white overflow-hidden bg-gradient-to-br from-orange-600 via-emerald-700 to-amber-600 border-b border-white/20"
      id="subpage-header"
    >
      {/* Delicate background ambient highlights */}
      <div className="absolute -right-16 -bottom-16 w-64 h-64 rounded-full bg-amber-300/20 blur-3xl pointer-events-none" />
      <div className="absolute -left-16 -top-16 w-64 h-64 rounded-full bg-emerald-400/20 blur-3xl pointer-events-none" />
      
      <div className="max-w-[1400px] mx-auto px-2 sm:px-4 lg:px-5 relative z-10">
        <nav className="flex items-center space-x-2 text-[10px] uppercase tracking-widest text-amber-100 font-bold mb-3">
          <span className="opacity-80">School Portal</span>
          <span>/</span>
          <span className="text-amber-300">{title}</span>
        </nav>
        
        <h1 className="font-sans font-extrabold text-3xl sm:text-4xl text-white tracking-tight drop-shadow-sm">
          {title}
        </h1>
        <p className="text-amber-100 text-xs sm:text-sm mt-2 max-w-3xl leading-relaxed font-light drop-shadow-sm">
          {subtitle}
        </p>
      </div>
    </div>
  );
}

export default function App() {
  // Config for the school (Collège de Gisenyi Inyemeramihigo in Bleu Nuit)
  const activeConfig = SCHOOLS_DATA[0];
  const [activeSection, setActiveSection] = useState<string>("home");

  // Reset scroll back to the top whenever active page route changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [activeSection]);

  const handleNavigate = (sectionId: string) => {
    setActiveSection(sectionId);
  };

  return (
    <div className="min-h-screen flex flex-col bg-white overflow-x-hidden font-sans selection:bg-amber-100 selection:text-amber-900">
      
      {/* 1. Header & Branding Grid */}
      <Topbar config={activeConfig} />
      
      <Navbar 
        config={activeConfig} 
        onNavigate={handleNavigate} 
        activeSection={activeSection} 
      />

      {/* 2. Page Router Controller */}
      <main className="flex-1">
        
        {activeSection === "home" && (
          <div className="animate-fade-in space-y-16 pb-16">
            {/* Home Hero Slider */}
            <Hero config={activeConfig} onCtaClick={handleNavigate} />
            
            {/* Core Quick Stats Bar */}
            <Stats config={activeConfig} />

            {/* Structured Page Navigation Bento-Grid Dashboard */}
            <section className="max-w-[1400px] mx-auto px-2 sm:px-4 lg:px-5 py-8" id="home-bento-portal">
              <div className="text-center max-w-3xl mx-auto mb-10 space-y-2">
                <span 
                  className="text-xs font-extrabold tracking-widest uppercase inline-block px-3 py-1 rounded-full bg-amber-100 text-[#ea580c] shadow-xs"
                >
                  🎈 EXPLORE OUR NURSERY ACADEMY
                </span>
                <h2 className="font-sans font-black text-2xl sm:text-4xl text-gray-900 tracking-tight">
                  Welcome to Graben Highlight Academy
                </h2>
                <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
                  Click on any section below to explore our nursery classrooms, play areas, creative arts, child milestones, and admissions in Rubavu District.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                
                {/* About Teaser Card */}
                <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-6 border border-amber-200/80 flex flex-col justify-between hover:shadow-lg transition-all group">
                  <div className="space-y-3">
                    <div className="w-12 h-12 rounded-2xl bg-[#ea580c] text-white flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
                      <LucideIcon name="Heart" size={22} />
                    </div>
                    <h3 className="font-extrabold text-gray-900 text-lg">About Our Nursery</h3>
                    <p className="text-gray-600 text-xs font-light leading-relaxed">
                      Discover our safe, loving early childhood environment, play-based learning approach, and certified caregiver team.
                    </p>
                  </div>
                  <button 
                    onClick={() => handleNavigate("about")}
                    className="mt-5 text-xs font-extrabold flex items-center space-x-1.5 cursor-pointer text-[#ea580c] group-hover:translate-x-1 transition-transform"
                  >
                    <span>Read Directress Welcome</span>
                    <LucideIcon name="ArrowRight" size={14} />
                  </button>
                </div>

                {/* Academics Teaser Card */}
                <div className="bg-gradient-to-br from-[#ecfdf5] to-[#d1fae5] rounded-2xl p-6 border border-emerald-200 flex flex-col justify-between hover:shadow-lg transition-all group">
                  <div className="space-y-3">
                    <div className="w-12 h-12 rounded-2xl bg-[#059669] text-white flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
                      <LucideIcon name="Sparkles" size={22} />
                    </div>
                    <h3 className="font-extrabold text-gray-900 text-lg">Nursery Streams & Curriculum</h3>
                    <p className="text-gray-600 text-xs font-light leading-relaxed">
                      Explore Baby Class, Middle Class, and Top Class programs focusing on early literacy, phonics, numbers, and social skills.
                    </p>
                  </div>
                  <button 
                    onClick={() => handleNavigate("academics")}
                    className="mt-5 text-xs font-extrabold flex items-center space-x-1.5 cursor-pointer text-[#059669] group-hover:translate-x-1 transition-transform"
                  >
                    <span>Explore Learning Programs</span>
                    <LucideIcon name="ArrowRight" size={14} />
                  </button>
                </div>

                {/* Sports/Play Teaser Card */}
                <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl p-6 border border-emerald-200/80 flex flex-col justify-between hover:shadow-lg transition-all group">
                  <div className="space-y-3">
                    <div className="w-12 h-12 rounded-2xl bg-[#10b981] text-white flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
                      <LucideIcon name="Trophy" size={22} />
                    </div>
                    <h3 className="font-extrabold text-gray-900 text-lg">Play & Outdoor Sports</h3>
                    <p className="text-gray-600 text-xs font-light leading-relaxed">
                      Discover our mini basketball hoops, soft lawn soccer, balance obstacle courses, and active physical play.
                    </p>
                  </div>
                  <button 
                    onClick={() => handleNavigate("sports-academy")}
                    className="mt-5 text-xs font-extrabold flex items-center space-x-1.5 cursor-pointer text-[#10b981] group-hover:translate-x-1 transition-transform"
                  >
                    <span>View Playground & Sports</span>
                    <LucideIcon name="ArrowRight" size={14} />
                  </button>
                </div>

                {/* Campus Life Teaser Card */}
                <div className="bg-gradient-to-br from-amber-50 to-yellow-50 rounded-2xl p-6 border border-amber-200 flex flex-col justify-between hover:shadow-lg transition-all group">
                  <div className="space-y-3">
                    <div className="w-12 h-12 rounded-2xl bg-[#d97706] text-white flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
                      <LucideIcon name="Home" size={22} />
                    </div>
                    <h3 className="font-extrabold text-gray-900 text-lg">Campus & Care Facilities</h3>
                    <p className="text-gray-600 text-xs font-light leading-relaxed">
                      Tour our sunlit classrooms, storybook reading nooks, creative arts atelier, rest/nap zones, and health care.
                    </p>
                  </div>
                  <button 
                    onClick={() => handleNavigate("campus")}
                    className="mt-5 text-xs font-extrabold flex items-center space-x-1.5 cursor-pointer text-[#d97706] group-hover:translate-x-1 transition-transform"
                  >
                    <span>Explore Campus Facilities</span>
                    <LucideIcon name="ArrowRight" size={14} />
                  </button>
                </div>

                {/* Outcomes Teaser Card */}
                <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-6 border border-amber-300/80 flex flex-col justify-between hover:shadow-lg transition-all group">
                  <div className="space-y-3">
                    <div className="w-12 h-12 rounded-2xl bg-[#f59e0b] text-white flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
                      <LucideIcon name="Smile" size={22} />
                    </div>
                    <h3 className="font-extrabold text-gray-900 text-lg">Child Growth & Milestones</h3>
                    <p className="text-gray-600 text-xs font-light leading-relaxed">
                      Track early developmental milestones in communication, emotional confidence, creativity, and primary readiness.
                    </p>
                  </div>
                  <button 
                    onClick={() => handleNavigate("outcomes")}
                    className="mt-5 text-xs font-extrabold flex items-center space-x-1.5 cursor-pointer text-[#d97706] group-hover:translate-x-1 transition-transform"
                  >
                    <span>View Child Milestones</span>
                    <LucideIcon name="ArrowRight" size={14} />
                  </button>
                </div>

                {/* Gallery Teaser Card */}
                <div className="bg-gradient-to-br from-[#fff7ed] to-[#ffedd5] rounded-2xl p-6 border border-orange-200 flex flex-col justify-between hover:shadow-lg transition-all group">
                  <div className="space-y-3">
                    <div className="w-12 h-12 rounded-2xl bg-[#ea580c] text-white flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
                      <LucideIcon name="Image" size={22} />
                    </div>
                    <h3 className="font-extrabold text-gray-900 text-lg">Nursery Picture Gallery</h3>
                    <p className="text-gray-600 text-xs font-light leading-relaxed">
                      Enjoy vibrant, joyful photos of toddlers playing, painting, singing, reading, and exploring on campus.
                    </p>
                  </div>
                  <button 
                    onClick={() => handleNavigate("gallery")}
                    className="mt-5 text-xs font-extrabold flex items-center space-x-1.5 cursor-pointer text-[#ea580c] group-hover:translate-x-1 transition-transform"
                  >
                    <span>Browse Picture Gallery</span>
                    <LucideIcon name="ArrowRight" size={14} />
                  </button>
                </div>

                {/* News Teaser Card */}
                <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl p-6 border border-emerald-200 flex flex-col justify-between hover:shadow-lg transition-all group">
                  <div className="space-y-3">
                    <div className="w-12 h-12 rounded-2xl bg-[#059669] text-white flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
                      <LucideIcon name="Newspaper" size={22} />
                    </div>
                    <h3 className="font-extrabold text-gray-900 text-lg">Nursery News & Bulletins</h3>
                    <p className="text-gray-600 text-xs font-light leading-relaxed">
                      Read about upcoming orientation days, parent workshops, playground updates, and school announcements.
                    </p>
                  </div>
                  <button 
                    onClick={() => handleNavigate("news")}
                    className="mt-5 text-xs font-extrabold flex items-center space-x-1.5 cursor-pointer text-[#059669] group-hover:translate-x-1 transition-transform"
                  >
                    <span>Read School Bulletins</span>
                    <LucideIcon name="ArrowRight" size={14} />
                  </button>
                </div>

                {/* Contact Teaser Card */}
                <div className="bg-gradient-to-br from-orange-500 via-emerald-600 to-amber-500 text-white rounded-2xl p-6 flex flex-col justify-between shadow-lg hover:scale-[1.02] transition-all group">
                  <div className="space-y-3">
                    <div className="w-12 h-12 rounded-2xl bg-white text-[#ea580c] flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
                      <LucideIcon name="ClipboardList" size={22} />
                    </div>
                    <h3 className="font-extrabold text-white text-lg">Nursery Enrollment Desk</h3>
                    <p className="text-amber-100 text-xs font-light leading-relaxed">
                      Enroll your child for Baby, Middle, or Top Class. Schedule a campus visit or contact our friendly team!
                    </p>
                  </div>
                  <button 
                    onClick={() => handleNavigate("contact")}
                    className="mt-5 text-xs font-black bg-white text-[#ea580c] px-4 py-2.5 rounded-xl shadow-md flex items-center justify-center space-x-1.5 cursor-pointer hover:bg-amber-50 transition-colors"
                  >
                    <span>Start Enrollment Form</span>
                    <LucideIcon name="ArrowRight" size={14} />
                  </button>
                </div>

              </div>
            </section>

            {/* Quick action enrollment callout */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
              <div 
                className="rounded-3xl p-8 sm:p-12 text-white text-center sm:text-left flex flex-col sm:flex-row justify-between items-center gap-6 shadow-xl relative overflow-hidden bg-gradient-to-r from-orange-600 via-emerald-600 to-amber-500"
              >
                <div className="space-y-2">
                  <div className="inline-flex items-center space-x-1.5 bg-white/20 backdrop-blur-md text-white text-xs px-3 py-1 rounded-full font-black uppercase tracking-wider">
                    <span>🌟 Baby, Middle & Top Class Open</span>
                  </div>
                  <h3 className="font-black text-2xl sm:text-3xl tracking-tight">Enroll Your Child at Graben Highlight Academy</h3>
                  <p className="text-amber-100 text-xs sm:text-sm font-light max-w-xl">
                    Applications are open for nursery admission in Rubavu District. Give your child the gift of joyful, play-based learning!
                  </p>
                </div>
                <button 
                  onClick={() => handleNavigate("contact")}
                  className="bg-white text-[#ea580c] font-black text-sm px-8 py-4 rounded-2xl shadow-lg hover:bg-amber-50 hover:scale-[1.03] active:scale-95 transition-all cursor-pointer shrink-0 space-x-2 flex items-center"
                >
                  <span>Enroll My Child Today</span>
                  <LucideIcon name="ArrowRight" size={16} />
                </button>
              </div>
            </section>
          </div>
        )}

        {activeSection === "about" && (
          <div className="animate-fade-in">
            <SubpageHeader 
              title="About Graben Highlight Academy" 
              subtitle={`Founded in ${activeConfig.established}, Graben Highlight Academy is a premier nursery school in Rubavu District dedicated to play-based early childhood education.`}
              config={activeConfig}
            />
            
            {/* Core Stats Bar */}
            <Stats config={activeConfig} isSubpage={true} />
            
            {/* Principal Welcome Msg & History */}
            <Welcome config={activeConfig} />

            {/* Deep History of Nursery Campus */}
            <section className="py-16 bg-white border-t border-gray-150">
              <div className="max-w-[1400px] mx-auto px-2 sm:px-4 lg:px-5">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                  <div className="lg:col-span-6 space-y-6">
                    <h3 className="font-sans font-extrabold text-2xl text-slate-900">Our Early Childhood Philosophy</h3>
                    <p className="text-gray-600 text-xs sm:text-sm leading-relaxed font-light">
                      At Graben Highlight Academy, we believe that early childhood is the most crucial foundation for a lifetime of learning and joy. Our nursery environment in Rubavu District balances structured play, sensory exploration, phonics, numbers, creative arts, and gentle physical outdoor games.
                    </p>
                    <p className="text-gray-600 text-xs sm:text-sm leading-relaxed font-light">
                      Our certified caregivers nurture every child with individual care, fostering social confidence, emotional security, and curiosity.
                    </p>
                  </div>
                  <div className="lg:col-span-6 bg-amber-50/60 p-6 rounded-3xl border border-amber-200">
                    <h4 className="font-bold text-slate-950 text-sm sm:text-base mb-4">Our Core Pillars of Excellence</h4>
                    <div className="space-y-4">
                      {[
                        { title: "Play-Based Learning", desc: "Interactive phonics, building blocks, story nooks, and art ateliers." },
                        { title: "Safe & Nurturing Care", desc: "100% certified early childhood caregivers and secure campus environment." },
                        { title: "Holistic Development", desc: "Balanced social, emotional, cognitive, and motor-skills growth." }
                      ].map((item, idx) => (
                        <div key={idx} className="flex space-x-3.5">
                          <div className="w-7 h-7 rounded-full bg-[#ea580c] text-white flex items-center justify-center font-bold text-xs shrink-0 shadow-xs">
                            {idx + 1}
                          </div>
                          <div>
                            <h5 className="font-bold text-xs sm:text-sm text-slate-950">{item.title}</h5>
                            <p className="text-gray-600 text-[11px] sm:text-xs mt-0.5">{item.desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        )}

        {activeSection === "academics" && (
          <div className="animate-fade-in">
            <SubpageHeader 
              title="Nursery Programs & Early Childhood Curriculum" 
              subtitle="Discover Baby Class, Middle Class, and Top Class programs designed for joyful, play-based learning and primary school readiness."
              config={activeConfig}
            />
            {/* Academic Program combinations */}
            <Academics config={activeConfig} onNavigate={handleNavigate} />
          </div>
        )}

        {activeSection === "sports-academy" && (
          <div className="animate-fade-in">
            <SubpageHeader 
              title="Graben Highlight Outdoor Play & Sports" 
              subtitle="Developing toddler motor coordination, health, agility, and team play on our soft green lawn and mini sports equipment."
              config={activeConfig}
            />
            {/* Talent & Sports Projects focus segment */}
            <SportsAcademy config={activeConfig} onNavigate={handleNavigate} />
          </div>
        )}

        {activeSection === "campus" && (
          <div className="animate-fade-in">
            <SubpageHeader 
              title="Nursery Campus & Care Facilities" 
              subtitle="Tour our sunlit classrooms, storybook reading corner, creative art atelier, green play lawn, and health care unit in Rubavu District."
              config={activeConfig}
            />
            <CampusExperience config={activeConfig} onNavigate={handleNavigate} />
          </div>
        )}

        {activeSection === "outcomes" && (
          <div className="animate-fade-in">
            <SubpageHeader 
              title="Early Childhood Milestones & Readiness" 
              subtitle="Tracking toddler growth across early literacy, phonics, numbers, emotional confidence, and primary school readiness."
              config={activeConfig}
            />
            <OutcomesExperience config={activeConfig} onNavigate={handleNavigate} />
          </div>
        )}

        {activeSection === "gallery" && (
          <div className="animate-fade-in">
            <SubpageHeader 
              title="Nursery Picture Gallery" 
              subtitle="A joyful visual showcase of children learning, painting, playing outdoor games, and exploring at Graben Highlight Academy."
              config={activeConfig}
            />
            {/* Media & Image Lightroom Hub */}
            <Gallery config={activeConfig} />
          </div>
        )}

        {activeSection === "news" && (
          <div className="animate-fade-in">
            <SubpageHeader 
              title="Nursery News & Announcements" 
              subtitle="Stay updated with orientation announcements, parent workshop dates, campus upgrades, and nursery events."
              config={activeConfig}
            />
            {/* Announcement Press Releases */}
            <NewsAnnouncements config={activeConfig} />
          </div>
        )}

        {activeSection === "contact" && (
          <div className="animate-fade-in">
            <SubpageHeader 
              title="Nursery Enrollment & Contact Desk" 
              subtitle="Inquire about Baby, Middle, or Top Class registration, fees, and campus tours at Graben Highlight Academy in Rubavu District."
              config={activeConfig}
            />
            {/* Admissions Form & Location map */}
            <Contact config={activeConfig} />
          </div>
        )}

      </main>

      {/* 3. Global footer */}
      <Footer config={activeConfig} onNavigate={handleNavigate} />

    </div>
  );
}