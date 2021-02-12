import {
  GET_COMPANY,
  CREATE_COMPANY,
  LOADING_COMPANY,
  ERROR_COMPANY,
  CLEAR_COMPANY,
  UPDATE_COMPANY,
  JOIN_PROFILE_TO_COMPANY,
  REMOVE_PROFILE_FROM_COMPANY,
} from "../types";

const initialState = {
  company: null,
  error: null,
  loading: false,
};

export const companyReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_COMPANY:
      return {
        ...state,
        company: payload,
        loading: false,
        error: null,
      };
    case CREATE_COMPANY:
      return {
        ...state,
        company: payload,
        loading: false,
        error: null,
      };
    case UPDATE_COMPANY:
      return {
        ...state,
        company: payload,
        loading: false,
        error: null,
      };
    case CLEAR_COMPANY:
      return {
        ...state,
        company: null,
        loading: false,
        error: null,
      };
    case LOADING_COMPANY:
      return {
        ...state,
        loading: true,
      };

    case JOIN_PROFILE_TO_COMPANY:
    case REMOVE_PROFILE_FROM_COMPANY:
      return {
        ...state,
        loading: false,
      };
    case ERROR_COMPANY:
      return {
        ...state,
        loading: false,
        error: payload,
      };
    default:
      return state;
  }
};
