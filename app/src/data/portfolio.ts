



import {
  BookOpen,
  BriefcaseBusiness,
  Code2,
  Github,
  Linkedin,
  Palette,
  Wrench,
  type LucideIcon,
} from "lucide-react";

import sportApp from "@/assets/designs/sport.jpg";
import fashionApp from "@/assets/designs/fashionap.jpg";
import sportapp1 from "@/assets/designs/spot.jpg";
import appfashion from "@/assets/designs/appfashion.jpg";
import sportApp2 from "@/assets/designs/sportapp.jpg";
import imageG from "@/assets/designs/image2.png";
import imageH from "@/assets/designs/image5.png";

import  imageP  from "@/assets/designs/image1.png";
import  Group22  from "@//assets/designs/Group22.png";
import  Group29 from "@//assets/designs/Group29.png";
import  Group31 from "@//assets/designs/Group31.png";
import  Group34 from "@//assets/designs/Group34.png";
import  Group35 from "@//assets/designs/Group35.png";
import  Group36 from "@//assets/designs/Group36.png";
import  Frame  from "@//assets/designs/Frame.png";
import  Frame362 from "@//assets/designs/Frame362.png";




import  image11 from "@//assets/designs/image11.png";
import  image12 from "@//assets/designs/image12.png";
import  image13 from "@//assets/designs/image13.png";
import  image14 from "@//assets/designs/image14.png";





import  aa from "@//assets/designs/aa.png";
import  ki from "@//assets/designs/ki.png";
import  jj from "@//assets/designs/jj.png";
import  oo from "@//assets/designs/oo.png";
import  mm from "@//assets/designs/pl.png";
import  pl from "@//assets/designs/mm.png";
import ava from "@//assets/designs/ava.png";


export type ProjectCategory = "All" | "Education" | "Web development" | "Freelance";

export type Project = {
  name: string;
  label: string;
  description: string;
  contribution: string;
  technologies: string[];
  category: Exclude<ProjectCategory, "All">;
  icon: LucideIcon;
  images?: string []; 
  format: "portrait" | "landscape";
};

export type ExperienceItem = { date: string; role: string; company: string; detail: string };
export type EducationItem = { year: string; degree: string; school: string };
export type Workshop = { meta: string; title: string; description: string };
export type SkillGroup = { title: string; icon: LucideIcon; items: string[] };
export type Language = { code: string; name: string; level: string };
export type SocialLink = { label: string; href: string; icon: LucideIcon };

/* ---------- Profile & contact ---------- */

export const PROFILE = {
  name: "Samar Laajili",
  initials: "SL",
  email: "samarlaajilisl@gmail.com",
  phone: "+216 23 371 646",
  phoneHref: "tel:+21623371646",
  address: "Hay Riath, Sousse, Tunisia",
  city: "Sousse, Tunisia",
  interests: "UI/UX design, drawing, Arabic calligraphy, intellectual games, teamwork, and continuous learning.",
} as const;

export const CV_LINKS = [
  { label: "CV français", href: "/cv/samar-laajili-fr.pdf", fileName: "Samar-Laajili-CV-FR.pdf" },
  { label: "CV English", href: "/cv/samar-laajili-en.pdf", fileName: "Samar-Laajili-CV-EN.pdf" },
] as const;

export const SOCIAL_LINKS: SocialLink[] = [
  { label: "GitHub", href: "https://github.com/laajilisamar", icon: Github },
  { label: "LinkedIn", href: "https://linkedin.com/in/laajilisamar", icon: Linkedin },
  { label: "Behance", href: "https://behance.net/laajilisamar", icon: Palette },
];

/* ---------- Navigation ---------- */

export const NAV_ITEMS = ["About", "Work", "Design","Experience", "Education", "Contact"] as const;

/* ---------- Content ---------- */

export const LANGUAGES: Language[] = [
  { code: "AR", name: "Arabic", level: "Native" },
  { code: "FR", name: "French", level: "Intermediate" },
  { code: "EN", name: "English", level: "Intermediate" },
];

export const PROJECT_CATEGORIES: ProjectCategory[] = ["All", "Education", "Web development", "Freelance"];

export const PROJECTS: Project[] = [
  {
    name: "Iqraa",
    label: "E-learning platform",
    description: "An online learning platform designed to make quality educational resources easier to access.",
    contribution: "Graduation internship project developed at Sweet Touch from February to June 2024.",
    technologies: ["PHP", "Laravel", "MySQL"],
    category: "Education",
    icon: BookOpen,
    images: [imageG,imageH,imageP],
    format: "portrait",
  },
  {
    name: "Vibracom",
    label: "Services web application",
    description: "A web application for browsing and managing services, supported by a dedicated administration interface.",
    contribution: "Built during an initiation internship at Designet Web Agency in 2023.",
    technologies: ["PHP", "Laravel", "MySQL"],
    category: "Web development",
    icon: Code2,
    images: [image11,image12,image13,image14],
    format: "portrait",
  },
  {
    name: "After-sales service app",
    label: "Dynamic service management",
    description: "A dynamic web application created to support and organize after-sales service operations.",
    contribution: "Developed during an advanced internship at Bus Software in 2022.",
    technologies: ["PHP", "MongoDB"],
    category: "Web development",
    icon: Wrench,
    images: [aa,jj,mm,oo,pl,ki],
    format: "portrait",
  },
  {
    name: "Freelance technical work",
    label: "Software & remote teaching",
    description: "Delivered a short software assignment under a tight deadline and taught computer science remotely.",
    contribution: "Strengthened project ownership, time management, communication, and learner support.",
    technologies: ["Software engineering", "Teaching", "Remote work"],
    category: "Freelance",
    icon: BriefcaseBusiness,
    images: [ava],
    format: "landscape",
  },
];

export const SKILLS: SkillGroup[] = [
  { title: "Development", icon: Code2, items: ["Python", "JavaScript", "React", "HTML & CSS", "SQL", "MySQL", "MongoDB"] },
  { title: "Frameworks", icon: Wrench, items: ["Laravel", "Spring Boot", "Flutter", "Angular", "WordPress"] },
  { title: "Design & tools", icon: Palette, items: ["Figma", "Canva", "GitHub", "Postman", "Linux", "Android Studio", "VS Code", "Notion"] },
];

export const EXPERIENCE: ExperienceItem[] = [
  { date: "Oct 2025 — Mar 2026", role: "Science Teacher", company: "Way To Success Academy & Enfant Intelligent Academy", detail: "Taught science to primary and middle-school learners, prepared practical materials, and provided individual academic support." },
  { date: "Nov 2024", role: "Freelance Software Engineer & Instructor", company: "Remote training center", detail: "Completed a short software project and delivered remote computer science lessons adapted to learner needs." },
  { date: "Feb — Jun 2024", role: "Web Application Developer · Graduation Internship", company: "Sweet Touch", detail: "Created Iqraa, an e-learning platform developed with PHP, Laravel, and MySQL." },
  { date: "Jul — Sep 2023", role: "Web Application Developer · Internship", company: "Designet Web Agency", detail: "Built Vibracom and its service management administration interface while learning Laravel." },
  { date: "Jan — Feb 2022", role: "Web Application Developer · Advanced Internship", company: "Bus Software", detail: "Designed a dynamic after-sales service application using PHP and MongoDB." },
  { date: "Jan — Feb 2022", role: "Election Operations Volunteer", company: "ISIE Nabeul", detail: "Supported election operations, document handling, citizen assistance, and on-site administrative coordination." },
];

export const EDUCATION: EducationItem[] = [
  { year: "2025 — Present", degree: "Master’s in Software Engineering & Rapid Application Development", school: "Higher Institute of Technological Studies of Sousse" },
  { year: "2020 — 2024", degree: "Bachelor’s in Information Technology · Information Systems Development", school: "Higher Institute of Technological Studies of Sousse" },
  { year: "2019 — 2020", degree: "Baccalaureate in Economics & Management", school: "Abdelaziz Belkhodja High School, Kélibia" },
];

export const WORKSHOPS: Workshop[] = [
  { meta: "April 2026 · EPI Sousse", title: "IoT Workshop", description: "Hands-on introduction to Arduino, electronic component wiring, and embedded programming." },
  { meta: "November 2024 · Job Gate Sousse", title: "DevOps & Cloud Workshop", description: "Introduction to cloud infrastructure, automation, deployment, collaboration, and the application lifecycle." },
];

/* ---------- Animated extras ---------- */

export const ROLES = ["Web developer", "Mobile developer", "UI/UX designer", "Educator"];

export const STATS = [
  { label: "Internships", value: EXPERIENCE.filter((item) => /internship/i.test(item.role)).length },
  { label: "Projects", value: PROJECTS.length },
  { label: "Workshops", value: WORKSHOPS.length },
  { label: "Languages", value: LANGUAGES.length },
];

/* ---------- UI/UX design work ---------- */

export type DesignWork = {
  title: string;
  type: string; // e.g. "Mobile app · UI/UX"
  description: string;
  tools: string[];
  images?: string []; // import it from src/assets/designs/...
  href?: string; // Figma or Behance link
  linkLabel?: string;
};

// TODO: replace these examples with your real designs
export const DESIGNS: DesignWork[] = [
  {
    title: "Fashio Store App",
    type: "Website app · UI/UX",
    description: "Fashion Store, a modern e-commerce website focused on boys' fashion,From brainstorming the concept, wireframing, and designing the UI, to organizing the layout and choosing the right style — I handled everything myself",
    tools: ["Figma"],
    href: "https://lnkd.in/gyhr64ZC",
    images: [fashionApp,appfashion],
    linkLabel: "View on Behance",
  },
  {
    title: "Power-Up App",
    type: "Mobile app · UI/UX",
    description: "design project: Power-Up, a mobile app dedicated to sports and workouts! Designed with Figma to deliver a smooth and intuitive user experience across multiple views Home, Chats, Settings, login,sign-up,Notifications, and Workouts — to help users track and plan their exercise sessions....",
    tools: ["Figma"],
     images: [sportApp ,sportApp2,sportapp1],
    href: "https://lnkd.in/d3tKXZrt",
    linkLabel: "View on Behance",
  },
  {
    title: "Book store App",
    type: "Branding",
    description: "Short description: the problem, your idea, and the result.",
    tools: ["Figma"],
    images: [Group29,Group31,Group34,Group35,Group36,Frame,Frame362,Group22],
    href: "https://www.facebook.com/share/p/1UusaRcgec/",
    linkLabel: "View in FCB page",
  },
];