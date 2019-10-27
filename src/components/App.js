import React, { useEffect } from "react";
import { Container } from "@material-ui/core";

import { BrowserRouter, Route } from "react-router-dom";
import AddVehicle from "./Vehicle/AddVehicle";
import VehiclesList from "./Vehicle/VehiclesList";
import Header from "./Header";
import { connect } from "react-redux";
import { CircularProgress } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import {
  getAllVehicles,
  clearVehicle,
  setParkingInfo,
  getParkingInfo,
  setVehicleTimeout,
  updateParking,
  getParkingLots,
  getAuth
} from "../actions/";

import Admin from "./Auth/Admin";
import PrivateRoute from "../components/Auth/PrivateRoute";
import NonAuthRoute from "../components/Auth/NonAuthRoute";
import ParkingLots from "./Vehicle/ParkingLots";

import Styles from "./styles";

const App = props => {
  const classes = Styles();
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
    // Getting the Auth Status from firebase
    getAuth();

    // Getting the parking lots status from firebase
    getParkingLots();

    // Getting the parking info status from firebase
    getParkingInfo();

    // Getting all the vehicles parked from firebase
    getAllVehicles();
  }, []);

  useEffect(() => {
    // If all vehicles are fetched then setTimeout on all of them
    if (vehicles.getVehicles) {
      setVehicleTimeout(vehicles.vehiclesLots, clearVehicle, setParkingInfo);
    }
  }, [vehicles.getVehicles]);

  useEffect(() => {
    // Updating the parkingLots on firebase whenever the lots length changes
    if (vehicles.getParkingInfo) updateParking(vehicles.parkingLots);
  }, [vehicles.LotsLength]);

  return (
    <div className={classes.font}>
      {!props.vehicles.loading ? (
        <BrowserRouter>
          <Header />
          <Container className={classes.mt20}>
            <Route exact path="/" component={AddVehicle} />

            <PrivateRoute path="/vehicle/list" component={VehiclesList} />
            <PrivateRoute path="/vehicle/parkingLots" component={ParkingLots} />

            <NonAuthRoute path="/admin" component={Admin} />
          </Container>
        </BrowserRouter>
      ) : (
        <div className={classes.loaderStyles}>
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
