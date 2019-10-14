import React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  DialogContentText
} from "@material-ui/core";

const CustomDialog = ({ open, modalClose, title, description }) => (
  <Dialog open={open} color="primary">
    <DialogTitle>{title}</DialogTitle>
    <DialogContent>
      <DialogContentText>{description}</DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button onClick={modalClose} color="primary">
        Close
      </Button>
    </DialogActions>
  </Dialog>
);

export default CustomDialog;
