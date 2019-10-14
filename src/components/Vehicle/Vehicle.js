import React, { useState, useEffect } from "react";
import {
  ListItem,
  ListItemText,
  ListItemIcon,
  ListItemSecondaryAction
} from "@material-ui/core";
import { DriveEta } from "@material-ui/icons";
import { TIMER_FOR_PARKING_LOT } from "../../config";
import TimeFormat from "../functions/TimeFormat";

const Vehicle = ({ vehicle }) => {
  const vehicleTime =
    TIMER_FOR_PARKING_LOT -
    Math.round((new Date().getTime() - vehicle.time) / 1000);

  console.log("vehicle time => ", vehicleTime);

  const [timeLeft, setTimeLeft] = useState(vehicleTime);

  useEffect(() => {
    if (!timeLeft) return () => {};

    const intervalId = setInterval(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);

    // console.log(intervalId);

    // clear interval on re-render to avoid memory leaks
    return () => {
      // console.log("Clearing id ", intervalId);
      clearInterval(intervalId);
    };
    // add timeLeft as a dependency to re-rerun the effect
    // when we update it
  }, [timeLeft]);

  // console.log("Rendering....");

  return (
    <ListItem divider={true}>
      <ListItemIcon>
        <DriveEta />
      </ListItemIcon>
      <ListItemText>
        {vehicle.driverName} ({vehicle.registrationNumber})
      </ListItemText>
      <ListItemSecondaryAction>
        {TimeFormat(timeLeft * 1000)}
      </ListItemSecondaryAction>
    </ListItem>
  );
};

export default Vehicle;
