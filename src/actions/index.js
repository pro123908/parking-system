import {
  ADD_VEHICLE,
  CLEAR_VEHICLE,
  CAL_MIN_TIME,
  GET_VEHICLES,
  SET_PARKING_INFO,
  GET_PARKING_INFO,
  SET_LIMIT,
  SET_LOADING,
  SET_AUTH,
  SET_VEHICLES_TIMEOUT,
  ADD_PARKING,
  SET_PARKING_LOTS
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

  dispatch(setLoading());

  try {
    // Removing that vehicle from the database
    await newVehicleRef.remove();
    dispatch({ type: CLEAR_VEHICLE, payload: vehicle });
  } catch (error) {
    console.log("Removing Vehicle Failed => ", error);
  }
};

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

export const getAllVehicles = () => async dispatch => {
  // Getting vehicles collection reference
  let vehiclesRef = realTimeDB.ref("vehicles");

  // Setting loading to true
  dispatch(setLoading(true));

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

export const setLimit = () => dispatch => dispatch({ type: SET_LIMIT });

export const calMinTime = () => dispatch => dispatch({ type: CAL_MIN_TIME });

const setLoading = flag => ({ type: SET_LOADING, payload: flag });

export const setAuth = flag => async dispatch => {
  let dbRef = realTimeDB.ref("/authentication");

  try {
    await dbRef.set({
      isAuthenticated: flag
    });
  } catch (error) {
    console.log("Setting Auth Failed => ", error);
  }

  dispatch({ type: SET_AUTH, payload: flag });
};

export const getAuth = () => async dispatch => {
  let dbRef = realTimeDB.ref("/authentication");

  dispatch(setLoading(true));

  try {
    let snapshot = await dbRef.once("value");

    if (snapshot.val()) {
      dispatch({ type: SET_AUTH, payload: snapshot.val().isAuthenticated });
    }
  } catch (error) {
    console.log("Getting Auth Failed => ", error);
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
