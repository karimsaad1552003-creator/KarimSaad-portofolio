import { HeroSection } from "@/components/sections/HeroSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { ClientWorkSection } from "@/components/sections/ClientWorkSection";
import { SkillsSection } from "@/components/sections/SkillsSection";
import { ProjectsSection } from "@/components/sections/ProjectsSection";
import { ContactSection } from "@/components/sections/ContactSection";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <ClientWorkSection />
      <SkillsSection />
      <ProjectsSection />
      <ContactSection />
    </>
  );
}
