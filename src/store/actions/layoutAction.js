import AsyncStorage from "@react-native-async-storage/async-storage";
import Axios from "axios";
import moment from "moment";
import { endpointAPI } from "../constants";

import {
  SET_HOME_DATA,
  SET_OPERATION_DATA,
  SET_TOTAL_BALANCE,
  SET_TOTAL_ACTIONS,
  SET_TOTAL_TRANSACTIONS,
  SET_PROFILE_DATA,
  CLEAR_PROFILE_DATA,
  ERROR_LAYOUT,
  SET_FILTER_PARAMS,
  CLEAR_FILTER_PARAMS,
} from "../types";

import failHandler from "../failHandler";

export const setFilterParams = (params) => ({
  type: SET_FILTER_PARAMS,
  payload: params,
});

export const clearFilterParams = () => ({
  type: CLEAR_FILTER_PARAMS,
});

export const clearProfileData = () => ({
  type: CLEAR_PROFILE_DATA,
});

export const generateHomeData = (profile_id = null) => async (dispatch) => {
  try {
    const token = await AsyncStorage.getItem("AUTH_TOKEN");

    return Axios.get(`${endpointAPI}/home-list/`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
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
    return Promise.reject();
  }
};

export const generateOperationData = (params = null, onSuccess) => async (
  dispatch,
  getState
) => {
  try {
    dispatch(setFilterParams(params));
    const token = await AsyncStorage.getItem("AUTH_TOKEN");
    const formatedParams = {};

    if (params && params !== null) {
      Object.entries(params).forEach(([key, value]) => {
        if (value.length) {
          formatedParams[key] = value.map((el) => el.id).join(",");
        }
      });
    }

    return Axios.get(`${endpointAPI}/operation-list/`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
      params: {
        start_date:
          getState().calendar.startDate !== null
            ? getState().calendar.startDate
            : moment(),
        end_date:
          getState().calendar.endDate !== null
            ? getState().calendar.endDate
            : moment(),
        ...formatedParams,
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

        if (onSuccess) {
          onSuccess();
        }
      })
      .catch((error) => {
        dispatch(failHandler(error, ERROR_LAYOUT));
      });
  } catch (error) {
    dispatch(failHandler(error, ERROR_LAYOUT));
    return Promise.reject();
  }
};

export const updateLayouts = () => (dispatch) => {
  dispatch(generateHomeData());
  dispatch(generateOperationData());
};
