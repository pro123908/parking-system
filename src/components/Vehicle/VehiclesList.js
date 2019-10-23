import React, { useEffect, useState } from "react";
import Vehicle from "./Vehicle";
import { List, CircularProgress } from "@material-ui/core";
import { connect } from "react-redux";

const VehiclesList = props => {
  const [show, setShow] = useState("indeterminate");

  useEffect(() => {
    if (props.vehicles.vehiclesLots.length > 0) {
      setShow("determinate");
    } else {
      setShow("indeterminate");
    }
  }, [props.vehicles.vehiclesLots]);

  let vehicleContent = "";

  if (props.vehicles.loading) {
    vehicleContent = (
      <div style={{ textAlign: "center" }}>
        <CircularProgress color="primary" variant={show} />
      </div>
    );
  } else if (props.vehicles.vehiclesLots.length > 0) {
    vehicleContent = props.vehicles.vehiclesLots.map(vehicle => (
      <Vehicle key={vehicle.id} vehicle={vehicle} />
    ));
  } else {
    vehicleContent = <h3 style={{ textAlign: "center" }}>No Vehicle Found</h3>;
  }

  return <List>{vehicleContent}</List>;
};

const mapStateToProps = state => {
  return {
    vehicles: state.vehicles
  };
};

export default connect(mapStateToProps)(VehiclesList);
