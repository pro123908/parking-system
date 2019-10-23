import React, { useState, useEffect } from "react";
import {
  ListItem,
  ListItemText,
  ListItemIcon,
  ListItemSecondaryAction
} from "@material-ui/core";
import { DriveEta } from "@material-ui/icons";

const Vehicle = ({ vehicle }) => {
  return (
    <ListItem divider={true}>
      <ListItemIcon>
        <DriveEta />
      </ListItemIcon>
      <ListItemText>
        {vehicle.lot ? vehicle.lot : ""}{" "}
        {vehicle.assigned ? "Assigned to -> " : ""}
        {vehicle.registrationNumber ? (
          <span>{vehicle.registrationNumber}</span>
        ) : (
          ""
        )}
      </ListItemText>
      <ListItemSecondaryAction>
        {vehicle.assigned ? "Booked" : "Available"}
      </ListItemSecondaryAction>
    </ListItem>
  );
};

export default Vehicle;
