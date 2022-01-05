import { SET_CALENDAR, CLEAR_CALENDAR } from '../types';

export const setCalendar = (range) => ({
  type: SET_CALENDAR,
  payload: range,
});

export const clearCalendar = () => ({
  type: CLEAR_CALENDAR,
});
