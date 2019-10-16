import {
  ADD_VEHICLE,
  CLEAR_VEHICLE,
  CAL_MIN_TIME,
  GET_VEHICLES,
  SET_PARKING_INFO,
  GET_PARKING_INFO
} from "./types";
import firebase from "../components/Firebase";
import setVehiclesTimeout from "../components/functions/setVehiclesTimeout";

let realTimeDB = firebase.database();

export const addVehicle = vehicle => dispatch => {
  // console.log("vehicle => ", vehicle);

  let newVehicleRef = realTimeDB.ref(`vehicles/${vehicle.id}`);

  newVehicleRef.set(vehicle).then(() => {
    // console.log("success");
    dispatch({ type: ADD_VEHICLE, payload: vehicle });
  });
};

export const getAllVehicles = clearVehicle => dispatch => {
  let vehiclesRef = realTimeDB.ref("vehicles");

  vehiclesRef
    .once("value")
    .then(snapshot => {
      if (snapshot) {
        let data = Object.values(snapshot.val());
        // console.log(typeof data);
        // console.log("CLEAR VEHICLE => ", clearVehicle);
        data = setVehiclesTimeout(data, clearVehicle);
        dispatch({ type: GET_VEHICLES, payload: data });
      }
    })
    .catch(err => console.log(err));
};

export const clearVehicle = id => dispatch => {
  // console.log("Clearing....");

  let newVehicleRef = realTimeDB.ref(`vehicles/${id}`);

  newVehicleRef.remove().then(res => {
    // console.log("success delete => ", res);
    dispatch({ type: CLEAR_VEHICLE, payload: id });
  });
};

export const calMinTime = () => dispatch => {
  dispatch({ type: CAL_MIN_TIME });
};

export const setParkingInfo = ({ LotsLength, minTime, limit }) => dispatch => {
  let dbRef = realTimeDB.ref("/parking_info");

  dbRef
    .set({
      LotsLength,
      minTime,
      limit
    })
    .then(() => {
      dispatch({ type: SET_PARKING_INFO });
    });

  // console.log("in parking igo => ", LotsLength);
};

export const getParkingInfo = () => dispatch => {
  let dbRef2 = realTimeDB.ref("/parking_info");
  dbRef2.once("value").then(snapshot => {
    dispatch({ type: GET_PARKING_INFO, payload: snapshot.val() });
  });
};
