let allLinks = [];
let stopFlag = false;

function processPage() {
  // Function to wait for the page to load completely
  function waitForPageLoad(callback) {
    let lastHeight = document.body.scrollHeight;
    const interval = setInterval(() => {
      window.scrollTo(0, document.body.scrollHeight);
      let newHeight = document.body.scrollHeight;
      if (newHeight === lastHeight) {
        clearInterval(interval);
        callback();
      } else {
        lastHeight = newHeight;
      }
    }, 100);
  }

  // Function to scroll step by step
  function scrollStepByStep(callback) {
    let scrollHeight = document.body.scrollHeight;
    let currentPosition = window.scrollY;

    const interval = setInterval(() => {
      currentPosition += 300; // scroll 300px each step
      window.scrollTo(0, currentPosition);

      if (currentPosition >= scrollHeight - 300) {
        clearInterval(interval);
        callback();
      }
    }, 100);
  }

  // Function to grab links
  function grabLinks() {
    const links = document.querySelectorAll('a');
    links.forEach(link => {
      if (link.href.includes('linkedin.com') && !allLinks.includes(link.href)) {
        allLinks.push(link.href);
      }
    });
    console.log('Links grabbed:', links);
  }

  // Function to click the next page button
  function clickNextPage() {
    const nextPageButton = document.querySelector('button[aria-label="Next"]') ||
                           document.querySelector('button.artdeco-pagination__button--next') ||
                           document.querySelector('button[aria-hidden="true"] svg use[href="#chevron-right-small"]');
    
    if (nextPageButton) {
      nextPageButton.click();
      console.log('Clicked next page button.');
      setTimeout(processPage, 3000); // wait for 3 seconds before processing the next page
    } else {
      console.log('Next page button not found. Scrolling to pagination section.');
      const paginationDiv = document.querySelector('div.artdeco-pagination');
      if (paginationDiv) {
        paginationDiv.scrollIntoView({ behavior: 'smooth', block: 'end' });
        setTimeout(() => {
          const nextPageButton = paginationDiv.querySelector('button[aria-label="Next"]');
          if (nextPageButton) {
            nextPageButton.click();
            console.log('Clicked next page button after scrolling to pagination.');
            setTimeout(processPage, 3000); // wait for 3 seconds before processing the next page
          } else {
            console.log('Next page button still not found.');
          }
        }, 2000); // wait for 2 seconds after scrolling
      } else {
        console.log('Pagination section not found. Scrolling to top and then to bottom again.');
        window.scrollTo(0, 0); // scroll to top
        setTimeout(() => {
          scrollStepByStep(() => {
            clickNextPage(); // try clicking next page button again
          });
        }, 2000); // wait for 2 seconds after scrolling to top
      }
    }
  }

  // Execute the steps in order
  waitForPageLoad(() => {
    scrollStepByStep(() => {
      grabLinks();
      if (!stopFlag) {
        clickNextPage();
      } else {
        console.log('Stop flag detected. All collected links:', allLinks);
      }
    });
  });
}

// Function to stop the process and print all links
function stop() {
  stopFlag = true;
  console.log('Stopping process. All collected links:', allLinks);
}

// Start the process
processPage();

// Example usage: call stop() in the console to stop the process and get all links
// stop();
