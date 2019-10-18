import React, { useEffect } from "react";
import { Container } from "@material-ui/core";

import { BrowserRouter, Route } from "react-router-dom";
import AddVehicle from "./Vehicle/AddVehicle";
import VehiclesList from "./Vehicle/VehiclesList";
import Header from "./Header";
import { connect } from "react-redux";
import {
  getAllVehicles,
  clearVehicle,
  setParkingInfo,
  getParkingInfo
} from "../actions";

const App = props => {
  useEffect(() => {
    let parkingInfo = {
      LotsLength: props.vehicles.LotsLength,
      minTime: props.vehicles.minTime,
      limit: props.vehicles.limit
    };

    props.getAllVehicles(props.clearVehicle, props.setParkingInfo, parkingInfo);
  }, []);

  useEffect(() => {
    props.getParkingInfo();
  }, [props.vehicles.loading]);

  useEffect(() => {
    if (props.vehicles.getParkingInfo)
      return props.setParkingInfo(props.vehicles);
  }, [props.vehicles.limit]);

  return (
    <div style={styles}>
      <BrowserRouter>
        <Header />
        <Container style={{ marginTop: 20 }}>
          <Route path="/vehicle/add" component={AddVehicle} />
          <Route path="/vehicle/list" component={VehiclesList} />
        </Container>
      </BrowserRouter>
    </div>
  );
};

const styles = {
  fontFamily: "Roboto"
};

const mapStateToProps = state => {
  return {
    vehicles: state.vehicles
  };
};

export default connect(
  mapStateToProps,
  { getAllVehicles, clearVehicle, setParkingInfo, getParkingInfo }
)(App);
