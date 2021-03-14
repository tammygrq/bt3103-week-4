import firebase from "firebase"


// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDLap9b5tFfc6FyzFEkvEFptqIv8Aj6RK0",
    authDomain: "bt3103-week-6-e0086.firebaseapp.com",
    projectId: "bt3103-week-6-e0086",
    storageBucket: "bt3103-week-6-e0086.appspot.com",
    messagingSenderId: "162777593771",
    appId: "1:162777593771:web:2e6f9be5ba643cfec604ee",
    measurementId: "G-933VN5RDC9"
};

firebase.initializeApp(firebaseConfig);
var database = firebase.firestore();
export default database;
