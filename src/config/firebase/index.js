import firebase from 'firebase/app';
import 'firebase/auth';
// import 'firebase/firestore';

// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyBpu8DU6RThhhjdnRwJElifAZJcNemYQjU",
    authDomain: "simple-node-firebase.firebaseapp.com",
    databaseURL: "https://simple-node-firebase.firebaseio.com",
    projectId: "simple-node-firebase",
    storageBucket: "simple-node-firebase.appspot.com",
    messagingSenderId: "1039456453141",
    appId: "1:1039456453141:web:9ce0bfcd985ef64879841c",
    measurementId: "G-9V8Q0MD9XE"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;