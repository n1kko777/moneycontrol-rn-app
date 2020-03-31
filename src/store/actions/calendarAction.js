import { SET_CALENDAR, CLEAR_CALENDAR } from "../types";

export const setCalendar = range => dispatch => {
  dispatch({
    type: SET_CALENDAR,
    payload: range
  });
};

export const clearCalendar = () => dispatch => {
  dispatch({
    type: CLEAR_CALENDAR
  });
};
