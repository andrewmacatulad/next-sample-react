import axios from "axios";
import {
  asyncActionStart,
  asyncActionFinish,
  asyncActionError
} from "../../async/asyncActions";

export const GET_POSTS = "GET_POSTS";
export const GET_POST_BY_CATEGORY = "GET_POST_BY_CATEGORY";
export const GET_POSTS_BY_CATEGORY = "GET_POSTS_BY_CATEGORY";

export const createPost = (values, file) => async (dispatch, getState, api) => {
  //   console.log(values);
  //   console.log("Action ", getState().profile.user._id);
  dispatch(asyncActionStart());

  const uploadConfig = await api.get("/api/upload");

  const upload = await api.put(uploadConfig.data.url, file, {
    headers: {
      "Content-Type": file.type
    }
  });

  try {
    const post = await api.post("/api/post", {
      user: getState().profile.user._id,
      postTitle: values.postTitle,
      postDescription: values.postDescription,
      postCategory: values.postCategory,
      postTags: values.postTags,
      postDownloadLinks: values.postDownloadLinks,
      postHdDownloadLinks: values.postHdDownloadLinks,
      postStreamLinks: values.postStreamLinks,
      postSubsLinks: values.postSubsLinks,
      postSubtitle: values.postSubtitle,
      postImageUrl: uploadConfig.data.key
    });

    console.log("Success ", post);
    dispatch(asyncActionFinish());
  } catch (err) {
    dispatch(asyncActionError());
  }
};

export const editPost = (values, postId) => async (dispatch, getState, api) => {
  //   console.log(values);
  //   console.log("Action ", getState().profile.user._id);
  dispatch(asyncActionStart());

  try {
    const post = await api.patch("/api/post", {
      userId: getState().profile.user._id,
      postId,
      postTitle: values.postTitle,
      postDescription: values.postDescription,
      postCategory: values.postCategory,
      postTags: values.postTags,
      postDownloadLinks: values.postDownloadLinks,
      postHdDownloadLinks: values.postHdDownloadLinks,
      postStreamLinks: values.postStreamLinks,
      postSubsLinks: values.postSubsLinks,
      postSubtitle: values.postSubtitle
    });

    console.log("Successfully updated the post", post);
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

export const getPostByCategory = (categoryId, postId) => async (
  dispatch,
  getState,
  api
) => {
  dispatch(asyncActionStart());

  try {
    const post = await api.get(`/api/:${categoryId}/:${postId}`);

    dispatch({
      type: GET_POST_BY_CATEGORY,
      payload: post.data
    });
    dispatch(asyncActionFinish());
  } catch (err) {
    dispatch(asyncActionError());
  }
};

export const getAllPostsInCategory = catSlug => async (
  dispatch,
  getState,
  api
) => {
  dispatch(asyncActionStart);
  console.log("Action slug ", catSlug);

  try {
    const post = await api.get(`/api/${catSlug}`);
    //console.log(post);
    dispatch({
      type: GET_POSTS,
      payload: post.data
    });

    dispatch(asyncActionFinish());
  } catch (err) {
    dispatch(asyncActionError());
  }
};
