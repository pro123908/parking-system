import React, { useEffect } from "react";
import { Container } from "@material-ui/core";

import { BrowserRouter, Route } from "react-router-dom";
import AddVehicle from "./Vehicle/AddVehicle";
import VehiclesList from "./Vehicle/VehiclesList";
import Header from "./Header";
import { connect } from "react-redux";
import { CircularProgress } from "@material-ui/core";
import {
  getAllVehicles,
  clearVehicle,
  setParkingInfo,
  getParkingInfo,
  getAuth,
  setVehicleTimeout,
  updateParking,
  getParkingLots
} from "../actions";
import Admin from "./Auth/Admin";
import PrivateRoute from "../components/Auth/PrivateRoute";
import NonAuthRoute from "../components/Auth/NonAuthRoute";
import ParkingLots from "./Vehicle/ParkingLots";

const App = props => {
  let {
    getAuth,
    getParkingInfo,
    getAllVehicles,
    setVehicleTimeout,
    vehicles,
    clearVehicle,
    setParkingInfo,
    updateParking,
    getParkingLots
  } = props;
  useEffect(() => {
    getAuth();
    getParkingLots();

    getParkingInfo();
    getAllVehicles();
  }, []);

  useEffect(() => {
    if (vehicles.getVehicles) {
      setVehicleTimeout(vehicles.vehiclesLots, clearVehicle, setParkingInfo);
    }
  }, [vehicles.getVehicles]);

  useEffect(() => {
    if (vehicles.getParkingInfo) setParkingInfo(props.vehicles);
  }, [vehicles.limit]);

  useEffect(() => {
    if (vehicles.getParkingInfo) updateParking(vehicles.parkingLots);
  }, [vehicles.LotsLength]);

  return (
    <div style={styles}>
      {!props.vehicles.loading ? (
        <BrowserRouter>
          <Header />
          <Container style={{ marginTop: 20 }}>
            <Route exact path="/" component={AddVehicle} />

            <PrivateRoute path="/vehicle/list" component={VehiclesList} />
            <PrivateRoute path="/vehicle/parkingLots" component={ParkingLots} />

            <NonAuthRoute path="/admin" component={Admin} />
          </Container>
        </BrowserRouter>
      ) : (
        <div style={{ textAlign: "center", marginTop: "45%" }}>
          <CircularProgress color="primary" />
        </div>
      )}
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
  {
    getAllVehicles,
    clearVehicle,
    setParkingInfo,
    getParkingInfo,
    getAuth,
    setVehicleTimeout,
    updateParking,
    getParkingLots
  }
)(App);
