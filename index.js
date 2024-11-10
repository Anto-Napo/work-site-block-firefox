// If blocking time is up, remove the blocking
browser.storage.local.get(["bsfw-blocking-endtime","bsfw-blocking"]).then((result) => {
  const activated = result["bsfw-blocking"];
  if(activated) {
    const endtime = result["bsfw-blocking-endtime"];
    if (Math.floor(Date.now() / 1000) >= endtime) {
      browser.storage.local.set({ "bsfw-blocking": false }).then(() => {
        browser.storage.local.set({ "bsfw-activated": false }).then(() => {
          window.location.reload(); // Reload so the changes are made before the page is loading
        }).catch((error) => {
          console.error("Error activating the block:", error);
        });
      }).catch((error) => {
        console.error("Error deactivating blocking:", error);
      });
    }
  }
});


// Retrieve the stored language value
browser.storage.local.get("bsfw-activated").then((result) => {
  if(result["bsfw-activated"] === true) {
    browser.storage.local.get("bsfw-language").then((result) => {
      let language = result["bsfw-language"];
      console.log("Retrieved language:", language);
  
      let placeholderText;
      if (language === 'en') {
        placeholderText = "GO BACK TO WORK NOW";
      } else if (language === 'fr') {
        placeholderText = "RETOURNE TRAVAILLER";
      } else if (language === 'es') {
        placeholderText = "VUELVE AL TRABAJO";
      } else {
        placeholderText = "PLEASE REPORT THIS AS ERRORBLOCKLNG";
      }
  
      document.body.style.backgroundColor = "#fff"
      document.body.innerHTML = `<h1 style="font-size:100px; text-align:center; font-weight:bolder; color:#000; font-family:Arial">${placeholderText}</h1>`;
    }).catch((error) => {
      console.error("Error retrieving language from storage:", error);
  
      // Handle the error case by setting a default placeholder text
      document.body.style.backgroundColor = "#fff"
      document.body.innerHTML = `<h1 style="font-size:100px;text-align:center; font-weight:bolder; color:#000; font-family:Arial">404 LANGUAGE NOT FOUND (Block Sites for work extension)</h1>`;
    });
  }
}).catch((error) => {
  console.error("Error retrieving activation state from storage:", error);
});