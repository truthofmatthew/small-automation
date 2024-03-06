// tested on https://www.loom.com/share/06deb533b45541ffb3c579eabe41e04d?sid=4b02a01b-ec44-42dd-a2c5-fa22fe42127e

(function() {
    let collectedTexts = [];
    const totalCues = 170; // Adjust based on the actual number of cues
    let lastCollectedId = -1; // Keeps track of the last collected cue ID
    // Updated container selector based on the provided HTML structure
    const container = document.querySelector('div[style*="position: relative; height: 419px;"]'); 

    // Function to simulate scroll within the container
    function autoScroll() {
        if (lastCollectedId >= totalCues) {
            console.log("Collected all texts. Stopping scroll.");
            console.log(collectedTexts.join("\n")); // Print all collected texts
            return; // Stop if we've collected all texts
        }
        
        // Simulate scroll by changing scrollTop of the container
        container.scrollTop += 100; // Adjust scroll step as needed

        // Collect texts after each scroll
        collectTexts();

        // Continue scrolling after a delay
        setTimeout(autoScroll, 500); // Adjust delay as needed
    }

    // Function to collect texts
    function collectTexts() {
        for (let i = lastCollectedId + 1; i <= totalCues; i++) {
            // Updated to target elements with "transcript-row-" in their data-testid attribute
            const element = document.querySelector(`div[data-testid="transcript-row-${i}"]`);
            if (element) {
                const transcriptText = element.querySelector('.transcript-list_transcript_1tw span');
                if (transcriptText) {
                    collectedTexts.push(transcriptText.textContent);
                    console.log(`Collected text from transcript-row-${i}`);
                    lastCollectedId = i; // Update last collected ID
                }
            }
        }
    }

    autoScroll(); // Start auto-scroll process
})();
