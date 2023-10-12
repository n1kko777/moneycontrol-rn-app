import moment from 'moment';
import { SET_CALENDAR, CLEAR_CALENDAR } from '../types';

const firstDay = moment().startOf('day');
const lastDay = moment().endOf('day');
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
