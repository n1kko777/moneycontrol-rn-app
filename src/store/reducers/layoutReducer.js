import {
  SET_HOME_DATA,
  CLEAR_HOME_DATA,
  SET_OPERATION_DATA,
  CLEAR_OPERATION_DATA,
  SET_FILTER_PARAM,
  CLEAR_FILTER_PARAM,
} from "../types";

const initialState = {
  homeListData: [],
  operationListData: [],
  formatedOperationList: [],
  filterParam: null,
};

export const layoutReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case SET_FILTER_PARAM:
      return {
        ...state,
        filterParam: payload,
      };
    case CLEAR_FILTER_PARAM:
      return {
        ...state,
        filterParam: null,
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
        operationListData: payload.operationListData,
        formatedOperationList: payload.formatedOperationList,
      };
    case CLEAR_OPERATION_DATA:
      return {
        ...state,
        operationListData: [],
        formatedOperationList: [],
      };
    default:
      return state;
  }
};
