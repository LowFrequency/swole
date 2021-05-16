import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/messaging";

export const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyBjzR1thQwrBylyKQMlEuEb8POjasJ8-SY",
  authDomain: "swole-d86b6.firebaseapp.com",
  projectId: "swole-d86b6",
  storageBucket: "swole-d86b6.appspot.com",
  messagingSenderId: "257811618614",
  appId: "1:257811618614:web:1cc8ffbcf599d5bc157197",
  measurementId: "G-DESEQ1CW8C"
});

export const firebaseDb = firebaseApp.firestore();
export const firebaseAuth = firebaseApp.auth();
export const firebaseGoogleAuthProvider = new firebase.auth.GoogleAuthProvider();
export const firebaseFieldValue = firebase.firestore.FieldValue;
export const firebaseMessaging = firebase.messaging();