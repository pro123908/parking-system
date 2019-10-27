import React from "react";
import Vehicle from "./Vehicle";
import { List } from "@material-ui/core";
import { connect } from "react-redux";

const VehiclesList = props => {
  let vehicleContent = "";

  if (props.vehicles.vehiclesLots.length > 0) {
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
