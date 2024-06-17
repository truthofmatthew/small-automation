# Snapp.ir Club Coin Automation

This script automates the process of spending Snapp.ir club coins. Follow the steps below to use it in your browser console.
![Snapp Club Demo](snapp_club_auto.gif)

## Steps to Use

1. **Open Snapp.ir in Your Browser:**
   - Navigate to the Snapp.ir website and log in to your account.

2. **Access the Snapp Club Section:**
   - Go to the Snapp Club section where you can spend your coins.

3. **Open the Browser Console:**
   - On most browsers, you can open the console by pressing `F12` or `Ctrl+Shift+I` (Windows/Linux) or `Cmd+Opt+I` (Mac). Then, click on the "Console" tab.

4. **Copy and Paste the Script:**
   - Copy the entire JavaScript code provided below and paste it into the console.

5. **Run the Script:**
   - Press `Enter` to run the script. The automation will start spending your Snapp Club coins based on the script's logic.

```javascript
for (let i = 0; i < 100; i++) {
    setTimeout(() => {
        document.evaluate("//div[@id='app']/div[2]/div[2]/div[4]/div/div[6]/div/div[2]/div[2]/p", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue.click();

        setTimeout(() => {
            document.evaluate("(//button[@type='button'])[2]", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue.click();

            setTimeout(() => {
                document.evaluate("//img[contains(@src,'https://web-cdn.snapp.ir/club/close.svg')]", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue.click();
            }, 3000);
        }, 3000);
    }, i * 9000); // Each iteration starts every 6 seconds (3 actions * 2 seconds each)
}
```



