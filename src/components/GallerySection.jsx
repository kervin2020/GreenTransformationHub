import React, { useRef, useState } from "react";
import { galleryItems } from "../data/galleryData";
import useScrollAnimation from "../hooks/useScrollAnimation";

function GallerySection() {
  const sectionRef = useRef(null);
  const [activeFilter, setActiveFilter] = useState("All");
  const [selectedProject, setSelectedProject] = useState(null);

  useScrollAnimation(sectionRef, { threshold: 0.1 });

  const categories = [
    "All",
    ...new Set(galleryItems.map((item) => item.category)),
  ];

  const filteredItems =
    activeFilter === "All"
      ? galleryItems
      : galleryItems.filter((item) => item.category === activeFilter);

  const handleFilterClick = (category) => {
    setActiveFilter(category);
  };

  const openProjectDetails = (project) => {
    setSelectedProject(project);
  };

  const closeProjectDetails = () => {
    setSelectedProject(null);
  };

  return (
    <section id="projects" className="projects-section" ref={sectionRef}>
      <div className="container">
        <div className="section-title">
          <h2>Our Projects</h2>
          <p>Discover our achievements in green transformation</p>
        </div>

        {/* Filter Buttons */}
        <div className="filter-buttons">
          {categories.map((category, index) => (
            <button
              key={index}
              onClick={() => handleFilterClick(category)}
              className={`filter-button ${
                activeFilter === category ? "active" : ""
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="projects-grid">
          {filteredItems.map((item, index) => (
            <div
              key={item.id}
              className="project-card animate-on-scroll"
              onClick={() => openProjectDetails(item)}
            >
              <div className="project-image">
                <img src={item.image} alt={item.title} />
              </div>
              <div className="project-content">
                <h3>{item.title}</h3>
                <p>{item.description}</p>
                <div className="project-tags">
                  <span className="project-tag">{item.category}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Project Details Modal */}
      {selectedProject && (
        <div className="modal-overlay" onClick={closeProjectDetails}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={closeProjectDetails}>
              ×
            </button>
            <div className="modal-image">
              <img src={selectedProject.image} alt={selectedProject.title} />
            </div>
            <div className="modal-details">
              <h2>{selectedProject.title}</h2>
              <p>{selectedProject.description}</p>
              <div className="project-tags">
                <span className="project-tag">{selectedProject.category}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default GallerySection;
