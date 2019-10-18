import React, { useEffect, useState } from "react";
import Vehicle from "./Vehicle";
import { List, CircularProgress } from "@material-ui/core";
import { connect } from "react-redux";
import { getAllVehicles } from "../../actions";

const VehiclesList = props => {
  const [show, setShow] = useState("indeterminate");

  console.log("Entering vehilces list");

  useEffect(() => {
    if (props.vehicles.parkingLots.length > 0) {
      setShow("determinate");
    } else {
      setShow("indeterminate");
    }
  }, [props.vehicles.parkingLots]);

  let vehicleContent = "";

  if (props.vehicles.loading) {
    vehicleContent = (
      <div style={{ textAlign: "center" }}>
        <CircularProgress color="primary" variant={show} />
      </div>
    );
  } else if (props.vehicles.parkingLots.length > 0) {
    vehicleContent = props.vehicles.parkingLots.map(vehicle => (
      <Vehicle key={vehicle.id} vehicle={vehicle} />
    ));
  } else {
    vehicleContent = "No vehicle found";
  }

  return <List>{vehicleContent}</List>;
};

const mapStateToProps = state => {
  return {
    vehicles: state.vehicles
  };
};

export default connect(mapStateToProps)(VehiclesList);
