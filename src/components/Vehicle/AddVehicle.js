import React, { useState, useEffect } from "react";
import { v4 } from "uuid";
import { Button, TextField, Typography } from "@material-ui/core";
import { connect } from "react-redux";

import CustomDialog from "../Dialogs";
import { TIMER_FOR_PARKING_LOT } from "../../config";
import {
  addVehicle,
  clearVehicle,
  calMinTime,
  setParkingInfo,
  setLimit
} from "../../actions";
import TimeFormat from "../functions/TimeFormat";

const AddVehicle = props => {
  const [vehicle, setVehicle] = useState({
    driverName: "",
    registrationNumber: ""
  });
  const [error, setError] = useState({});

  const [open, setOpen] = useState(false);

  const [dialogText, setDialogText] = useState({});

  const [minTimer, setMinTimer] = useState(null);

  const [dialogTimer, setDialogTimer] = useState(5);

  const minCounter = () => {
    if (props.vehicles.limit && open) {
      // Setting the timer for the first time
      if (minTimer === null) setMinTimer(props.vehicles.minTime);

      // Returning empty function if timer has been ended
      if (minTimer === 0) {
        console.log("Timer => 0");
        if (open) {
          modalClose();
          dialogTextString("available");
          modalOpen();
        }
        return () => {};
      }
      const intervalId = setInterval(() => {
        setMinTimer(minTimer - 1);
      }, 1000);

      // console.log(intervalId);

      dialogTextString("failure");

      // clear interval on re-render to avoid memory leaks
      return () => {
        // console.log("Clearing id ", intervalId);
        clearInterval(intervalId);
      };
    }
  };

  const dialogCounter = () => {
    // Returning empty function if timer has been ended
    if (dialogTimer === 0) {
      modalClose();
      // console.log("closing");
      return () => {};
    }
    const intervalId = setInterval(() => {
      setDialogTimer(dialogTimer - 1);
    }, 1000);

    // clear interval on re-render to avoid memory leaks
    return () => {
      // console.log("Clearing id ", intervalId);
      clearInterval(intervalId);
    };
  };

  useEffect(() => {
    if (props.vehicles.limit) {
      return minCounter();
    }

    return () => {};
  }, [props, minTimer]);

  useEffect(() => {
    if (open) {
      // console.log("caled");
      return dialogCounter();
    }
  }, [open, dialogTimer]);

  const resetInputs = () => {
    setVehicle({ driverName: "", registrationNumber: "" });
  };

  const onSubmit = e => {
    e.preventDefault();

    if (vehicle.driverName && vehicle.registrationNumber) {
      let { LotsLength, LotsMax, minTime, limit } = props.vehicles;

      if (LotsLength < LotsMax) {
        // Giving unique ID to the vehicle
        vehicle.id = v4();

        // Attaching timeout function to the vehicle
        vehicle.timer = setTimeout(() => {
          // console.log(`Timer for driver ${vehicle.driverName} expired`);

          if (vehicle.timeout) props.clearVehicle(vehicle.id);
        }, TIMER_FOR_PARKING_LOT * 1000);

        vehicle.time = new Date().getTime();

        // Adding vehicle to the parkingLot

        props.addVehicle(vehicle, props.vehicles);

        props.setParkingInfo({ LotsLength: LotsLength + 1, limit, minTime });

        // Displaying success modal text
        dialogTextString("success");
      } else {
        console.log("limit");
        props.setLimit();
      }

      // Resetting all the inputs
      resetInputs();
      // Opening the modal
      modalOpen();
    } else {
      checkErrors();
    }
  };

  const checkErrors = () => {
    const errors = {};
    if (!vehicle.driverName) {
      errors.driverName = "Driver Name is required!";
    }
    if (!vehicle.registrationNumber) {
      errors.registrationNumber = "Registration Number is required!";
    }

    setError(errors);
  };

  const modalOpen = () => setOpen(true);

  const modalClose = () => setOpen(false);

  const onChange = e => {
    setVehicle({ ...vehicle, [e.target.name]: e.target.value });
    setError({ ...error, [e.target.name]: null });
  };

  const dialogTextString = type => {
    if (type === "success") {
      setDialogText({
        title: "Parking Information",
        description: "You have been alloted a parking space!"
      });
    } else if (type === "failure") {
      setDialogText({
        title: "Parking Information",
        description: `No parking space available at this moment! Next parking lot will be available in ${TimeFormat(
          minTimer * 1000
        )}`
      });
    } else if (type === "available") {
      setDialogText({
        title: "Parking Information",
        description: `Parking Space is now available`
      });
    }
  };

  const displayDialog = () => {
    return (
      <CustomDialog
        title={dialogText.title}
        description={dialogText.description}
        open={open}
        modalClose={modalClose}
      />
    );
  };

  return (
    <div>
      <Typography variant="h5" color="primary">
        Add a vehicle
      </Typography>

      <form onSubmit={onSubmit}>
        <TextField
          type="text"
          name="driverName"
          label="Driver Name"
          onChange={onChange}
          value={vehicle.driverName}
          helperText="Driver Name is compulsory"
          fullWidth={true}
          margin="dense"
          variant="filled"
          error={error.driverName ? true : false}
        />
        <TextField
          name="registrationNumber"
          label="Registration Number"
          type="text"
          onChange={onChange}
          value={vehicle.registrationNumber}
          helperText="Registration Number is compulsory"
          fullWidth={true}
          margin="dense"
          variant="filled"
          error={error.registrationNumber ? true : false}
        />

        <Button
          type="submit"
          color="primary"
          fullWidth={true}
          variant="outlined"
          style={{ marginTop: 20 }}
        >
          Submit
        </Button>
      </form>

      {displayDialog()}
    </div>
  );
};

const mapStateToProps = state => {
  return {
    vehicles: state.vehicles
  };
};

export default connect(
  mapStateToProps,
  { addVehicle, clearVehicle, calMinTime, setParkingInfo, setLimit }
)(AddVehicle);
