import { GET_PROFILE, REMOVE_CURRENT_USER } from "../../actions";
import isEmpty from "../../lib/validation/is-empty";

// const initialState = {
//   user: false
// };

const initialState = {
  isAuthenticated: false,
  user: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_PROFILE:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        user: action.payload
      };
    // return { ...state, user: action.payload || { ...state, user: false } };
    case REMOVE_CURRENT_USER:
      return { isAuthenticated: false, user: {} };
    default:
      return state;
  }
}
