import { combineReducers } from "redux";
import vehicleReducer from "./vehicleReducer";
import authReducer from "./authReducer";

export default combineReducers({
  vehicles: vehicleReducer,
  auth: authReducer
});
