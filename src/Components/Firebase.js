import firebase from 'firebase';


    if (!firebase.apps.length) {
        firebase.initializeApp({
            apiKey: "AIzaSyBBD7p6EtMcO-CSGTh3MiEuwUxsCjwUKEs",
            authDomain: "note-e4c27.firebaseapp.com",
            databaseURL: "https://note-e4c27.firebaseio.com",
            projectId: "note-e4c27",
            storageBucket: "note-e4c27.appspot.com",
            messagingSenderId: "865664949773",
            appId: "1:865664949773:web:f502c7675d4d5622433f44"
        })
    }
    let db = firebase.firestore();
    let auth = firebase.auth();


    const firestore = {
        database: db,
        authentication: auth
    }
    

    export default firestore;