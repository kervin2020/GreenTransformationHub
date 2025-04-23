// Indicateur de début de chargement
console.log("Début du chargement de navigation.js");
window.navigationJsLoaded = false;

class Navigation {
  constructor() {
    this.header = document.querySelector("header");
    this.nav = document.querySelector("nav");
    this.menuButton = document.querySelector(".menu-button");
    this.navLinks = document.querySelectorAll(".nav-links a");
    this.init();
  }

  init() {
    this.setupScrollBehavior();
    this.setupMobileMenu();
    this.setupSmoothScroll();

    // Indicateur de fin de chargement
    window.navigationJsLoaded = true;
    console.log("Fin du chargement de navigation.js");
  }

  setupScrollBehavior() {
    let lastScroll = 0;

    window.addEventListener("scroll", () => {
      const currentScroll = window.pageYOffset;

      if (currentScroll <= 0) {
        this.header.classList.remove("scroll-up");
        return;
      }

      if (
        currentScroll > lastScroll &&
        !this.header.classList.contains("scroll-down")
      ) {
        // Scroll vers le bas
        this.header.classList.remove("scroll-up");
        this.header.classList.add("scroll-down");
      } else if (
        currentScroll < lastScroll &&
        this.header.classList.contains("scroll-down")
      ) {
        // Scroll vers le haut
        this.header.classList.remove("scroll-down");
        this.header.classList.add("scroll-up");
      }

      lastScroll = currentScroll;
    });
  }

  setupMobileMenu() {
    if (this.menuButton) {
      this.menuButton.addEventListener("click", () => {
        this.nav.classList.toggle("active");
        this.menuButton.classList.toggle("active");

        // Gestion de l'accessibilité
        const isExpanded =
          this.menuButton.getAttribute("aria-expanded") === "true";
        this.menuButton.setAttribute("aria-expanded", !isExpanded);
      });

      // Fermer le menu mobile lors du clic sur un lien
      this.navLinks.forEach((link) => {
        link.addEventListener("click", () => {
          this.nav.classList.remove("active");
          this.menuButton.classList.remove("active");
          this.menuButton.setAttribute("aria-expanded", "false");
        });
      });
    }
  }

  setupSmoothScroll() {
    this.navLinks.forEach((link) => {
      link.addEventListener("click", (e) => {
        e.preventDefault();

        const targetId = link.getAttribute("href");
        const targetElement = document.querySelector(targetId);

        if (targetElement) {
          targetElement.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }
      });
    });
  }
}

// Exporter la classe Navigation
export default Navigation;
