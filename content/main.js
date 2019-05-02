import * as pageDetails from './pageDetails.js';

export function main() {
    //get course name from DOM and send it to the background scripts
    pageDetails.extractCourse()
        .then(name => {
            chrome.runtime.sendMessage({type: 'course', content: name});
        })
        .catch(error => {
            console.log(error);
        });

    //get prof names from DOM and send it to the background scripts
    pageDetails.extractProfs()
        .then(profs => {
            chrome.runtime.sendMessage({type: 'profs', content: profs});
        })
        .catch(error => {
            console.log(error);
        });

    chrome.runtime.onMessage.addListener(request => {
        console.log("got here");
    })
}