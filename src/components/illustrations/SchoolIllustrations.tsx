import React from 'react';

// 1. HERO SLIDE 1: School Campus & Rubavu Landscape Illustration
export const HeroSlideCampusSvg: React.FC<{ className?: string }> = ({ className = "w-full h-full" }) => (
  <svg viewBox="0 0 800 450" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <defs>
      <linearGradient id="skyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#38BDF8" />
        <stop offset="60%" stopColor="#BAE6FD" />
        <stop offset="100%" stopColor="#FEF3C7" />
      </linearGradient>
      <linearGradient id="sunGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FDE047" />
        <stop offset="100%" stopColor="#F97316" />
      </linearGradient>
      <linearGradient id="mountainGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#15803D" />
        <stop offset="100%" stopColor="#166534" />
      </linearGradient>
      <linearGradient id="mountainGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#22C55E" />
        <stop offset="100%" stopColor="#15803D" />
      </linearGradient>
      <linearGradient id="lakeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#0284C7" />
        <stop offset="50%" stopColor="#38BDF8" />
        <stop offset="100%" stopColor="#0284C7" />
      </linearGradient>
      <linearGradient id="buildingGrad" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#FFF7ED" />
        <stop offset="100%" stopColor="#FED7AA" />
      </linearGradient>
      <linearGradient id="roofGrad" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#EA580C" />
        <stop offset="100%" stopColor="#C2410C" />
      </linearGradient>
      <filter id="shadow" x="-5%" y="-5%" width="110%" height="110%">
        <feDropShadow dx="0" dy="6" stdDeviation="8" floodColor="#000000" floodOpacity="0.25" />
      </filter>
    </defs>

    {/* Sky & Sun */}
    <rect width="800" height="450" fill="url(#skyGrad)" />
    <circle cx="680" cy="100" r="55" fill="url(#sunGrad)" opacity="0.9" />
    <circle cx="680" cy="100" r="75" fill="#FDE047" opacity="0.25" />

    {/* Clouds */}
    <path d="M 120 70 Q 140 50 170 60 Q 190 40 220 55 Q 240 50 250 70 Z" fill="#FFFFFF" opacity="0.85" />
    <path d="M 450 90 Q 470 75 495 85 Q 515 70 540 85 Q 560 80 570 95 Z" fill="#FFFFFF" opacity="0.75" />

    {/* Rubavu Hills & Lake Kivu */}
    <path d="M -20 280 Q 150 160 380 250 Q 550 180 820 270 L 820 450 L -20 450 Z" fill="url(#mountainGrad1)" />
    <path d="M -20 310 Q 220 200 480 300 Q 660 220 820 310 L 820 450 L -20 450 Z" fill="url(#mountainGrad2)" />
    <path d="M 520 330 C 600 320 700 325 820 340 L 820 450 L 520 450 Z" fill="url(#lakeGrad)" opacity="0.75" />

    {/* School Grass Courtyard */}
    <path d="M -20 350 Q 300 330 820 360 L 820 450 L -20 450 Z" fill="#4ADE80" />

    {/* School Building Structure */}
    <g filter="url(#shadow)">
      {/* Main Building Base */}
      <rect x="220" y="220" width="360" height="150" rx="16" fill="url(#buildingGrad)" stroke="#F97316" strokeWidth="4" />
      {/* Roof */}
      <path d="M 190 225 L 400 130 L 610 225 Z" fill="url(#roofGrad)" stroke="#9A3412" strokeWidth="4" />
      <path d="M 370 145 L 400 132 L 430 145 Z" fill="#FDE047" />

      {/* Directress & Academy Badge Emblem */}
      <circle cx="400" cy="185" r="22" fill="#EA580C" stroke="#FFFFFF" strokeWidth="3" />
      <text x="400" y="192" textAnchor="middle" fill="#FFFFFF" fontSize="20" fontWeight="bold">🏫</text>

      {/* Windows */}
      <rect x="250" y="250" width="60" height="50" rx="8" fill="#38BDF8" stroke="#0284C7" strokeWidth="3" />
      <line x1="280" y1="250" x2="280" y2="300" stroke="#FFFFFF" strokeWidth="2" />
      <line x1="250" y1="275" x2="310" y2="275" stroke="#FFFFFF" strokeWidth="2" />

      <rect x="490" y="250" width="60" height="50" rx="8" fill="#38BDF8" stroke="#0284C7" strokeWidth="3" />
      <line x1="520" y1="250" x2="520" y2="300" stroke="#FFFFFF" strokeWidth="2" />
      <line x1="490" y1="275" x2="550" y2="275" stroke="#FFFFFF" strokeWidth="2" />

      {/* Archway Entrance Door */}
      <path d="M 365 370 L 365 295 A 35 35 0 0 1 435 295 L 435 370 Z" fill="#9A3412" stroke="#FFFFFF" strokeWidth="3" />
      <circle cx="380" cy="335" r="4" fill="#FDE047" />
    </g>

    {/* Play Equipment & Trees */}
    <g>
      {/* Tree Left */}
      <rect x="90" y="310" width="20" height="70" rx="4" fill="#78350F" />
      <circle cx="100" cy="290" r="45" fill="#15803D" />
      <circle cx="80" cy="275" r="30" fill="#22C55E" />
      <circle cx="120" cy="275" r="30" fill="#4ADE80" />

      {/* Tree Right */}
      <rect x="680" y="320" width="18" height="60" rx="4" fill="#78350F" />
      <circle cx="689" cy="300" r="40" fill="#166534" />
      <circle cx="672" cy="285" r="28" fill="#22C55E" />

      {/* Playground Slide */}
      <path d="M 140 370 L 165 310 L 175 310 L 210 370 Z" fill="#E11D48" />
      <path d="M 165 310 L 215 365" stroke="#F43F5E" strokeWidth="8" strokeLinecap="round" />

      {/* Flags on Roof */}
      <line x1="400" y1="130" x2="400" y2="100" stroke="#475569" strokeWidth="3" />
      <path d="M 400 100 L 435 112 L 400 124 Z" fill="#22C55E" />
    </g>

    {/* Banner overlay text visual */}
    <rect x="250" y="390" width="300" height="40" rx="20" fill="#1E293B" opacity="0.9" />
    <text x="400" y="415" textAnchor="middle" fill="#FDE047" fontSize="14" fontWeight="800" letterSpacing="1">
      GRABEN HIGHLIGHT ACADEMY • RUBAVU
    </text>
  </svg>
);

// 2. HERO SLIDE 2: Playground & Sports Field Illustration
export const HeroSlidePlaygroundSvg: React.FC<{ className?: string }> = ({ className = "w-full h-full" }) => (
  <svg viewBox="0 0 800 450" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <defs>
      <linearGradient id="playSky" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#38BDF8" />
        <stop offset="100%" stopColor="#E0F2FE" />
      </linearGradient>
      <linearGradient id="turfGrad" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#4ADE80" />
        <stop offset="100%" stopColor="#15803D" />
      </linearGradient>
    </defs>

    {/* Sky */}
    <rect width="800" height="450" fill="url(#playSky)" />

    {/* Rainbow Arch */}
    <path d="M 100 350 A 300 300 0 0 1 700 350" stroke="#F43F5E" strokeWidth="12" fill="none" opacity="0.4" />
    <path d="M 115 350 A 285 285 0 0 1 685 350" stroke="#F97316" strokeWidth="12" fill="none" opacity="0.4" />
    <path d="M 130 350 A 270 270 0 0 1 670 350" stroke="#FACC15" strokeWidth="12" fill="none" opacity="0.4" />
    <path d="M 145 350 A 255 255 0 0 1 655 350" stroke="#22C55E" strokeWidth="12" fill="none" opacity="0.4" />
    <path d="M 160 350 A 240 240 0 0 1 640 350" stroke="#38BDF8" strokeWidth="12" fill="none" opacity="0.4" />

    {/* Turf Sports Ground */}
    <rect y="260" width="800" height="190" fill="url(#turfGrad)" />
    <line x1="0" y1="360" x2="800" y2="360" stroke="#FFFFFF" strokeWidth="4" strokeDasharray="12 12" />
    <circle cx="400" cy="360" r="50" stroke="#FFFFFF" strokeWidth="4" fill="none" />

    {/* Basketball Stand */}
    <rect x="640" y="160" width="10" height="150" fill="#64748B" />
    <rect x="600" y="140" width="90" height="60" rx="6" fill="#FFFFFF" stroke="#EF4444" strokeWidth="4" />
    <rect x="625" y="160" width="40" height="30" fill="none" stroke="#EF4444" strokeWidth="3" />
    <path d="M 625 190 Q 645 220 665 190 Z" stroke="#F97316" strokeWidth="4" fill="none" />

    {/* Soccer Goal Net */}
    <rect x="80" y="200" width="160" height="100" rx="8" fill="none" stroke="#FFFFFF" strokeWidth="5" />
    <path d="M 80 200 L 40 240 L 40 300 L 80 300 Z" fill="none" stroke="#FFFFFF" strokeWidth="3" />
    <path d="M 240 200 L 280 240 L 280 300 L 240 300 Z" fill="none" stroke="#FFFFFF" strokeWidth="3" />

    {/* Soccer Ball & Basketball */}
    <circle cx="340" cy="370" r="18" fill="#FFFFFF" stroke="#000000" strokeWidth="3" />
    <polygon points="340,360 348,366 345,376 335,376 332,366" fill="#000000" />

    <circle cx="580" cy="340" r="20" fill="#EA580C" stroke="#7C2D12" strokeWidth="3" />
    <path d="M 560 340 H 600 M 580 320 V 360" stroke="#7C2D12" strokeWidth="2" />

    {/* Agility Cones */}
    <polygon points="450,380 435,410 465,410" fill="#F97316" />
    <polygon points="500,380 485,410 515,410" fill="#FACC15" />
    <polygon points="550,380 535,410 565,410" fill="#38BDF8" />

    {/* Title Badge */}
    <rect x="230" y="30" width="340" height="48" rx="24" fill="#065F46" opacity="0.9" />
    <text x="400" y="60" textAnchor="middle" fill="#34D399" fontSize="16" fontWeight="900" letterSpacing="1">
      ⚽ OUTDOOR SPORTS & AGILITY TURF
    </text>
  </svg>
);

// 3. HERO SLIDE 3: Montessori Stream Classrooms Illustration
export const HeroSlideClassroomSvg: React.FC<{ className?: string }> = ({ className = "w-full h-full" }) => (
  <svg viewBox="0 0 800 450" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <defs>
      <linearGradient id="roomGrad" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#FEF3C7" />
        <stop offset="100%" stopColor="#FDE68A" />
      </linearGradient>
      <linearGradient id="matGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#38BDF8" />
        <stop offset="100%" stopColor="#0284C7" />
      </linearGradient>
    </defs>

    {/* Classroom Wall */}
    <rect width="800" height="450" fill="url(#roomGrad)" />
    <rect y="320" width="800" height="130" fill="#D97706" opacity="0.2" />

    {/* Alphabet Wall Chart */}
    <rect x="80" y="40" width="220" height="140" rx="16" fill="#FFFFFF" stroke="#F59E0B" strokeWidth="4" />
    <text x="110" y="80" fill="#EF4444" fontSize="28" fontWeight="bold">A</text>
    <text x="160" y="80" fill="#3B82F6" fontSize="28" fontWeight="bold">B</text>
    <text x="210" y="80" fill="#10B981" fontSize="28" fontWeight="bold">C</text>
    <text x="260" y="80" fill="#F59E0B" fontSize="28" fontWeight="bold">D</text>
    <text x="110" y="130" fill="#8B5CF6" fontSize="28" fontWeight="bold">1</text>
    <text x="160" y="130" fill="#EC4899" fontSize="28" fontWeight="bold">2</text>
    <text x="210" y="130" fill="#06B6D4" fontSize="28" fontWeight="bold">3</text>
    <text x="260" y="130" fill="#84CC16" fontSize="28" fontWeight="bold">4</text>

    {/* Sunlit Window */}
    <rect x="520" y="40" width="200" height="160" rx="16" fill="#E0F2FE" stroke="#0284C7" strokeWidth="5" />
    <line x1="620" y1="40" x2="620" y2="200" stroke="#0284C7" strokeWidth="4" />
    <line x1="520" y1="120" x2="720" y2="120" stroke="#0284C7" strokeWidth="4" />
    <circle cx="670" cy="80" r="25" fill="#FDE047" />

    {/* Storybook & Toy Shelf */}
    <rect x="60" y="220" width="280" height="160" rx="12" fill="#78350F" />
    <rect x="75" y="235" width="250" height="60" rx="6" fill="#B45309" />
    <rect x="75" y="305" width="250" height="60" rx="6" fill="#B45309" />

    {/* Books on shelf */}
    <rect x="90" y="245" width="18" height="40" fill="#EF4444" rx="2" />
    <rect x="112" y="245" width="18" height="40" fill="#3B82F6" rx="2" />
    <rect x="134" y="245" width="18" height="40" fill="#10B981" rx="2" />
    <rect x="156" y="245" width="18" height="40" fill="#F59E0B" rx="2" />

    {/* Wooden Toy Blocks */}
    <rect x="210" y="255" width="30" height="30" fill="#EC4899" rx="4" />
    <polygon points="270,255 255,285 285,285" fill="#8B5CF6" />
    <circle cx="215" cy="335" r="18" fill="#06B6D4" />

    {/* Play Mat Rug */}
    <ellipse cx="540" cy="350" rx="180" ry="70" fill="url(#matGrad)" opacity="0.9" />

    {/* Title Badge */}
    <rect x="230" y="390" width="340" height="44" rx="22" fill="#B45309" opacity="0.95" />
    <text x="400" y="417" textAnchor="middle" fill="#FFFFFF" fontSize="15" fontWeight="900" letterSpacing="1">
      📚 BABY, MIDDLE & TOP CLASS STREAMS
    </text>
  </svg>
);

// 4. HERO SLIDE 4: Peítho Game & Digital Art Fridge Illustration
export const HeroSlidePeithoSvg: React.FC<{ className?: string }> = ({ className = "w-full h-full" }) => (
  <svg viewBox="0 0 800 450" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <defs>
      <linearGradient id="peithoBg" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#4C1D95" />
        <stop offset="50%" stopColor="#7C3AED" />
        <stop offset="100%" stopColor="#C084FC" />
      </linearGradient>
    </defs>

    {/* Cosmic Purple Play Canvas */}
    <rect width="800" height="450" fill="url(#peithoBg)" />

    {/* Glowing Seed Orbs */}
    <circle cx="200" cy="180" r="35" fill="#F43F5E" opacity="0.8" />
    <circle cx="350" cy="120" r="40" fill="#FBBF24" opacity="0.8" />
    <circle cx="500" cy="200" r="45" fill="#34D399" opacity="0.8" />
    <circle cx="650" cy="140" r="38" fill="#60A5FA" opacity="0.8" />

    {/* Connecting Melody Lines */}
    <path d="M 200 180 Q 280 100 350 120 T 500 200 T 650 140" stroke="#FDE047" strokeWidth="6" strokeDasharray="8 8" fill="none" />

    {/* Peítho Flower Creature */}
    <g transform="translate(400, 270)">
      <circle cx="0" cy="0" r="50" fill="#F59E0B" />
      {/* Petals */}
      <circle cx="-55" cy="0" r="28" fill="#EC4899" />
      <circle cx="55" cy="0" r="28" fill="#EC4899" />
      <circle cx="0" cy="-55" r="28" fill="#3B82F6" />
      <circle cx="0" cy="55" r="28" fill="#10B981" />
      <circle cx="-40" cy="-40" r="25" fill="#F43F5E" />
      <circle cx="40" cy="-40" r="25" fill="#8B5CF6" />
      <circle cx="-40" cy="40" r="25" fill="#FBBF24" />
      <circle cx="40" cy="40" r="25" fill="#06B6D4" />

      {/* Creature Face */}
      <circle cx="-16" cy="-10" r="8" fill="#FFFFFF" />
      <circle cx="-14" cy="-10" r="4" fill="#000000" />
      <circle cx="16" cy="-10" r="8" fill="#FFFFFF" />
      <circle cx="18" cy="-10" r="4" fill="#000000" />
      <path d="M -15 15 Q 0 30 15 15" stroke="#FFFFFF" strokeWidth="4" strokeLinecap="round" fill="none" />
    </g>

    {/* Sparkles */}
    <path d="M 150 80 L 160 100 L 180 110 L 160 120 L 150 140 L 140 120 L 120 110 L 140 100 Z" fill="#FDE047" />
    <path d="M 680 260 L 688 275 L 705 282 L 688 290 L 680 305 L 672 290 L 655 282 L 672 275 Z" fill="#F43F5E" />

    {/* Title Badge */}
    <rect x="210" y="30" width="380" height="46" rx="23" fill="#312E81" opacity="0.9" />
    <text x="400" y="58" textAnchor="middle" fill="#A7F3D0" fontSize="16" fontWeight="900" letterSpacing="1">
      🌸 PEÍTHO DISCOVERY & DIGITAL FRIDGE
    </text>
  </svg>
);

// 5. DIRECTRESS PORTRAIT ILLUSTRATION
export const DirectressAvatarSvg: React.FC<{ className?: string }> = ({ className = "w-16 h-16" }) => (
  <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <circle cx="60" cy="60" r="58" fill="#FEF3C7" stroke="#F59E0B" strokeWidth="4" />
    {/* Shoulders / Dress */}
    <path d="M 20 115 C 20 85 40 78 60 78 C 80 78 100 85 100 115 Z" fill="#EA580C" />
    <path d="M 45 78 L 60 98 L 75 78 Z" fill="#FDE047" />
    {/* Face */}
    <ellipse cx="60" cy="55" rx="26" ry="30" fill="#A16207" />
    {/* Hair */}
    <path d="M 32 50 C 30 25 50 20 60 20 C 70 20 90 25 88 50 C 85 30 75 26 60 26 C 45 26 35 30 32 50 Z" fill="#1C1917" />
    <circle cx="60" cy="22" r="14" fill="#1C1917" />
    {/* Eyes & Smile */}
    <ellipse cx="50" cy="52" rx="3.5" ry="4.5" fill="#FFFFFF" />
    <circle cx="50" cy="52" r="2" fill="#000000" />
    <ellipse cx="70" cy="52" rx="3.5" ry="4.5" fill="#FFFFFF" />
    <circle cx="70" cy="52" r="2" fill="#000000" />
    <path d="M 50 68 Q 60 76 70 68" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" fill="none" />
    {/* Glasses */}
    <rect x="42" y="46" width="16" height="12" rx="4" stroke="#FDE047" strokeWidth="2.5" fill="none" />
    <rect x="62" y="46" width="16" height="12" rx="4" stroke="#FDE047" strokeWidth="2.5" fill="none" />
    <line x1="58" y1="52" x2="62" y2="52" stroke="#FDE047" strokeWidth="2.5" />
  </svg>
);
