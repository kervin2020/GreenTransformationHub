import React, { useRef, useState } from "react";
import useScrollAnimation from "../hooks/useScrollAnimation";

function AIFeature() {
  const sectionRef = useRef(null);
  const fileInputRef = useRef(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [transformedImage, setTransformedImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [transformationType, setTransformationType] = useState("urban-garden");

  useScrollAnimation(sectionRef, { threshold: 0.1 });

  // Handle file selection
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (file.type.startsWith("image/")) {
        setError(null);
        setTransformedImage(null);

        const reader = new FileReader();
        reader.onload = (e) => {
          setSelectedImage(e.target.result);
        };
        reader.readAsDataURL(file);
      } else {
        setError("Please select an image file (JPG, PNG, etc.)");
      }
    }
  };

  // Triggered when user clicks on upload area
  const handleUploadAreaClick = () => {
    fileInputRef.current.click();
  };

  // For drag and drop functionality
  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      if (file.type.startsWith("image/")) {
        setError(null);
        setTransformedImage(null);

        const reader = new FileReader();
        reader.onload = (e) => {
          setSelectedImage(e.target.result);
        };
        reader.readAsDataURL(file);
      } else {
        setError("Please select an image file (JPG, PNG, etc.)");
      }
    }
  };

  // Generate the transformed image
  const generateTransformation = async () => {
    if (!selectedImage) {
      setError("Please select an image first");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 3000));

      // Simulation of transformation results
      const transformationOptions = {
        "urban-garden": "/images/transformations/urban-garden.jpg",
        "rooftop-garden": "/images/transformations/rooftop-garden.jpg",
        "vertical-garden": "/images/transformations/vertical-garden.jpg",
        "community-garden": "/images/transformations/community-garden.jpg",
      };

      setTransformedImage(transformationOptions[transformationType]);
    } catch (err) {
      console.error("Error generating transformation:", err);
      setError("Failed to generate transformation. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Clear the selected and transformed images
  const resetImages = () => {
    setSelectedImage(null);
    setTransformedImage(null);
    setError(null);
  };

  return (
    <section id="ai-features" className="ai-features-section" ref={sectionRef}>
      <div className="container">
        <div className="section-title">
          <h2>AI Green Space Visualization</h2>
          <p>
            Visualize how your space could be transformed into a green oasis.
            Upload a photo of any urban area and our AI will show you its
            potential as a flourishing green space.
          </p>
        </div>

        <div className="ai-features-content">
          <div className="ai-features-text">
            <h2>Upload Your Space</h2>
            <div
              className={`upload-area ${selectedImage ? "has-image" : ""}`}
              onClick={handleUploadAreaClick}
              onDragOver={handleDragOver}
              onDrop={handleDrop}
            >
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                className="hidden"
                accept="image/*"
              />

              {selectedImage ? (
                <div className="selected-image">
                  <img
                    src={selectedImage}
                    alt="Selected space"
                    className="preview-image"
                  />
                  <button className="btn btn-secondary" onClick={resetImages}>
                    Change Image
                  </button>
                </div>
              ) : (
                <div className="upload-prompt">
                  <i className="fas fa-cloud-upload-alt"></i>
                  <p>Click or drag and drop an image here</p>
                  <p className="upload-hint">Accepted formats: JPG, PNG, GIF</p>
                </div>
              )}
            </div>

            {error && <div className="error-message">{error}</div>}

            <div className="transformation-options">
              <h3>Transformation Type</h3>
              <div className="options-grid">
                <button
                  className={`option-button ${
                    transformationType === "urban-garden" ? "active" : ""
                  }`}
                  onClick={() => setTransformationType("urban-garden")}
                >
                  <i className="fas fa-tree"></i>
                  <span>Urban Garden</span>
                </button>
                <button
                  className={`option-button ${
                    transformationType === "rooftop-garden" ? "active" : ""
                  }`}
                  onClick={() => setTransformationType("rooftop-garden")}
                >
                  <i className="fas fa-building"></i>
                  <span>Rooftop Garden</span>
                </button>
                <button
                  className={`option-button ${
                    transformationType === "vertical-garden" ? "active" : ""
                  }`}
                  onClick={() => setTransformationType("vertical-garden")}
                >
                  <i className="fas fa-clone"></i>
                  <span>Vertical Garden</span>
                </button>
                <button
                  className={`option-button ${
                    transformationType === "community-garden" ? "active" : ""
                  }`}
                  onClick={() => setTransformationType("community-garden")}
                >
                  <i className="fas fa-users"></i>
                  <span>Community Garden</span>
                </button>
              </div>
            </div>

            <button
              className="btn btn-primary generate-button"
              onClick={generateTransformation}
              disabled={!selectedImage || isLoading}
            >
              {isLoading ? (
                <>
                  <i className="fas fa-spinner fa-spin"></i>
                  Generating...
                </>
              ) : (
                <>
                  <i className="fas fa-magic"></i>
                  Generate Transformation
                </>
              )}
            </button>
          </div>

          <div className="ai-features-image">
            {transformedImage ? (
              <div className="result-container">
                <img
                  src={transformedImage}
                  alt="Transformation result"
                  className="result-image"
                />
                <div className="result-overlay">
                  <h3>Transformation Successful</h3>
                  <p>
                    Your space has been transformed into a beautiful{" "}
                    {transformationType.replace("-", " ")}.
                  </p>
                  <button className="btn btn-secondary" onClick={resetImages}>
                    New Transformation
                  </button>
                </div>
              </div>
            ) : (
              <div className="placeholder-container">
                <i className="fas fa-image"></i>
                <p>
                  The transformation result will appear here after clicking
                  "Generate Transformation"
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default AIFeature;
