import React from "react";
// import firebase from "firebase";
import firebase from "../Firebase";
import uuid from "uuid";

const Login = props => {
  // let realTimeDB = firebase.database();

  // let vehiclesRef = realTimeDB.ref("vehicles");

  // // vehiclesRef
  // //   .once("value")
  // //   .then(res => {
  // //     console.log(res.val());
  // //     // let records = res.val();
  // //     // console.log("222 => ", records);
  // //     // let data = [...records];
  // //     // console.log("some ", data);

  // //     let data = Object.values(res.val());
  // //     data.forEach(item => console.log(item));
  // //   })
  // //   .catch(err => console.log(err));

  // let vehicleRef = realTimeDB.ref("vehicles/" + "100");

  // vehicleRef
  //   .set({
  //     driver_name: "Bilal Ahmad",
  //     email: "pro123@gmail.com"
  //   })
  //   .then(some => console.log("success"))
  //   .catch(err => console.log(err));

  //firebase.doCreateUserWithEmailAndPassword("some@gmail.com", "home123");

  // console.log(db);

  let db = firebase.firestore();

  // let dataGet = db
  //   .collection("vehicles")
  //   .get()
  //   .then(res => {
  //     res.forEach(doc => {
  //       console.log(doc.id + " " + doc.data().driver_name);
  //     });
  //   });

  // let check = db.collection("vehicles").doc();

  // check
  //   .set({
  //     driver_name: "Bilal Ahmad"
  //   })
  //   .then(res => console.log(res));

  // console.log(check);

  // let dataAdd = db
  //   .collection("vehicles")
  //   .add({
  //     driver_name: "abhi"
  //   })
  //   .then(res => console.log(res));

  // console.log(dataAdd);
  // console.log("Rednin");

  return (
    <div>
      <h1>Login</h1>
    </div>
  );
};

export default Login;
