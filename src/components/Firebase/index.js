import firebase from "firebase";
// import "firebase/auth";
// import "firebase/firestore";

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

// class Firebase extends Component {
//   constructor(props) {
//     super(props);
//     app.initializeApp(config);
//     this.auth = app.auth();
//     this.firestore = app.firestore();
//   }
//   doCreateUserWithEmailAndPassword = (email, password) =>
//     this.auth.createUserWithEmailAndPassword(email, password);

//   doSignInWithEmailAndPassword = (email, password) =>
//     this.auth.signInWithEmailAndPassword(email, password);

//   doSignOut = () => this.auth.signOut();

//   doPasswordReset = email => this.auth.sendPasswordResetEmail(email);
//   doPasswordUpdate = password => this.auth.currentUser.updatePassword(password);
// }

// export default firebase;
