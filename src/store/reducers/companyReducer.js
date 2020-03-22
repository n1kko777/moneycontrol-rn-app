import {
  GET_COMPANY,
  CREATE_COMPANY,
  LOADING_COMPANY,
  ERROR_COMPANY,
  CLEAR_COMPANY
} from "../types";

const initialState = {
  company: {},
  error: null,
  loading: false
};

export const companyReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_COMPANY:
      console.log("case GET_COMPANY:");
      return {
        ...state,
        company: payload,
        loading: false
      };
    case CREATE_COMPANY:
      console.log("case CREATE_COMPANY:");
      return {
        ...state,
        company: payload,
        loading: false
      };
    case CLEAR_COMPANY:
      console.log("case CLEAR_COMPANY:");
      return {
        ...state,
        company: {},
        loading: false
      };
    case LOADING_COMPANY:
      console.log("==========================");
      console.log("case LOADING_COMPANY:");
      return {
        ...state,
        loading: true
      };

    case ERROR_COMPANY:
      console.log("ERROR_COMPANY : " + payload);
      return {
        ...state,
        loading: false,
        error: payload
      };
    default:
      return state;
  }
};
