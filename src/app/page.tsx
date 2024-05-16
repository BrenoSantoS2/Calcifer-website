import React from "react";
import "../css/fonts.css";
import "../css/style.css";
import { HeroSection } from "../components/heroSection";
import { AboutSection } from "../components/aboutSection";
import { ProjectSection } from "../components/projectSection";
import { TeamSection } from "../components/teamSection";
import { ContactSection } from "../components/contactSection";
import { Footer } from "../components/footer";

export default function Page() {
  return (
    <div>
        <HeroSection />
        <AboutSection />
        <ProjectSection />
        <TeamSection />
        <ContactSection />
        <Footer />
    </div>
  );
}