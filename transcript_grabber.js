// https://scalable.co/watch-the-second-mountain/
// my friend asked me to help for grabbing some text from above link and here it is :D




(function() {
    let collectedTexts = [];
    const totalCues = 170; // Adjust based on the actual number of cues
    let lastCollectedId = -1; // Keeps track of the last collected cue ID
    const container = document.querySelector('.Transcript_lazy_module_transcript__0229ee78'); // Selecting the container to scroll

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
            const element = document.getElementById(`transcript-cue-${i}`);
            if (element) {
                const span = element.querySelector('.TranscriptCue_lazy_module_cueText__5735fdfa');
                if (span) {
                    collectedTexts.push(span.textContent);
                    console.log(`Collected text from #transcript-cue-${i}`);
                    lastCollectedId = i; // Update last collected ID
                }
            }
        }
    }

    autoScroll(); // Start auto-scroll process
})();
