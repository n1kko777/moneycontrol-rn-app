import {
  GET_PROFILE,
  CREATE_PROFILE,
  UPDATE_PROFILE,
  LOADING_PROFILE,
  ERROR_PROFILE,
  CLEAR_PROFILE,
} from "../types";

const initialState = {
  profile: null,
  error: null,
  loading: false,
};

export const profileReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_PROFILE:
      console.log("case GET_PROFILE:");
      return {
        ...state,
        profile: payload,
        loading: false,
        error: null,
      };
    case CREATE_PROFILE:
      console.log("case CREATE_PROFILE:");
      console.log("payloadProfile :", payload);
      return {
        ...state,
        profile: payload,
        loading: false,
        error: null,
      };
    case UPDATE_PROFILE:
      console.log("case UPDATE_PROFILE:");
      return {
        ...state,
        profile: payload,
        loading: false,
        error: null,
      };
    case CLEAR_PROFILE:
      console.log("case CLEAR_PROFILE:");
      return {
        ...state,
        profile: null,
        loading: false,
        error: null,
      };
    case LOADING_PROFILE:
      console.log("==========================");
      console.log("case LOADING_PROFILE:");
      return {
        ...state,
        loading: true,
      };

    case ERROR_PROFILE:
      console.log("ERROR_PROFILE : " + payload);
      return {
        ...state,
        loading: false,
        error: payload,
      };
    default:
      return state;
  }
};
