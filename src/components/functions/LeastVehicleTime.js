import { TIMER_FOR_PARKING_LOT } from "../../config";

export default vehicles => {
  // Getting current time
  let currentTime = new Date().getTime();

  let vehiclesTime = vehicles.map(vehicle => {
    return parseInt(
      TIMER_FOR_PARKING_LOT - (currentTime - vehicle.time) / 1000
    );
  });

  return Math.min(...vehiclesTime);
};
