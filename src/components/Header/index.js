import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { AppBar, Toolbar, Typography, Button } from "@material-ui/core";
import { Link } from "react-router-dom";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  }
}));

const Header = props => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="overline" className={classes.title}>
            This is the headline
          </Typography>
          <Button component={Link} to="/vehicle/add" style={{ color: "#fff" }}>
            Add Vehicle
          </Button>
          <Button component={Link} to="/vehicle/list" style={{ color: "#fff" }}>
            Vehicle List
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Header;
