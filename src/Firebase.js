import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/database";
import "firebase/compat/storage";

const firebaseConfig = {
  apiKey: "AIzaSyC9_ijK87nYeSN8pcrJ85hp1JBeYXfri6s",
  authDomain: "ground-app-new.firebaseapp.com",
  projectId: "ground-app-new",
  storageBucket: "ground-app-new.appspot.com",
  messagingSenderId: "1009009000034",
  appId: "1:1009009000034:web:dbbdbea822e0155c9f9b3b",
};
// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app();
}

const auth = firebase.auth();
const firestore = firebase.firestore();
const storageRef = firebase.storage().ref();

export { firebase, auth, firestore, storageRef };
