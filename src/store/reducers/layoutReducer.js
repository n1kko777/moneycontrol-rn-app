import { SET_HOME_DATA, CLEAR_HOME_DATA } from "../types";

const initialState = {
  homeListData: [],
};

export const layoutReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case SET_HOME_DATA:
      return {
        ...state,
        homeListData: payload,
      };
    case CLEAR_HOME_DATA:
      return {
        ...state,
        homeListData: [],
      };
    default:
      return state;
  }
};
