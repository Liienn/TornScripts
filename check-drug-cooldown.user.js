// ==UserScript==
// @name         Check Drug Cooldown
// @namespace    http://tampermonkey.net/
// @version      0.5
// @description  Don't waste time not taking drugs!
// @author       https://github.com/Liienn
// @match        https://www.torn.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=torn.com
// @grant        none
// ==/UserScript==

(async function() {
    'use strict';
    console.log('Start script Check Drug Cooldown');
    let hours = 0;
    let minutes = 0;
    let cooldownDrug = '';
    const fetchUrl = 'https://www.torn.com/sidebarAjaxAction.php?q=getSidebarData&rfcv=67262ead12ac1';

    async function fetchData() {
        const headers = {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Accept': 'application/json',
        };

        try {
            const response = await fetch(fetchUrl, {
                method: 'POST',
                headers: headers,
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            if (data.statusIcons.icons.drug_cooldown) {
                console.log('Fetched Data:', data.statusIcons.icons.drug_cooldown.timerExpiresAt, data.statusIcons.icons.drug_cooldown.serverTimestamp);
                cooldownDrug = data.statusIcons.icons.drug_cooldown.subtitle;
                calculateRemainingTime(data.statusIcons.icons.drug_cooldown.timerExpiresAt, data.statusIcons.icons.drug_cooldown.serverTimestamp);
            } else {
                console.log('Not in cooldown');
                hours = 0;
                minutes = 0;
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    function calculateRemainingTime(cooldownEnd, serverTime) {
        const remainingSeconds = cooldownEnd - serverTime;
        if (remainingSeconds <= 0) {
            console.log('No cooldown.');
            hours = 0;
            minutes = 0;
            return;
        }
        hours = Math.floor(remainingSeconds / 3600);
        minutes = Math.floor((remainingSeconds % 3600) / 60);
        console.log(`Cooldown ends in: ${hours} hour(s) and ${minutes} minute(s).`);
    }

    // Function to display a message near a target element
    function displayMessageNearTarget(targetElement, message, isFlashing = false) {
        if (!targetElement) {
            console.log('Target element not found');
            return;
        }

        // Create and style the message element
        const messageElement = document.createElement('div');
        messageElement.id = 'statusMessage';
        messageElement.textContent = message;
        messageElement.style.position = 'absolute';
        // Set background color based on hours and minutes
        console.log(minutes, minutes>30)
        if (hours === 0 && minutes > 30) {
            messageElement.style.backgroundColor = 'rgba(255, 165, 0, 0.7)'; // Orange
        } else if (hours === 0 && minutes < 30 && minutes > 0) {
            messageElement.style.backgroundColor = 'rgba(255, 255, 0, 0.7)'; // Yellow
        } else {
            messageElement.style.backgroundColor = isFlashing ? 'rgba(0, 255, 0, 0.7)' : 'rgba(255, 0, 0, 0.7)'; // Green or Red
        }
        messageElement.style.color = '#000';
        messageElement.style.padding = '5px';
        messageElement.style.borderRadius = '3px';
        messageElement.style.zIndex = '1000';
        messageElement.style.fontWeight = 'bold';
        messageElement.style.textAlign = 'center';
        messageElement.style.whiteSpace = 'pre-wrap'; // Preserve newlines

        // Add flashing effect if required
        if (isFlashing) {
            messageElement.style.animation = 'flashing 1s infinite';
        } else {
            messageElement.style.width = '110px';
        }

        // Position message near the target element
        const rect = targetElement.getBoundingClientRect();
        messageElement.style.top = `${rect.top + window.scrollY + 25}px`;
        messageElement.style.left = `${rect.left + window.scrollX - 120}px`;
        document.body.appendChild(messageElement);

        // Define CSS for flashing animation
        const style = document.createElement('style');
        style.textContent = `
            @keyframes flashing {
                0% { opacity: 1; }
                50% { opacity: 0.5; }
                100% { opacity: 1; }
            }
        `;
        document.head.appendChild(style);
    }

    // Check presence of cooldown and show message
    async function checkAndShowMessage() {
        const targetElement = document.querySelector("#sidebar");
        const existingMessage = document.querySelector('#statusMessage');
        await fetchData();
        if (existingMessage) existingMessage.remove();

        if (minutes === 0 && hours === 0) {
            console.log("Not in cooldown");
            displayMessageNearTarget(targetElement, '!! TAKE DRUGS !!', true);
        } else {
            console.log("Still in cooldown");
            displayMessageNearTarget(targetElement, `${cooldownDrug}\n\n for ${hours}h ${minutes}m`);
        }
    }

    // Poll for the target element and start checking
    const interval = setInterval(async () => {
        const targetElement = document.querySelector("#sidebar");
        if (targetElement) {
            clearInterval(interval); // Stop polling once the target is found
            console.log('Target element found. Starting cooldown checks.');
            await checkAndShowMessage();
            setInterval(async () => {
                console.log('Checking cooldown status...'); // Log for debugging
                await checkAndShowMessage();
            }, 60000); // Check every 60 seconds
        } else {
            console.log('Target element not found yet. Retrying...');
        }
    }, 1000); // Check every second for the target element
})();