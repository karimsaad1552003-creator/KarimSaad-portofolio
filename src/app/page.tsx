import { HeroSection } from "@/components/sections/HeroSection";
import { SelectedWorkSection } from "@/components/sections/SelectedWorkSection";
import { ClientWorkSection } from "@/components/sections/ClientWorkSection";
import { ExperienceSection } from "@/components/sections/ExperienceSection";
import { SkillsSection } from "@/components/sections/SkillsSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { ProjectsSection } from "@/components/sections/ProjectsSection";
import { ContactSection } from "@/components/sections/ContactSection";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <SelectedWorkSection />
      <ClientWorkSection />
      <ExperienceSection />
      <SkillsSection />
      <AboutSection />
      <ProjectsSection />
      <ContactSection />
    </>
  );
}
