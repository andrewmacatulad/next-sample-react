import {
  GET_POSTS,
  GET_POST_BY_CATEGORY,
  GET_POSTS_BY_CATEGORY
} from "./postsAction";
const initialState = {
  posts: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_POSTS:
      return { ...state, posts: action.payload };
    // case GET_POST_BY_CATEGORY:
    //   return { ...state, post: action.payload };
    case GET_POSTS_BY_CATEGORY:
      return { ...state, post: action.payload };
    default:
      return state;
  }
}
