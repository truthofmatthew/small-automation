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
    const buttons = Array.from(document.querySelectorAll('.entity-result__actions .artdeco-button'));
    for (let button of buttons) {
        // Click the button (e.g., Following button)
        simulateClick(button);
        
        // Wait for the modal to likely appear
        await delay(1000); // Adjust this delay based on how quickly your modal appears
        
        // Locate the "Unfollow" button in the modal
        let unfollowButton = document.querySelector('.artdeco-modal__confirm-dialog-btn[data-test-dialog-primary-btn]');
        if (unfollowButton) {
            simulateClick(unfollowButton);

            // Wait for the modal to process and close
            await delay(500); 
        } else {
            console.log('Unfollow button not found. Waiting and trying again...');
            await delay(500); // Extra wait time if the button was not initially found
            unfollowButton = document.querySelector('.artdeco-modal__confirm-dialog-btn[data-test-dialog-primary-btn]');
            if (unfollowButton) {
                simulateClick(unfollowButton);
                await delay(500); // Wait for the modal to process and close
            }
        }

        // Wait a moment before proceeding to the next button
        await delay(500);
    }
    console.log('Processed all buttons.');
}

// Run the function to start the process
processButtons();
