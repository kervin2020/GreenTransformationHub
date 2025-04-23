import React, { useRef } from "react";
import { teamMembers } from "../data/teamData";
import useScrollAnimation from "../hooks/useScrollAnimation";

function TeamSection() {
  const sectionRef = useRef(null);
  useScrollAnimation(sectionRef, { threshold: 0.1 });

  return (
    <section id="team" className="team-section" ref={sectionRef}>
      <div className="container">
        <div className="section-title animate-on-scroll">
          <h2>Our Team</h2>
          <p className="team-description">
            Our dedicated team of experts combines diverse skills in landscape
            architecture, environmental science, and sustainable development to
            create innovative green spaces.
          </p>
        </div>

        <div className="team-grid">
          {teamMembers.map((member, index) => (
            <div
              key={member.id}
              className="team-member animate-on-scroll"
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <div className="member-image">
                <img src={member.image} alt={member.name} />
              </div>

              <div className="member-content">
                <h3>{member.name}</h3>
                <p className="role">{member.role}</p>
                <p>{member.bio}</p>
                <div className="social-links">
                  <a
                    href={member.socialLinks.linkedin}
                    className="social-link"
                    aria-label={`${member.name}'s LinkedIn`}
                  >
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                    </svg>
                  </a>
                  <a
                    href={member.socialLinks.twitter}
                    className="social-link"
                    aria-label={`${member.name}'s Twitter`}
                  >
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="join-team animate-on-scroll">
          <h3>Join Our Team</h3>
          <p>
            We are always looking for passionate individuals who share our
            vision of creating sustainable green spaces that improve communities
            and the environment.
          </p>
          <button className="btn btn-primary">Voir les Postes Ouverts</button>
        </div>
      </div>
    </section>
  );
}

export default TeamSection;
