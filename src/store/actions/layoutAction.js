import {
  SET_HOME_DATA,
  SET_OPERATION_DATA,
  SET_FILTER_PARAM,
  CLEAR_FILTER_PARAM,
  SET_TOTAL_BALANCE,
  SET_TOTAL_ACTIONS,
  SET_TOTAL_TRANSACTIONS,
} from "../types";
import { prepareHomeData } from "../../prepareHomeData";
import { filterArrayByDate } from "../../filterArrayByDate";
import { prepareOperationData } from "../../prepareOperationData";
import moment from "moment";

export const setTotalBalance = () => (dispatch, getState) => {
  dispatch({
    type: SET_TOTAL_BALANCE,
    payload: parseFloat(
      getState().account.accounts.reduce(
        (sum, nextAcc) => (sum += +nextAcc.balance),
        0
      )
    ),
  });
};

export const setTotalActions = () => (dispatch, getState) => {
  dispatch({
    type: SET_TOTAL_ACTIONS,
    payload: parseFloat(
      getState()
        .layout.operationListData.filter((elem) => elem.type == "action")
        .reduce((sum, nextAcc) => (sum += +nextAcc.balance), 0)
    ),
  });
};

export const setTotalTransactions = () => (dispatch, getState) => {
  dispatch({
    type: SET_TOTAL_TRANSACTIONS,
    payload: parseFloat(
      getState()
        .layout.operationListData.filter((elem) => elem.type == "transaction")
        .reduce((sum, nextAcc) => (sum += +nextAcc.balance), 0)
    ),
  });
};

export const setFilterParam = (filterParam) => async (dispatch) => {
  dispatch({
    type: SET_FILTER_PARAM,
    payload: filterParam,
  });

  await dispatch(generateOperationData());
  dispatch(setTotalActions());
  dispatch(setTotalTransactions());
};

export const clearFilterParam = () => async (dispatch) => {
  dispatch({
    type: CLEAR_FILTER_PARAM,
  });

  await dispatch(generateOperationData());
  dispatch(setTotalActions());
  dispatch(setTotalTransactions());
};

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

export const generateOperationData = () => (dispatch, getState) => {
  const store = getState();

  const { startDate, endDate } = store.calendar;
  const { company } = store.company;
  const { accounts } = store.account;
  const { transactions } = store.transaction;
  const { actions } = store.action;
  const { transfer } = store.transfer;

  const { filterParam } = store.layout;

  const operationListData =
    filterParam !== null
      ? prepareOperationData(
          company,
          accounts,
          filterArrayByDate(transactions, startDate, endDate),
          filterArrayByDate(actions, startDate, endDate),
          filterArrayByDate(transfer, startDate, endDate)
        ).filter((elem) => {
          switch (filterParam.type) {
            case "action":
            case "transaction":
            case "transfer":
              return elem.type === filterParam.type;

            case "tag":
              return (
                elem.tags !== undefined && elem.tags.includes(filterParam.id)
              );

            case "category":
              return (
                elem.category !== undefined && elem.category === filterParam.id
              );
            case "account":
              return (
                (elem.account !== undefined &&
                  elem.account === filterParam.id) ||
                (elem.from_account !== undefined &&
                  parseInt(elem.from_account.split(" (pk=")[1]) ===
                    filterParam.id) ||
                (elem.to_account !== undefined &&
                  parseInt(elem.to_account.split(" (pk=")[1]) ===
                    filterParam.id)
              );

            case "profile":
              break;

            default:
              break;
          }

          return elem;
        })
      : prepareOperationData(
          company,
          accounts,
          filterArrayByDate(transactions, startDate, endDate),
          filterArrayByDate(actions, startDate, endDate),
          filterArrayByDate(transfer, startDate, endDate)
        );

  const formatedOperationList = operationListData.reduce(
    (arrDate, nextItem) => {
      if (
        arrDate
          .map((el) => el.title)
          .some(
            (el) => el === moment(nextItem.last_updated).format("DD.MM.YYYY")
          )
      ) {
        return arrDate.map((itemDay) => {
          if (
            itemDay.title === moment(nextItem.last_updated).format("DD.MM.YYYY")
          ) {
            itemDay.itemList = [...itemDay.itemList, nextItem];
          }

          return itemDay;
        });
      } else {
        return [
          ...arrDate,
          {
            title: moment(nextItem.last_updated).format("DD.MM.YYYY"),
            itemList: [nextItem],
          },
        ];
      }
    },
    []
  );

  dispatch({
    type: SET_OPERATION_DATA,
    payload: {
      operationListData,
      formatedOperationList,
    },
  });
};

export const updateLayouts = () => (dispatch) => {
  dispatch(generateHomeData());
  dispatch(generateOperationData());
  dispatch(setTotalBalance());
  dispatch(setTotalActions());
  dispatch(setTotalTransactions());
};
