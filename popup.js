function changeButtonLanguage(language) {
  const activateButton = document.getElementById('activateButton');
  const deactivateButton = document.getElementById('deactivateButton');
  const questionsButton = document.getElementById('link');
  const languageSelect = document.getElementById('lg-select-txt');
  if(language === 'fr') {
    activateButton.innerHTML = "Activer";
    deactivateButton.innerHTML = "D&eacute;sactiver";
    languageSelect.innerHTML = "S&eacute;lectionne une langue:";
    questionsButton.innerHTML = "Des questions? Cr&eacute;e simplement une issue!";
  } else if(language === 'es') {
    activateButton.innerHTML = "Permitir";
    deactivateButton.innerHTML = "Desactivar";
    languageSelect.innerHTML = "Seleccione un idioma:";
    questionsButton.innerHTML = "&iquest;Alguna pregunta? &iexcl;Simplemente crea un issue!";
  } else if(language === 'en') {
    activateButton.innerHTML = "Activate";
    deactivateButton.innerHTML = "Deactivate";
    languageSelect.innerHTML = "Select a language:";
    questionsButton.innerHTML = "Any questions? Just create an issue!";
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