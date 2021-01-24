import {
  CREATE_TRANSFER,
  LOADING_TRANSFER,
  ERROR_TRANSFER,
  CLEAR_TRANSFER,
  DELETE_TRANSFER,
} from "../types";

const initialState = {
  error: null,
  loading: false,
};

export const transferReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case CREATE_TRANSFER:
      return {
        ...state,
        loading: false,
        error: null,
      };
    case DELETE_TRANSFER:
      return {
        ...state,
        loading: false,
        error: null,
      };
    case CLEAR_TRANSFER:
      return {
        ...state,
        loading: false,
        error: null,
      };
    case LOADING_TRANSFER:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case ERROR_TRANSFER:
      return {
        ...state,
        loading: false,
        error: payload,
      };
    default:
      return state;
  }
};
