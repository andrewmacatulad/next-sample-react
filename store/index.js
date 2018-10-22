// import { createStore, applyMiddleware } from "redux";
// import { composeWithDevTools } from "redux-devtools-extension";
// import thunkMiddleware from "redux-thunk";

// import { rootReducer } from "../reducers";

// export const initStore = (initialState = exampleInitialState) => {
//   return createStore(
//     rootReducer,
//     initialState,
//     composeWithDevTools(applyMiddleware(thunkMiddleware))
//   );
// };

import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunkMiddleware from "redux-thunk";
import axios from "axios";

import { rootReducer } from "../reducers";

// export const initStore = (initialState = exampleInitialState) => {
//   return createStore(
//     rootReducer,
//     initialState,
//     composeWithDevTools(applyMiddleware(thunkMiddleware))
//   );
// };

// const axiosInstance = axios.create({
//   baseURL: "http://localhost:3000",
//   headers: { cookie: req.get('cookie') || ''}
// });

const initialState = {
  tags: { tags: [] }
};
let axiosInstance = axios.create({
  baseURL: "http://localhost:3000"
});

export const initStore = (initialState = initialState, options) => {
  if (options.isServer) {
    // console.log("Store options", options.req.headers.cookie);
    axiosInstance = axios.create({
      baseURL: "http://localhost:3000",
      headers: { cookie: options.req.headers.cookie || "" }
    });
  }

  return createStore(
    rootReducer,
    initialState,
    composeWithDevTools(
      applyMiddleware(thunkMiddleware.withExtraArgument(axiosInstance))
    )
  );
};
