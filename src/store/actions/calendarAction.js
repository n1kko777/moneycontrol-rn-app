import { SET_CALENDAR, CLEAR_CALENDAR } from "../types";
import { generateOperationData } from "./layoutAction";

export const setCalendar = (range) => (dispatch) => {
  dispatch({
    type: SET_CALENDAR,
    payload: range,
  });
  dispatch(generateOperationData());
};

export const clearCalendar = () => (dispatch) => {
  dispatch({
    type: CLEAR_CALENDAR,
  });

  dispatch(generateOperationData());
};
