import { ADD_VEHICLE, CLEAR_VEHICLE } from "./types";

export const addVehicle = vehicle => dispatch => {
  // console.log("vehicle => ", vehicle);

  dispatch({ type: ADD_VEHICLE, payload: vehicle });
};

export const clearVehicle = id => dispatch => {
  // console.log("Clearing....");

  dispatch({ type: CLEAR_VEHICLE, payload: id });
};
