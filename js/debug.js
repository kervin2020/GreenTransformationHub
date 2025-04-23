// Fichier de débogage pour détecter les erreurs JavaScript
console.log("Debug.js chargé");

// Vérifier si les sections existent
document.addEventListener("DOMContentLoaded", function () {
  console.log("DOM chargé");

  // Vérifier les sections principales
  const sections = ["accueil", "apropos", "projets", "equipe", "contact"];

  sections.forEach((sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      console.log(`Section ${sectionId} trouvée`);
    } else {
      console.error(`Section ${sectionId} NON TROUVÉE`);
    }
  });

  // Vérifier si les scripts sont chargés
  console.log("Vérification des scripts:");
  console.log("main.js chargé:", typeof window.mainJsLoaded !== "undefined");
  console.log(
    "slider.js chargé:",
    typeof window.sliderJsLoaded !== "undefined"
  );
});

// Capturer les erreurs JavaScript
window.onerror = function (message, source, lineno, colno, error) {
  console.error("Erreur JavaScript:", message);
  console.error("Source:", source);
  console.error("Ligne:", lineno);
  console.error("Colonne:", colno);
  console.error("Objet d'erreur:", error);
  return false;
};

// Fonction pour vérifier le chargement des scripts
function checkScriptsLoaded() {
  console.log("Vérification du chargement des scripts...");
  console.log("main.js chargé:", window.mainJsLoaded);
  console.log("slider.js chargé:", window.sliderJsLoaded);
}

// Vérifier après 2 secondes
setTimeout(checkScriptsLoaded, 2000);

// Vérifier après 5 secondes
setTimeout(checkScriptsLoaded, 5000);

// Vérifier après 10 secondes
setTimeout(checkScriptsLoaded, 10000);

// Vérifier les erreurs de chargement
window.addEventListener(
  "error",
  function (event) {
    console.error("Erreur de chargement:", event.message);
    console.error("Fichier:", event.filename);
    console.error("Ligne:", event.lineno);
    console.error("Colonne:", event.colno);
  },
  true
);
