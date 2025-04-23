import React from "react";
import HeroSlider from "../components/HeroSlider";

const About = () => {
  return (
    <div className="about-page">
      <HeroSlider />
      <section className="about-section">
        <div className="container">
          <h1>About GreenSpace Transformations</h1>
          <div className="mission-statement">
            <h2>Our Mission</h2>
            <p>
              GreenSpace Transformations is dedicated to transforming urban
              spaces into sustainable green zones through technological
              innovation and artificial intelligence.
            </p>
          </div>
          <div className="stats">
            <div className="stat-item">
              <h3>100+</h3>
              <p>Completed Projects</p>
            </div>
            <div className="stat-item">
              <h3>50+</h3>
              <p>Partner Cities</p>
            </div>
            <div className="stat-item">
              <h3>1000+</h3>
              <p>Transformed Spaces</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
