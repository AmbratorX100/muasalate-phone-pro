import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyDaIUi8ADmxy8O8hhjU4iS64X93rlVUTlw",
    authDomain: "phone-dev-5cd4a.firebaseapp.com",
    projectId: "phone-dev-5cd4a",
    storageBucket: "phone-dev-5cd4a.appspot.com",
    messagingSenderId: "810053648936",
    appId: "1:810053648936:web:eac4e4831c55ebe616eb1d"
};

firebase.initializeApp(firebaseConfig);


export default firebase;
