import {
  GET_TRANSFER,
  CREATE_TRANSFER,
  LOADING_TRANSFER,
  ERROR_TRANSFER,
  CLEAR_TRANSFER
} from "../types";

const initialState = {
  transfer: [],
  error: null,
  loading: false
};

export const transferReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_TRANSFER:
      console.log("case GET_TRANSFER:");
      return {
        ...state,
        transfer: payload,
        loading: false
      };
    case CREATE_TRANSFER:
      console.log("case CREATE_TRANSFER:");
      return {
        ...state,
        transfer: payload,
        loading: false
      };
    case CLEAR_TRANSFER:
      console.log("case CLEAR_TRANSFER:");
      return {
        ...state,
        transfer: [],
        loading: false
      };
    case LOADING_TRANSFER:
      console.log("==========================");
      console.log("case LOADING_TRANSFER:");
      return {
        ...state,
        loading: true
      };

    case ERROR_TRANSFER:
      console.log("ERROR_TRANSFER : " + payload);
      return {
        ...state,
        loading: false,
        error: payload
      };
    default:
      return state;
  }
};
