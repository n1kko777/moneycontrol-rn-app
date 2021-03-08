import moment from "moment";

export const filterArrayByDate = (arr, startDate, endDate) =>
  arr.filter((elem) =>
    moment(elem.last_updated).isBetween(moment(startDate), moment(endDate))
  );
