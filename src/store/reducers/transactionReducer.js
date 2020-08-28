import {
  GET_TRANSACTION,
  CREATE_TRANSACTION,
  LOADING_TRANSACTION,
  ERROR_TRANSACTION,
  CLEAR_TRANSACTION,
  DELETE_TRANSACTION,
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
      return {
        ...state,
        transactions: payload,
        loading: false,
        error: null,
      };
    case CREATE_TRANSACTION:
      return {
        ...state,
        transactions: [payload, ...state.transactions],
        loading: false,
        error: null,
      };
    case DELETE_TRANSACTION:
      return {
        ...state,
        transactions: state.transactions.filter(
          (transaction) => transaction.id !== payload
        ),
        loading: false,
        error: null,
      };
    case CLEAR_TRANSACTION:
      return {
        ...state,
        transactions: [],
        loading: false,
        error: null,
      };
    case LOADING_TRANSACTION:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case ERROR_TRANSACTION:
      return {
        ...state,
        loading: false,
        error: payload,
      };
    default:
      return state;
  }
};
