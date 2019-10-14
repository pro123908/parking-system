import React from "react";
import { connect } from "react-redux";
import { Container, List } from "@material-ui/core";

import AddVehicle from "./AddVehicle";
import VehiclesList from "./VehiclesList";
import { addVehicle, clearVehicle } from "../../actions";

const Vehicles = ({ vehicles, addVehicle, clearVehicle }) => {
  console.log("Rending FAIN");
  return (
    <Container maxWidth="sm">
      <AddVehicle
        limit={vehicles.limit}
        addVehicle={addVehicle}
        clearVehicle={clearVehicle}
      />

      <VehiclesList vehicles={vehicles} />
    </Container>
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
)(Vehicles);
