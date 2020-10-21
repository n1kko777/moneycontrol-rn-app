import {
  SET_HOME_DATA,
  CLEAR_HOME_DATA,
  SET_OPERATION_DATA,
  CLEAR_OPERATION_DATA,
  SET_FILTER_PARAM,
  CLEAR_FILTER_PARAM,
  SET_TOTAL_BALANCE,
  SET_TOTAL_ACTIONS,
  SET_TOTAL_TRANSACTIONS,
  CLEAR_TOTAL_BALANCE,
  CLEAR_TOTAL_ACTIONS,
  CLEAR_TOTAL_TRANSACTIONS,
  CLEAR_LAYOUT,
} from "../types";

const initialState = {
  homeListData: [],
  operationListData: [],
  filteredOperationListData: [],
  filterParam: null,
  totalBalance: 0,
  totalActions: 0,
  totalTransactions: 0,
};

export const layoutReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
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
    case SET_FILTER_PARAM:
      return {
        ...state,
        filterParam: payload.filterParam,
        filteredOperationListData: payload.filteredOperationListData,
        totalActions: payload.totalActions,
        totalTransactions: payload.totalTransactions,
      };
    case CLEAR_FILTER_PARAM:
      return {
        ...state,
        filterParam: null,
        filteredOperationListData: [],
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
    case SET_OPERATION_DATA:
      return {
        ...state,
        operationListData: payload,
        filterParam: null,
        filteredOperationListData: [],
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
        filterParam: null,
        totalBalance: 0,
        totalActions: 0,
        totalTransactions: 0,
      };
    default:
      return state;
  }
};
