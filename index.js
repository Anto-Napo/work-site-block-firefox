const curr_url = window.location.href

blocked_websites = [
        "youtube.com",
        "twitch.tv",
        "poki.com",
        "frvr.com",
        "steamcommunity.com",
        "steampowered.com",
        "reddit.com",
        "discord.com",
        "discord.gg",
        "speedrun.com",
        "facebook.com",
        "twitter.com",
        "x.com",
        "instagram.com",
        "tumblr.com",
        "snapchat.com",
        "netflix.com",
        "hulu.com",
        "primevideo.com",
        "crunchyroll.com",
        "vimeo.com",
        "buzzfeed.com",
        "news.ycombinator.com",
        "digg.com",
        "amazon.com",
        "ebay.com",
        "etsy.com",
        "aliexpress.com",
        "9gag.com",
        "cheezburger.com",
        "ifunny.co",
        "miniclip.com",
        "kongregate.com",
        "y8.com",
        "crazygames.com",
        "kodub.com",
        "shellshock.io",
        "games.voodoo.io",
        "neal.fun",
        "doodlejump.io",
        "scan-manga.com",
        "jeux.com",
        "1001jeux.com",
        "jeuxjeux.com",
        "kekma.net",
        "brawltime.ninja",
        "brawlstats.com",
        "smbgames.be",
        "supermarioplay.com",
        "chess.com",
        "chess24.com",
        "superhardalgebraproblems.com",
        "schoolschoolschool.com",
        "justdoinghomework.com",
        "chezz.xyz",
        "pleasedontblockchess.com",
        "c4355.com",
        "schoolnetworkadminsarethebest.com",
        "kodub.com",
        "itch.io",
        "myiphide.com",
        "unblockproxy.win",
        "freeproxy.win",
        "unblock-websites.com",
        "proxysite.one",
        "unblockyoutube.video",
        "my-proxy.com",
        "proxy-youtube.com",
        "unblockvideos.com",
        "videounblocker.net",
        "proxypx.com",
        "proxysite.com",
        "kproxy.com",
        "4everproxy.com",
        "proxfree.com",
        "genmirror.com",
        "croxyproxy.com",
        "webproxy.to",
        "proxy-site.net",
        "telegram.org",
        "signal.org",
        "dailymotion.com",
        "kick.com",
        "hltv.org",
        "youtube-nocookie.com",
        "tiktok.com",
        "gartic.io",
        "skribbl.io",
        "armorgames.com",
        "coolmathgames.com",
        "puzzlebaron.com",
        "subway-surfers.gg",
        "littlealchemy.com",
        "papergames.io",
        "lichess.org",
        "slither.io",
        "play2048.co",
        "agar.io",
        "paper.io",
        "hole-io.com",
        "surviv.io",
        "tiktokcdn.com",
        "odysee.com",
        "wish.com",
        "shein.com",
        "temu.com",
        "vinted.fr",
        "zalando.com",
        "cdiscount.com",
        "rakuten.com",
        "4chan.org",
        "8kun.top",
        "imgur.com",
        "knowyourmeme.com",
        "memedroid.com",
        "lemmy.world",
        "mastodon.social"
      ]

let isBlockedSite = false

for (let site = 0; site < blocked_websites.length; site++) {
  if (curr_url.includes(blocked_websites[site])) {
      isBlockedSite = true
  }
}

if (isBlockedSite) { // Just do something if the website is in the list
  // SET THE TEXT SHOWING WHEN ENTERING A BLOCKED WEBSITE
  browser.storage.local.get("bsfw-activated").then((result) => {
    if(result["bsfw-activated"] === true) {
      browser.storage.local.get("bsfw-language").then((result) => {
        let language = result["bsfw-language"];  
        let placeholderText;

        switch (language) {
          case 'en':
            placeholderText = "GO BACK TO WORK NOW";
            break;
          case 'fr':
            placeholderText = "RETOURNE TRAVAILLER";
            break;
          case 'es':
            placeholderText = "VUELVE AL TRABAJO";
            break;
          default:
            placeholderText = "PLEASE REPORT THIS AS ERRORBLOCKLNG";
        }
    
        document.body.style.backgroundColor = "#fff"
        document.body.innerHTML = `<h1 style="font-size:100px; text-align:center; font-weight:bolder; color:#000; font-family:Arial">${placeholderText}</h1>`;
      }).catch((error) => {
        console.error("Error retrieving language:", error);
    
        // Handle the error case by setting a default placeholder text
        document.body.style.backgroundColor = "#fff"
        document.body.innerHTML = `<h1 style="font-size:100px;text-align:center; font-weight:bolder; color:#000; font-family:Arial">404 LANGUAGE NOT FOUND (Block Sites for work extension)</h1>`;
      });
    }
  }).catch((error) => {
    console.error("Error retrieving activation state from storage:", error);
  });

  // REMOVE THE BLOCKING IF TIME'S UP
  browser.storage.local.get(["bsfw-blocking-endtime","bsfw-blocking"]).then((result) => {
    const activated = result["bsfw-blocking"];
    // If the block is activated
    if(activated) {
      const endtime = result["bsfw-blocking-endtime"];
      // If time's up
      if (Math.floor(Date.now() / 1000) >= endtime) {
        browser.storage.local.set({ "bsfw-blocking": false }).then(() => {
          browser.storage.local.set({ "bsfw-activated": false }).then(() => {
            // Notify that the page is reloading
            browser.storage.local.get("bsfw-language").then((result) => {
              let language = result["bsfw-language"];
              let notifytext;

              switch (language) {
                case 'en':
                  notifytext = "Time's up! Reloading the page...";
                  break;
                case 'fr':
                  notifytext = "Le temps est écoulé! Rechargement de la page...";
                  break;
                case 'es':
                  notifytext = "&iexcl;Se acabó el tiempo! Recargando la página…";
                  break;
                default:
                  notifytext = "PLEASE REPORT THIS AS ERRORTXTRELOAD";
              }

              document.body.innerHTML = `<h1 style="font-size:100px; text-align:center; font-weight:bolder; color:#38761D; font-family:Arial">${notifytext}</h1>`;

              requestAnimationFrame(() => {
                setTimeout(() => window.location.reload(), 250);
              });
            }).catch((error) => {
              console.error("Error retrieving the language", error);
            });
          }).catch((error) => {
            console.error("Error deactivating:", error);
          });
        }).catch((error) => {
          console.error("Error deactivating forced block:", error);
        });
      }
    }
  });
}