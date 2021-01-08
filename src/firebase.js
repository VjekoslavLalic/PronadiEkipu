import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
// web app's Firebase konfiguracija
var firebaseConfig = {
    apiKey: "AIzaSyBRr6ut3NtRy94vilpDxjyQi2EWBqbABdk",
    authDomain: "pronadiekipu.firebaseapp.com",
    projectId: "pronadiekipu",
    storageBucket: "pronadiekipu.appspot.com",
    messagingSenderId: "181854197434",
    appId: "1:181854197434:web:ec9902b52d72b484235483"
};

// inicijalizacija Firebase-a
firebase.initializeApp(firebaseConfig);
let db = firebase.firestore();
export { firebase, db };