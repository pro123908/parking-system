import { TIMER_FOR_PARKING_LOT } from "../../config";

export default (vehicles, clearVehicle, setParkingInfo) => {
  let returnData = vehicles.map(vehicle => {
    let timer = Math.round(
      (TIMER_FOR_PARKING_LOT - (new Date().getTime() - vehicle.time) / 1000) *
        1000
    );

    settingTimerForVehicles(timer, vehicle, clearVehicle, setParkingInfo);

    return vehicle;
  });

  return returnData;
};

const settingTimerForVehicles = async (
  timer,
  vehicle,
  clearVehicle,
  setParkingInfo
) => {
  if (timer > 0) {
    vehicle.timer = setTimeout(async () => {
      await clearVehicle(vehicle);

      setParkingInfo();
    }, timer);
  } else {
    await clearVehicle(vehicle);

    setParkingInfo();
  }
};
