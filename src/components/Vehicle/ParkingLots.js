import React from "react";
import { connect } from "react-redux";
import { List } from "@material-ui/core";
import ParkingLot from "./ParkingLot";

const ParkingLots = ({ parkingLots }) => {
  let parkingContent = "";

  if (parkingLots.length > 0) {
    parkingContent = parkingLots.map(vehicle => (
      <ParkingLot key={vehicle.id} vehicle={vehicle} />
    ));
  } else {
    parkingContent = "No Parking lot";
  }

  return <List>{parkingContent}</List>;
};

const mapStateToProps = state => {
  return {
    parkingLots: state.vehicles.parkingLots,
    loading: state.vehicles.loading
  };
};

export default connect(mapStateToProps)(ParkingLots);
