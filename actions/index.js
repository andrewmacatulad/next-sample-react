import axios from "axios";

import {
  asyncActionStart,
  asyncActionFinish,
  asyncActionError
} from "../components/async/asyncActions";

export const GET_PROFILE = "GET_PROFILE";
export const REMOVE_CURRENT_USER = "REMOVE_CURRENT_USER";

export const getProfile = () => async (dispatch, getState, api) => {
  dispatch(asyncActionStart());
  try {
    const user = await api.get("/api/me");
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
