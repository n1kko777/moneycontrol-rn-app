import {
  CREATE_TRANSACTION,
  LOADING_TRANSACTION,
  ERROR_TRANSACTION,
  CLEAR_TRANSACTION,
  DELETE_TRANSACTION,
} from '../types';

const initialState = {
  error: null,
  loading: false,
};

export const transactionReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case CREATE_TRANSACTION:
      return {
        ...state,
        loading: false,
        error: null,
      };
    case DELETE_TRANSACTION:
      return {
        ...state,
        loading: false,
        error: null,
      };
    case CLEAR_TRANSACTION:
      return {
        ...state,
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
