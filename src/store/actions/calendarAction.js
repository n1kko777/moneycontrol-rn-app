import { SET_CALENDAR, CLEAR_CALENDAR } from "../types";
import { updateLayouts } from "./layoutAction";

export const setCalendar = (range) => (dispatch) => {
  dispatch({
    type: SET_CALENDAR,
    payload: range,
  });
  dispatch(updateLayouts());
};

export const clearCalendar = () => (dispatch) => {
  dispatch({
    type: CLEAR_CALENDAR,
  });

  dispatch(updateLayouts());
};
