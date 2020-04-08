import {
  GET_TRANSACTION,
  CREATE_TRANSACTION,
  LOADING_TRANSACTION,
  ERROR_TRANSACTION,
  CLEAR_TRANSACTION,
  DELETE_TRANSACTION,
  UPDATE_TRANSACTION,
} from "../types";

const initialState = {
  transactions: [],
  error: null,
  loading: false,
};

export const transactionReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_TRANSACTION:
      console.log("case GET_TRANSACTION:");
      return {
        ...state,
        transactions: payload,
        loading: false,
        error: null,
      };
    case CREATE_TRANSACTION:
      console.log("case CREATE_TRANSACTION:");
      return {
        ...state,
        transactions: [...state.transactions, payload],
        loading: false,
        error: null,
      };
    case UPDATE_TRANSACTION:
      console.log("case UPDATE_TRANSACTION:");
      return {
        ...state,
        transactions: state.transactions.map((transaction) =>
          transaction.id === payload.id ? payload : transaction
        ),
        loading: false,
        error: null,
      };
    case DELETE_TRANSACTION:
      console.log("case DELETE_TRANSACTION:");
      return {
        ...state,
        transactions: state.transactions.filter(
          (transaction) => transaction.id !== payload
        ),
        loading: false,
        error: null,
      };
    case CLEAR_TRANSACTION:
      console.log("case CLEAR_TRANSACTION:");
      return {
        ...state,
        transactions: [],
        loading: false,
        error: null,
      };
    case LOADING_TRANSACTION:
      console.log("==========================");
      console.log("case LOADING_TRANSACTION:");
      return {
        ...state,
        loading: true,
        error: null,
      };

    case ERROR_TRANSACTION:
      console.log("ERROR_TRANSACTION : " + payload);
      return {
        ...state,
        loading: false,
        error: payload,
      };
    default:
      return state;
  }
};
