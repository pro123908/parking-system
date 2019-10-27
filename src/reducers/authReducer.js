import { SET_AUTH } from "../actions/types";

const initialState = {
  email: "test@gmail.com",
  password: "home123456",
  authenticated: false
};

const setAuth = (state, action) => {
  let newState = { ...state };

  newState.authenticated = action.payload;

  return newState;
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_AUTH:
      return setAuth(state, action);
    default:
      return state;
  }
};
