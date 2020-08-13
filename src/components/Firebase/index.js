import firebase from "firebase/app";
import "firebase/database";

// Firebase configuration
const config = {
  apiKey: "AIzaSyCg_S1-zVPmMPfqG2XsG9ansbdTMli4Wjo",
  authDomain: "parking-system-dev.firebaseapp.com",
  databaseURL: "https://parking-system-dev.firebaseio.com",
  projectId: "parking-system-dev",
  storageBucket: "parking-system-dev.appspot.com",
  messagingSenderId: "758744616102",
  appId: "1:758744616102:web:c8cf22f0fed4786808f867",
  measurementId: "G-B2MRXGF73H"
};

// Initializing the firebase Application
firebase.initializeApp(config);

export default firebase;
