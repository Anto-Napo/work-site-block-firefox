function changeButtonLanguage(language) {
  const activateButton = document.getElementById('activateButton');
  const deactivateButton = document.getElementById('deactivateButton');
  const questionsButton = document.getElementById('link');
  if(language === 'fr') {
    activateButton.textContent = "Activer";
    deactivateButton.textContent = "Desactiver";
    questionsButton.textContent = "Des questions? Cree simplement une issue!";
  } else if(language === 'es') {
    activateButton.textContent = "Permitir";
    deactivateButton.textContent = "Desactivar";
    questionsButton.textContent = "Alguna pregunta? Simplemente crea un issue!";
  } else if(language === 'en') {
    activateButton.textContent = "Activate";
    deactivateButton.textContent = "Deactivate";
    questionsButton.textContent = "Any questions? Just create an issue!";
  }
}

// Showing current language & Showing buttons in the correct language
browser.storage.local.get("bsfw-language").then((result) => {
  const language = result["bsfw-language"]

  const dropdown = document.getElementById('dropdown');
  dropdown.value = language;

  changeButtonLanguage(language);
});


// Setting activation state
document.getElementById('activateButton').addEventListener('click', () => {
  browser.storage.local.set({ "bsfw-activated": true }).then(() => {
  }).catch((error) => {
    console.error("Error setting activation state:", error);
  });
});

document.getElementById('deactivateButton').addEventListener('click', () => {
  browser.storage.local.set({ "bsfw-activated": false }).then(() => {
  }).catch((error) => {
    console.error("Error setting activation state:", error);
  });
});

// Settiing language
document.getElementById('dropdown').addEventListener('change', function() {
  const selectedLanguage = this.value;
  browser.storage.local.set({ "bsfw-language": selectedLanguage }).then(() => {
  }).catch((error) => {
    console.error("Error setting language:", error);
  });

  changeButtonLanguage(selectedLanguage);
});