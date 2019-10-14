import React, { useState, useEffect } from "react";
import { v4 } from "uuid";
import { Button, TextField, Typography } from "@material-ui/core";
import { connect } from "react-redux";

import CustomDialog from "../Dialogs";
import { TIMER_FOR_PARKING_LOT } from "../../config";
import { addVehicle, clearVehicle } from "../../actions";
import TimeFormat from "../functions/TimeFormat";

const AddVehicle = props => {
  const [vehicle, setVehicle] = useState({
    driverName: "",
    registrationNumber: ""
  });
  const [error, setError] = useState({});

  const [open, setOpen] = useState(false);

  const [dialogText, setDialogText] = useState({});

  useEffect(() => {
    if (props.vehicles.limit) dialogTextString("failure");
  }, [props]);

  const resetInputs = () => {
    setVehicle({ driverName: "", registrationNumber: "" });
  };

  const onSubmit = e => {
    const errors = {};
    e.preventDefault();

    if (vehicle.driverName && vehicle.registrationNumber) {
      // Giving unique ID to the vehicle
      vehicle.id = v4();

      // Attaching timeout function to the vehicle
      vehicle.timer = setTimeout(() => {
        // console.log(`Timer for driver ${vehicle.driverName} expired`);

        if (vehicle.timeout) props.clearVehicle(vehicle.id);
      }, TIMER_FOR_PARKING_LOT * 1000);

      vehicle.time = new Date().getTime();

      // Adding vehicle to the parkingLot
      props.addVehicle(vehicle);

      // Resetting all the inputs
      resetInputs();

      // Displaying success modal text
      dialogTextString("success");

      // Opening the modal
      modalOpen();
    }
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
    // console.log(e.target.name);

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
          props.vehicles.minTime * 1000
        )}`
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
  { addVehicle, clearVehicle }
)(AddVehicle);
