// Function to simulate a click
function simulateClick(element) {
    element.click();
    console.log('Clicked:', element); // Log which button was clicked
}

// Function to delay execution to wait for modal to appear
function delay(duration) {
    return new Promise(resolve => setTimeout(resolve, duration));
}

async function processButtons() {
    const buttons = Array.from(document.querySelectorAll('.invitation-card__action-btn'));
    for (let button of buttons) {
        // Click the first button (invitation)
        simulateClick(button);
        
        // Wait for the modal to likely appear
        await delay(1000); // Adjust this delay based on how quickly your modal appears
        
        // Attempt to click the "Withdraw" button within the modal
        let modalActionbar = document.querySelector('.artdeco-modal__actionbar');
        if (modalActionbar) {
            let withdrawButton = modalActionbar.children[1];
            if (withdrawButton) {
                simulateClick(withdrawButton);
            } else {
                console.log('Withdraw button not found. Waiting and trying again...');
                await delay(500); // Extra wait time if the button was not initially found
                withdrawButton = modalActionbar.children[1];
                if (withdrawButton) simulateClick(withdrawButton);
            }
        } else {
            console.log('Modal action bar not found.');
        }

        // Wait a moment before proceeding to the next button
        await delay(500);
    }
    console.log('Processed all buttons.');
}

// Run the function to start the process
processButtons();
