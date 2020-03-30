import { START_LOADER, END_LOADER } from "../types";

const initialState = {
  loader: false
};

export const apiReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case START_LOADER:
      console.log("==================================");
      console.log("START_LOADER");
      console.log("==================================");
      return {
        ...state,
        loader: true
      };
    case END_LOADER:
      console.log("==================================");
      console.log("END_LOADER");
      console.log("==================================");
      return {
        ...state,
        loader: false
      };
    default:
      return state;
  }
};
