import { LEVEL_LIST } from "../../actions";

const initialState = {
  levels: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case LEVEL_LIST:
      return { ...state, levels: action.payload };
    default:
      return state;
  }
}
