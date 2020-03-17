import {
  GET_PROFILE,
  UPDATE_PROFILE,
  PROFILE_LOADING,
  PROFILE_ERROR
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
      return {
        ...state,
        profile: payload,
        loading: false
      };
    case PROFILE_LOADING:
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
