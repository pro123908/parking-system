import { Component } from "react";

class Auth extends Component {
  constructor(props) {
    super(props);

    this.email = "test@gmail.com";
    this.password = "home123456";
    this.authenticated = false;
    this.errors = {};
  }

  getErrors = () => this.errors;

  validate = (email, password) => {
    let errors = {};
    if (email === this.email && password === this.password) {
      return true;
    }
    if (email !== this.email) {
      errors.email = "Invalid Email";
    }

    if (password !== this.password) {
      errors.password = "Wrong Password";
    }

    this.errors = errors;

    return false;
  };

  login = (email, password) => {
    if (this.validate(email, password)) {
      this.authenticated = true;
      return true;
    }
    return false;
  };

  logout = () => {
    this.authenticated = false;
  };

  isAuthenticated = () => this.authenticated;
}

export default new Auth();
