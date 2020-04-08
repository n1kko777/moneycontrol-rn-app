import {
  GET_TRANSFER,
  CREATE_TRANSFER,
  LOADING_TRANSFER,
  ERROR_TRANSFER,
  CLEAR_TRANSFER,
  DELETE_TRANSFER,
  UPDATE_TRANSFER,
} from "../types";

const initialState = {
  transfer: [],
  error: null,
  loading: false,
};

export const transferReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_TRANSFER:
      console.log("case GET_TRANSFER:");
      return {
        ...state,
        transfer: payload,
        loading: false,
        error: null,
      };
    case CREATE_TRANSFER:
      console.log("case CREATE_TRANSFER:");
      return {
        ...state,
        transfer: [...state.transfer, payload],
        loading: false,
        error: null,
      };
    case UPDATE_TRANSFER:
      console.log("case UPDATE_TRANSFER:");
      return {
        ...state,
        transfer: state.transfer.map((transfer) =>
          transfer.id === payload.id ? payload : transfer
        ),
        loading: false,
        error: null,
      };
    case DELETE_TRANSFER:
      console.log("case DELETE_TRANSFER:");
      return {
        ...state,
        transfer: state.transfer.filter((transfer) => transfer.id !== payload),
        loading: false,
        error: null,
      };
    case CLEAR_TRANSFER:
      console.log("case CLEAR_TRANSFER:");
      return {
        ...state,
        transfer: [],
        loading: false,
        error: null,
      };
    case LOADING_TRANSFER:
      console.log("==========================");
      console.log("case LOADING_TRANSFER:");
      return {
        ...state,
        loading: true,
        error: null,
      };

    case ERROR_TRANSFER:
      console.log("ERROR_TRANSFER : " + payload);
      return {
        ...state,
        loading: false,
        error: payload,
      };
    default:
      return state;
  }
};
