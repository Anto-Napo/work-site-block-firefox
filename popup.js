function changeLanguage(language) {
  const activateButton = document.getElementById('activateButton');
  const deactivateButton = document.getElementById('deactivateButton');
  const questionsButton = document.getElementById('link');
  const languageSelect = document.getElementById('lg-select-txt');
  const forcedActivateText = document.getElementById('forcedActivateText');
  const forcedActivateButton = document.getElementById('forcedActivateButton');
  if(language === 'fr') {
    activateButton.innerHTML = "Activer";
    deactivateButton.innerHTML = "D&eacute;sactiver";
    languageSelect.innerHTML = "S&eacute;lectionne une langue:";
    forcedActivateText.innerHTML = "Activation forc&eacute;e:";
    forcedActivateButton.innerHTML = "Activer";
    questionsButton.innerHTML = "Des questions? Cr&eacute;e simplement une issue!";
  } else if(language === 'es') {
    activateButton.innerHTML = "Permitir";
    deactivateButton.innerHTML = "Desactivar";
    languageSelect.innerHTML = "Seleccione un idioma:";
    forcedActivateText.innerHTML = "Activaci&oacute;n forzada:";
    forcedActivateButton.innerHTML = "Permitir";
    questionsButton.innerHTML = "&iquest;Alguna pregunta? &iexcl;Simplemente crea un issue!";
  } else if(language === 'en') {
    activateButton.innerHTML = "Activate";
    deactivateButton.innerHTML = "Deactivate";
    languageSelect.innerHTML = "Select a language:";
    forcedActivateText.innerHTML = "Forced activation time:";
    forcedActivateButton.innerHTML = "Activate";
    questionsButton.innerHTML = "Any questions? Just create an issue!";
  }
}


// Setting activation state
document.getElementById('activateButton').addEventListener('click', () => {
  browser.storage.local.set({ "bsfw-activated": true }).then(() => {
    changeTitleColor();
  }).catch((error) => {
    console.error("Error setting activation state:", error);
  });
});

document.getElementById('deactivateButton').addEventListener('click', () => {
  browser.storage.local.set({ "bsfw-activated": false }).then(() => {
    changeTitleColor();
  }).catch((error) => {
    console.error("Error setting activation state:", error);
  });
});

// LANGUAGE

// Showing current language & Showing buttons in the correct language
browser.storage.local.get("bsfw-language").then((result) => {
  const language = result["bsfw-language"];

  const dropdown = document.getElementById('languageDropdown');
  dropdown.value = language;

  changeLanguage(language);
});

// Setting language
document.getElementById('languageDropdown').addEventListener('change', function() {
  const selectedLanguage = this.value;
  browser.storage.local.set({ "bsfw-language": selectedLanguage }).then(() => {
  }).catch((error) => {
    console.error("Error setting language:", error);
  });

  changeLanguage(selectedLanguage);
});

// FORCED ACTIVATION

// Showing the last activation time
browser.storage.local.get("bsfw-blocking-text").then((result) => {
  const text = result["bsfw-blocking-text"];

  const dropdown = document.getElementById('forcedDropdown');
  dropdown.value = text;
});

// Setting forced activation
function getActivationTime(time) {
  const timeMap = {
    "30s": 30,
    "1m": 60,
    "5m": 60 * 5,
    "10m": 60 * 10,
    "15m": 60 * 15,
    "30m": 60 * 30,
    "45m": 60 * 45,
    "1h": 60 * 60,
    "1h15m": 60 * 60 + 60*15,
    "1h30m": 60 * 60 + 60*30
  };
  return timeMap[time] || null;
}

document.getElementById('forcedActivateButton').addEventListener('click', () => {
  browser.storage.local.set({ "bsfw-blocking": true }).then(() => {
    const dropdown = document.getElementById('forcedDropdown');
    const baseTime = dropdown.value;
    const time = getActivationTime(baseTime);
    const currentTime = getCurrentTime();
    const endTime = currentTime + time; // Get the endtime
    browser.storage.local.set({ "bsfw-blocking-endtime": endTime }).then(() => {
      browser.storage.local.set({ "bsfw-activated": true }).then(() => {
        browser.storage.local.set({ "bsfw-blocking-text": dropdown.value }).then(() => {
          window.close();
        }).catch((error) => {
          console.error("Error activating the block:", error);
        });
      }).catch((error) => {
        console.error("Error activating the block:", error);
      });
    }).catch((error) => {
      console.error("Error setting the end time:", error);
    });
  }).catch((error) => {
    console.error("Error setting blocking activation state:", error);
  });
});

// Updating the popup if the blocking is active
browser.storage.local.get(["bsfw-blocking", "bsfw-blocking-endtime"]).then((result) => {
  const activated = result["bsfw-blocking"];
  const endtime = result["bsfw-blocking-endtime"];
  if (activated) {
    if (getCurrentTime() >= endtime) {
      browser.storage.local.set({ "bsfw-blocking": false }).then(() => {
        browser.storage.local.set({ "bsfw-activated": false }).then(() => { // In case no webpage has been refreshed or accessed (see index.js)
          title.style.color = "#CC0000"; // Set the color so it doesn't appear in the wrong one
        }).catch((error) => {
          console.error("Error activating the block:", error);
        });
      }).catch((error) => {
        console.error("Error deactivating blocking:", error);
      });
    } else {
      browser.storage.local.get("bsfw-language").then((result) => {
        const language = result["bsfw-language"];
        const time = secondsToTime(endtime);
        let text = `<p class="blocked">The content is blocked until <b>${time}</b>.</p>`;
        if(language == "es") {
          text = `<p class="blocked">El contenido est&aacute; bloqueado hasta:<br><b>${time}</b></p>
                  <a class="part block-issue" id="link" href="https://github.com/Anto-Napo/work-site-block-firefox/issues">&iquest;Alguna pregunta? &iexcl;Simplemente crea un issue!</a>`;
        } else if (language == "fr") {
          text = `<p class="blocked">Le contenu est bloqu&eacute; jusqu'&agrave;:<br><b>${time}</b></p>
                  <a class="part block-issue" id="link" href="https://github.com/Anto-Napo/work-site-block-firefox/issues">Des questions? Cr&eacute;e simplement une issue!</a>`;
        }else if (language == "en") {
          text = `<p class="blocked">The content is blocked until:<br><b>${time}</b></p>
                  <a class="part block-issue" id="link" href="https://github.com/Anto-Napo/work-site-block-firefox/issues">Any questions? Just create an issue!</a>`;
        }
        document.getElementById('content').innerHTML = text;
      });
      
    }
  }
});

// If the value of the dropdown is somehow empty
browser.storage.local.get("bsfw-blocking-text").then((result) => {
  const text = result["bsfw-blocking-text"];
  const dropdown = document.getElementById('forcedDropdown');
  if(!text) {
    browser.storage.local.set({ "bsfw-blocking-text": "30s" }).then(() => {
      dropdown.value = "30s";
    }).catch((error) => {
      console.error("Error activating the block:", error);
    });
  }
});

// COLOR

// Set the color if the block is activated or not.
function changeTitleColor() {
  browser.storage.local.get("bsfw-activated").then((result) => {
    const activated = result["bsfw-activated"];
    const title = document.getElementById("title");
    if(activated) {
      title.style.color = "#38761D";
    } else {
      title.style.color = "#CC0000";
    }
  });
}

changeTitleColor();

// MISC FUNCTIONS
function getCurrentTime() {
  return Math.floor(Date.now() / 1000);
}

function secondsToTime(time) {
  const date = new Date(time * 1000); // Convert seconds to milliseconds
  /*
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  */
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const seconds = date.getSeconds().toString().padStart(2, '0');

  return `${hours}:${minutes}:${seconds}`;
}