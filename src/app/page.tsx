import React from "react";
import "../css/fonts.css";
import "../css/style.css";
import { HeroSection } from "../components/heroSection";
import { AboutSection } from "../components/aboutSection";

export default function Page() {
  return (
    <div>
        <HeroSection />
        <AboutSection />
        <h1>Page</h1>
    </div>
  );
}