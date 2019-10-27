import TimeFormat from "./TimeFormat";

export default (type, minTimer) => {
  if (type === "success") {
    return {
      title: "Parking Information",
      description: "You have been alloted a parking space!"
    };
  } else if (type === "failure") {
    return {
      title: "Parking Information",
      description: `No parking space available at this moment! Next parking lot will be available in ${TimeFormat(
        minTimer * 1000
      )}`
    };
  } else if (type === "available") {
    return {
      title: "Parking Information",
      description: `Parking Space is now available`
    };
  }
};
