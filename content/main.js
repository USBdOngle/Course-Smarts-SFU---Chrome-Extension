import * as pageDetails from './pageDetails.js';

export function main() {
    //get course name from DOM and send it to the background scripts
    pageDetails.extractCourse()
        .then(name => {
            chrome.runtime.sendMessage({type: 'course', content: name}, response => {
                console.log(response); //TODO this is where the returned data should now be added to the pages DOM
            });
        })
        .catch(error => {
            console.log(error);
        });

    //get prof names from DOM and send it to the background scripts
    pageDetails.extractProfs()
        .then(profs => {
            chrome.runtime.sendMessage({type: 'profs', content: profs}, response => {
                console.log(response);
            });
        })
        .catch(error => {
            console.log(error);
        });
}