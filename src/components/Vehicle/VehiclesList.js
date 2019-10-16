import React, { useEffect } from "react";
import Vehicle from "./Vehicle";
import { List } from "@material-ui/core";
import { connect } from "react-redux";
import { getAllVehicles } from "../../actions";

const VehiclesList = props => {
  // console.log("Vehicle List => ", props);

  let vehicleContent = props.vehicles.parkingLots.map(vehicle => (
    <Vehicle key={vehicle.id} vehicle={vehicle} />
  ));

  // console.log("Vehicle content => ", vehicleContent);
  vehicleContent =
    vehicleContent.length === 0 ? <h3>No Vehicles to show</h3> : vehicleContent;

  return <List>{vehicleContent}</List>;
};

const mapStateToProps = state => {
  return {
    vehicles: state.vehicles
  };
};

export default connect(mapStateToProps)(VehiclesList);
