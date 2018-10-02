import { GET_PROFILE } from "../../actions";

const initialState = {
  user: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_PROFILE:
      return { ...state, user: action.payload || { ...state, user: false } };
    default:
      return state;
  }
}
