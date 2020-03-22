import {
  GET_ACCOUNT,
  CREATE_ACCOUNT,
  LOADING_ACCOUNT,
  ERROR_ACCOUNT,
  CLEAR_ACCOUNT
} from "../types";

const initialState = {
  accounts: [],
  error: null,
  loading: false
};

export const accountReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_ACCOUNT:
      console.log("case GET_ACCOUNT:");
      return {
        ...state,
        accounts: payload,
        loading: false
      };
    case CREATE_ACCOUNT:
      console.log("case CREATE_ACCOUNT:");
      return {
        ...state,
        accounts: payload,
        loading: false
      };
    case CLEAR_ACCOUNT:
      console.log("case CLEAR_ACCOUNT:");
      return {
        ...state,
        accounts: [],
        loading: false
      };
    case LOADING_ACCOUNT:
      console.log("==========================");
      console.log("case LOADING_ACCOUNT:");
      return {
        ...state,
        loading: true
      };

    case ERROR_ACCOUNT:
      console.log("ERROR_ACCOUNT : " + payload);
      return {
        ...state,
        loading: false,
        error: payload
      };
    default:
      return state;
  }
};
