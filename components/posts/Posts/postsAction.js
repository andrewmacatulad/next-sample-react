import {
  asyncActionStart,
  asyncActionFinish,
  asyncActionError
} from "../../async/asyncActions";

export const GET_POSTS = "GET_POSTS";

export const createPost = values => async (dispatch, getState, api) => {
  //   console.log(values);
  //   console.log("Action ", getState().profile.user._id);
  dispatch(asyncActionStart());

  console.log(values.postTags);
  try {
    const post = await api.post("/api/post", {
      user: getState().profile.user._id,
      postTitle: values.postTitle,
      postDescription: values.postDescription,
      postCategory: values.postCategory,
      postTags: values.postTags,
      postDownloadLinks: values.postDownloadLinks
    });

    console.log("Success ", post);
    dispatch(asyncActionFinish());
  } catch (err) {
    dispatch(asyncActionError());
  }
};

export const getAllPosts = () => async (dispatch, getState, api) => {
  dispatch(asyncActionStart());

  try {
    const posts = await api.get("/api/posts");

    dispatch({
      type: GET_POSTS,
      payload: posts.data
    });
    dispatch(asyncActionFinish());
  } catch (err) {
    dispatch(asyncActionError());
  }
};
