// Indicateur de début de chargement
console.log("Début du chargement de animations.js");
window.animationsJsLoaded = false;

class Animations {
  constructor() {
    this.animatedElements = document.querySelectorAll(".animate-on-scroll");
    this.init();
  }

  init() {
    this.setupIntersectionObserver();
    this.initHoverAnimations();
    this.initLoadingAnimations();

    // Indicateur de fin de chargement
    window.animationsJsLoaded = true;
    console.log("Fin du chargement de animations.js");
  }

  setupIntersectionObserver() {
    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 0.1,
    };

    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    }, options);

    this.animatedElements.forEach((element) => {
      observer.observe(element);
    });
  }

  initHoverAnimations() {
    // Animation des cartes de projet
    const projectCards = document.querySelectorAll(".project-card");
    projectCards.forEach((card) => {
      card.addEventListener("mouseenter", () => {
        card.classList.add("hover");
      });

      card.addEventListener("mouseleave", () => {
        card.classList.remove("hover");
      });
    });

    // Animation des cartes d'équipe
    const teamCards = document.querySelectorAll(".team-card");
    teamCards.forEach((card) => {
      card.addEventListener("mouseenter", () => {
        card.classList.add("hover");
      });

      card.addEventListener("mouseleave", () => {
        card.classList.remove("hover");
      });
    });
  }

  initLoadingAnimations() {
    // Animation de chargement initial
    const loadingIndicator = document.getElementById("loading-indicator");
    if (loadingIndicator) {
      window.addEventListener("load", () => {
        loadingIndicator.classList.add("fade-out");
        setTimeout(() => {
          loadingIndicator.style.display = "none";
        }, 500);
      });
    }

    // Animation de transition entre les sections
    const sections = document.querySelectorAll("section");
    sections.forEach((section) => {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              section.classList.add("section-visible");
            }
          });
        },
        {
          threshold: 0.2,
        }
      );

      observer.observe(section);
    });
  }
}

// Exporter la classe Animations
export default Animations;
