// Indicateur de début de chargement
console.log("Début du chargement de slider.js");
window.sliderJsLoaded = false;

// Importer les données du slider
import { sliderImages } from "../data/sliderData.js";

class HeroSlider {
  constructor() {
    this.currentSlide = 0;
    this.slides = [];
    this.dots = [];
    this.autoPlayInterval = null;
    this.isAutoPlaying = true;

    this.init();
  }

  init() {
    // Créer les éléments du slider
    this.createSliderElements();

    // Initialiser les contrôles
    this.setupControls();

    // Démarrer l'autoplay
    this.startAutoPlay();

    // Afficher le premier slide
    this.showSlide(0);
  }

  createSliderElements() {
    const sliderContainer = document.querySelector(".hero-slider");
    if (!sliderContainer) return;

    // Créer le conteneur des slides
    const slidesContainer = document.createElement("div");
    slidesContainer.className = "slider-container";

    // Créer les slides
    sliderImages.forEach((slide, index) => {
      const slideElement = document.createElement("div");
      slideElement.className = `slide ${index === 0 ? "active" : ""}`;
      slideElement.style.backgroundImage = `url(${slide.url})`;

      const content = document.createElement("div");
      content.className = "slide-content";
      content.innerHTML = `
        <h2 class="slide-title">${slide.title}</h2>
        <p class="slide-subtitle">${slide.subtitle}</p>
        <div class="slide-buttons">
          <a href="#projets" class="btn btn-primary">Nos Projets</a>
          <a href="#contact" class="btn btn-secondary">Contactez-nous</a>
        </div>
      `;

      slideElement.appendChild(content);
      slidesContainer.appendChild(slideElement);
      this.slides.push(slideElement);
    });

    // Créer les flèches de navigation
    const prevArrow = document.createElement("button");
    prevArrow.className = "slider-arrow prev";
    prevArrow.setAttribute("aria-label", "Slide précédent");
    prevArrow.innerHTML = '<i class="fas fa-chevron-left"></i>';

    const nextArrow = document.createElement("button");
    nextArrow.className = "slider-arrow next";
    nextArrow.setAttribute("aria-label", "Slide suivant");
    nextArrow.innerHTML = '<i class="fas fa-chevron-right"></i>';

    // Créer les points de navigation
    const dotsContainer = document.createElement("div");
    dotsContainer.className = "slider-dots";

    sliderImages.forEach((_, index) => {
      const dot = document.createElement("button");
      dot.className = `dot ${index === 0 ? "active" : ""}`;
      dot.setAttribute("aria-label", `Aller au slide ${index + 1}`);
      dotsContainer.appendChild(dot);
      this.dots.push(dot);
    });

    // Créer le bouton d'autoplay
    const autoPlayBtn = document.createElement("button");
    autoPlayBtn.className = "auto-play-toggle";
    autoPlayBtn.setAttribute(
      "aria-label",
      "Activer/Désactiver le défilement automatique"
    );
    autoPlayBtn.innerHTML = '<i class="fas fa-pause"></i>';

    // Ajouter tous les éléments au conteneur
    sliderContainer.appendChild(slidesContainer);
    sliderContainer.appendChild(prevArrow);
    sliderContainer.appendChild(nextArrow);
    sliderContainer.appendChild(dotsContainer);
    sliderContainer.appendChild(autoPlayBtn);
  }

  setupControls() {
    // Navigation par flèches
    const prevArrow = document.querySelector(".slider-arrow.prev");
    const nextArrow = document.querySelector(".slider-arrow.next");

    if (prevArrow) {
      prevArrow.addEventListener("click", () => this.prevSlide());
    }

    if (nextArrow) {
      nextArrow.addEventListener("click", () => this.nextSlide());
    }

    // Navigation par points
    this.dots.forEach((dot, index) => {
      dot.addEventListener("click", () => this.goToSlide(index));
    });

    // Contrôle du clavier
    document.addEventListener("keydown", (e) => {
      if (e.key === "ArrowLeft") this.prevSlide();
      if (e.key === "ArrowRight") this.nextSlide();
    });

    // Bouton autoplay
    const autoPlayBtn = document.querySelector(".auto-play-toggle");
    if (autoPlayBtn) {
      autoPlayBtn.addEventListener("click", () => this.toggleAutoPlay());
    }
  }

  showSlide(index) {
    // Masquer tous les slides
    this.slides.forEach((slide) => slide.classList.remove("active"));
    this.dots.forEach((dot) => dot.classList.remove("active"));

    // Afficher le slide actuel
    this.slides[index].classList.add("active");
    this.dots[index].classList.add("active");
    this.currentSlide = index;
  }

  nextSlide() {
    const next = (this.currentSlide + 1) % this.slides.length;
    this.showSlide(next);
  }

  prevSlide() {
    const prev =
      (this.currentSlide - 1 + this.slides.length) % this.slides.length;
    this.showSlide(prev);
  }

  goToSlide(index) {
    this.showSlide(index);
  }

  startAutoPlay() {
    this.autoPlayInterval = setInterval(() => this.nextSlide(), 5000);
  }

  stopAutoPlay() {
    clearInterval(this.autoPlayInterval);
  }

  toggleAutoPlay() {
    this.isAutoPlaying = !this.isAutoPlaying;
    const autoPlayBtn = document.querySelector(".auto-play-toggle");

    if (this.isAutoPlaying) {
      this.startAutoPlay();
      autoPlayBtn.classList.remove("paused");
      autoPlayBtn.innerHTML = '<i class="fas fa-pause"></i>';
    } else {
      this.stopAutoPlay();
      autoPlayBtn.classList.add("paused");
      autoPlayBtn.innerHTML = '<i class="fas fa-play"></i>';
    }
  }
}

// Exporter la classe HeroSlider
export default HeroSlider;

// Initialiser le slider quand le DOM est chargé
document.addEventListener("DOMContentLoaded", () => {
  new HeroSlider();
});

// Indicateur de fin de chargement
window.sliderJsLoaded = true;
console.log("Fin du chargement de slider.js");
