import {
  asyncActionStart,
  asyncActionFinish,
  asyncActionError
} from "../../async/asyncActions";

export const GET_CATEGORY = "GET_CATEGORY";

export const createCategory = values => async (dispatch, getState, api) => {
  dispatch(asyncActionStart());

  try {
    const category = await api.post("/api/category", {
      name: values.name
    });
    console.log("Add category", category.data);
    dispatch(asyncActionFinish());
  } catch (err) {
    dispatch(asyncActionError());
  }
};

export const getCategory = () => async (dispatch, getState, api) => {
  dispatch(asyncActionStart());

  try {
    const category = await api.get("/api/category");

    dispatch({
      type: GET_CATEGORY,
      payload: category.data
    });
    dispatch(asyncActionFinish());
  } catch (err) {
    dispatch(asyncActionError());
  }
};
