import React, { useState, useEffect } from "react";
import { v4 } from "uuid";
import { Button, TextField, Typography } from "@material-ui/core";
import { connect } from "react-redux";

import CustomDialog from "../Dialogs";

import setDialogTextString from "../functions/setDialogTextString";

import { TIMER_FOR_PARKING_LOT } from "../../config";
import {
  addVehicle,
  clearVehicle,
  calMinTime,
  setParkingInfo,
  setLimit
} from "../../actions/";

import Styles from "../styles";

const AddVehicle = props => {
  const classes = Styles();

  const [vehicle, setVehicle] = useState({
    driverName: "",
    registrationNumber: ""
  });
  const [error, setError] = useState({});

  const [open, setOpen] = useState(false);

  const [dialogText, setDialogText] = useState({});

  const [minTimer, setMinTimer] = useState(null);

  const [expireTimer, setTimerExpired] = useState(false);

  const minCounter = () => {
    // Setting the timer for the first time
    if (minTimer === null) {
      setMinTimer(props.vehicles.minTime);
    }

    // Returning empty function if timer has been ended
    if (minTimer === 0) {
      setTimerExpired(false);

      if (open) {
        modalClose();
        setDialogText(setDialogTextString("available"));
        modalOpen();
      }
      return () => {};
    }
    const intervalId = setInterval(() => {
      setMinTimer(minTimer - 1);
    }, 1000);

    // console.log(intervalId);

    setDialogText(setDialogTextString("failure", minTimer));

    // clear interval on re-render to avoid memory leaks
    return () => {
      clearInterval(intervalId);
    };
  };

  useEffect(() => {
    if (expireTimer) {
      return minCounter();
    }
  }, [minTimer]);

  const resetInputs = () => {
    setVehicle({ driverName: "", registrationNumber: "" });
  };

  const onSubmit = async e => {
    e.preventDefault();

    // If fields are filled
    if (vehicle.driverName && vehicle.registrationNumber) {
      let { limit } = props.vehicles;

      // If all lots are not booked
      if (!limit) {
        // Giving unique ID to the vehicle
        vehicle.id = v4();

        // Placing timestamp on the vehicle
        vehicle.time = new Date().getTime();

        // Adding vehicle to the parkingLot
        await props.addVehicle(vehicle);

        // Setting parkingInfo after the vehicle was added
        props.setParkingInfo();

        // Attaching parking timeout function to the vehicle
        vehicle.timer = setTimeout(async () => {
          // If vehicle was added successfully
          if (vehicle.timeout) {
            // Clearing the vehicle parking on timeout
            await props.clearVehicle(vehicle);
            // Setting the parkingInfo after the clearing vehicle
            props.setParkingInfo();
          }
        }, TIMER_FOR_PARKING_LOT * 1000);

        // Displaying success modal text on vehicle addition
        setDialogText(setDialogTextString("success"));
      } else {
        // No parking lots available so setting timer
        setTimerExpired(true);
        setMinTimer(props.vehicles.minTime);
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
          className={`${classes.mt20}`}
        >
          Add Vehicle
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
