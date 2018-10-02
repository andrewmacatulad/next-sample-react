import axios from "axios";

import {
  asyncActionStart,
  asyncActionFinish,
  asyncActionError
} from "../../../Form Samples/rpg-social-media/src/async/asyncActions";

export const LEVEL_LIST = "LEVEL_LIST";
export const GET_PROFILE = "GET_PROFILE";
export const getAllLevels = () => async dispatch => {
  dispatch(asyncActionStart());
  try {
    const levels = await axios.get("http://localhost:3000/api/levels");
    dispatch({
      type: LEVEL_LIST,
      payload: levels.data
    });

    dispatch(asyncActionFinish());
  } catch (err) {
    console.log(err);
    dispatch(asyncActionError());
  }
};

export const getProfile = () => async dispatch => {
  try {
    const user = await axios.get("http://localhost:3000/api/me");
    console.log("Action", user.data);
    dispatch({
      type: GET_PROFILE,
      payload: user.data
    });
  } catch (err) {
    console.log("Error");
  }
};
