browser.runtime.onInstalled.addListener(() => {
  console.log("Extension installed. Setting default language to 'en'. Setting default activation to true. Setting default blocking to false. Setting default blocking text to 30s. Setting default blocking end time to 0.");
  browser.storage.local.set({ "bsfw-language": "en" });
  browser.storage.local.set({ "bsfw-activated": true });
  browser.storage.local.set({ "bsfw-blocking": false });
  browser.storage.local.set({ "bsfw-blocking-text": "30s" });
  browser.storage.local.set({ "bsfw-blocking-endtime": 0 });
});