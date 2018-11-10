import axios from "axios";
import {
  asyncActionStart,
  asyncActionFinish,
  asyncActionError
} from "../../async/asyncActions";

export const GET_POSTS = "GET_POSTS";
export const GET_FEATURED_POSTS_ONE = "GET_FEATURED_POSTS_ONE";
export const GET_FEATURED_POSTS_TWO = "GET_FEATURED_POSTS_TWO";
export const GET_FEATURED_POSTS_THREE = "GET_FEATURED_POSTS_THREE";
export const GET_FEATURED_POSTS_FOUR = "GET_FEATURED_POSTS_FOUR";
export const GET_POST_BY_CATEGORY = "GET_POST_BY_CATEGORY";
export const GET_POSTS_BY_CATEGORY = "GET_POSTS_BY_CATEGORY";
export const RESET_POSTS_BY_CATEGORY = "RESET_POSTS_BY_CATEGORY";

export const createPost = (values, file) => async (dispatch, getState, api) => {
  //   console.log(values);
  //   console.log("Action ", getState().profile.user._id);
  dispatch(asyncActionStart());

  console.log(file);
  const uploadConfig = await api.get("/api/upload");
  console.log(uploadConfig);
  const upload = await api.put(uploadConfig.data.url, file, {
    headers: {
      "Content-Type": file.type
    }
  });

  console.log(upload);

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

export const createPostWithoutImage = values => async (
  dispatch,
  getState,
  api
) => {
  //   console.log(values);
  //   console.log("Action ", getState().profile.user._id);
  dispatch(asyncActionStart());

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
      postSubtitle: values.postSubtitle
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

export const getFeaturedPostsOne = categId => async (
  dispatch,
  getState,
  api
) => {
  dispatch(asyncActionStart());

  try {
    const posts = await api.get(`/api/featured-posts/${categId}`);

    dispatch({
      type: GET_FEATURED_POSTS_ONE,
      payload: posts.data
    });
    dispatch(asyncActionFinish());
  } catch (err) {
    dispatch(asyncActionError());
  }
};

export const getFeaturedPostsTwo = categId => async (
  dispatch,
  getState,
  api
) => {
  dispatch(asyncActionStart());

  try {
    const posts = await api.get(`/api/featured-posts/${categId}`);

    dispatch({
      type: GET_FEATURED_POSTS_TWO,
      payload: posts.data
    });
    dispatch(asyncActionFinish());
  } catch (err) {
    dispatch(asyncActionError());
  }
};

export const getFeaturedPostsThree = categId => async (
  dispatch,
  getState,
  api
) => {
  dispatch(asyncActionStart());

  try {
    const posts = await api.get(`/api/featured-posts/${categId}`);

    dispatch({
      type: GET_FEATURED_POSTS_THREE,
      payload: posts.data
    });
    dispatch(asyncActionFinish());
  } catch (err) {
    dispatch(asyncActionError());
  }
};

export const getFeaturedPostsFour = categId => async (
  dispatch,
  getState,
  api
) => {
  dispatch(asyncActionStart());

  try {
    const posts = await api.get(`/api/featured-posts/${categId}`);

    dispatch({
      type: GET_FEATURED_POSTS_FOUR,
      payload: posts.data
    });
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
    const post = await api.get(`/api/download/:${categoryId}/:${postId}`);

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
  dispatch(resetAllPostsInCategory());
  dispatch(asyncActionStart);

  try {
    const post = await api.get(`/api/download/${catSlug}`);
    //console.log(post);
    dispatch({
      type: GET_POSTS_BY_CATEGORY,
      payload: post.data
    });

    dispatch(asyncActionFinish());
  } catch (err) {
    dispatch(asyncActionError());
  }
};

const resetAllPostsInCategory = () => async dispatch => {
  console.log("Reset");
  dispatch({
    type: RESET_POSTS_BY_CATEGORY
  });
};
