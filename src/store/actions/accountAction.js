import axios from "axios";
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
import { Alert, AsyncStorage } from "react-native";
import moment from "moment";

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
  dispatch(setLoading());

  const token = await AsyncStorage.getItem("AUTH_TOKEN");

  return await axios
    .get(`${endpointAPI}/account/`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Token " + token,
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
      dispatch(accountFail(error));
    });
};

// Create account from server
export const createAccount = (account) => async (dispatch) => {
  dispatch(setLoading());
  const token = await AsyncStorage.getItem("AUTH_TOKEN");

  return await axios
    .post(
      `${endpointAPI}/account/`,
      {
        ...account,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Token " + token,
        },
      }
    )
    .then((res) => {
      const account = res.data;

      if (account["last_updated"] == undefined) {
        account["last_updated"] = moment();
      }

      dispatch({
        type: CREATE_ACCOUNT,
        payload: account,
      });
    })

    .catch((error) => {
      dispatch(accountFail(error));
    });
};

// Update account from server
export const updateAccount = (id, account) => async (dispatch) => {
  dispatch(setLoading());
  const token = await AsyncStorage.getItem("AUTH_TOKEN");

  return await axios
    .put(
      `${endpointAPI}/account/${id}/`,
      {
        ...account,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Token " + token,
        },
      }
    )
    .then((res) => {
      const updatedAccount = res.data;

      if (updatedAccount["last_updated"] == undefined) {
        updatedAccount["last_updated"] = moment();
      }

      dispatch({
        type: UPDATE_ACCOUNT,
        payload: updatedAccount,
      });
    })

    .catch((error) => {
      dispatch(accountFail(error));
    });
};

// Delete account from server
export const hideAccount = (account) => async (dispatch) => {
  if (+account.balance !== 0) {
    dispatch(
      accountFail({
        custom: {
          title: "Баланс счета не равен 0!!",
          message: "Пожалуйста, переведи средства на другой счет.",
        },
      })
    );

    return;
  }

  dispatch(setLoading());

  const token = await AsyncStorage.getItem("AUTH_TOKEN");

  return await axios
    .delete(`${endpointAPI}/account/${account.id}/`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Token " + token,
      },
    })
    .then((res) => {
      dispatch({
        type: DELETE_ACCOUNT,
        payload: account.id,
      });
    })

    .catch((error) => {
      dispatch(accountFail(error));
    });
};

export const accountFail = (error) => (dispatch) => {
  const errorObject = {};
  if (error.response) {
    // The request was made and the server responded with a status code
    const keys = [];

    for (const k in error.response.data) keys.push(k);

    console.log(
      `Код ошибки: ${error.response.status}. ${
        error.response.data[keys[0]]
      } Повторите попытку позже.`
    );

    errorObject.title = `Код ошибки: ${error.response.status}`;
    errorObject.message =
      error.response.status === 404
        ? `${error.response.data}`
        : `${keys.join(",")}: ${error.response.data[keys[0]]}`;
    errorObject.message =
      error.response.status === 405
        ? `${error.response.data}`
        : `${keys.join(",")}: ${error.response.data[keys[0]]}`;
  } else if (error.request) {
    // The request was made but no response was received
    console.log("Не удалось соединиться с сервером. Повторите попытку позже.");

    errorObject.title = `Не удалось соединиться с сервером`;
    errorObject.message = `Повторите попытку позже`;
  } else if (error.custom) {
    // Something happened in setting up the request that triggered an Error
    console.log("Что-то пошло не так... Повторите попытку позже.");

    errorObject.title = error.custom.title;
    errorObject.message = error.custom.message;
  } else {
    // Something happened in setting up the request that triggered an Error
    console.log("Что-то пошло не так... Повторите попытку позже.");

    errorObject.title = `Что-то пошло не так...`;
    errorObject.message = `Повторите попытку позже`;
  }

  Alert.alert(errorObject.title, errorObject.message, [{ text: "Закрыть" }], {
    cancelable: false,
  });

  dispatch({
    type: ERROR_ACCOUNT,
    payload: error,
  });
};

// Set loading to true
export const setLoading = () => (dispatch) => {
  dispatch({
    type: LOADING_ACCOUNT,
  });
};
