let linkedinLinks = [];
let stopFlag = false;

function extractLinks() {
    let linkedinSpans = document.querySelectorAll('td a[title*="linkedin.com"]');
    linkedinSpans.forEach(span => {
        linkedinLinks.push(span.href);
    });
}

function clickNextPage() {
    if (stopFlag) {
        console.log(linkedinLinks);
        return;
    }
    
    extractLinks();
    
    let nextPageButton = document.querySelector('button[analyticsval1="goToNextPageLink"]');
    if (nextPageButton && !nextPageButton.disabled) {
        nextPageButton.click();
        setTimeout(clickNextPage, 2000);  // Adjust the timeout as necessary
    } else {
        console.log(linkedinLinks);
    }
}

clickNextPage();

// To stop the script and print the collected links, run this in the console:
// stopFlag = true;
