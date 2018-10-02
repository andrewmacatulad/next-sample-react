import { combineReducers } from "redux";

import asyncReducer from "../components/async/asyncReducer";
import levelsReducer from "../components/levels/levelsReducer";
import userReducer from "../components/user/userReducer";

export const rootReducer = combineReducers({
  levels: levelsReducer,
  async: asyncReducer,
  profile: userReducer
});
