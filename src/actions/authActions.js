import { SET_AUTH, SET_LOADING } from "./types";
import firebase from "../components/Firebase";

let realTimeDB = firebase.database();

export const setAuth = flag => async dispatch => {
  let dbRef = realTimeDB.ref("/authentication");

  try {
    await dbRef.set({
      isAuthenticated: flag
    });
  } catch (error) {
    console.log("Setting Auth Failed => ", error);
  }

  dispatch({ type: SET_AUTH, payload: flag });
};

export const getAuth = () => async dispatch => {
  let dbRef = realTimeDB.ref("/authentication");

  dispatch(setLoading(true));

  try {
    let snapshot = await dbRef.once("value");

    if (snapshot.val()) {
      dispatch({ type: SET_AUTH, payload: snapshot.val().isAuthenticated });
    }
  } catch (error) {
    console.log("Getting Auth Failed => ", error);
  }
};

const setLoading = flag => ({ type: SET_LOADING, payload: flag });
