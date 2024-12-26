// ==UserScript==
// @name         Employee Company Tool
// @namespace    http://tampermonkey.net/
// @version      0.5
// @description  Such Agile, Much Scrum!
// @author       https://github.com/Liienn
// @match        https://www.torn.com/companies*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=torn.com
// @grant        none
// ==/UserScript==


(function() {
    'use strict';
    let lastUrl = '';
    let initDelay = 200;
    console.log('Company Tool Script started');

    ////////////////////////////////////// EMPLOYEES //////////////////////////////////////////////////
    // Function to check each employee for penalties
    let seenEmployeeIds = new Set();
    function checkEmployeePenalties() {
        console.log('Checking employee penalties...');

        // Set button to "running" state
        const button = document.querySelector('#refresh-button-employee-states');
        if (button) {
            button.classList.add('running');
        }

        // Select all employee elements
        const employeeElements = document.querySelectorAll("#employees > form > div.employee-list-wrap > ul.employee-list.t-blue-cont.h > li");
        console.log(`Found ${employeeElements.length} employee elements`);

        if (employeeElements.length === 0) {
            console.log('No employee elements found. Retrying...');
            return;
        }

        // Remove existing messages
        removeEmployeeMessages();
        employeeElements.forEach(employee => {
            // Extract the data-multipliers array
            console.log(employee);
            const ariaLabel = employee.querySelector('.effectiveness.clearfix').getAttribute('aria-label');
            const dataMultipliers = employee.querySelector('.effectiveness.clearfix').getAttribute('data-multipliers');
            if (!dataMultipliers) {
                console.log('No data-multipliers found for this employee');
                return;
            }

            const regex = /^([^\:]+):/;
            const matches = ariaLabel.match(regex);
            let addiction = 0;
            let inactivity = 0;

            if (dataMultipliers != "null" && matches) {
                const multipliers = JSON.parse(dataMultipliers);
                // Extract the relevant values (based on your data-multipliers order)
                const username = matches[1];
                const employeeId = employee.getAttribute('data-user');
                inactivity = multipliers[8];
                addiction = multipliers[7]
            } else {
                console.log("No matches found.");
            }


            // Determine the message and color based on penalties
            let message, color;
            if (inactivity !== 0) {
                message = `Inactivity detected! ${inactivity}`;
                color = '#8B0000'; // Dark red for inactivity
            } else if (addiction < -10 && addiction >= -20) {
                message = `Addiction level: ${addiction}`;
                color = '#FFA500'; // Orange for warning
            } else if (addiction < -20) {
                message = `Addiction level: ${addiction}`;
                color = '#ff0000'; // Red for too low
            } else {
                message = `Addiction level: ${addiction}`;
                color = '#28a745'; // Green for OK
            }
            displayMessageNearEmployee(employee, message, color);
        });

        // Set button back to default state after messages are updated
        if (button) {
            button.classList.remove('running');
        }
    }

    // Function to display a message next to the acc-body element
    function displayMessageNearEmployee(employeeElement, message, color) {
        console.log(`Displaying message: ${message}`);

        // Create a message element
        const messageElement = document.createElement('div');
        messageElement.textContent = message;
        messageElement.className = 'employee-message';
        messageElement.style.position = 'absolute';
        messageElement.style.backgroundColor = color;
        messageElement.style.color = '#fff';
        messageElement.style.padding = '5px';
        messageElement.style.borderRadius = '3px';
        messageElement.style.zIndex = '1000';

        // Position the message element relative to the employee element
        const rect = employeeElement.getBoundingClientRect();
        messageElement.style.top = `${rect.top + window.scrollY + 6}px`;
        messageElement.style.left = `${rect.right + window.scrollX + 10}px`;

        // Append the message to the body
        document.body.appendChild(messageElement);
    }

    // Function to position the refresh button above the top-most message
    function positionRefreshButton() {
        const positionTarget = document.querySelector("#employees > form > div.employee-list-wrap > ul.employee-list-title.bold > li.fire");
        const rect = positionTarget.getBoundingClientRect();
        const button = document.querySelector('#refresh-button-employee-states');
        if (button) {
            button.style.top = `${rect.top + window.scrollY}px`;
            button.style.left = `${rect.right + window.scrollX + 10}px`;
        }
    }

    // Function to add a refresh button above the first message
    function addRefreshButton() {
        if (document.querySelector('#refresh-button-employee-states'))return;
        console.log('Adding refresh button...');

        // Create the refresh button
        const button = document.createElement('button');
        button.id = 'refresh-button-employee-states';
        button.textContent = 'Refresh employee states';
        button.style.position = 'fixed';
        button.style.position = 'absolute';
        button.style.backgroundColor = '#007bff';
        button.style.color = '#fff';
        button.style.border = 'none';
        button.style.padding = '10px';
        button.style.borderRadius = '5px';
        button.style.zIndex = '1000';
        button.style.cursor = 'pointer';
        button.style.top = '10px';
        button.style.left = '10px';

        // Append the button to the body
        document.body.appendChild(button);

        // Position the button above the top-most message
        positionRefreshButton();

        // Add click event listener to the button
        button.addEventListener('click', () => {
            console.log('Refresh button clicked!');
            updateRefreshButtonColor('running');
            checkEmployeePenalties();
            setTimeout(() => updateRefreshButtonColor('default'), 1000); // Reset color after X seconds
        });
    }

    function updateRefreshButtonColor(state) {
        const button = document.querySelector('#refresh-button-employee-states');
        if (button) {
            if (state === 'running') {
                button.style.backgroundColor = '#0056b3'; // Lighter blue when running
            } else {
                button.style.backgroundColor = '#007bff'; // Default color
            }
        }
    }

    function removeRefreshButton() {
        const button = document.querySelector('#refresh-button-employee-states');
        if (button) {
            button.remove();
        }
    }

    function removeEmployeeMessages() {
        const existingMessages = document.querySelectorAll('.employee-message');
        existingMessages.forEach(message => message.remove());
    }

    ////////////////////////////////////// INIT //////////////////////////////////////////////////

    function monitorUrlChanges() {
        const observer = new MutationObserver(() => {
            const currentUrl = window.location.href;
            if (currentUrl !== lastUrl) {
                lastUrl = currentUrl;
                console.log('URL changed! Re-running script...');
                initDelay = 200;
                init();
            }
        });
        observer.observe(document, { childList: true, subtree: true });
    }

    // Wait for elements and check periodically
    function init() {
        const interval = setInterval(() => {
            const currentUrl = window.location.href;
            removeEmployeeMessages();
            removeRefreshButton();
            if(currentUrl.includes("option=employees")){
                initDelay = 200;
                console.log('URL is a match!: EMPLOYEES');
                console.log('Waiting for employee elements...');
                checkEmployeePenalties();
                addRefreshButton();
            }
            else {
                console.log('URL is not a match...');
            }
            monitorUrlChanges();
            clearInterval(interval); // Stop checking once we find the elements
        }, initDelay);
        monitorUrlChanges();
    }

    // Run the check after the page has loaded
    window.addEventListener('load', init);

    // Add CSS for the running state
    const style = document.createElement('style');
    style.textContent = `
        #refresh-button-employee-states.running {
            background-color: #6c757d; /* Lighter color while running */
        }
    `;
    document.head.appendChild(style);
})();
