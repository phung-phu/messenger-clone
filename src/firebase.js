import firebase from "firebase"

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyDCbLD1LX49IdIQ_leQmPw0rfCQPRgRn7Q",
    authDomain: "messenger-clone-5e588.firebaseapp.com",
    projectId: "messenger-clone-5e588",
    storageBucket: "messenger-clone-5e588.appspot.com",
    messagingSenderId: "103452406728",
    appId: "1:103452406728:web:e7b5f91b29631bdea106fd",
    measurementId: "G-NFY75KTPDB"
});

const db = firebaseApp.firestore(); // initialize firebase db

export default db;