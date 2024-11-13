# Block Sites For Work

## Overview
*Block Sites For Work* removes the ability to access various distracting websites, helping you stay focused on work. It blocks the content of these sites from appearing, so you can work with fewer interruptions whenever you want. The sites it can block include: YouTube, GitHub, Twitch, Poki, FRVR, Steam, Reddit, Discord, Speedrun, Facebook, X (Twitter), Instagram, Tumblr, Snapchat, Netflix, Hulu, Amazon, Crunchyroll, Vimeo, Buzzfeed, YCombinator, Digg, eBay, Etsy, Aliexpress, 9gag, Cheezburger, Ifunny, Miniclip, Kongregate, Pornhub, Y8, CrazyGames, Kodub, Shellshock, Voodoo Games, Neal.fun, Doodle Jump, Scan Manga, Jeux, 1001 Jeux, JeuxJeux, Kekma, BrawlTime, BrawlStats, SMBGames, SuperMarioPlay and Chess. Three languages are available: English, French, and Spanish.

## Installation for developpers
To install the *Block Sites For Work* extension, follow these steps:

1. Download the extension files from the [GitHub repository](https://github.com/Anto-Napo/work-site-block-firefox).

2. Open Firefox.

3. Type `about:debugging` in the address bar and press Enter.

4. Click on "This Firefox" in the left sidebar.

5. Click the "Load Temporary Add-on" button.

6. Navigate to the folder where you downloaded the extension files, and select the `manifest.json` file.

The *Block Sites For Work* extension is now installed and active.

## How to Use
Once the *Block Sites For Work* extension is installed, you'll have to click on the popup and activate it in order to block website specified in the [manifest.json](manifest.json) file. You can also select a language in the same popup.

## Uninstalling
To uninstall the *Block Sites For Work* extension, follow these steps:

1. Open Firefox.

2. Click the three horizontal lines in the top-right corner to open the menu.

3. Select "Add-ons."

4. Find the *Block Sites For Work* extension in the list of installed extensions.

5. Click the "Remove" button next to the *Block Sites For Work* extension.

The extension will be removed from your Firefox browser.

## Contact
If you have any questions, issues or suggestions, you can create an issue on the [GitHub repository](https://github.com/Anto-Napo/work-site-block-firefox/issues).

## License

This project is licensed under the Creative Commons Attribution-NonCommercial-NoDerivatives 4.0 International License. 

**Author**: Anto-Napo

**Date**: 2024

Complete license in the link bellow or in the [license file](LICENSE).

[![License: CC BY-NC-ND 4.0](https://img.shields.io/badge/License-CC%20BY--NC--ND%204.0-lightgrey.svg)](https://creativecommons.org/licenses/by-nc-nd/4.0/)

# Patch Note

## V1

### V1.0

* First instance of the extension.

### V1.1

* Added special characters as accents for french and reversed interrogation and exclamation point for spanish.

* Added a missing feature of the translation where the text for changing the language was only available in english.

## V2

### V2.0

* Added a new feature where the blocking cannot be deactivated until a specified time span has passed.

### V2.1

* Reversed the order of language and blocking to ensure a better user experience.

* Fixed a bug where if the extension was already installed, the default blocking time wouldn't be set.

* Added more sites to block.

### V2.2

* Added color change for the title depending on the state of the block.

* Changed the description.

### V2.3

* Fixed an issue where default values were set on updates.

### V2.4

* Added more websites.

* Fixed an issue where some websites don't begin by *www*, so the blocking wouldn't work.

### V2.5

* Added the issue text in the blocked page.

* Changed the design of the blocked page.

* Fixed an issue where the last blocked time wasn't set.

* Fixed an issue where the color wouldn't instantly be set to red after the end of the blocking.