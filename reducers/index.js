import { combineReducers } from "redux";

import asyncReducer from "../components/async/asyncReducer";
import levelsReducer from "../components/levels/levelsReducer";

export const rootReducer = combineReducers({
  levels: levelsReducer,
  async: asyncReducer
});
