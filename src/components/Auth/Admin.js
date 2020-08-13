import React, { useState, useEffect } from "react";
import { Button, TextField, Typography } from "@material-ui/core";

import { connect } from "react-redux";

import { setAuth } from "../../actions";

const Admin = ({ auth, setAuth, history }) => {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    setCredentials({ email: auth.email, password: auth.password });
  }, []);

  const resetInputs = () => {
    setCredentials({ email: "", password: "" });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (validate()) {
      setAuth(true);
      history.push("/vehicle/list");
      resetInputs();
    }
  };

  const validate = () => {
    let errors = {};

    if (!credentials.email) errors.email = "Email is required";
    else if (credentials.email !== auth.email)
      errors.email = "Email is Invalid";

    if (!credentials.password) errors.password = "Password is required";
    else if (credentials.password !== auth.password)
      errors.password = "Wrong Password";

    setErrors(errors);

    return Object.keys(errors).length === 0 ? true : false;
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: null });
  };

  return (
    <div style={{ width: "50%", margin: "0 auto" }}>
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
          helperText={errors.email ? errors.email : ""}
          fullWidth={true}
          margin="dense"
          variant="filled"
          error={errors.email ? true : false}
        />
        <TextField
          name="password"
          label="Password"
          type="text"
          onChange={onChange}
          value={credentials.password}
          helperText={errors.password ? errors.password : ""}
          fullWidth={true}
          margin="dense"
          variant="filled"
          error={errors.password ? true : false}
        />

        <Button
          type="submit"
          color="primary"
          fullWidth={true}
          variant="outlined"
          style={{ marginTop: 20 }}
        >
          Login
        </Button>
      </form>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
  };
};

export default connect(mapStateToProps, { setAuth })(Admin);
