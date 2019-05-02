import * as pageDetails from './pageDetails.js';

export function main() {
    let promise = pageDetails.extractCourse();
    promise.then(name => {
        console.log(name);
    });

    let profPromise = pageDetails.extractProfs();
    profPromise.then(profs => {
        console.log(profs);
    })
        .catch(error => {
            console.log(error);
        });
}