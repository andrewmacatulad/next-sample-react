import {
  GET_POSTS,
  GET_FEATURED_POSTS_ONE,
  GET_FEATURED_POSTS_TWO,
  GET_FEATURED_POSTS_THREE,
  GET_FEATURED_POSTS_FOUR,
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
    case GET_FEATURED_POSTS_ONE:
      return {
        ...state,
        featured_posts1: action.payload
      };
    case GET_FEATURED_POSTS_TWO:
      return {
        ...state,
        featured_posts2: action.payload
      };
    case GET_FEATURED_POSTS_THREE:
      return {
        ...state,
        featured_posts3: action.payload
      };
    case GET_FEATURED_POSTS_FOUR:
      return {
        ...state,
        featured_posts4: action.payload
      };

    default:
      return state;
  }
}
