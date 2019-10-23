import firebase from "firebase/app";
import "firebase/database";

const config = {
  apiKey: "AIzaSyBc2pKWwE22ItH6_me45-5mRxoQbNOb0Ms",
  authDomain: "parking-system-3acb7.firebaseapp.com",
  databaseURL: "https://parking-system-3acb7.firebaseio.com",
  projectId: "parking-system-3acb7",
  storageBucket: "parking-system-3acb7.appspot.com",
  messagingSenderId: "32537150328",
  appId: "1:32537150328:web:160a640fbc073876637e8d",
  measurementId: "G-6BL3GZSZ0C"
};

firebase.initializeApp(config);

export const databaseRef = () => firebase.database();

export default firebase;
