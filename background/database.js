class dbInterface{
    //takes firebase.firestore object
    constructor(firestore){
        this._profRef = firestore.collection("profs");
        this._courseRef = firestore.collection("courses");
    }

    //gets document containing the course name and runs passed in callback on that data
    getCourse(courseName, callback){
        this._courseRef.where("course", "==", courseName).get()
            .catch(error =>{
                console.log("error retrieving course: " + courseName + " error: " + error.data);
                //TODO maybe add something more intelligent here in the future
            })
            .then(snapshot => {
                if (snapshot.empty){
                    console.log("unable to get course with name: " + courseName + " from database");
                }
                else{
                    snapshot.docs.map(document => {
                        console.log("Retrieved course: " + courseName + " from database with details...");
                        console.log(document.data());
                        callback(document.data()); //TODO update this so it runs properly when I decide the best callback to use
                    })
                }
            })
    }

    //profNames should be an Array
    async getProfs(profNames, callback){
        let queriedProfs = [];
        profNames.forEach(prof => {
            queriedProfs.push(this._queryProfs(prof));
        });
        await callback(queriedProfs);
    }

    //gets document containing the prof's name and runs passed in callback on it
    _queryProfs(profName){
        this._profRef.where("name", "==", profName).get()
            .then(snapshot => {
                if (snapshot.empty){
                    console.log("unable to get prof with name: " + profName + " from database");
                }
                else{
                    snapshot.docs.map(document => {
                        console.log("Retrieved prof: " + profName + " from database with details...");
                        console.log(document.data());
                        return document.data();
                    })
                }
            })
            .catch(error =>{
                console.log("error retrieving prof: " + profName + "error: " + error.data);
                //TODO maybe add something more intelligent here in the future
            })
    }
}
