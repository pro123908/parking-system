import React, { useState } from "react";
import { Button, TextField, Typography } from "@material-ui/core";
import Auth from "./Auth";
import { connect } from "react-redux";

import { setAuth } from "../../actions";

const Admin = props => {
  const [credentials, setCredentials] = useState({
    email: "",
    password: ""
  });

  const [error, setError] = useState({});

  const resetInputs = () => {
    setCredentials({ email: "", password: "" });
  };

  const onSubmit = e => {
    e.preventDefault();

    console.log(checkErrors());

    if (!checkErrors()) {
      console.log("no errors");
      if (Auth.login(credentials.email, credentials.password)) {
        console.log("login Successful");
        console.log(props);
        props.setAuth(true);
        props.history.push("/vehicle/list");
      } else {
        console.log(Auth.getErrors());

        setError(Auth.getErrors());
      }
    }
  };

  const checkErrors = () => {
    const errors = {};

    if (!credentials.email) errors.email = "Email is required";

    if (!credentials.password) errors.password = "Password is required";

    setError(errors);

    console.log("Errors -> ", errors);
    return Object.keys(errors).length === 0 ? false : true;
  };

  const onChange = e => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
    setError({ ...error, [e.target.name]: null });
  };

  return (
    <div>
      <Typography variant="h5" color="primary">
        Admin Login
      </Typography>

      <form onSubmit={onSubmit}>
        <TextField
          type="text"
          name="email"
          label="Email"
          onChange={onChange}
          value={credentials.email}
          helperText="Email is compulsory"
          fullWidth={true}
          margin="dense"
          variant="filled"
          error={error.email ? true : false}
        />
        <TextField
          name="password"
          label="Password"
          type="text"
          onChange={onChange}
          value={credentials.password}
          helperText="Password is compulsory"
          fullWidth={true}
          margin="dense"
          variant="filled"
          error={error.password ? true : false}
        />

        <Button
          type="submit"
          color="primary"
          fullWidth={true}
          variant="outlined"
          style={{ marginTop: 20 }}
        >
          Submit
        </Button>
      </form>
    </div>
  );
};

export default connect(
  null,
  { setAuth }
)(Admin);
