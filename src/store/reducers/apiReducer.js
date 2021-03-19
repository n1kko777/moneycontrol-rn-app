import { START_LOADER, END_LOADER } from "../types";

const initialState = {
  loader: false,
};

export const apiReducer = (state = initialState, action) => {
  const { type } = action;
  switch (type) {
    case START_LOADER:
      return {
        ...state,
        loader: true,
      };
    case END_LOADER:
      return {
        ...state,
        loader: false,
      };
    default:
      return state;
  }
};
