import {
  ADD_VEHICLE,
  CLEAR_VEHICLE,
  CAL_MIN_TIME,
  GET_VEHICLES,
  SET_PARKING_INFO,
  GET_PARKING_INFO,
  SET_LIMIT,
  SET_LOADING
} from "./types";
import firebase from "../components/Firebase";
import setVehiclesTimeout from "../components/functions/setVehiclesTimeout";

let realTimeDB = firebase.database();

export const addVehicle = vehicle => async dispatch => {
  // Adding the vehicle to the real-time database
  let newVehicleRef = realTimeDB.ref(`vehicles/${vehicle.id}`);

  try {
    // Setting the data
    await newVehicleRef.set(vehicle);

    dispatch({
      type: ADD_VEHICLE,
      payload: vehicle
    });
  } catch (error) {
    console.log("Adding Vehicle Failed => ", error);
  }
};

export const clearVehicle = id => async dispatch => {
  // Getting the specified vehicle on database
  let newVehicleRef = realTimeDB.ref(`vehicles/${id}`);

  try {
    // Removing that vehicle from the database
    await newVehicleRef.remove();
    dispatch({ type: CLEAR_VEHICLE, payload: id });
  } catch (error) {
    console.log("Removing Vehicle Failed => ", error);
  }
};

export const getAllVehicles = (
  clearVehicle,
  setParkingInfo,
  parkingInfo
) => async dispatch => {
  // Getting vehicles collection reference
  let vehiclesRef = realTimeDB.ref("vehicles");

  // Setting loading to true
  dispatch(setLoading(true));

  // Getting back the values from the firebase

  try {
    let snapshot = await vehiclesRef.once("value");

    // Setting loading to false
    dispatch(setLoading(false));

    // if some data is there
    if (snapshot.val()) {
      // Converting Object of objects into array of objects
      let vehiclesData = Object.values(snapshot.val());

      // Setting timeouts on vehicles data received from firebase
      vehiclesData = setVehiclesTimeout(
        vehiclesData,
        clearVehicle,
        setParkingInfo,
        parkingInfo
      );

      // Setting the values in reducer
      dispatch({
        type: GET_VEHICLES,
        payload: vehiclesData
      });
    }
  } catch (err) {
    dispatch(setLoading(false));
    console.log("Getting Vehicles failed => ", err);
  }
};

export const setParkingInfo = ({
  LotsLength,
  minTime,
  limit
}) => async dispatch => {
  let dbRef = realTimeDB.ref("/parking_info");

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

export const setLimit = () => dispatch => dispatch({ type: SET_LIMIT });

export const calMinTime = () => dispatch => dispatch({ type: CAL_MIN_TIME });

const setLoading = flag => ({ type: SET_LOADING, payload: flag });
