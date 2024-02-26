// I created this JavaScript script to automate the process of batch removing or leaving group conversations in Skype. Skype has a tendency to create new conversation groups every time someone adds you to a call, leading to an unwieldy list of groups. As of [Feb 26 2024], Skype lacks a built-in feature for batch removing or leaving these conversations. This script provides a workaround by programmatically simulating right-click actions on each conversation, selecting the "Leave" option from the context menu, and confirming the action, thereby streamlining the cleanup of unnecessary groups.
// It don't have a white lost and it just remove all GROUP conversations



// This script is designed to automate right-clicking on elements with specific IDs,
// clicking a "Leave" option from a custom context menu, and then confirming the action.
// It utilizes async/await to ensure actions are completed sequentially.

// Simulates a right-click on a specified element to open its custom context menu.
// Uses a Promise to handle asynchronous execution and delays.
async function simulateRightClick(elementId) {
    return new Promise(resolve => {
        let element = document.getElementById(elementId);
        if (element) {
            // Creates and dispatches a contextmenu event to simulate a right-click.
            let event = new MouseEvent('contextmenu', {
                bubbles: true,
                cancelable: true,
                view: window,
                button: 2, // Indicates the right mouse button
                buttons: 2,
                clientX: element.getBoundingClientRect().left,
                clientY: element.getBoundingClientRect().top
            });
            element.dispatchEvent(event);
            console.log('Right-click simulated on:', elementId);
            setTimeout(resolve, 500); // Waits for the custom context menu to appear.
        } else {
            console.log('Element not found:', elementId);
            resolve();
        }
    });
}

// Simulates clicking the "Leave" option within the custom context menu.
async function clickLeaveOption(leaveOptionSelector) {
    return new Promise(resolve => {
        let leaveOption = document.querySelector(leaveOptionSelector);
        if (leaveOption) {
            leaveOption.click();
            console.log('Clicked Leave option');
            setTimeout(resolve, 1000); // Waits for the confirmation dialog to appear.
        } else {
            console.log('Leave option not found');
            resolve();
        }
    });
}

// Simulates clicking the "Confirm" button within the confirmation dialog.
async function clickConfirmButton(confirmButtonSelector) {
    return new Promise(resolve => {
        let confirmButton = document.querySelector(confirmButtonSelector);
        if (confirmButton) {
            confirmButton.click();
            console.log('Clicked Confirm button');
            setTimeout(resolve, 500); // Waits for the action to be completed.
        } else {
            console.log('Confirm button not found');
            resolve();
        }
    });
}

// Iterates over a range of element IDs to perform the simulated actions on each.
// This function runs the entire process, ensuring each step is completed before moving to the next.
async function performActionsOnAllElements() {
    for (let i = 0; i <= 100; i++) {
        let elementId = `rx-vlv-${i}`;
        await simulateRightClick(elementId);
        await clickLeaveOption('button[aria-label="Leave"]');
        await clickConfirmButton('button[aria-label="Confirm"]');
    }
    console.log('All actions completed.');
}

// Initiates the automated process.
performActionsOnAllElements();
