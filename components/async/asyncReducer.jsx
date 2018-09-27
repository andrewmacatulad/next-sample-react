import {
  ASYNC_ACTION_START,
  ASYNC_ACTION_FINISH,
  ASYNC_ACTION_ERROR
} from "./asyncConstants";

const initialState = {
  loading: false
};

export default function(state = initialState, action) {
  // const { modalType, modalProps } = payload;
  switch (action.type) {
    case ASYNC_ACTION_START:
      return { ...state, loading: true };
    case ASYNC_ACTION_FINISH:
      return { ...state, loading: false };
    case ASYNC_ACTION_ERROR:
      return { ...state, loading: false };
    default:
      return state;
  }
}

// export const asyncActionStarted = (state, payload) => {
//   return {...state, loading: true}
// }

// export const asyncActionFinished = (state) => {
//   return {...state, loading: false}
// }

// export const asyncActionError = (state) => {
//   return {...state, loading: false}
// }

// export default createReducer(initialState, {
//   [ASYNC_ACTION_START]: asyncActionStarted,
//   [ASYNC_ACTION_FINISH]: asyncActionFinished,
//   [ASYNC_ACTION_ERROR]: asyncActionError
// })

// export const openModal = (state, payload) => {
//   const { modalType, modalProps } = payload;
//   return { modalType, modalProps };
// };

// export const closeModal = (state, payload) => {
//   return null;
// };

// export default createReducer(initialState, {
//   [MODAL_OPEN]: openModal,
//   [MODAL_CLOSE]: closeModal
// });
