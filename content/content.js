
/*
This allows me to be more modular in how I wrote my content script.
Currently it does not allow for imports so we can get our content script to inject the scripts we want
 */

const script = document.createElement('script');
script.setAttribute("type", "module");
script.setAttribute("src", chrome.extension.getURL('content/main.js'));
const head = document.head || document.getElementsByTagName("head")[0] || document.documentElement;
head.insertBefore(script, head.lastChild);
