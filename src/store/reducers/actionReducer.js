import {
  GET_ACTION,
  CREATE_ACTION,
  LOADING_ACTION,
  ERROR_ACTION,
  CLEAR_ACTION,
  DELETE_ACTION,
  UPDATE_ACTION,
} from "../types";

const initialState = {
  actions: [],
  error: null,
  loading: false,
};

export const actionReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_ACTION:
      console.log("case GET_ACTION:");
      return {
        ...state,
        actions: payload,
        loading: false,
        error: null,
      };
    case CREATE_ACTION:
      console.log("case CREATE_ACTION:");
      return {
        ...state,
        actions: [...state.actions, payload],
        loading: false,
        error: null,
      };
    case UPDATE_ACTION:
      console.log("case UPDATE_ACTION:");
      return {
        ...state,
        actions: state.actions.map((action) =>
          action.id === payload.id ? payload : action
        ),
        loading: false,
        error: null,
      };
    case DELETE_ACTION:
      console.log("case DELETE_ACTION:");
      return {
        ...state,
        actions: state.actions.filter((action) => action.id !== payload.id),
        loading: false,
        error: null,
      };
    case CLEAR_ACTION:
      console.log("case CLEAR_ACTION:");
      return {
        ...state,
        actions: [],
        loading: false,
        error: null,
      };
    case LOADING_ACTION:
      console.log("==========================");
      console.log("case LOADING_ACTION:");
      return {
        ...state,
        loading: true,
        error: null,
      };

    case ERROR_ACTION:
      console.log("ERROR_ACTION : " + payload);
      return {
        ...state,
        loading: false,
        error: payload,
      };
    default:
      return state;
  }
};
