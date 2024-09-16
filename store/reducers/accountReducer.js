import { getAccountTitle } from '../../utils';
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
} from '../types';

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
      return {
        ...state,
        current: payload,
      };
    case CLEAR_CURRENT_ACCOUNT:
      return {
        ...state,
        current: null,
      };
    case GET_ACCOUNT:
      return {
        ...state,
        accounts: payload,
        loading: false,
        error: null,
      };
    case CREATE_ACCOUNT:
      return {
        ...state,
        accounts: [payload, ...state.accounts],
        current: {
          title: getAccountTitle(payload),
          id: payload.id,
        },
        loading: false,
        error: null,
      };
    case UPDATE_ACCOUNT:
      return {
        ...state,
        accounts: state.accounts.map((account) => (account.id === payload.id ? payload : account)),
        loading: false,
        error: null,
      };
    case DELETE_ACCOUNT:
      return {
        ...state,
        accounts: state.accounts.filter((account) => account.id !== payload),
        loading: false,
        error: null,
      };
    case CLEAR_ACCOUNT:
      return {
        ...state,
        accounts: [],
        current: null,
        loading: false,
        error: null,
      };
    case LOADING_ACCOUNT:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case ERROR_ACCOUNT:
      return {
        ...state,
        loading: false,
        error: payload,
      };
    default:
      return state;
  }
};
