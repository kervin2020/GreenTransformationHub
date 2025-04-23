import React, { useRef, useState } from "react";
import useScrollAnimation from "../hooks/useScrollAnimation";

function AIVisualizationSection() {
  const sectionRef = useRef(null);
  useScrollAnimation(sectionRef, { threshold: 0.1 });

  const [selectedImage, setSelectedImage] = useState(null);
  const [transformedImage, setTransformedImage] = useState(null);
  const [error, setError] = useState(null);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target.result);
        // Simuler la transformation IA
        setTimeout(() => {
          setTransformedImage(e.target.result);
        }, 2000);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <section
      id="ai-visualization"
      className="ai-visualization-section"
      ref={sectionRef}
    >
      <div className="container">
        <div className="section-title">
          <h2>AI Green Space Visualization</h2>
          <p>
            Discover how artificial intelligence can transform your spaces into
            sustainable green oases.
          </p>
        </div>

        <div className="ai-visualization-content">
          <div className="ai-visualization-text">
            <h2>Transform Your Space with AI</h2>
            <p>
              Our AI technology allows you to visualize the transformation of
              your spaces before work even begins. Upload a photo of your space
              and discover its potential as a green oasis.
            </p>

            <div className="ai-visualization-features">
              <div className="ai-visualization-feature">
                <div className="ai-visualization-icon">
                  <i className="fas fa-cube"></i>
                </div>
                <div className="ai-visualization-feature-content">
                  <h3>3D Visualization</h3>
                  <p>
                    Visualize your transformed space in 3D with remarkable
                    precision.
                  </p>
                </div>
              </div>

              <div className="ai-visualization-feature">
                <div className="ai-visualization-icon">
                  <i className="fas fa-leaf"></i>
                </div>
                <div className="ai-visualization-feature-content">
                  <h3>Space Optimization</h3>
                  <p>
                    AI analyzes and proposes the best solutions to maximize
                    ecological impact.
                  </p>
                </div>
              </div>

              <div className="ai-visualization-feature">
                <div className="ai-visualization-icon">
                  <i className="fas fa-cloud-sun"></i>
                </div>
                <div className="ai-visualization-feature-content">
                  <h3>Climate Simulation</h3>
                  <p>
                    Evaluate the impact of your projects on the local
                    microclimate.
                  </p>
                </div>
              </div>

              <div className="ai-visualization-feature">
                <div className="ai-visualization-icon">
                  <i className="fas fa-chart-line"></i>
                </div>
                <div className="ai-visualization-feature-content">
                  <h3>Performance Analysis</h3>
                  <p>Get detailed insights on your green space performance.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="ai-visualization-image">
            {selectedImage ? (
              <img src={selectedImage} alt="Selected space" />
            ) : (
              <div className="upload-placeholder">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  id="image-upload"
                  className="hidden"
                />
                <label htmlFor="image-upload" className="upload-button">
                  Upload an Image
                </label>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default AIVisualizationSection;
