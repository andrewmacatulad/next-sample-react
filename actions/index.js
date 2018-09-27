import axios from "axios";

import {
  asyncActionStart,
  asyncActionFinish,
  asyncActionError
} from "../../../Form Samples/rpg-social-media/src/async/asyncActions";

export const LEVEL_LIST = "LEVEL_LIST";
export const getAllLevels = () => async dispatch => {
  dispatch(asyncActionStart());
  try {
    const levels = await axios.get("http://localhost:5000/levels");
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
