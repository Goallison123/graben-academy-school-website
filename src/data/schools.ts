import { SchoolConfig } from "../types";

export const SCHOOLS_DATA: SchoolConfig[] = [
  {
    id: "graben-highlight-academy",
    name: "Graben Highlight Academy",
    frenchName: "Académie Graben Highlight",
    slogan: "Growing Bright Minds • Learning Through Joy & Discovery",
    established: "2023",
    location: "Rubavu District, Western Province, Rwanda",
    district: "Rubavu",
    type: "Early Childhood & Nursery School",
    gender: "Co‑educational (Toddlers & Nursery Pupils))",
    logoUrl: "src/assets/images/graben-logo.JPG",
    primaryColor: "#ffc72c", // Warm yellow / Gold
    secondaryColor: "#1b4d3e", // Dark forest green
    accentColor: "#1a1a1a", // Sky Blue Accent
    contact: {
      email: "admissions@grabenhighlight.edu.rw",
      phone: "+250 788 123 456",
      address: "Gisenyi Sector, Rubavu District, Western Province, Rwanda",
      facebook: "https://facebook.com/grabenhighlightacademy",
      twitter: "https://twitter.com/grabenhighlight",
      instagram: "https://instagram.com/graben_highlight_academy",
      youtube: "https://youtube.com/@grabenhighlightacademy"
    },
    heroSlides: [
      {
        image: "src/assets/images/hero-celebrating-early-achievements.jpg",
        title: "Celebrating Early Achievements",
        description: "Our nursery graduates shine with confidence and pride as they mark their first academic milestone.",
        tag: "Nursery Graduation Day"
      },
      {
        image: "/src/assets/images/hero-learning-beyong-class.jpg",
        title: "Learning Beyond the Classroom",
        description: "Children explore art, nature, and friendship through guided outdoor play and creative discovery.",
        tag: "Outdoor Exploration"
      },
      {
        image: "src/assets/images/hero-celebrating-culture.jpg",
        title: "Celebrating Culture Through Movement",
        description: "Our pupils express creativity and rhythm through cultural dance and joyful performance.",
        tag: "Holistic Child Development"
      }
    ],
    welcome: {
      title: "Welcome to Graben Highlight Academy",
      message: "At Graben Highlight Academy, we nurture curiosity and confidence in every child. From playful learning to cultural celebration, our classrooms and playgrounds are filled with laughter, creativity, and discovery. We believe education begins with joy — and every milestone, from first words to graduation, deserves celebration.",
      authorName: "Sadiki RWEMA",
      authorRole: "School Manager and Director",
      authorImage: "src/assets/images/welcome-school-headmaster.jpg"
    },
    stats: [
      { label: "Enrolled Toddlers", value: "180+", icon: "Smile" },
      { label: "Trained Caregivers", value: "100% Certified", icon: "HeartHandshake" },
      { label: "Nursery Streams", value: "Baby, Middle & Top", icon: "Sparkles" },
      { label: "Safety Standard", value: "100% Secure Campus", icon: "ShieldCheck" }
    ],
    academicPrograms: [
      {
        title: "Baby Class (Ages 1.5 – 3 Years)",
        code: "Baby Class",
        description: "Gentle sensory exploration, nursery rhymes, motor-skills development, social bonding, and attentive care in a cozy, safe space.",
        icon: "Smile"
      },
      {
        title: "Middle Class (Ages 3 – 4 Years)",
        code: "Middle Class",
        description: "Interactive learning through building blocks, color sorting, initial vocabulary, creative painting, and cooperative peer activities.",
        icon: "Sparkles"
      },
      {
        title: "Top Class / Reception (Ages 4 – 6 Years)",
        code: "Top Class",
        description: "Early phonics literacy, basic counting & arithmetic, environmental awareness, story comprehension, and primary school readiness.",
        icon: "BookOpen"
      },
      {
        title: "Creative Arts, Music & Storytelling Atelier",
        code: "Arts & Play",
        description: "Finger painting, rhythm band instruments, puppet storytelling, dramatic play, and imaginative art projects.",
        icon: "Palette"
      },
      {
        title: "Cultural Dance & Expression  ",
        code: "Culture",
        description: "Children learn rhythm, coordination, and teamwork through traditional dance and creative movement activities.",
        icon: "Palette"
      }

    ],
    sportsAcademy: {
  title: "Graben Highlight Outdoor Play & Physical Development",
  description: "At Graben Highlight Academy, outdoor play is full of laughter and discovery. Our children enjoy free movement and teamwork through simple games like running, hide and seek, and playful group challenges. These activities help them build balance, coordination, and confidence while having fun in a safe, green environment.",
  image: "src/assets/images/sports-outdoor-fun-group.jpg",
  features: [
    "Supervised outdoor play on soft, secure green lawns in Rubavu District",
    "Playful group games like running, hide and seek, and tag",
    "Encouraging teamwork, laughter, and social bonding among children",
    "Gross motor skill development through natural movement and exploration",
    "Trained early childhood caregivers ensuring 100% child safety and hygiene"
  ]
},
    galleryItems: [
      {
        src: "src/assets/images/gallery-graduation-ceremony.jpg",
        title: "Graduation ceremony highlights",
        category: "School Events",
        description: "Our proud graduates march with joy and unity."
      },
      {
        src: "src/assets/images/gallery-outdoor-play.jpg",
        title: "Outdoor sculpture play",
        category: "Outdoor learning",
        description: "Exploring art and nature through play."
      },
      {
        src: "src/assets/images/gallery-class-group.jpg",
        title: "Class group",
        category: "Community",
        description: "Our learners and caregivers together — a family of growth"
      },
      {
        src: "src/assets/images/gallery-child-certificate.jpg",
        title: "Graduation certification",
        category: "Achievement",
        description: "Celebrating milestones with pride and friendship."
      }
    ],
    news: [
      {
        id: "news-1",
        title: "Graben Highlight Academy Celebrates Nursery Graduation 2026",
        date: "June 22, 2026",
        category: "School event",
        summary: "Families gathered to celebrate the achievements of our nursery graduates in Rubavu District.",
        author: "SYBELLA SYSTEMS CUSTOMER SUPPORT TEAM",
        readTime: "1 min read",
        image: "src/assets/images/news-graduation.jpg",
        content: [
          "Graben Highlight Academy warmly welcomed new families to its vibrant nursery campus in Rubavu District for the upcoming school session.",
          "During the orientation, Director RWEMA SADIKI reaffirmed the academy's core mission: creating a safe, engaging, and supportive environment where children learn through play, creativity, and exploration.",
          "Parents toured the sunlit classrooms, outdoor play lawn, and creative arts atelier, meeting trained caregivers dedicated to holistic social, emotional, and cognitive development.",
          "Enrollment remains open for Baby Class, Middle Class, and Top Class streams."
        ]
      },
      
    ]
  }
];

