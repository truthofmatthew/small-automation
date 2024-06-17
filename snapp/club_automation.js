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
