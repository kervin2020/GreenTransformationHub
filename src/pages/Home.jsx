import React from "react";
import HeroSlider from "../components/HeroSlider";
import AboutSection from "../components/AboutSection";
import GallerySection from "../components/GallerySection";
import TeamSection from "../components/TeamSection";
import AIFeature from "../components/AIFeature";
import DonationSection from "../components/DonationSection";
import ContactSection from "../components/ContactSection";

function Home() {
  return (
    <div className="home-container">
      <HeroSlider />
      <div id="about">
        <AboutSection />
      </div>
      <div id="projects">
        <GallerySection />
      </div>
      <div id="team">
        <TeamSection />
      </div>
      <div id="ai-features">
        <AIFeature />
      </div>
      <div id="donations">
        <DonationSection />
      </div>
      <div id="contact">
        <ContactSection />
      </div>
    </div>
  );
}

export default Home;
