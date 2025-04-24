import React, { useRef, useEffect, useState, useCallback } from "react";

function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoplay, setIsAutoplay] = useState(true);
  const [loadedImages, setLoadedImages] = useState({});
  const autoplayRef = useRef(null);
  const sliderRef = useRef(null);

  const slides = [
    {
      id: 1,
      image:
        "https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?w=800&auto=format&fit=crop&q=60",
      title: "Transform Your Green Space",
      description: "Innovative solutions for a more sustainable future",
      buttonText: "Discover Our Projects",
      buttonLink: "#projects",
    },
    {
      id: 2,
      image:
        "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&auto=format&fit=crop&q=60",
      title: "Ecological Optimization",
      description: "Create smart and sustainable green spaces",
      buttonText: "Learn More",
      buttonLink: "#about",
    },
    {
      id: 3,
      image:
        "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=800&auto=format&fit=crop&q=60",
      title: "Green Innovation",
      description: "Adopt the latest technologies for your green spaces",
      buttonText: "Get Started",
      buttonLink: "#contact",
    },
  ];

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  }, [slides.length]);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  }, [slides.length]);

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  // Handle image loading
  useEffect(() => {
    const preloadImages = () => {
      slides.forEach((slide) => {
        const img = new Image();
        img.src = slide.image;
        img.onload = () => {
          setLoadedImages((prev) => ({ ...prev, [slide.id]: true }));
        };
      });
    };

    preloadImages();
  }, [slides]);

  // Parallax effect on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (sliderRef.current) {
        const scrollPosition = window.scrollY;
        const parallaxElements =
          sliderRef.current.querySelectorAll(".parallax");

        parallaxElements.forEach((element) => {
          const speed = element.dataset.speed || 0.5;
          element.style.transform = `translateY(${scrollPosition * speed}px)`;
        });
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Autoplay functionality
  useEffect(() => {
    if (isAutoplay) {
      autoplayRef.current = setInterval(nextSlide, 5000);
    }
    return () => {
      if (autoplayRef.current) {
        clearInterval(autoplayRef.current);
      }
    };
  }, [isAutoplay, nextSlide]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowLeft") prevSlide();
      if (e.key === "ArrowRight") nextSlide();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [nextSlide, prevSlide]);

  const handleMouseEnter = () => setIsAutoplay(false);
  const handleMouseLeave = () => setIsAutoplay(true);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div
      id="home"
      className="hero-slider"
      ref={sliderRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`hero-slide ${index === currentSlide ? "active" : ""}`}
          style={{
            backgroundImage: loadedImages[slide.id]
              ? `url(${slide.image})`
              : "none",
            opacity: loadedImages[slide.id] ? 1 : 0,
            transition: "opacity 0.5s ease-in-out",
          }}
        >
          <div className="hero-content">
            <h1 className="hero-title">{slide.title}</h1>
            <p className="hero-description">{slide.description}</p>
            <div className="hero-buttons">
              <button
                className="hero-button primary"
                onClick={() =>
                  scrollToSection(slide.buttonLink.replace("#", ""))
                }
              >
                {slide.buttonText}
              </button>
              <button
                className="hero-button secondary"
                onClick={() => scrollToSection("contact")}
              >
                Contact Us
              </button>
            </div>
          </div>
        </div>
      ))}

      <button
        className="hero-nav prev"
        onClick={prevSlide}
        aria-label="Previous slide"
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M15 18l-6-6 6-6" />
        </svg>
      </button>

      <button
        className="hero-nav next"
        onClick={nextSlide}
        aria-label="Next slide"
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M9 18l6-6-6-6" />
        </svg>
      </button>

      <div className="hero-dots">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`hero-dot ${index === currentSlide ? "active" : ""}`}
            onClick={() => goToSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

export default HeroSlider;
