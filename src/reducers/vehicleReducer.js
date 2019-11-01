import {
  ADD_VEHICLE,
  CLEAR_VEHICLE,
  CAL_MIN_TIME,
  GET_VEHICLES,
  SET_PARKING_INFO,
  GET_PARKING_INFO,
  SET_LIMIT,
  SET_LOADING,
  SET_VEHICLES_TIMEOUT,
  SET_PARKING_LOTS
} from "../actions/types";
import { PARKING_LOTS_LIMIT } from "../config";
import LeastVehicleTime from "../components/functions/LeastVehicleTime";

const initialState = {
  vehiclesLots: [],
  parkingLots: [
    {
      id: 1,
      lot: "Parking Lot 1",
      assigned: false
    },
    {
      id: 2,
      lot: "Parking Lot 2",
      assigned: false
    },
    {
      id: 3,
      lot: "Parking Lot 3",
      assigned: false
    }
  ],
  LotsMax: PARKING_LOTS_LIMIT,
  LotsLength: 0,
  limit: false,
  minTime: false,
  loading: false,
  getParkingInfo: false,
  getVehicles: false
};

const calculateMinTime = state => {
  let nextState = { ...state };

  nextState.minTime = LeastVehicleTime(nextState.vehiclesLots);

  return nextState;
};

const setLimitTemp = state => {
  let nextState = { ...state };

  nextState.limit = true;
  nextState.minTime = LeastVehicleTime(nextState.vehiclesLots);

  return nextState;
};

const setLimit = state => {
  let nextState = { ...state };

  nextState.limit = true;
  nextState.minTime = LeastVehicleTime(nextState.vehiclesLots);

  return nextState;
};

const addVehicle = (state, action) => {
  action.payload.timeout = true;

  let nextState = { ...state };
  let { parkingLots } = nextState;

  let parkingIndex = parkingLots.findIndex(ele => ele.assigned === false);
  if (parkingIndex !== -1) {
    parkingLots[parkingIndex].name = action.payload.driverName;
    parkingLots[parkingIndex].registrationNumber =
      action.payload.registrationNumber;

    parkingLots[parkingIndex].assigned = true;

    nextState.vehiclesLots.push(action.payload);
  }
  nextState.LotsLength++;

  if (nextState.LotsLength === nextState.LotsMax) {
    nextState = setLimit(nextState);
  }

  return nextState;
};

const clearVehicle = (state, action) => {
  let nextState = { ...state };
  let { parkingLots } = nextState;
  let currentElement = nextState.vehiclesLots.findIndex(
    ele => ele.id === action.payload.id
  );

  if (currentElement !== -1) {
    nextState.vehiclesLots.splice(currentElement, 1);
    let parkingIndex = nextState.parkingLots.findIndex(
      ele => ele.registrationNumber === action.payload.registrationNumber
    );

    if (parkingIndex !== -1) {
      parkingLots[parkingIndex].name = "";
      parkingLots[parkingIndex].registrationNumber = "";

      parkingLots[parkingIndex].assigned = false;
    }

    nextState.LotsLength--;
    nextState.minTime = false;
    nextState.limit = false;
  }

  return nextState;
};

const getAllVehicles = (state, action) => {
  let nextState = { ...state };

  nextState.vehiclesLots = action.payload;
  nextState.getVehicles = true;
  nextState.minTime = LeastVehicleTime(nextState.vehiclesLots);

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

const setVehiclesTimeout = (state, action) => {
  let newState = { ...state };

  newState.vehiclesLots = action.payload;

  return newState;
};

const setParkingLots = (state, action) => {
  let newState = { ...state };
  console.log("parkingltos =   ", action.payload);
  newState.parkingLots = action.payload;
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
      return setLimitTemp(state, action);

    case SET_LOADING:
      return setLoading(state, action);

    case SET_VEHICLES_TIMEOUT:
      return setVehiclesTimeout(state, action);

    case SET_PARKING_LOTS:
      return setParkingLots(state, action);

    default:
      return state;
  }
};
