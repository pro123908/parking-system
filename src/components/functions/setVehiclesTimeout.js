import { TIMER_FOR_PARKING_LOT } from "../../config";

export default (vehicles, clearVehicle, setParkingInfo) =>
  // calculating the remaining time for the all vehicles
  vehicles.map(vehicle => {
    // Calculating the timer
    let timer = Math.round(
      (TIMER_FOR_PARKING_LOT - (new Date().getTime() - vehicle.time) / 1000) *
        1000
    );

    // Setting the timeout function
    settingTimerForVehicles(timer, vehicle, clearVehicle, setParkingInfo);

    return vehicle;
  });

const settingTimerForVehicles = async (
  timer,
  vehicle,
  clearVehicle,
  setParkingInfo
) => {
  // if vehicle timer is not already expired
  if (timer > 0) {
    // Setting the timeout on the vehicle
    vehicle.timer = setTimeout(async () => {
      await clearVehicle(vehicle);

      setParkingInfo();
    }, timer);
  } else {
    // if expired then just clear that parkingLot
    await clearVehicle(vehicle);

    // Updating the parkingInfo
    setParkingInfo();
  }
};
