import { TIMER_FOR_PARKING_LOT } from "../../config";

export default vehicles => {
  // Getting current time
  let currentTime = new Date().getTime();

  // Calculating time for all vehicles to find out the minimum time
  let vehiclesTime = vehicles.map(vehicle => {
    return parseInt(
      TIMER_FOR_PARKING_LOT - (currentTime - vehicle.time) / 1000
    );
  });

  // Returning the minimum time from the list of times
  return Math.min(...vehiclesTime);
};
