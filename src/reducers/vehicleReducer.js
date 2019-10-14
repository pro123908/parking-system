import { ADD_VEHICLE, CLEAR_VEHICLE } from "../actions/types";
import { PARKING_LOTS_LIMIT } from "../config";
import LeastVehicleTime from "../components/functions/LeastVehicleTime";
// import uuid from "uuid";

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
  minTime: null
};

const addVehicle = (state, action) => {
  action.payload.timeout = true;

  let prevState = { ...state };

  if (prevState.LotsLength < prevState.LotsMax) {
    prevState.limit = false;
    prevState.parkingLots.push(action.payload);
    prevState.LotsLength++;
  } else {
    prevState.limit = true;
    prevState.minTime = LeastVehicleTime(prevState.parkingLots);
  }

  return prevState;
};

const clearVehicle = (state, action) => {
  console.log("ID => ", action.payload);

  let prevState = { ...state };
  let currentElement = prevState.parkingLots.findIndex(
    ele => ele.id === action.payload
  );
  console.log(currentElement);
  if (currentElement !== -1) {
    console.log(prevState.parkingLots[currentElement]);
    prevState.parkingLots.splice(currentElement, 1);

    prevState.LotsLength--;
    console.log("after change => ", prevState);
  }

  return prevState;
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_VEHICLE:
      return addVehicle(state, action);

    case CLEAR_VEHICLE:
      return clearVehicle(state, action);

    default:
      return state;
  }
};
