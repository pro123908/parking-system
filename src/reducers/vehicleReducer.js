import {
  ADD_VEHICLE,
  CLEAR_VEHICLE,
  CAL_MIN_TIME,
  GET_VEHICLES,
  SET_PARKING_INFO,
  GET_PARKING_INFO,
  SET_LIMIT,
  SET_LOADING
} from "../actions/types";
import { PARKING_LOTS_LIMIT } from "../config";
import LeastVehicleTime from "../components/functions/LeastVehicleTime";

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
  loading: false,
  getParkingInfo: false
};

const calculateMinTime = state => {
  let nextState = { ...state };

  nextState.minTime = LeastVehicleTime(nextState.parkingLots);

  return nextState;
};

const setLimit = state => {
  let nextState = { ...state };

  nextState.limit = true;
  nextState.minTime = LeastVehicleTime(nextState.parkingLots);

  return nextState;
};

const addVehicle = (state, action) => {
  action.payload.timeout = true;

  let nextState = { ...state };

  nextState.parkingLots.push(action.payload);
  nextState.LotsLength++;

  return nextState;
};

const clearVehicle = (state, action) => {
  let nextState = { ...state };
  let currentElement = nextState.parkingLots.findIndex(
    ele => ele.id === action.payload
  );

  if (currentElement !== -1) {
    nextState.parkingLots.splice(currentElement, 1);
    nextState.LotsLength--;
    nextState.minTime = false;
    nextState.limit = false;
  }

  return nextState;
};

const getAllVehicles = (state, action) => {
  let nextState = { ...state };

  nextState.parkingLots = action.payload;

  return nextState;
};

const setParkingInfo = state => {
  let nextState = { ...state };

  return nextState;
};

const getParkingInfo = (state, action) => {
  let nextState = { ...state };

  nextState = { ...nextState, ...action.payload };

  nextState.getParkingInfo = true;

  return nextState;
};

const setLoading = (state, action) => {
  let newState = { ...state };

  if (action.payload) {
    newState.loading = true;
  } else {
    newState.loading = false;
  }

  return newState;
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

    case SET_LIMIT:
      return setLimit(state, action);

    case SET_LOADING:
      return setLoading(state, action);

    default:
      return state;
  }
};
