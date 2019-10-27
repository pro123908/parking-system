import {
  ADD_VEHICLE,
  CLEAR_VEHICLE,
  GET_VEHICLES,
  SET_VEHICLES_TIMEOUT,
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

export const clearVehicle = vehicle => async dispatch => {
  // Getting the specified vehicle on database
  let newVehicleRef = realTimeDB.ref(`vehicles/${vehicle.id}`);

  try {
    // Removing that vehicle from the database
    await newVehicleRef.remove();
    dispatch({ type: CLEAR_VEHICLE, payload: vehicle });
  } catch (error) {
    console.log("Removing Vehicle Failed => ", error);
  }
};

export const getAllVehicles = () => async dispatch => {
  // Getting vehicles collection reference
  let vehiclesRef = realTimeDB.ref("vehicles");

  // Getting back the values from the firebase

  try {
    let snapshot = await vehiclesRef.once("value");

    // // Setting loading to false
    dispatch(setLoading(false));

    // if some data is there
    if (snapshot.val()) {
      // Converting Object of objects into array of objects
      let vehiclesData = Object.values(snapshot.val());

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

export const setVehicleTimeout = (
  data,
  clearAction,
  setParkingInfo,
  parkingInfo
) => async dispatch => {
  let vehiclesData = setVehiclesTimeout(
    data,
    clearAction,
    setParkingInfo,
    parkingInfo
  );

  dispatch({ type: SET_VEHICLES_TIMEOUT, payload: vehiclesData });
};

const setLoading = flag => ({ type: SET_LOADING, payload: flag });
