
/*
This allows me to be more modular in how I wrote my content script.
Currently it does not allow for imports so we can dynamically import a main function from another file
 */

(async () => {
    const src = chrome.extension.getURL('content/main.js');
    const contentScript = await import(src);
    contentScript.main();
})();
