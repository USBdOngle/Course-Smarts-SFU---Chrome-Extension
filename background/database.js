class dbInterface{
    //takes firebase.firestore object
    constructor(firestore){
        this._profRef = firestore.collection("profs");
        this._courseRef = firestore.collection("courses");
    }

    getCourse(courseName, callback){
        this._courseRef.where("course", "==", courseName).get()
            .then(snapshot => {
                if (snapshot.empty){
                    console.log("unable to get course with name: " + courseName + " from database");
                }
                else{
                    snapshot.docs.map(document => {
                        console.log("Retrieved course: " + courseName + " from database with details...");
                        console.log(document.data());
                        callback()
                    })
                }
            })
            .catch(error =>{
                console.log(error.data);
                //TODO maybe add something more intelligent here in the future
            })
    }

    //getProfs(profNames, callback)



}
