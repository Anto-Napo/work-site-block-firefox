browser.runtime.onInstalled.addListener(() => {
  console.log("Extension installed. Setting default language to 'en'. Setting default activation to false");
  browser.storage.local.set({ "bsfw-language": "en" });
  browser.storage.local.set({ "bsfw-activated": true })
});