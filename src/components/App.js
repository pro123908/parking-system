import React from "react";
import { Container } from "@material-ui/core";

import { BrowserRouter, Route } from "react-router-dom";
import AddVehicle from "./Vehicle/AddVehicle";
import VehiclesList from "./Vehicle/VehiclesList";
import Header from "./Header";

const App = () => {
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

export default App;
