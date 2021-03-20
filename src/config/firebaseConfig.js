import firebase from "@react-native-firebase/app";
import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
const firebaseConfig = {
    apiKey: "AIzaSyA34gbWN0CCX3TGzouKi_tOIX1ucZovalo",
    authDomain: "projectfl-20a2a.firebaseapp.com",
    databaseURL: "https://projectfl-20a2a-default-rtdb.firebaseio.com",
    projectId: "projectfl-20a2a",
    storageBucket: "projectfl-20a2a.appspot.com",
    messagingSenderId: "830888345262",
    appId: "1:830888345262:web:918db540809a23ed88b73f"
};
// Initialize Firebase
/*
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}*/
//firebase.initializeApp(firebaseConfig);
//!firebase.apps.length ? firebase.initializeApp(config) : firebase.app();

if (!firebase.apps.length) {
    firebase.initializeApp(config)
    firebase.firestore();
} else {
    firebase.app()
}
//export default !firebase.apps.length ? firebase.initializeApp(config) : firebase.app();
export default firebase;