import { CREATE_ACTION, LOADING_ACTION, ERROR_ACTION, CLEAR_ACTION, DELETE_ACTION } from '../types';

const initialState = {
  error: null,
  loading: false,
};

export const actionReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case CREATE_ACTION:
      return {
        ...state,
        loading: false,
        error: null,
      };
    case DELETE_ACTION:
      return {
        ...state,
        loading: false,
        error: null,
      };
    case CLEAR_ACTION:
      return {
        ...state,
        loading: false,
        error: null,
      };
    case LOADING_ACTION:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case ERROR_ACTION:
      return {
        ...state,
        loading: false,
        error: payload,
      };
    default:
      return state;
  }
};
