const config = {
    apiKey: "AIzaSyDgrFkovtvf9JU8q_nnQ3c3YsLQ-ZFriC4",
    authDomain: "course-smarts-sfu.firebaseapp.com",
    databaseURL: "https://course-smarts-sfu.firebaseio.com",
    projectId: "course-smarts-sfu",
    storageBucket: "course-smarts-sfu.appspot.com",
    messagingSenderId: "537574020228"
};

firebase.initializeApp(config);

//sign in user anonymously so they can make requests to firestore db
firebase.auth().signInAnonymously()
    .catch(error => {
        console.log("Unable to sign in anonymously to Firebase error id: " + error.id);
        //TODO make it so it will retry if there is an error
    });

const db = new dbInterface(firebase.firestore());

function messageContentScript(data) {
    //console.log(this);
    chrome.tabs.sendMessage(this, data);
}

chrome.runtime.onMessage.addListener((request, sender) => {
    if (request.type === "course"){
        db.getCourse(request.content, messageContentScript.bind(sender.id));
    }
    else if (request.type === "profs"){
        db.getProfs(request.content, () => {
            console.log('sending a message to receive prof info worked!')
        })
    }
});




/*
let dbTest= new dbInterface(firebase.firestore());
dbTest.getCourse("CMPT 120", () =>{
    console.log('getCourse callback ran');
});

dbTest.getProfs(["Lisa Craig", "Shit Head", "Paul Saunders"], () =>{
    console.log("getProfs callback ran");
});
 */