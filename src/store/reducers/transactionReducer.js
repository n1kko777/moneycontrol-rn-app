import {
  GET_TRANSACTION,
  CREATE_TRANSACTION,
  LOADING_TRANSACTION,
  ERROR_TRANSACTION,
  CLEAR_TRANSACTION
} from "../types";

const initialState = {
  transactions: [],
  error: null,
  loading: false
};

export const transactionReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_TRANSACTION:
      console.log("case GET_TRANSACTION:");
      return {
        ...state,
        transactions: payload,
        loading: false
      };
    case CREATE_TRANSACTION:
      console.log("case CREATE_TRANSACTION:");
      return {
        ...state,
        transactions: payload,
        loading: false
      };
    case CLEAR_TRANSACTION:
      console.log("case CLEAR_TRANSACTION:");
      return {
        ...state,
        transactions: [],
        loading: false
      };
    case LOADING_TRANSACTION:
      console.log("==========================");
      console.log("case LOADING_TRANSACTION:");
      return {
        ...state,
        loading: true
      };

    case ERROR_TRANSACTION:
      console.log("ERROR_TRANSACTION : " + payload);
      return {
        ...state,
        loading: false,
        error: payload
      };
    default:
      return state;
  }
};
