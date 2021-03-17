import axios from "axios";
import moment from "moment";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  GET_ACCOUNT,
  CREATE_ACCOUNT,
  LOADING_ACCOUNT,
  ERROR_ACCOUNT,
  DELETE_ACCOUNT,
  UPDATE_ACCOUNT,
  SET_CURRENT_ACCOUNT,
  CLEAR_CURRENT_ACCOUNT,
} from "../types";

import { endpointAPI } from "../constants";
import failHandler from "../failHandler";

// Set loading to true
export const setLoading = () => ({
  type: LOADING_ACCOUNT,
});

// Set current account
export const setCurrentAccount = (account) => ({
  type: SET_CURRENT_ACCOUNT,
  payload: account,
});

// Clear current account
export const clearCurrentAccount = () => ({
  type: CLEAR_CURRENT_ACCOUNT,
});

// Get account from server
export const getAccount = () => async (dispatch) => {
  try {
    dispatch(setLoading());
    const token = await AsyncStorage.getItem("AUTH_TOKEN");

    return axios
      .get(`${endpointAPI}/account/`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
        },
      })
      .then((res) => {
        const account = res.data.filter((elem) => elem.is_active);

        dispatch({
          type: GET_ACCOUNT,
          payload: account,
        });
      })

      .catch((error) => {
        dispatch(failHandler(error, ERROR_ACCOUNT));
      });
  } catch (error) {
    dispatch(failHandler(error, ERROR_ACCOUNT));
    return Promise.reject();
  }
};

// Create account from server
export const createAccount = (account) => async (dispatch) => {
  try {
    dispatch(setLoading());
    const token = await AsyncStorage.getItem("AUTH_TOKEN");

    return axios
      .post(
        `${endpointAPI}/account/`,
        {
          ...account,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`,
          },
        }
      )
      .then((res) => {
        const resAccount = res.data;

        if (resAccount.last_updated === undefined) {
          resAccount.last_updated = moment();
        }

        dispatch({
          type: CREATE_ACCOUNT,
          payload: resAccount,
        });
      })

      .catch((error) => {
        dispatch(failHandler(error, ERROR_ACCOUNT));
      });
  } catch (error) {
    dispatch(failHandler(error, ERROR_ACCOUNT));
    return Promise.reject();
  }
};

// Update account from server
export const updateAccount = ({ id, account_name, balance }) => async (
  dispatch
) => {
  try {
    dispatch(setLoading());
    const token = await AsyncStorage.getItem("AUTH_TOKEN");

    return axios
      .put(
        `${endpointAPI}/account/${id}/`,
        {
          account_name,
          balance,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`,
          },
        }
      )
      .then((res) => {
        const updatedAccount = res.data;

        if (updatedAccount.last_updated === undefined) {
          updatedAccount.last_updated = moment();
        }

        dispatch({
          type: UPDATE_ACCOUNT,
          payload: updatedAccount,
        });
      })

      .catch((error) => {
        dispatch(failHandler(error, ERROR_ACCOUNT));
      });
  } catch (error) {
    dispatch(failHandler(error, ERROR_ACCOUNT));
    return Promise.reject();
  }
};

// Delete account from server
export const hideAccount = (account) => async (dispatch) => {
  if (+account.balance !== 0) {
    dispatch(
      failHandler(
        {
          custom: {
            title: "Баланс счета не равен 0!!",
            message: "Пожалуйста, переведи средства на другой счет.",
          },
        },
        ERROR_ACCOUNT
      )
    );

    return Promise.reject();
  }

  try {
    dispatch(setLoading());
    const token = await AsyncStorage.getItem("AUTH_TOKEN");

    return axios
      .delete(`${endpointAPI}/account/${account.id}/`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
        },
      })
      .then(() => {
        dispatch({
          type: DELETE_ACCOUNT,
          payload: account.id,
        });
      })

      .catch((error) => {
        dispatch(failHandler(error, ERROR_ACCOUNT));
      });
  } catch (error) {
    dispatch(failHandler(error, ERROR_ACCOUNT));
    return Promise.reject();
  }
};
