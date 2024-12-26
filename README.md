# TornScripts README
Scripts for TORN!

These scripts _should_ work with most popular userscript managers, including:

  - [Tampermonkey](https://www.tampermonkey.net/) (recommended)
  - [Greasemonkey](https://addons.mozilla.org/en-US/firefox/addon/greasemonkey/)
  - [Violentmonkey](https://violentmonkey.github.io/)

For the best experience, I recommend using Tampermonkey, as it is widely supported and actively maintained and the only one I used to test the scripts on.

LIST OF SCRIPTS:
- [Check Drug Cooldown](#check-drug-cooldown)
- [Check Employee Penalties (for company owners)](#check-employee-penalties)
  
_______
## Check Drug Cooldown

Let’s face it: life in Torn can be tough. You’re trying to conquer the city, but sometimes you need a little *boost*. Whether it’s to **outsmart your enemies** or just to get through another day of clicking through the forum posts, this script has got your back. **Check Drug Cooldown** keeps track of your drug cooldown status so you’re never caught off guard.

No more waiting around wondering if it's time to take your next dose. This script fetches real-time data and gives you a **visual alert** on the sidebar, so you’ll always know exactly when to pop that pill or hit that needle... without wasting any precious time.

### Features

  - Automatically fetches drug cooldown status from Torn's server.
  - Displays a clear, color-coded message near the sidebar:
    
    - Green (Flashing): Ready to take drugs.
      
    ![image](https://github.com/user-attachments/assets/a83fe944-967d-49a7-a7b8-f2b6f5b7b52a)

    - Yellow/Orange: Cooldown is less than 1h.
      
    ![image](https://github.com/user-attachments/assets/93b5f4a7-6128-4614-bd2a-8423bafb7481)

    - Red: Cooldown is still active.
      
    ![image](https://github.com/user-attachments/assets/dffee9d0-0657-4833-8d79-540c57b8b53c)

  - Refreshes every minute to ensure up-to-date information.

### Installation

   1. [Click here to install the script](https://raw.githubusercontent.com/Liienn/TornScripts/main/check-drug-cooldown.user.js) via your userscript manager.
   2. Enjoy streamlined drug management in Torn!

______
## Check Employee Penalties

You’ve got employees, and you’ve got **responsibilities**—or maybe just the *illusion* of control. Either way, this script is here to help you keep an eye on your workforce without breaking a sweat. Forget about complex performance reviews, just **micromanage** from the comfort of your office chair. 

This tool checks your employees for those pesky penalties like inactivity and addiction, and then reminds you where they stand in the most *colorful* way possible. It's like having a personal assistant for your **employer of the year** status, except they don’t take coffee breaks or ask for raises.

### Features
  - **Inactivity Detection**: Highlights employees with inactivity levels.
  - **Addiction Level Monitoring**: Displays warnings for addiction levels.
  - **Dynamic Message Display**: Adds color-coded messages next to employees for better visibility.
  - **Refresh Button**: Allows for easy updating of employee states with a single click.

![image](https://github.com/user-attachments/assets/d1e9441f-6af9-4579-81e7-469156f85b03)


### Installation

  1. [Click here to install the script](https://raw.githubusercontent.com/Liienn/TornScripts/main/employee-company-tool.user.js) via your userscript manager.
  2. Enjoy streamlined employee penalty micro management in Torn!
