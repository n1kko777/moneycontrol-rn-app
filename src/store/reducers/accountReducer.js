import {
  GET_ACCOUNT,
  CREATE_ACCOUNT,
  LOADING_ACCOUNT,
  ERROR_ACCOUNT,
  CLEAR_ACCOUNT,
  DELETE_ACCOUNT,
  UPDATE_ACCOUNT,
  SET_CURRENT_ACCOUNT,
  CLEAR_CURRENT_ACCOUNT,
} from "../types";

const initialState = {
  accounts: [],
  current: null,
  error: null,
  loading: false,
};

export const accountReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case SET_CURRENT_ACCOUNT:
      console.log("case SET_CURRENT_ACCOUNT:");
      return {
        ...state,
        current: payload,
      };
    case CLEAR_CURRENT_ACCOUNT:
      console.log("case CLEAR_CURRENT_ACCOUNT:");
      return {
        ...state,
        current: null,
      };
    case GET_ACCOUNT:
      console.log("case GET_ACCOUNT:");
      return {
        ...state,
        accounts: payload,
        loading: false,
        error: null,
      };
    case CREATE_ACCOUNT:
      console.log("case CREATE_ACCOUNT:");
      return {
        ...state,
        accounts: [payload, ...state.accounts],
        current: payload,
        loading: false,
        error: null,
      };
    case UPDATE_ACCOUNT:
      console.log("case UPDATE_ACCOUNT:");
      return {
        ...state,
        accounts: state.accounts.map((account) =>
          account.id === payload.id ? payload : account
        ),
        loading: false,
        error: null,
      };
    case DELETE_ACCOUNT:
      console.log("case DELETE_ACCOUNT:");
      return {
        ...state,
        accounts: state.accounts.filter((account) => account.id !== payload),
        loading: false,
        error: null,
      };
    case CLEAR_ACCOUNT:
      console.log("case CLEAR_ACCOUNT:");
      return {
        ...state,
        accounts: [],
        current: null,
        loading: false,
        error: null,
      };
    case LOADING_ACCOUNT:
      console.log("==========================");
      console.log("case LOADING_ACCOUNT:");
      return {
        ...state,
        loading: true,
        error: null,
      };

    case ERROR_ACCOUNT:
      console.log("ERROR_ACCOUNT : " + payload);
      return {
        ...state,
        loading: false,
        error: payload,
      };
    default:
      return state;
  }
};
