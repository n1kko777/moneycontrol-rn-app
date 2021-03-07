import {
  SET_HOME_DATA,
  CLEAR_HOME_DATA,
  SET_OPERATION_DATA,
  CLEAR_OPERATION_DATA,
  SET_PROFILE_DATA,
  CLEAR_PROFILE_DATA,
  SET_TOTAL_BALANCE,
  SET_TOTAL_ACTIONS,
  SET_TOTAL_TRANSACTIONS,
  CLEAR_TOTAL_BALANCE,
  CLEAR_TOTAL_ACTIONS,
  CLEAR_TOTAL_TRANSACTIONS,
  CLEAR_LAYOUT,
  SET_FILTER_PARAMS,
  CLEAR_FILTER_PARAMS,
} from "../types";

const operationTypeData = [
  {
    index: 0,
    text: "Доход",
    title: "Доход",
    id: "action",
  },
  {
    index: 1,
    text: "Расход",
    title: "Расход",
    id: "transaction",
  },
  {
    index: 2,
    text: "Перевод",
    title: "Перевод",
    id: "transfer",
  },
];

const initialState = {
  homeListData: [],
  operationListData: [],
  operationTypeData: operationTypeData,
  profileData: null,
  filterParams: null,
  totalBalance: 0,
  totalActions: 0,
  totalTransactions: 0,
};

export const layoutReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case SET_FILTER_PARAMS:
      return {
        ...state,
        filterParams: payload,
      };
    case CLEAR_FILTER_PARAMS:
      return {
        ...state,
        filterParams: null,
      };
    case SET_TOTAL_BALANCE:
      return {
        ...state,
        totalBalance: payload,
      };
    case CLEAR_TOTAL_BALANCE:
      return {
        ...state,
        totalBalance: 0,
      };
    case SET_TOTAL_ACTIONS:
      return {
        ...state,
        totalActions: payload,
      };
    case CLEAR_TOTAL_ACTIONS:
      return {
        ...state,
        totalActions: 0,
      };
    case SET_TOTAL_TRANSACTIONS:
      return {
        ...state,
        totalTransactions: payload,
      };
    case CLEAR_TOTAL_TRANSACTIONS:
      return {
        ...state,
        totalTransactions: 0,
      };
    case SET_HOME_DATA:
      return {
        ...state,
        homeListData: payload,
      };
    case CLEAR_HOME_DATA:
      return {
        ...state,
        homeListData: [],
      };
    case SET_PROFILE_DATA:
      return {
        ...state,
        profileData: payload,
      };
    case CLEAR_PROFILE_DATA:
      return {
        ...state,
        profileData: null,
      };
    case SET_OPERATION_DATA:
      return {
        ...state,
        operationListData: payload,
      };
    case CLEAR_OPERATION_DATA:
      return {
        ...state,
        operationListData: [],
      };
    case CLEAR_LAYOUT:
      return {
        ...state,
        homeListData: [],
        operationListData: [],
        filterParams: null,
        totalBalance: 0,
        totalActions: 0,
        totalTransactions: 0,
      };
    default:
      return state;
  }
};
