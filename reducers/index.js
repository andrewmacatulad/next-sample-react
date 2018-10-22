import { combineReducers } from "redux";

import asyncReducer from "../components/async/asyncReducer";
import userReducer from "../components/user/userReducer";
import categoryReducer from "../components/posts/Category/categoryReducer";
import tagsReducer from "../components/posts/Tags/tagsReducer";
import postsReducer from "../components/posts/Posts/postsReducer";

export const rootReducer = combineReducers({
  async: asyncReducer,
  profile: userReducer,
  category: categoryReducer,
  tags: tagsReducer,
  posts: postsReducer
});
