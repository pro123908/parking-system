import { TIMER_FOR_PARKING_LOT } from "../../config";
import { clearVehicle } from "../../actions";

export default (vehicles, clearVehicle) => {
  return vehicles.map(vehicle => {
    // console.log(vehicle);
    let timer = Math.round(
      (TIMER_FOR_PARKING_LOT - (new Date().getTime() - vehicle.time) / 1000) *
        1000
    );

    // console.log("TIMER => ", timer)

    if (timer > 0) {
      // console.log("this is in => ", vehicle);
      vehicle.timer = setTimeout(() => {
        // console.log(`Timer for driver ${vehicle.driverName} expired`);
        clearVehicle(vehicle.id);
      }, timer);
    }

    return vehicle;
  });
};
