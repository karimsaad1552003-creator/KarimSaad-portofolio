import { HeroSection } from "@/components/sections/HeroSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { SkillsSection } from "@/components/sections/SkillsSection";
import { ProjectsSection } from "@/components/sections/ProjectsSection";
import { ExperienceSection } from "@/components/sections/ExperienceSection";
import { EducationSection } from "@/components/sections/EducationSection";
import { CertificationsSection } from "@/components/sections/CertificationsSection";
import { JourneySection } from "@/components/sections/JourneySection";
import { ResumeSection } from "@/components/sections/ResumeSection";
import { ContactSection } from "@/components/sections/ContactSection";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <SkillsSection />
      <ProjectsSection />
      <ExperienceSection />
      <EducationSection />
      <CertificationsSection />
      <JourneySection />
      <ResumeSection />
      <ContactSection />
    </>
  );
}
