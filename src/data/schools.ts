import { SchoolConfig } from "../types";

export const SCHOOLS_DATA: SchoolConfig[] = [
  {
    id: "graben-highlight-academy",
    name: "Graben Highlight Academy",
    frenchName: "Académie Graben Highlight",
    slogan: "Nurturing Young Minds • Learning Through Play & Discovery",
    established: "2018",
    location: "Rubavu District, Western Province, Rwanda",
    district: "Rubavu",
    type: "Nurturing Early Childhood & Nursery School",
    gender: "Co-educational (Toddlers & Nursery Pupils)",
    logoUrl: "/assets/graben_logo.svg",
    primaryColor: "#ea580c", // Cheerful Warm Orange
    secondaryColor: "#f59e0b", // Sunshine Yellow/Amber
    accentColor: "#0284c7", // Sky Blue Accent
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
        image: "/assets/graben_hero.jpg",
        title: "Nurturing Early Childhood Education in Rubavu District",
        description: "Creating a safe, engaging, and supportive environment where children learn through play, creativity, and exploration.",
        tag: "Nursery & Play-Based Learning"
      },
      {
        image: "/assets/graben_sports.jpg",
        title: "Active Outdoor Play & Physical Development",
        description: "Developing gross motor skills, teamwork, and health habits through supervised playground activities and mini sports games.",
        tag: "Outdoor Play & Sports"
      },
      {
        image: "/assets/graben_art.jpg",
        title: "Holistic Social, Emotional & Cognitive Growth",
        description: "Helping every child build a strong foundation for future learning and success with loving, trained caregivers.",
        tag: "Holistic Child Development"
      }
    ],
    welcome: {
      title: "Welcome to Graben Highlight Academy",
      message: "Graben Highlight Academy is a nurturing nursery school in Rubavu District, dedicated to providing quality early childhood education. We create a safe, engaging, and supportive environment where children learn through play, creativity, and exploration. Our trained caregivers focus on holistic development—social, emotional, and cognitive—helping every child build a strong foundation for future learning and success.",
      authorName: "Marie-Claire Mukamana",
      authorRole: "Directress & Early Childhood Lead",
      authorImage: "/assets/graben_art.jpg"
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
      }
    ],
    sportsAcademy: {
      title: "Graben Highlight Outdoor Play & Physical Development",
      description: "Physical activity and active outdoor games are essential for early childhood health. At Graben Highlight Academy, our spacious green playground features soft play equipment, balance beams, mini basketball hoops, and group ball games where toddlers run, jump, build balance, and develop motor coordination safely under loving supervision.",
      image: "/assets/graben_sports.jpg",
      features: [
        "Supervised outdoor play on soft, secure green lawns in Rubavu District",
        "Mini basketball hoops, soft football kicks, and obstacle balance fun",
        "Gross motor skill development and rhythmic physical movement exercises",
        "Trained early childhood caregivers ensuring 100% child safety and hygiene"
      ]
    },
    galleryItems: [
      {
        src: "/assets/graben_hero.jpg",
        title: "Interactive Play & Building Blocks Activity",
        category: "Learning Through Play",
        description: "Children building spatial and cognitive skills with colorful blocks."
      },
      {
        src: "/assets/graben_sports.jpg",
        title: "Outdoor Lawn Play & Motor Skills Exercises",
        category: "Outdoor Activities",
        description: "Active toddlers enjoying outdoor games under gentle caregiver supervision."
      },
      {
        src: "/assets/graben_art.jpg",
        title: "Creative Finger Painting & Art Atelier",
        category: "Creative Expression",
        description: "Nursery pupils expressing imagination through painting and storytelling."
      },
      {
        src: "/assets/graben_classroom.jpg",
        title: "Sunlit Nursery Classroom & Reading Corner",
        category: "Learning Environment",
        description: "Our cheerful, child-friendly classroom filled with storybooks and educational games."
      }
    ],
    news: [
      {
        id: "news-1",
        title: "Graben Highlight Academy Welcomes New Nursery Cohort in Rubavu District",
        date: "July 18, 2026",
        category: "Nursery Announcement",
        summary: "Parents and toddlers gathered for Orientation Day as Graben Highlight Academy opened registration for Baby Class, Middle Class, and Top Class.",
        author: "Directress Marie-Claire Mukamana",
        readTime: "2 min read",
        image: "/assets/graben_hero.jpg",
        content: [
          "Graben Highlight Academy warmly welcomed new families to its vibrant nursery campus in Rubavu District for the upcoming school session.",
          "During the orientation, Directress Marie-Claire Mukamana reaffirmed the academy's core mission: creating a safe, engaging, and supportive environment where children learn through play, creativity, and exploration.",
          "Parents toured the sunlit classrooms, outdoor play lawn, and creative arts atelier, meeting trained caregivers dedicated to holistic social, emotional, and cognitive development.",
          "Enrollment remains open for Baby Class, Middle Class, and Top Class streams."
        ]
      },
      {
        id: "news-2",
        title: "The Importance of Play-Based Early Literacy & Cognitive Growth",
        date: "June 25, 2026",
        category: "Parent Guidance",
        summary: "Our early childhood experts share key insights on how play-based learning strengthens brain development, language acquisition, and social confidence.",
        author: "Early Childhood Care Team",
        readTime: "3 min read",
        image: "/assets/graben_art.jpg",
        content: [
          "Research shows that young children learn best when education is joyful, interactive, and play-based.",
          "At Graben Highlight Academy, storytelling sessions, finger painting, and rhyming songs spark curiosity while laying the groundwork for reading comprehension and arithmetic.",
          "Caregivers encourage emotional intelligence by teaching toddlers empathy, sharing, and self-expression in a calm, nurturing setting.",
          "Parents are encouraged to reinforce creative play at home with daily story reading and interactive conversation."
        ]
      },
      {
        id: "news-3",
        title: "Upgraded Outdoor Playground & Safety Equipment",
        date: "May 10, 2026",
        category: "Campus Upgrades",
        summary: "Graben Highlight Academy has expanded its outdoor play area with soft turf, mini basketball courts, and balance play structures for healthy motor development.",
        author: "Child Welfare & Safety Desk",
        readTime: "2 min read",
        image: "/assets/graben_sports.jpg",
        content: [
          "Physical play is a cornerstone of child growth. Graben Highlight Academy recently installed new child-safe play equipment and soft turf on its outdoor grounds.",
          "The new facilities feature mini basketball hoops, climbing balance tracks, and soft play balls tailored for toddler hand-eye coordination.",
          "With trained caregivers present at all times, every child enjoys active outdoor fun with complete safety and peace of mind for parents."
        ]
      }
    ]
  }
];

