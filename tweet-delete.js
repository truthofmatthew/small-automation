async function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Function to scroll element into view with offset
function scrollToTweet(element, offset = 200) {
    const rect = element.getBoundingClientRect();
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const targetY = rect.top + scrollTop - offset;
    window.scrollTo({
        top: targetY,
        behavior: 'smooth'
    });
}

// Function to scroll down to load more tweets
async function scrollToLoadMore() {
    console.log('Scrolling down to load more tweets...');
    const previousHeight = document.documentElement.scrollHeight;
    
    // Scroll down significantly
    window.scrollTo({
        top: window.scrollY + 1000,
        behavior: 'smooth'
    });
    
    // Wait for potential new content
    await sleep(2000);
    
    // Check if new content was loaded
    const newHeight = document.documentElement.scrollHeight;
    return newHeight > previousHeight;
}

async function scrollUpAndDown() {
    console.log('Performing scroll refresh...');
    const currentPosition = window.scrollY;
    
    // Scroll up
    window.scrollTo({
        top: Math.max(0, currentPosition - 1500),
        behavior: 'smooth'
    });
    await sleep(1500);
    
    // Scroll back down
    window.scrollTo({
        top: currentPosition + 500,
        behavior: 'smooth'
    });
    await sleep(1500);
}

async function attemptTweetDeletion(tweet, retryCount = 0) {
    const MAX_RETRIES = 3;
    
    try {
        // Scroll the tweet into view first
        scrollToTweet(tweet);
        await sleep(1000);
        
        const tweetContainer = tweet.closest('article');
        if (!tweetContainer) throw new Error('Tweet container not found');
        
        const moreButton = tweetContainer.querySelector('[data-testid="caret"]');
        if (!moreButton) throw new Error('More button not found');
        
        moreButton.click();
        await sleep(1500);
        
        const menuItems = document.querySelectorAll('[role="menuitem"]');
        let deleteButton = null;
        for (const item of menuItems) {
            if (item.textContent.includes('Delete') || item.textContent.includes('حذف')) {
                deleteButton = item;
                break;
            }
        }
        if (!deleteButton) throw new Error('Delete button not found');
        
        deleteButton.click();
        await sleep(1500);
        
        const confirmButton = document.querySelector('[data-testid="confirmationSheetConfirm"]');
        if (!confirmButton) throw new Error('Confirm button not found');
        
        confirmButton.click();
        await sleep(2000);
        
        return true;
    } catch (error) {
        console.log(`Error deleting tweet (attempt ${retryCount + 1}/${MAX_RETRIES}):`, error.message);
        
        if (retryCount < MAX_RETRIES - 1) {
            console.log(`Retrying... (${retryCount + 1}/${MAX_RETRIES})`);
            await sleep(2000);
            return attemptTweetDeletion(tweet, retryCount + 1);
        } else {
            console.log('Max retries reached for this tweet, moving on...');
            return false;
        }
    }
}

async function findAndDeleteTweets() {
    let deletedCount = 0;
    let noTweetsFoundCount = 0;
    let consecutiveLoadAttempts = 0;
    const MAX_NO_TWEETS_FOUND = 3;
    const MAX_LOAD_ATTEMPTS = 5;
    
    while (true) {
        const tweets = document.querySelectorAll('div[data-testid="User-Name"]');
        let foundTweetToDelete = false;
        
        for (const tweet of tweets) {
            if (tweet.textContent.includes('@truthofmatthew') || 
                tweet.textContent.includes('کتاب نبرد منو بخون')) {
                
                const deleted = await attemptTweetDeletion(tweet);
                if (deleted) {
                    deletedCount++;
                    console.log(`Deleted tweet #${deletedCount}`);
                    foundTweetToDelete = true;
                    noTweetsFoundCount = 0;
                    consecutiveLoadAttempts = 0;
                    break;
                }
            }
        }
        
        if (!foundTweetToDelete) {
            noTweetsFoundCount++;
            console.log(`No tweets found to delete. Attempt ${noTweetsFoundCount}/${MAX_NO_TWEETS_FOUND}`);
            
            // Try to load more tweets
            const loaded = await scrollToLoadMore();
            
            if (!loaded) {
                consecutiveLoadAttempts++;
                console.log(`No new tweets loaded. Attempt ${consecutiveLoadAttempts}/${MAX_LOAD_ATTEMPTS}`);
                
                if (consecutiveLoadAttempts >= MAX_LOAD_ATTEMPTS) {
                    // Try scrolling up and down to refresh the view
                    await scrollUpAndDown();
                    consecutiveLoadAttempts = 0;
                }
            } else {
                consecutiveLoadAttempts = 0;
            }
            
            // Check if we've tried enough times without finding tweets
            if (noTweetsFoundCount >= MAX_NO_TWEETS_FOUND && consecutiveLoadAttempts >= MAX_LOAD_ATTEMPTS) {
                console.log('Final check for any missed tweets...');
                await scrollUpAndDown();
                
                // One last check for tweets
                const finalTweets = document.querySelectorAll('div[data-testid="User-Name"]');
                let foundFinal = false;
                for (const tweet of finalTweets) {
                    if (tweet.textContent.includes('@truthofmatthew') || 
                        tweet.textContent.includes('کتاب نبرد منو بخون')) {
                        foundFinal = true;
                        break;
                    }
                }
                
                if (!foundFinal) {
                    console.log(`Script complete! Total tweets deleted: ${deletedCount}`);
                    break;
                } else {
                    console.log('Found more tweets after final check, continuing...');
                    noTweetsFoundCount = 0;
                    consecutiveLoadAttempts = 0;
                }
            }
            
            await sleep(1500);
        }
    }
}

// Start the deletion process
console.log('Starting enhanced tweet deletion process...');
console.log('Features:');
console.log('- Automatically scrolls to tweet being deleted');
console.log('- Scrolls down to load more tweets when needed');
console.log('- Retries deletion up to 3 times per tweet');
console.log('- Performs scroll refresh when stuck');
findAndDeleteTweets();
