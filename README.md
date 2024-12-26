# TornScripts README
Scripts for TORN!

These scripts _should_ work with most popular userscript managers, including:

  - [Tampermonkey](https://www.tampermonkey.net/) (recommended)
  - [Greasemonkey](https://addons.mozilla.org/en-US/firefox/addon/greasemonkey/)
  - [Violentmonkey](https://violentmonkey.github.io/)

For the best experience, I recommend using Tampermonkey, as it is widely supported and actively maintained and the only one I used to test the scripts on.

LIST OF SCRIPTS:
- [Check Drug Cooldown](#check-drug-cooldown)

## Check Drug Cooldown

Check Drug Cooldown is a Tampermonkey script designed for Torn players to optimize their gameplay by monitoring the drug cooldown status. The script fetches real-time data and displays a visual alert on the sidebar, helping players know when to take drugs without wasting time.

### Features

  - Automatically fetches drug cooldown status from Torn's server.
  - Displays a clear, color-coded message near the sidebar:
    
        - Green (Flashing): Ready to take drugs.
    
        - Yellow/Orange: Cooldown is less than 1h.
    ![image](https://github.com/user-attachments/assets/93b5f4a7-6128-4614-bd2a-8423bafb7481)

        - Red: Cooldown is still active.
  - Refreshes every minute to ensure up-to-date information.

### Installation

   1. [Click here to install the script](https://raw.githubusercontent.com/Liienn/TornScripts/main/check-drug-cooldown.user.js) via Tampermonkey.
   2. Enjoy streamlined drug management in Torn!
