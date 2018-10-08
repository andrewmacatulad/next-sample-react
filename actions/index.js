import axios from "axios";

import {
  asyncActionStart,
  asyncActionFinish,
  asyncActionError
} from "../../../Form Samples/rpg-social-media/src/async/asyncActions";

export const LEVEL_LIST = "LEVEL_LIST";
export const GET_PROFILE = "GET_PROFILE";
export const REMOVE_CURRENT_USER = "REMOVE_CURRENT_USER";
export const getAllLevels = () => async (dispatch, getState, api) => {
  dispatch(asyncActionStart());
  try {
    const levels = await api.get("/api/levels");
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

export const getProfile = () => async (dispatch, getState, api) => {
  dispatch(asyncActionStart());
  try {
    const user = await api.get("http://localhost:3000/api/me");
    console.log(user.data);
    dispatch({
      type: GET_PROFILE,
      payload: user.data
    });
    dispatch(asyncActionFinish());
  } catch (err) {
    dispatch(asyncActionError());
  }
};

export const removeUser = () => async (dispatch, getState, api) => {
  const res = await api.get("/api/logout");

  dispatch({ type: REMOVE_CURRENT_USER });
};
