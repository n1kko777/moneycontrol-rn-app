import moment from 'moment';
import { SET_CALENDAR, CLEAR_CALENDAR } from '../types';

const firstDay =
  process.env.NODE_ENV === 'production' ? moment().startOf('month') : moment().startOf('year');
const lastDay = moment().endOf('month');

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
