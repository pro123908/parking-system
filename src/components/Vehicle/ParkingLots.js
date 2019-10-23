import React from "react";
import { connect } from "react-redux";
import { List, CircularProgress } from "@material-ui/core";
import ParkingLot from "./ParkingLot";

const ParkingLots = ({ parkingLots, loading }) => {
  let parkingContent = "";

  if (loading) {
    parkingContent = (
      <div style={{ textAlign: "center" }}>
        <CircularProgress color="primary" variant="determinate" />
      </div>
    );
  } else if (parkingLots.length > 0) {
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
