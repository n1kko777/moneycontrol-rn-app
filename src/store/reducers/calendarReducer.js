import { SET_CALENDAR, CLEAR_CALENDAR } from "../types";

const date = new Date();
const firstDay =
  process.env.NODE_ENV === "production"
    ? new Date(date.getFullYear(), date.getMonth(), 1)
    : new Date(new Date().getFullYear(), 0, 1);
const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 1);

const initialState = {
  startDate: firstDay,
  endDate: lastDay,
};

export const calendarReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case SET_CALENDAR:
      return {
        ...state,
        startDate: payload.startDate,
        endDate: payload.endDate,
      };
    case CLEAR_CALENDAR:
      return {
        ...state,
        startDate: firstDay,
        endDate: lastDay,
      };

    default:
      return state;
  }
};
