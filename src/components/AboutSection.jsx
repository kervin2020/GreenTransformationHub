import React, { useRef } from "react";
import useScrollAnimation from "../hooks/useScrollAnimation";

function AboutSection() {
  const sectionRef = useRef(null);
  useScrollAnimation(sectionRef, { threshold: 0.1 });

  return (
    <section id="about" className="about-section" ref={sectionRef}>
      <div className="container">
        <div className="about-content">
          <div className="about-image">
            <div className="animate-on-scroll">
              <img
                src="https://images.unsplash.com/photo-1518173946687-a4c8892bbd9f"
                alt="Urban garden transformation"
                className="main-image"
              />
            </div>
            <div className="experience-badge animate-on-scroll">
              <span className="years">10+</span>
              <span className="text">Years of experience</span>
            </div>
          </div>

          <div className="about-text">
            <div className="animate-on-scroll">
              <h2>Transforming urban spaces into green havens</h2>
              <div className="divider"></div>
              <p>
                At BATA roots of renewal, we are dedicated to revolutionizing
                urban environments by transforming unused or degraded spaces
                into vibrant and sustainable green areas that benefit
                communities and the planet.
              </p>
              <p>
                Our team of experts combines landscape architecture, urban
                planning, and environmental sciences to create customized
                solutions that address the unique challenges of each space while
                maximizing ecological benefits.
              </p>
            </div>

            <div className="features-grid animate-on-scroll">
              <div className="feature-item">
                <div className="icon-container">
                  <svg
                    className="feature-icon"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <div>
                  <h3>Sustainable Design</h3>
                  <p>
                    Ecological solutions that minimize resource use and maximize
                    environmental benefits.
                  </p>
                </div>
              </div>

              <div className="feature-item">
                <div className="icon-container">
                  <svg
                    className="feature-icon"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                </div>
                <div>
                  <h3>Community Focus</h3>
                  <p>
                    Creating spaces that bring people together and strengthen
                    neighborhood bonds.
                  </p>
                </div>
              </div>

              <div className="feature-item">
                <div className="icon-container">
                  <svg
                    className="feature-icon"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
                    />
                  </svg>
                </div>
                <div>
                  <h3>Customized Approach</h3>
                  <p>
                    Solutions tailored to the specific needs and characteristics
                    of each location.
                  </p>
                </div>
              </div>

              <div className="feature-item">
                <div className="icon-container">
                  <svg
                    className="feature-icon"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
                    />
                  </svg>
                </div>
                <div>
                  <h3>Global Impact</h3>
                  <p>
                    Contributing to the fight against climate change through
                    urban greening initiatives worldwide.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutSection;
