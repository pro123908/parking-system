import { SET_LIMIT, CAL_MIN_TIME } from "./types";

export const setLimit = () => dispatch => dispatch({ type: SET_LIMIT });

export const calculateMinTime = () => dispatch =>
  dispatch({ type: CAL_MIN_TIME });
