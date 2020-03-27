import axios from "axios";
import {
  GET_TRANSFER,
  CREATE_TRANSFER,
  LOADING_TRANSFER,
  ERROR_TRANSFER
} from "../types";

import { endpointAPI } from "../constants";
import { Alert, AsyncStorage } from "react-native";
import moment from "moment";

// Get transfer from server
export const getTransfer = () => async dispatch => {
  dispatch(setLoading());

  try {
    const token = await AsyncStorage.getItem("AUTH_TOKEN");

    await axios
      .get(`${endpointAPI}/Transfer/`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Token " + token
        }
      })
      .then(res => {
        const transfer = res.data.filter(elem =>
          moment(elem.last_updated).isBetween(
            moment().startOf("month"),
            moment().endOf("month")
          )
        );

        dispatch({
          type: GET_TRANSFER,
          payload: transfer
        });
      })

      .catch(error => {
        dispatch(transferFail(error));
      });
  } catch (error) {
    dispatch(transferFail(error));
  }
};

// Create transfer from server
export const createTransfer = transfer => async dispatch => {
  dispatch(setLoading());

  try {
    const token = await AsyncStorage.getItem("AUTH_TOKEN");

    await axios
      .post(
        `${endpointAPI}/Transfer/`,
        {
          ...transfer
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Token " + token
          }
        }
      )
      .then(res => {
        const transfer = res.data.filter(elem =>
          moment(elem.last_updated).isBetween(
            moment().startOf("month"),
            moment().endOf("month")
          )
        );
        dispatch({
          type: CREATE_TRANSFER,
          payload: transfer
        });
      })

      .catch(error => {
        dispatch(transferFail(error));
      });
  } catch (error) {
    dispatch(transferFail(error));
  }
};

export const transferFail = error => dispatch => {
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
  } else if (error.request) {
    // The request was made but no response was received
    console.log("Не удалось соединиться с сервером. Повторите попытку позже.");

    errorObject.title = `Не удалось соединиться с сервером`;
    errorObject.message = `Повторите попытку позже`;
  } else {
    // Something happened in setting up the request that triggered an Error
    console.log("Что-то пошло не так... Повторите попытку позже.");

    errorObject.title = `Что-то пошло не так...`;
    errorObject.message = `Повторите попытку позже`;
  }

  Alert.alert(errorObject.title, errorObject.message, [{ text: "Закрыть" }], {
    cancelable: false
  });

  dispatch({
    type: ERROR_TRANSFER,
    payload: error
  });
};

// Set loading to true
export const setLoading = () => dispatch => {
  dispatch({
    type: LOADING_TRANSFER
  });
};