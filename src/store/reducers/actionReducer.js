import {
  GET_ACTION,
  CREATE_ACTION,
  LOADING_ACTION,
  ERROR_ACTION,
  CLEAR_ACTION
} from "../types";

const initialState = {
  actions: [],
  error: null,
  loading: false
};

export const actionReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_ACTION:
      console.log("case GET_ACTION:");
      return {
        ...state,
        actions: payload,
        loading: false
      };
    case CREATE_ACTION:
      console.log("case CREATE_ACTION:");
      return {
        ...state,
        actions: payload,
        loading: false
      };
    case CLEAR_ACTION:
      console.log("case CLEAR_ACTION:");
      return {
        ...state,
        actions: [],
        loading: false
      };
    case LOADING_ACTION:
      console.log("==========================");
      console.log("case LOADING_ACTION:");
      return {
        ...state,
        loading: true
      };

    case ERROR_ACTION:
      console.log("ERROR_ACTION : " + payload);
      return {
        ...state,
        loading: false,
        error: payload
      };
    default:
      return state;
  }
};
