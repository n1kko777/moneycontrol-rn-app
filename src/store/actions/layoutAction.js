import { SET_HOME_DATA, CLEAR_HOME_DATA } from "../types";
import { prepareHomeData } from "../../prepareHomeData";
import { filterArrayByDate } from "../../filterArrayByDate";

export const generateHomeData = () => (dispatch, getState) => {
  const store = getState();

  const { startDate, endDate } = store.calendar;
  const { profile } = store.profile;
  const { company } = store.company;
  const { accounts } = store.account;
  const { transactions } = store.transaction;
  const { actions } = store.action;
  const { transfer } = store.transfer;
  const { categories } = store.category;
  const { tags } = store.tag;

  const homeListData = prepareHomeData(
    profile,
    company,
    accounts,
    filterArrayByDate(transactions, startDate, endDate),
    filterArrayByDate(actions, startDate, endDate),
    filterArrayByDate(transfer, startDate, endDate),
    categories,
    tags
  );

  dispatch({
    type: SET_HOME_DATA,
    payload: homeListData,
  });
};
