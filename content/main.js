import * as pageDetails from './pageDetails.js';
import * as displayData from './displayData.js';

export function main() {
    const display = new displayData.displayData(); //initialize page so we can start adding html elements later on

    //get course name from DOM and send it to the background scripts
    pageDetails.extractCourse()
        .then(name => {
            chrome.runtime.sendMessage({type: 'course', content: name}, response => {
                if (response !== null){
                    display.displayCourse(response);
                }
                else console.log("received null from background script retrieving course");
            });
        })
        .catch(error => {
            console.log(error);
        });

    //get prof names from DOM and send it to the background scripts
    pageDetails.extractProfs()
        .then(profs => {
            chrome.runtime.sendMessage({type: 'profs', content: profs}, response => {
                if (response !== null){
                    display.displayProfs(response);
                }
                else console.log("received null from background script retrieving profs");
            });
        })
        .catch(error => {
            console.log(error);
        });
}