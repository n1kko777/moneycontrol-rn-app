import { START_LOADER, END_LOADER } from "../types";

const initialState = {
  loader: 0
};

export const apiReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case START_LOADER:
      return {
        ...state,
        loader: ++state.loader
      };
    case END_LOADER:
      return {
        ...state,
        loader: --state.loader
      };
    default:
      return state;
  }
};
