import moment from 'moment';

export const filterArrayByDate = (arr: any[], startDate: any, endDate: any) =>
  arr.filter((elem) => moment(elem.last_updated).isBetween(moment(startDate), moment(endDate)));
