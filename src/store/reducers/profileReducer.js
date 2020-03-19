import {
  GET_PROFILE,
  UPDATE_PROFILE,
  PROFILE_LOADING,
  PROFILE_ERROR,
  CLEAR_PROFILE
} from "../types";

const initialState = {
  profile: {},
  error: null,
  loading: false
};

export const profileReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_PROFILE:
      console.log("case GET_PROFILE:");
      return {
        ...state,
        profile: payload[0],
        loading: false
      };
    case CLEAR_PROFILE:
      console.log("case CLEAR_PROFILE:");
      return {
        ...state,
        profile: {},
        loading: false
      };
    case PROFILE_LOADING:
      console.log("case PROFILE_LOADING:");
      return {
        ...state,
        loading: true
      };

    case PROFILE_ERROR:
      console.log("PROFILE_ERROR : " + payload);
      return {
        ...state,
        loading: false,
        error: payload
      };
    default:
      return state;
  }
};
