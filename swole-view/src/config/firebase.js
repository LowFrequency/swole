import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/messaging";

export const firebaseApp = firebase.initializeApp({
  apiKey: process.env.VUE_APP_FIREBASE_API_KEY,
  authDomain: process.env.VUE_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.VUE_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.VUE_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.VUE_APP_FIREBASE_MESSAGING_ID,
  appId: process.env.VUE_APP_FIREBASE_APP_ID,
  measurementId: process.env.VUE_APP_FIREBASE_MEASUREMENT_ID
});

export const firebaseDb = firebaseApp.firestore();
export const firebaseAuth = firebaseApp.auth();
export const firebaseGoogleAuthProvider = new firebase.auth.GoogleAuthProvider();
export const firebaseFieldValue = firebase.firestore.FieldValue;
export const firebaseMessaging = firebase.messaging();