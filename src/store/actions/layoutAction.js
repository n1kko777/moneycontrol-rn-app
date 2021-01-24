import AsyncStorage from "@react-native-async-storage/async-storage";
import Axios from "axios";
import { endpointAPI } from "../constants";
import moment from "moment";

import {
  SET_HOME_DATA,
  SET_OPERATION_DATA,
  SET_FILTER_PARAM,
  CLEAR_FILTER_PARAM,
  SET_TOTAL_BALANCE,
  SET_TOTAL_ACTIONS,
  SET_TOTAL_TRANSACTIONS,
  SET_PROFILE_DATA,
  CLEAR_PROFILE_DATA,
  ERROR_LAYOUT,
} from "../types";

import failHandler from "../failHandler";

export const setFilterParam = (filterParam) => async (dispatch, getState) => {
  const filteredAray = JSON.parse(
    JSON.stringify(getState().layout.operationListData)
  ).filter((elem) => {
    switch (filterParam.type) {
      case "action":
      case "transaction":
      case "transfer":
        elem.data = elem.data.filter((item) => item.type === filterParam.type);
        break;
      case "tag":
        elem.data = elem.data.filter(
          (item) => item.tags !== undefined && item.tags === filterParam.id
        );
        break;
      case "category":
        elem.data = elem.data.filter(
          (item) =>
            item.category !== undefined && item.category === filterParam.id
        );
        break;
      case "account":
        elem.data = elem.data.filter(
          (item) =>
            (item.account !== undefined && item.account === filterParam.id) ||
            (item.from_account !== undefined &&
              parseInt(item.from_account_id) === filterParam.id) ||
            (item.to_account !== undefined &&
              parseInt(item.to_account_id) === filterParam.id)
        );
        break;
      case "profile":
        break;

      default:
        break;
    }
    return elem.data.length !== 0;
  });

  await dispatch({
    type: SET_FILTER_PARAM,
    payload: {
      filterParam,
      totalActions: parseFloat(
        []
          .concat(...filteredAray.map((el) => el.data))
          .filter((elem) => elem.type === "action")
          .reduce((sum, nextAcc) => (sum += +nextAcc.balance), 0)
      ),
      totalTransactions: parseFloat(
        []
          .concat(...filteredAray.map((el) => el.data))
          .filter((elem) => elem.type === "transaction")
          .reduce((sum, nextAcc) => (sum += +nextAcc.balance), 0)
      ),
    },
  });
};

export const clearFilterParam = () => (dispatch) => {
  dispatch({
    type: CLEAR_FILTER_PARAM,
  });
  dispatch(generateOperationData());
};

export const clearProfileData = () => (dispatch) => {
  dispatch({
    type: CLEAR_PROFILE_DATA,
  });
};

export const generateHomeData = (profile_id = null) => async (dispatch) => {
  try {
    const token = await AsyncStorage.getItem("AUTH_TOKEN");

    return Axios.get(`${endpointAPI}/home-list/`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Token " + token,
      },
      params: {
        profile_id,
      },
    })
      .then((res) => {
        const { balance, data: homeListData } = res.data;
        if (profile_id !== null) {
          dispatch({
            type: SET_PROFILE_DATA,
            payload: { balance, data: homeListData },
          });
        } else {
          dispatch({
            type: SET_TOTAL_BALANCE,
            payload: balance,
          });
          dispatch({
            type: SET_HOME_DATA,
            payload: homeListData,
          });
        }
      })

      .catch((error) => {
        dispatch(failHandler(error, ERROR_LAYOUT));
      });
  } catch (error) {
    dispatch(failHandler(error, ERROR_LAYOUT));
  }
};

export const generateOperationData = (profile_id = null) => async (
  dispatch,
  getState
) => {
  try {
    const token = await AsyncStorage.getItem("AUTH_TOKEN");

    return Axios.get(`${endpointAPI}/operation-list/`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Token " + token,
      },
      params: {
        start_date:
          getState().calendar.startDate !== null
            ? getState().calendar.startDate
            : momentc(),
        end_date:
          getState().calendar.endDate !== null
            ? getState().calendar.endDate
            : moment(),
      },
    })
      .then((res) => {
        const {
          total_action,
          total_transaction,
          data: operationListData,
        } = res.data;
        dispatch({
          type: SET_TOTAL_ACTIONS,
          payload: total_action !== null ? total_action : "0",
        });
        dispatch({
          type: SET_TOTAL_TRANSACTIONS,
          payload: total_transaction !== null ? total_transaction : "0",
        });
        dispatch({
          type: SET_OPERATION_DATA,
          payload: operationListData,
        });
      })

      .catch((error) => {
        dispatch(failHandler(error, ERROR_LAYOUT));
      });
  } catch (error) {
    dispatch(failHandler(error, ERROR_LAYOUT));
  }
};

export const updateLayouts = () => (dispatch) => {
  dispatch(generateHomeData());
  dispatch(generateOperationData());
};
