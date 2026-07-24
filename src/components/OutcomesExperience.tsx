import React from "react";
import { SchoolConfig } from "../types";
import LucideIcon from "./LucideIcon";

interface OutcomesExperienceProps {
  config: SchoolConfig;
  onNavigate?: (sectionId: string) => void;
}

export default function OutcomesExperience({ config, onNavigate }: OutcomesExperienceProps) {
  const certifiedMetrics = [
    {
      metric: "100%",
      label: "Certified Early Caregivers & Teachers",
      description: "All nursery caregivers hold recognized early childhood development certifications with full first-aid training.",
      basis: `${config.name} Registry & Child Welfare Dept.`
    },
    {
      metric: "98%",
      label: "Early Literacy & Phonics Progression",
      description: "Top Class pupils achieve fluent letter recognition, sight reading, and basic counting skills before entering primary school.",
      basis: `${config.name} Early Assessment Records.`
    },
    {
      metric: "100%",
      label: "Safe Outdoor Play & Motor Skill Growth",
      description: "Every toddler participates in supervised daily outdoor play, balance agility, and mini sports games.",
      basis: "Physical Play & Wellness Department."
    },
    {
      metric: "100%",
      label: "Primary School Transition Readiness",
      description: "Top Class graduates smoothly transition into primary school with high social confidence and foundational skills.",
      basis: "Primary School Admissions Feedback."
    }
  ];

  const careerDestinations = [
    {
      sector: "Early Literacy & Storytelling",
      percentage: "100%",
      examples: "Letter recognition, phonics rhymes, story listening, vocabulary growth",
      icon: "BookOpen"
    },
    {
      sector: "Creative Expression & Arts",
      percentage: "100%",
      examples: "Finger painting, craft molding, rhythm band, imaginative puppet play",
      icon: "Palette"
    },
    {
      sector: "Social Confidence & Empathy",
      percentage: "100%",
      examples: "Sharing toys, team cooperation, active listening, emotional security",
      icon: "Heart"
    },
    {
      sector: "Physical Agility & Outdoor Play",
      percentage: "100%",
      examples: "Mini basketball hoops, balance tracks, soft lawn soccer, gross motor skills",
      icon: "Trophy"
    }
  ];

  const notableAlumni = [
    {
      name: "Divine Keza (Parent)",
      cohort: "Top Class Parent 2025",
      role: "Mother of Ethan (Age 5)",
      quote: `${config.name} transformed my son's confidence! He reads storybooks with joy and looks forward to school every single morning.`
    },
    {
      name: "Jean-Paul Habimana",
      cohort: `${config.name} Graduate (2023)`,
      role: "Top Student in Primary 1",
      quote: `I learned my ABCs, numbers, and how to paint at ${config.name}. Playing with building blocks on the lawn was my favorite part!`
    },
    {
      name: "Marie-Claire Mukamana",
      cohort: "Directress & Caregiver Lead",
      role: "Early Childhood Specialist",
      quote: "We nurture every child with patience and love. When learning is fun, children thrive naturally."
    }
  ];

  return (
    <div className="py-12 sm:py-20 bg-gray-50/50" id="outcomes-experience-section">
      <div className="max-w-[1400px] mx-auto px-2 sm:px-4 lg:px-5 space-y-16">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span 
            className="text-xs font-extrabold tracking-widest uppercase inline-block px-3 py-1 rounded-full text-white shadow-sm"
            style={{ backgroundColor: config.secondaryColor }}
          >
            NURSERY MILESTONES & CHILD GROWTH
          </span>
          <h2 className="font-sans font-black text-3xl sm:text-4xl text-gray-900 tracking-tight">
            {config.name} Developmental Milestones
          </h2>
          <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
            Measuring early childhood progress in phonics, creative expression, social confidence, and primary school readiness.
          </p>
        </div>

        {/* 4 Core Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {certifiedMetrics.map((item, idx) => (
            <div 
              key={idx} 
              className="bg-white rounded-2xl p-6 border border-gray-150 shadow-sm flex flex-col justify-between hover:shadow-md transition-all"
            >
              <div className="space-y-2">
                <div 
                  className="text-3xl sm:text-4xl font-sans font-black tracking-tight"
                  style={{ color: config.primaryColor }}
                >
                  {item.metric}
                </div>
                <h3 className="font-extrabold text-gray-900 text-sm">{item.label}</h3>
                <p className="text-gray-500 text-xs font-light leading-relaxed pt-1">
                  {item.description}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-gray-100 flex items-center space-x-1.5 text-[10px] text-gray-400 font-medium">
                <LucideIcon name="ShieldCheck" size={12} className="text-emerald-600 shrink-0" />
                <span>{item.basis}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Development Pillars Breakdown */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-gray-150 shadow-sm space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <h3 className="font-sans font-extrabold text-2xl text-gray-900 tracking-tight">
              Developmental Focus & Pillars
            </h3>
            <p className="text-gray-500 text-xs sm:text-sm font-light">
              Nurturing core learning areas at {config.name} across phonics, arts, social empathy, and play.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {careerDestinations.map((dest, idx) => (
              <div key={idx} className="p-5 rounded-2xl bg-gray-50/80 border border-gray-100 space-y-3">
                <div className="flex items-center justify-between">
                  <div 
                    className="p-2.5 rounded-xl text-white shadow-xs"
                    style={{ backgroundColor: config.primaryColor }}
                  >
                    <LucideIcon name={dest.icon} size={18} />
                  </div>
                  <span className="font-black text-lg text-slate-900">{dest.percentage}</span>
                </div>
                <h4 className="font-extrabold text-sm text-gray-900">{dest.sector}</h4>
                <p className="text-gray-500 text-xs font-light leading-relaxed">
                  {dest.examples}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Parent & Educator Community Voices */}
        <div className="space-y-6">
          <div className="text-center max-w-xl mx-auto">
            <h3 className="font-sans font-extrabold text-2xl text-gray-900 tracking-tight">
              Community Voices & Testimonials
            </h3>
            <p className="text-gray-500 text-xs sm:text-sm font-light mt-1">
              Reflections from parents, young scholars, and early childhood educators at {config.name}.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {notableAlumni.map((alum, idx) => (
              <div key={idx} className="bg-white p-6 rounded-2xl border border-gray-150 shadow-sm flex flex-col justify-between space-y-4">
                <p className="text-gray-600 text-xs sm:text-sm font-light italic leading-relaxed">
                  "{alum.quote}"
                </p>
                <div className="pt-3 border-t border-gray-100 flex items-center justify-between">
                  <div>
                    <h4 className="font-bold text-xs sm:text-sm text-gray-900">{alum.name}</h4>
                    <p className="text-gray-500 text-[10px] sm:text-xs">{alum.role}</p>
                  </div>
                  <span 
                    className="text-[10px] font-extrabold px-2.5 py-0.5 rounded text-white shadow-xs"
                    style={{ backgroundColor: config.secondaryColor }}
                  >
                    {alum.cohort}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}