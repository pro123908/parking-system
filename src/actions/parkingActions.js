import { SET_PARKING_INFO, GET_PARKING_INFO, SET_PARKING_LOTS } from "./types";
import firebase from "../components/Firebase";

let realTimeDB = firebase.database();

export const updateParking = parkingData => async dispatch => {
  let parkingRef = realTimeDB.ref("parkingLots/");

  try {
    await parkingRef.set(parkingData);
    console.log("lots updated");
  } catch (error) {
    console.log("Parking lots are not updated => ", error);
  }
};

export const getParkingLots = () => async dispatch => {
  let parkingRef = realTimeDB.ref("parkingLots/");

  try {
    let snapshot = await parkingRef.once("value");
    console.log("lots fetched");
    dispatch({ type: SET_PARKING_LOTS, payload: snapshot.val() });
  } catch (error) {
    console.log("Parking lots are not set => ", error);
  }
};

export const setParkingInfo = () => async (dispatch, getState) => {
  let dbRef = realTimeDB.ref("/parking_info");

  let { LotsLength, limit, minTime } = getState().vehicles;

  // Setting parking info into database
  try {
    await dbRef.set({
      LotsLength,
      minTime,
      limit
    });

    dispatch({ type: SET_PARKING_INFO });
  } catch (error) {
    console.log("Setting Parking Info Failed => ", error);
  }
};

export const getParkingInfo = () => async dispatch => {
  // Getting parking info from the firebase on first boot up of the application
  let dbRef2 = realTimeDB.ref("/parking_info");

  try {
    let snapshot = await dbRef2.once("value");

    if (snapshot.val())
      dispatch({ type: GET_PARKING_INFO, payload: snapshot.val() });
  } catch (error) {
    console.log("Getting Parking Info Failed => ", error);
  }
};
