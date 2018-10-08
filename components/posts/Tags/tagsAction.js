import {
  asyncActionStart,
  asyncActionFinish,
  asyncActionError
} from "../../async/asyncActions";

export const GET_TAGS = "GET_TAGS";
export const createTags = values => async (dispatch, getState, api) => {
  dispatch(asyncActionStart());

  try {
    const tag = await api.post("/api/tags", {
      name: values.name
    });
    console.log("Added tags", tag.data);
    dispatch(asyncActionFinish());
  } catch (err) {
    dispatch(asyncActionError());
  }
};

export const getTags = () => async (dispatch, getState, api) => {
  dispatch(asyncActionStart());

  try {
    const tag = await api.get("/api/tags");

    dispatch({
      type: GET_TAGS,
      payload: tag.data
    });
    dispatch(asyncActionFinish());
  } catch (err) {
    dispatch(asyncActionError());
  }
};
