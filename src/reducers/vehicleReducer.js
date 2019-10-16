import {
  ADD_VEHICLE,
  CLEAR_VEHICLE,
  CAL_MIN_TIME,
  GET_VEHICLES,
  SET_PARKING_INFO,
  GET_PARKING_INFO
} from "../actions/types";
import { PARKING_LOTS_LIMIT, TIMER_FOR_PARKING_LOT } from "../config";
import LeastVehicleTime from "../components/functions/LeastVehicleTime";
import uuid from "uuid";

const initialState = {
  parkingLots: [
    // {
    //   driverName: "Bilal Ahmad",
    //   registrationNumber: "32323f",
    //   id: uuid.v4(),
    //   timeout: true,
    //   timer: setTimeout(() => {}, TIMER_FOR_PARKING_LOT * 1000),
    //   time: new Date().getTime()
    // },
    // {
    //   driverName: "Ahmad",
    //   registrationNumber: "32323f",
    //   id: uuid.v4(),
    //   timeout: true,
    //   timer: setTimeout(() => {}, TIMER_FOR_PARKING_LOT * 1000),
    //   time: new Date().getTime() + 123232
    // },
    // {
    //   driverName: "Bilal",
    //   registrationNumber: "32323f",
    //   id: uuid.v4(),
    //   timeout: true,
    //   timer: setTimeout(() => {}, TIMER_FOR_PARKING_LOT * 1000),
    //   time: new Date().getTime() + 10000
    // }
  ],
  LotsMax: PARKING_LOTS_LIMIT,
  LotsLength: 0,
  limit: false,
  minTime: false,
  recordAdded: false
};

const calculateMinTime = (state, action) => {
  let prevState = { ...state };

  prevState.minTime = LeastVehicleTime(prevState.parkingLots);

  return prevState;
};

const addVehicle = (state, action) => {
  action.payload.timeout = true;

  let prevState = { ...state };

  if (prevState.LotsLength < prevState.LotsMax) {
    prevState.parkingLots.push(action.payload);
    prevState.LotsLength++;
    prevState.recordAdded = !prevState.recordAdded;
  } else {
    prevState.limit = true;
    prevState.minTime = LeastVehicleTime(prevState.parkingLots);
  }

  return prevState;
};

const clearVehicle = (state, action) => {
  // console.log("ID => ", action.payload);

  let prevState = { ...state };
  let currentElement = prevState.parkingLots.findIndex(
    ele => ele.id === action.payload
  );
  // console.log(currentElement);
  if (currentElement !== -1) {
    // console.log(prevState.parkingLots[currentElement]);
    prevState.parkingLots.splice(currentElement, 1);

    prevState.LotsLength--;
    prevState.minTime = false;
    prevState.limit = false;
    prevState.recordAdded = !prevState.recordAdded;
    // console.log("after change => ", prevState);
  }

  return prevState;
};

const getAllVehicles = (state, action) => {
  let prevState = { ...state };

  prevState.parkingLots = action.payload;

  return prevState;
};

const setParkingInfo = (state, action) => {
  let prevState = { ...state };

  prevState.recordAdded = !prevState.recordAdded;
  return prevState;
};

const getParkingInfo = (state, action) => {
  let prevState = { ...state };

  prevState = { ...prevState, ...action.payload };

  // console.log("xxxxxxxxxxxxxxxxxxx : -? ", prevState);

  return prevState;
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_VEHICLE:
      return addVehicle(state, action);

    case CLEAR_VEHICLE:
      return clearVehicle(state, action);

    case CAL_MIN_TIME:
      return calculateMinTime(state, action);

    case GET_VEHICLES:
      return getAllVehicles(state, action);

    case SET_PARKING_INFO:
      return setParkingInfo(state, action);

    case GET_PARKING_INFO:
      return getParkingInfo(state, action);

    default:
      return state;
  }
};
