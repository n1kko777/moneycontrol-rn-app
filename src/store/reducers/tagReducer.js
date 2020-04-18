import {
  GET_TAG,
  CREATE_TAG,
  LOADING_TAG,
  ERROR_TAG,
  CLEAR_TAG,
  DELETE_TAG,
  UPDATE_TAG,
} from "../types";

const initialState = {
  tags: [],
  error: null,
  loading: false,
};

export const tagReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_TAG:
      console.log("case GET_TAG:");
      return {
        ...state,
        tags: payload,
        loading: false,
        error: null,
      };
    case CREATE_TAG:
      console.log("case CREATE_TAG:");
      return {
        ...state,
        tags: [payload, ...state.tags],
        loading: false,
        error: null,
      };
    case UPDATE_TAG:
      console.log("case UPDATE_TAG:");
      return {
        ...state,
        tags: state.tags.map((tag) => (tag.id === payload.id ? payload : tag)),
        loading: false,
        error: null,
      };
    case DELETE_TAG:
      console.log("case DELETE_TAG:");
      return {
        ...state,
        tags: state.tags.filter((tag) => tag.id !== payload.id),
        loading: false,
        error: null,
      };
    case CLEAR_TAG:
      console.log("case CLEAR_TAG:");
      return {
        ...state,
        tags: [],
        loading: false,
        error: null,
      };
    case LOADING_TAG:
      console.log("==========================");
      console.log("case LOADING_TAG:");
      return {
        ...state,
        loading: true,
        error: null,
      };

    case ERROR_TAG:
      console.log("ERROR_TAG : " + payload);
      return {
        ...state,
        loading: false,
        error: payload,
      };
    default:
      return state;
  }
};
