// Indicateur de début de chargement
console.log("Début du chargement de forms.js");
window.formsJsLoaded = false;

class FormHandler {
  constructor() {
    this.contactForm = document.querySelector(".contact-form");
    this.donationForm = document.querySelector(".donation-form");
    this.newsletterForm = document.querySelector(".newsletter-form");
    this.errorMessages = {
      required: "Ce champ est obligatoire",
      email: "Veuillez entrer une adresse email valide",
      phone: "Veuillez entrer un numéro de téléphone valide",
      minLength: "Ce champ doit contenir au moins {min} caractères",
      maxLength: "Ce champ ne doit pas dépasser {max} caractères",
    };
    this.init();
  }

  init() {
    if (this.contactForm) {
      this.setupContactForm();
    }

    if (this.donationForm) {
      this.setupDonationForm();
    }

    if (this.newsletterForm) {
      this.setupNewsletterForm();
    }

    // Indicateur de fin de chargement
    window.formsJsLoaded = true;
    console.log("Fin du chargement de forms.js");
  }

  validateField(field) {
    const value = field.value.trim();
    const validations = field.dataset.validate
      ? field.dataset.validate.split(" ")
      : [];

    for (const validation of validations) {
      if (validation === "required" && !value) {
        return this.errorMessages.required;
      }
      if (validation === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
        return this.errorMessages.email;
      }
      if (validation === "phone" && !/^(\+\d{1,3}[- ]?)?\d{10}$/.test(value)) {
        return this.errorMessages.phone;
      }
      if (validation.startsWith("minLength:")) {
        const min = parseInt(validation.split(":")[1]);
        if (value.length < min) {
          return this.errorMessages.minLength.replace("{min}", min);
        }
      }
      if (validation.startsWith("maxLength:")) {
        const max = parseInt(validation.split(":")[1]);
        if (value.length > max) {
          return this.errorMessages.maxLength.replace("{max}", max);
        }
      }
    }
    return null;
  }

  showFieldError(field, error) {
    const errorDiv = document.createElement("div");
    errorDiv.className = "field-error";
    errorDiv.textContent = error;
    field.parentNode.appendChild(errorDiv);
    field.classList.add("error");
  }

  clearFieldErrors(form) {
    form.querySelectorAll(".field-error").forEach((error) => error.remove());
    form
      .querySelectorAll(".error")
      .forEach((field) => field.classList.remove("error"));
  }

  validateForm(form) {
    this.clearFieldErrors(form);
    let isValid = true;

    form.querySelectorAll("input, textarea, select").forEach((field) => {
      const error = this.validateField(field);
      if (error) {
        this.showFieldError(field, error);
        isValid = false;
      }
    });

    return isValid;
  }

  setupContactForm() {
    this.contactForm.addEventListener("submit", (e) => {
      e.preventDefault();

      if (this.validateForm(this.contactForm)) {
        const formData = new FormData(this.contactForm);
        const data = Object.fromEntries(formData.entries());

        // Simulation d'envoi de formulaire
        console.log("Données du formulaire de contact:", data);
        this.showMessage(
          "Message envoyé avec succès!",
          "success",
          this.contactForm
        );
        this.contactForm.reset();
      }
    });
  }

  setupDonationForm() {
    this.donationForm.addEventListener("submit", (e) => {
      e.preventDefault();

      if (this.validateForm(this.donationForm)) {
        const formData = new FormData(this.donationForm);
        const data = Object.fromEntries(formData.entries());

        // Simulation d'envoi de formulaire
        console.log("Données du formulaire de don:", data);
        this.showMessage("Merci pour votre don!", "success", this.donationForm);
        this.donationForm.reset();
      }
    });
  }

  setupNewsletterForm() {
    this.newsletterForm.addEventListener("submit", (e) => {
      e.preventDefault();

      if (this.validateForm(this.newsletterForm)) {
        const formData = new FormData(this.newsletterForm);
        const data = Object.fromEntries(formData.entries());

        // Simulation d'envoi de formulaire
        console.log("Inscription à la newsletter:", data);
        this.showMessage(
          "Inscription réussie!",
          "success",
          this.newsletterForm
        );
        this.newsletterForm.reset();
      }
    });
  }

  showMessage(message, type, form) {
    const messageDiv = document.createElement("div");
    messageDiv.className = `message ${type}`;
    messageDiv.textContent = message;

    form.parentNode.insertBefore(messageDiv, form);

    setTimeout(() => {
      messageDiv.remove();
    }, 3000);
  }
}

// Exporter la classe FormHandler
export default FormHandler;
