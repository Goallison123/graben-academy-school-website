import React from "react";
import { 
  Users, 
  GraduationCap, 
  Calendar, 
  Trophy, 
  Cpu, 
  FlaskConical, 
  TrendingUp, 
  BookOpen, 
  Atom, 
  Mail, 
  Phone, 
  MapPin, 
  Facebook, 
  Twitter, 
  Instagram, 
  Youtube, 
  Search, 
  Menu, 
  X, 
  ChevronRight, 
  ChevronLeft, 
  ArrowRight, 
  Clock, 
  AlertCircle,
  Sparkles,
  Settings,
  Sliders,
  Copy,
  Check,
  Eye,
  School,
  FileCode,
  Download,
  Info,
  Award,
  Flame,
  ArrowUpRight
} from "lucide-react";

const iconsMap: Record<string, React.ComponentType<any>> = {
  Users,
  GraduationCap,
  Calendar,
  Trophy,
  Cpu,
  FlaskConical,
  TrendingUp,
  BookOpen,
  Atom,
  Mail,
  Phone,
  MapPin,
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  Search,
  Menu,
  X,
  ChevronRight,
  ChevronLeft,
  ArrowRight,
  Clock,
  AlertCircle,
  Sparkles,
  Settings,
  Sliders,
  Copy,
  Check,
  Eye,
  School,
  FileCode,
  Download,
  Info,
  Award,
  Flame,
  ArrowUpRight
};

interface LucideIconProps extends React.ComponentProps<"svg"> {
  name: string;
  className?: string;
  size?: number;
  style?: React.CSSProperties;
}

export default function LucideIcon({ name, className, size, ...props }: LucideIconProps) {
  const IconComponent = iconsMap[name];
  if (!IconComponent) {
    // Return a default icon if not found
    return <Info className={className} size={size} {...props} />;
  }
  return <IconComponent className={className} size={size} {...props} />;
}
