import React, { useEffect } from "react";
import { Container } from "@material-ui/core";

import { BrowserRouter, Route } from "react-router-dom";
import AddVehicle from "./Vehicle/AddVehicle";
import VehiclesList from "./Vehicle/VehiclesList";
import Header from "./Header";
import Login from "./Auth/login";
import setVehiclesTimeout from "./functions/setVehiclesTimeout";
import { connect } from "react-redux";
import {
  getAllVehicles,
  clearVehicle,
  setParkingInfo,
  getParkingInfo
} from "../actions";

const App = props => {
  useEffect(() => {
    // console.log("App effect ran");

    props.getAllVehicles(props.clearVehicle);
    props.getParkingInfo();
  }, []);

  // useEffect(() => {
  //   console.log("App effect run");
  //   // return props.setParkingInfo(props.vehicles);
  // }, [props.vehicles.LotsLength]);

  return (
    <div style={styles}>
      <BrowserRouter>
        <Header />
        <Container style={{ marginTop: 20 }}>
          <Route path="/vehicle/add" component={AddVehicle} />
          <Route path="/vehicle/list" component={VehiclesList} />
          <Route path="/login" component={Login} />
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
