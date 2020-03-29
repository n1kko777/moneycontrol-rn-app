import {
  GET_TAG,
  CREATE_TAG,
  LOADING_TAG,
  ERROR_TAG,
  CLEAR_TAG
} from "../types";

const initialState = {
  tags: [],
  error: null,
  loading: false
};

export const tagReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_TAG:
      console.log("case GET_TAG:");
      return {
        ...state,
        tags: payload,
        loading: false
      };
    case CREATE_TAG:
      console.log("case CREATE_TAG:");
      return {
        ...state,
        tags: payload,
        loading: false
      };
    case CLEAR_TAG:
      console.log("case CLEAR_TAG:");
      return {
        ...state,
        tags: [],
        loading: false
      };
    case LOADING_TAG:
      console.log("==========================");
      console.log("case LOADING_TAG:");
      return {
        ...state,
        loading: true
      };

    case ERROR_TAG:
      console.log("ERROR_TAG : " + payload);
      return {
        ...state,
        loading: false,
        error: payload
      };
    default:
      return state;
  }
};
