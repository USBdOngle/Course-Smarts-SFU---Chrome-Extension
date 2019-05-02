//Extracts course name from URL and returns a promise
export function extractCourse(){
    return new Promise((resolve, reject) => {
        let url = window.location.href;
        let mid = url.lastIndexOf('/'); //number portion of course name after this
        let secondHalf = url.substring(mid + 1, url.lastIndexOf('.')).toUpperCase();
        let newUrl = url.substring(0, mid); //remove portion of string we just extracted
        let firstHalf = newUrl.substring(newUrl.lastIndexOf('/') + 1).toUpperCase();
        let course = firstHalf + ' ' + secondHalf;

        if (course.length > 1) resolve(course);
        else reject(new Error("Unable to get course name from: " + url));
    });
}

//Extracts an array of all the profs found in the DOM of a course page, returns a promise
export function extractProfs(){
    return new Promise((resolve, reject) => {
        let profs = document.getElementsByClassName('main-section');
        let profList = [];
        for (let i = 0; i < profs.length; i++) {
            let potential = profs[i].getElementsByTagName('td')[1].innerText.trim();

            let newline = potential.search('\n');
            if (newline !== -1) {
                potential = potential.substr(0, newline); //sometimes a profs name and a sessional will be put together
            }

            //make sure prof name is unique, we don't care about sessional or faculty people
            if (potential.length > 0 && !profList.includes(potential) && potential !== 'Sessional' && potential !== 'Faculty') {
                profList.push(potential);
            }
        }

        if (profList.length > 0) resolve(profList);
        else reject(new Error("No profs found in page DOM"));
    });
}

