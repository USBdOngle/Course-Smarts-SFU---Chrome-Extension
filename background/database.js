class dbInterface {
    //takes firebase.firestore object
    constructor(firestore) {
        this._profRef = firestore.collection("profs");
        this._courseRef = firestore.collection("courses");
        this._queriedProfs = []; //will be used to store the profs we get from db
    }

    //gets document containing the course name and runs passed in callback on that data
    getCourse(courseName, callback) {
        this._courseRef.where("course", "==", courseName).get()
            .catch(error => {
                console.log("error retrieving course: " + courseName + " error: " + error.data);
                callback(null);
                //TODO maybe add something more intelligent here in the future
            })
            .then(snapshot => {
                if (snapshot.empty) {
                    console.log("unable to get course with name: " + courseName + " from database");
                    callback(null);
                } else {
                    snapshot.docs.map(document => {
                        console.log("Retrieved course: " + courseName + " from database with details...");
                        console.log(document.data());
                        callback(document.data());
                    })
                }
            })
    }


    //This is probably bad practice to do what I did below, but with my inexperience in javascript
    //it was the best I could come up with
    //profNames should be an Array
    getProfs(profNames, callback) {
        this._queriedProfs.length  = 0; //clear everything in array
        this._queryProfs(profNames)
            .then(() => {
                callback(this._queriedProfs);
        })
            .catch(error => {
                console.log(error);
                callback(null);
            })

    }
    
    //gets document containing the prof's name and runs passed in callback on it
    async _queryProfs(profNames) {
        for (let i=0; i < profNames.length; i++) {
            await this._profRef.where("name", "==", profNames[i]).get()
                .then(snapshot => {
                    if (snapshot.empty) {
                        console.log("unable to get prof with name: " + profNames[i] + " from database");
                    } else {
                        snapshot.docs.map(document => {
                            console.log("Retrieved prof: " + profNames[i] + " from database with details...");
                            console.log(document.data());
                            this._queriedProfs.push(document.data());
                        })
                    }
                })
                .catch(error => {
                    console.log("error retrieving prof: " + prof + "error: " + error.data);
                    //TODO maybe add something more intelligent here in the future
                })
        }
        if (this._queriedProfs.length === 0) throw new Error("No profs retrieved, nothing to do");
    }
}