export interface HeroSlide {
  image: string;
  title: string;
  description: string;
  tag: string;
}

export interface AcademicProgram {
  title: string;
  code: string;
  description: string;
  icon: string; // key of lucide-react icons
}

export interface StatItem {
  label: string;
  value: string;
  icon: string; // key of lucide-react icons
}

export interface NewsItem {
  id: string;
  title: string;
  date: string;
  category: string;
  summary: string;
  content?: string[];
  author?: string;
  readTime?: string;
  image?: string;
}

export interface GalleryItem {
  src: string;
  title: string;
  category: string;
  description: string;
}

export interface SchoolConfig {
  id: string;
  name: string;
  frenchName?: string;
  slogan: string;
  established: string;
  location: string; // e.g. "Rugerero"
  district: string; // e.g. "Rubavu"
  type: string; // e.g. "Boarding & Day Secondary School"
  gender: string; // e.g. "Co-educational"
  logoUrl: string;
  primaryColor: string; // CSS color string (e.g. hex #0056b3)
  secondaryColor: string; // CSS color string (e.g. hex #f39c12)
  accentColor: string; // CSS color string (e.g. hex #e74c3c)
  contact: {
    email: string;
    phone: string;
    address: string;
    facebook?: string;
    twitter?: string;
    instagram?: string;
    youtube?: string;
  };
  heroSlides: HeroSlide[];
  welcome: {
    title: string;
    message: string;
    authorName: string;
    authorRole: string;
    authorImage: string;
  };
  stats: StatItem[];
  academicPrograms: AcademicProgram[];
  sportsAcademy: {
    title: string;
    description: string;
    image: string;
    features: string[];
  };
  galleryItems: GalleryItem[];
  news: NewsItem[];
}
