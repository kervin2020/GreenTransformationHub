import { teamMembers } from "../data/teamData.js";
import { galleryItems } from "../data/galleryData.js";
import { sliderImages } from "../data/sliderData.js";

// Indicateur de début de chargement
console.log("Début du chargement de main.js");
window.mainJsLoaded = false;

// Configuration de la navigation
class Navigation {
  constructor() {
    this.nav = document.querySelector("nav");
    this.navToggle = document.querySelector(".nav-toggle");
    this.navLinks = document.querySelector(".nav-links");
    this.lastScrollTop = 0;
  }

  init() {
    this.setupEventListeners();
  }

  setupEventListeners() {
    window.addEventListener("scroll", () => this.handleScroll());

    if (this.navToggle && this.navLinks) {
      this.navToggle.addEventListener("click", () => {
        const isExpanded =
          this.navToggle.getAttribute("aria-expanded") === "true";
        this.navToggle.setAttribute("aria-expanded", !isExpanded);
        this.navLinks.classList.toggle("active");
      });
    }
  }

  handleScroll() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollTop > 100) {
      this.nav.classList.add("scrolled");
    } else {
      this.nav.classList.remove("scrolled");
    }

    this.lastScrollTop = scrollTop;
  }
}

// Configuration des animations
class Animations {
  constructor() {
    this.animatedElements = document.querySelectorAll(".animate-on-scroll");
  }

  init() {
    this.setupIntersectionObserver();
  }

  setupIntersectionObserver() {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      {
        threshold: 0.1,
      }
    );

    this.animatedElements.forEach((element) => {
      observer.observe(element);
      });
    }
  }

// Gestion des formulaires
class FormHandler {
  constructor() {
    this.forms = document.querySelectorAll(".contact-form");
    this.contactSection = document.querySelector(".contact-section");
  }

  init() {
    this.setupFormListeners();
    this.createContactContent();
  }

  createContactContent() {
    if (!this.contactSection) return;

    // Supprimer le placeholder s'il existe
    const placeholder = this.contactSection.querySelector(
      ".contact-placeholder"
    );
    if (placeholder) {
      placeholder.remove();
    }

    // Ajouter des informations de contact supplémentaires
    const contactInfo = document.createElement("div");
    contactInfo.className = "contact-info";
    contactInfo.innerHTML = `
      <div class="contact-details">
        <h3>Nos coordonnées</h3>
        <div class="contact-item">
          <i class="fas fa-map-marker-alt"></i>
          <p>123 Rue de la Nature, 75001 Paris, France</p>
        </div>
        <div class="contact-item">
          <i class="fas fa-phone"></i>
          <p>+33 1 23 45 67 89</p>
        </div>
        <div class="contact-item">
          <i class="fas fa-envelope"></i>
          <p>contact@greenspace-transformations.fr</p>
        </div>
      </div>
      <div class="contact-map">
        <iframe 
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2624.9916256937595!2d2.292292615509614!3d48.858370079287475!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e66e2964e34e2d%3A0x8ddca9ee380ef7e0!2sTour%20Eiffel!5e0!3m2!1sfr!2sfr!4v1620000000000!5m2!1sfr!2sfr" 
          width="100%" 
          height="300" 
          style="border:0;" 
          allowfullscreen="" 
          loading="lazy">
        </iframe>
      </div>
    `;

    // Insérer les informations de contact avant le formulaire
    const form = this.contactSection.querySelector(".contact-form");
    if (form) {
      this.contactSection.insertBefore(contactInfo, form);
    } else {
      this.contactSection.appendChild(contactInfo);
    }
  }

  setupFormListeners() {
    this.forms.forEach((form) => {
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());

        try {
          await this.submitForm(data);
          this.showSuccessMessage("Message envoyé avec succès !");
        form.reset();
      } catch (error) {
          this.showErrorMessage("Erreur lors de l'envoi du message.");
      }
    });
  });
  }

  async submitForm(data) {
    // Simulation d'envoi de formulaire
    await new Promise((resolve) => setTimeout(resolve, 1000));
  }

  showSuccessMessage(message) {
    const messageElement = document.createElement("div");
    messageElement.className = "success-message";
    messageElement.textContent = message;
    document.querySelector(".contact-form").appendChild(messageElement);
    setTimeout(() => messageElement.remove(), 3000);
  }

  showErrorMessage(message) {
    const messageElement = document.createElement("div");
    messageElement.className = "error-message";
    messageElement.textContent = message;
    document.querySelector(".contact-form").appendChild(messageElement);
    setTimeout(() => messageElement.remove(), 3000);
  }
}

// Gestion de la galerie
class Gallery {
  constructor() {
    this.projectsContainer = document.querySelector(".gallery-section");
    this.teamContainer = document.querySelector(".team-section");
  }

  init() {
    this.createProjectCards();
    this.createTeamCards();
  }

  createProjectCards() {
    if (!this.projectsContainer) return;

    // Supprimer le placeholder s'il existe
    const placeholder = this.projectsContainer.querySelector(
      ".gallery-placeholder"
    );
    if (placeholder) {
      placeholder.remove();
    }

    // Créer les boutons de filtrage
    const categories = [
      "Tous",
      ...new Set(galleryItems.map((item) => item.category)),
    ];
    const filterContainer = document.createElement("div");
    filterContainer.className = "gallery-filters animate-on-scroll";
    filterContainer.innerHTML = `
      ${categories
        .map(
          (category) => `
        <button class="filter-btn ${
          category === "Tous" ? "active" : ""
        }" data-category="${category}">
          ${category}
        </button>
      `
        )
        .join("")}
    `;
    this.projectsContainer.appendChild(filterContainer);

    // Créer la grille de projets
    const gridContainer = document.createElement("div");
    gridContainer.className = "gallery-grid";
    this.projectsContainer.appendChild(gridContainer);

    // Ajouter les projets
    galleryItems.forEach((project) => {
      const card = document.createElement("div");
      card.className = "gallery-item animate-on-scroll";
      card.innerHTML = `
        <div class="gallery-item-image">
          <img src="${project.image}" alt="${project.title}" loading="lazy">
          <div class="gallery-item-overlay">
            <h3>${project.title}</h3>
            <span class="category">${project.category}</span>
            <p>${project.description}</p>
          </div>
        </div>
      `;
      gridContainer.appendChild(card);
    });

    // Ajouter le bouton "Voir plus"
    const viewMoreBtn = document.createElement("div");
    viewMoreBtn.className = "view-more-container animate-on-scroll";
    viewMoreBtn.innerHTML = `
      <button class="btn btn-primary">Voir plus de projets</button>
    `;
    this.projectsContainer.appendChild(viewMoreBtn);

    // Gérer les filtres
    const filterButtons = filterContainer.querySelectorAll(".filter-btn");
    filterButtons.forEach((button) => {
      button.addEventListener("click", () => {
        const category = button.dataset.category;

        // Mettre à jour les boutons actifs
        filterButtons.forEach((btn) => btn.classList.remove("active"));
        button.classList.add("active");

        // Filtrer les projets
        const items = gridContainer.querySelectorAll(".gallery-item");
        items.forEach((item) => {
          const itemCategory = item.querySelector(".category").textContent;
          if (category === "Tous" || itemCategory === category) {
            item.style.display = "block";
          } else {
            item.style.display = "none";
      }
    });
  });
    });
  }

  createTeamCards() {
    if (!this.teamContainer) return;

    // Supprimer le placeholder s'il existe
    const placeholder = this.teamContainer.querySelector(".team-placeholder");
    if (placeholder) {
      placeholder.remove();
    }

    teamMembers.forEach((member) => {
      const card = document.createElement("div");
      card.className = "team-card animate-on-scroll";
      card.innerHTML = `
        <div class="team-card-image">
          <img src="${member.image}" alt="${member.name}" loading="lazy">
          <div class="team-card-overlay">
            <h3>${member.name}</h3>
            <p class="role">${member.role}</p>
          </div>
        </div>
        <div class="team-card-content">
          <p class="bio">${member.bio}</p>
          <div class="team-card-social">
            <a href="${member.socialLinks.linkedin}" aria-label="LinkedIn de ${member.name}">
              <i class="fab fa-linkedin"></i>
            </a>
            <a href="${member.socialLinks.twitter}" aria-label="Twitter de ${member.name}">
              <i class="fab fa-twitter"></i>
            </a>
          </div>
        </div>
      `;
      this.teamContainer.appendChild(card);
    });

    // Ajouter la section "Rejoignez notre équipe"
    const joinSection = document.createElement("div");
    joinSection.className = "join-team-section animate-on-scroll";
    joinSection.innerHTML = `
      <h3>Rejoignez notre équipe</h3>
      <p>Nous recherchons toujours des personnes passionnées qui partagent notre vision de créer des espaces verts durables qui améliorent les communautés et l'environnement.</p>
      <button class="btn btn-primary">Voir les postes ouverts</button>
    `;
    this.teamContainer.appendChild(joinSection);
  }
}

// Gestion de la section À propos
class AboutSection {
  constructor() {
    this.aboutContainer = document.querySelector(".about-content");
  }

  init() {
    this.createAboutContent();
  }

  createAboutContent() {
    if (!this.aboutContainer) return;

    const content = document.createElement("div");
    content.className = "about-content animate-on-scroll";
    content.innerHTML = `
      <div class="about-text">
        <p>GreenSpace Transformations est une entreprise innovante spécialisée dans la transformation des espaces urbains en zones vertes durables. Fondée en 2013, notre équipe d'experts combine expertise en architecture paysagère, science environnementale et développement communautaire.</p>
        <p>Notre mission est de créer des espaces verts qui améliorent la qualité de vie des communautés tout en préservant l'environnement.</p>
      </div>
      <div class="about-stats">
        <div class="stat-item">
          <span class="stat-number">50+</span>
          <span class="stat-label">Projets réalisés</span>
        </div>
        <div class="stat-item">
          <span class="stat-number">15</span>
          <span class="stat-label">Villes transformées</span>
        </div>
        <div class="stat-item">
          <span class="stat-number">1000+</span>
          <span class="stat-label">Arbres plantés</span>
        </div>
      </div>
    `;
    this.aboutContainer.appendChild(content);
  }
}

// Gestion de la section Donation
class DonationSection {
  constructor() {
    this.donationContainer = document.querySelector(".donation-section");
  }

  init() {
    this.createDonationSection();
  }

  createDonationSection() {
    if (!this.donationContainer) {
      // Créer la section si elle n'existe pas
      const main = document.querySelector("main");
      if (!main) return;

      const donationSection = document.createElement("section");
      donationSection.id = "donation";
      donationSection.className = "donation-section animate-on-scroll";
      donationSection.setAttribute("aria-labelledby", "donation-title");

      donationSection.innerHTML = `
        <h2 id="donation-title">Soutenez notre mission</h2>
        <div class="donation-content">
          <div class="donation-text">
            <p>Votre soutien est essentiel pour nous permettre de continuer à transformer des espaces urbains en environnements verts durables. Chaque don, quelle que soit sa taille, contribue à notre mission de créer un avenir plus vert et plus durable.</p>
            <p>En tant qu'organisation à but non lucratif, nous dépendons de la générosité de donateurs comme vous pour financer nos projets et notre recherche.</p>
          </div>
          <form class="donation-form" role="form" aria-label="Formulaire de don">
            <div class="donation-options">
              <div class="donation-option" data-amount="10">
                <input type="radio" id="amount-10" name="amount" value="10">
                <label for="amount-10">10€</label>
              </div>
              <div class="donation-option" data-amount="25">
                <input type="radio" id="amount-25" name="amount" value="25">
                <label for="amount-25">25€</label>
              </div>
              <div class="donation-option" data-amount="50">
                <input type="radio" id="amount-50" name="amount" value="50">
                <label for="amount-50">50€</label>
              </div>
              <div class="donation-option" data-amount="100">
                <input type="radio" id="amount-100" name="amount" value="100">
                <label for="amount-100">100€</label>
              </div>
              <div class="donation-option custom">
                <input type="radio" id="amount-custom" name="amount" value="custom">
                <label for="amount-custom">Autre montant</label>
                <input type="number" id="custom-amount" min="1" placeholder="Montant">
              </div>
            </div>
            <div class="form-group">
              <label for="donor-name">Nom</label>
              <input type="text" id="donor-name" name="name" class="form-control" required>
            </div>
            <div class="form-group">
              <label for="donor-email">Email</label>
              <input type="email" id="donor-email" name="email" class="form-control" required>
            </div>
            <div class="form-group">
              <label class="checkbox-label">
                <input type="checkbox" name="newsletter" checked>
                Je souhaite recevoir la newsletter
              </label>
            </div>
            <button type="submit" class="btn btn-primary">Faire un don</button>
          </form>
        </div>
      `;

      // Insérer la section avant la section contact
      const contactSection = document.querySelector(".contact-section");
      if (contactSection) {
        main.insertBefore(donationSection, contactSection);
    } else {
        main.appendChild(donationSection);
      }

      this.donationContainer = donationSection;
    }

    this.setupDonationListeners();
  }

  setupDonationListeners() {
    const donationOptions =
      this.donationContainer.querySelectorAll(".donation-option");
    const customAmountInput =
      this.donationContainer.querySelector("#custom-amount");
    const donationForm = this.donationContainer.querySelector(".donation-form");

    // Gestion des options de don
    donationOptions.forEach((option) => {
      option.addEventListener("click", () => {
        // Retirer la classe active de toutes les options
        donationOptions.forEach((opt) => opt.classList.remove("active"));
        // Ajouter la classe active à l'option cliquée
        option.classList.add("active");

        // Si c'est l'option personnalisée, activer le champ de saisie
        if (option.classList.contains("custom")) {
          customAmountInput.disabled = false;
          customAmountInput.focus();
        } else {
          customAmountInput.disabled = true;
          customAmountInput.value = "";
        }
      });
    });

    // Gestion du formulaire de don
    if (donationForm) {
      donationForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const amount = this.donationContainer.querySelector(
          'input[name="amount"]:checked'
        )?.value;
        const customAmount = customAmountInput.value;
        const finalAmount = amount === "custom" ? customAmount : amount;

        const name = document.getElementById("donor-name").value;
        const email = document.getElementById("donor-email").value;
        const newsletter = document.querySelector(
          'input[name="newsletter"]'
        ).checked;

        // Afficher un message de confirmation
        const successMessage = document.createElement("div");
        successMessage.className = "success-message";
        successMessage.textContent =
          "Merci pour votre don ! Vous allez être redirigé vers la page de paiement.";
        donationForm.appendChild(successMessage);

        // Simuler une redirection vers une page de paiement
        setTimeout(() => {
          console.log(
            "Redirection vers la page de paiement avec les données:",
            {
              amount: finalAmount,
              name,
              email,
              newsletter,
            }
          );
        }, 2000);
      });
    }
  }
}

// Gestion de la section AI Feature
class AIFeature {
  constructor() {
    this.aiContainer = document.querySelector(".ai-feature-section");
  }

  init() {
    this.createAIFeatureSection();
  }

  createAIFeatureSection() {
    if (!this.aiContainer) {
      // Créer la section si elle n'existe pas
      const main = document.querySelector("main");
      if (!main) return;

      const aiSection = document.createElement("section");
      aiSection.id = "ai-feature";
      aiSection.className = "ai-feature-section animate-on-scroll";
      aiSection.setAttribute("aria-labelledby", "ai-feature-title");

      aiSection.innerHTML = `
        <h2 id="ai-feature-title">Notre technologie IA</h2>
        <div class="ai-feature-content">
          <div class="ai-feature-text">
            <p>Chez GreenSpace Transformations, nous utilisons l'intelligence artificielle pour optimiser nos projets de transformation d'espaces verts. Notre technologie exclusive analyse les données environnementales, climatiques et urbaines pour concevoir des solutions durables et adaptées à chaque contexte.</p>
            <p>Notre IA peut prédire l'impact des projets sur la biodiversité locale, estimer la réduction des îlots de chaleur urbains et optimiser l'utilisation des ressources naturelles comme l'eau et la lumière solaire.</p>
            <p>Découvrez comment notre technologie peut transformer votre espace en utilisant notre simulateur IA ci-dessous.</p>
          </div>
          <div class="ai-simulator">
            <div class="simulator-container">
              <div class="simulator-placeholder">
                <img src="https://images.unsplash.com/photo-1551288049-bebda4e38f85" alt="Simulateur IA" loading="lazy">
                <div class="simulator-overlay">
                  <h3>Simulateur IA</h3>
                  <p>Visualisez l'impact de nos solutions sur votre espace</p>
                  <button class="btn btn-primary" id="launch-simulator">Lancer le simulateur</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      `;

      // Insérer la section avant la section donation
      const donationSection = document.querySelector(".donation-section");
      if (donationSection) {
        main.insertBefore(aiSection, donationSection);
      } else {
        // Si la section donation n'existe pas, insérer avant la section contact
        const contactSection = document.querySelector(".contact-section");
        if (contactSection) {
          main.insertBefore(aiSection, contactSection);
        } else {
          main.appendChild(aiSection);
        }
      }

      this.aiContainer = aiSection;
    }

    this.setupAIFeatureListeners();
  }

  setupAIFeatureListeners() {
    const launchButton = this.aiContainer.querySelector("#launch-simulator");

    if (launchButton) {
      launchButton.addEventListener("click", () => {
        // Simuler le lancement du simulateur
        const simulatorContainer = this.aiContainer.querySelector(
          ".simulator-container"
        );

        // Ajouter une classe pour l'animation
        simulatorContainer.classList.add("simulator-active");

        // Afficher un message de chargement
        const loadingMessage = document.createElement("div");
        loadingMessage.className = "simulator-loading";
        loadingMessage.innerHTML = `
          <div class="loading-spinner"></div>
          <p>Chargement du simulateur IA...</p>
        `;

        simulatorContainer.appendChild(loadingMessage);

        // Simuler le chargement du simulateur
        setTimeout(() => {
          loadingMessage.remove();

          // Afficher un message de démonstration
          const demoMessage = document.createElement("div");
          demoMessage.className = "simulator-demo";
          demoMessage.innerHTML = `
            <h3>Démonstration du simulateur IA</h3>
            <p>Ceci est une démonstration du simulateur IA. Dans la version complète, vous pourriez :</p>
            <ul>
              <li>Télécharger une photo de votre espace</li>
              <li>Sélectionner différents types de végétation</li>
              <li>Visualiser l'impact sur la température, la biodiversité et le bien-être</li>
              <li>Obtenir des recommandations personnalisées</li>
            </ul>
            <button class="btn btn-secondary" id="close-simulator">Fermer la démonstration</button>
          `;

          simulatorContainer.appendChild(demoMessage);

          // Gérer la fermeture de la démonstration
          const closeButton = demoMessage.querySelector("#close-simulator");
          closeButton.addEventListener("click", () => {
            simulatorContainer.classList.remove("simulator-active");
            demoMessage.remove();
          });
        }, 2000);
      });
    }
  }
}

// Classe principale de l'application
class App {
  constructor() {
    this.navigation = new Navigation();
    this.animations = new Animations();
    this.formHandler = new FormHandler();
    this.gallery = new Gallery();
    this.about = new AboutSection();
    this.donation = new DonationSection();
    this.aiFeature = new AIFeature();
    this.init();
  }

  init() {
    this.navigation.init();
    this.animations.init();
    this.formHandler.init();
    this.gallery.init();
    this.about.init();
    this.donation.init();
    this.aiFeature.init();
    this.updateYear();
    this.hideLoadingIndicator();
    window.mainJsLoaded = true;
    console.log("Fin du chargement de main.js");
  }

  updateYear() {
    const yearElement = document.querySelector(".year");
    if (yearElement) {
      yearElement.textContent = new Date().getFullYear();
    }
  }

  hideLoadingIndicator() {
    const loadingIndicator = document.getElementById("loading-indicator");
    if (loadingIndicator) {
      loadingIndicator.style.display = "none";
    }
  }
}

// Initialiser l'application quand le DOM est chargé
document.addEventListener("DOMContentLoaded", () => {
  new App();
});
