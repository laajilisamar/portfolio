import { SKILLS } from "@/data/portfolio";
import PortfolioNav from "@/components/portfolio/PortfolioNav";
import HeroSection from "@/components/portfolio/HeroSection";
import AboutSection from "@/components/portfolio/AboutSection";
import ProjectsSection from "@/components/portfolio/ProjectsSection";
import DesignSection from "@/components/portfolio/DesignSection";
import SkillsSection from "@/components/portfolio/SkillsSection";
import ExperienceSection from "@/components/portfolio/ExperienceSection";
import EducationSection from "@/components/portfolio/EducationSection";
import ContactSection from "@/components/portfolio/ContactSection";
import PortfolioFooter from "@/components/portfolio/PortfolioFooter";
import { CursorGlow } from "@/components/portfolio/motion/CursorGlow";
import { IntroSplash } from "@/components/portfolio/motion/IntroSplash";
import { Marquee } from "@/components/portfolio/motion/Marquee";
import { ScrollProgress } from "@/components/portfolio/motion/ScrollProgress";
import ChatAssistant from "@/components/portfolio/ChatAssistant";



const MARQUEE_ITEMS = SKILLS.flatMap((group) => group.items);

const Portfolio = () => (
  <div className="portfolio-theme min-h-screen overflow-x-clip bg-background text-foreground" dir="ltr">
    <IntroSplash />
    <ScrollProgress />
    <CursorGlow />
    <PortfolioNav />
    <main>
      <HeroSection />
      <Marquee items={MARQUEE_ITEMS} />
      <AboutSection />
      <ProjectsSection />
      <DesignSection />
      <SkillsSection />
      <ExperienceSection />
      <EducationSection />
      <ContactSection />
    
    </main>
    <PortfolioFooter />
     <ChatAssistant />
  </div>
);

export default Portfolio;
