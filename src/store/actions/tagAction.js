import axios from "axios";
import { GET_TAG, CREATE_TAG, LOADING_TAG, ERROR_TAG } from "../types";

import { endpointAPI } from "../constants";
import { Alert, AsyncStorage } from "react-native";

// Get tag from server
export const getTag = () => async (dispatch) => {
  dispatch(setLoading());

  try {
    const token = await AsyncStorage.getItem("AUTH_TOKEN");

    return await axios
      .get(`${endpointAPI}/Tag/`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Token " + token,
        },
      })
      .then((res) => {
        const tag = res.data.filter((elem) => elem.is_active);

        dispatch({
          type: GET_TAG,
          payload: tag,
        });
      })

      .catch((error) => {
        dispatch(tagFail(error));
      });
  } catch (error) {
    dispatch(tagFail(error));
  }
};

// Create tag from server
export const createTag = (tag) => async (dispatch) => {
  dispatch(setLoading());

  try {
    const token = await AsyncStorage.getItem("AUTH_TOKEN");

    return await axios
      .post(
        `${endpointAPI}/Tag/`,
        {
          ...tag,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Token " + token,
          },
        }
      )
      .then((res) => {
        const tag = res.data;

        dispatch({
          type: CREATE_TAG,
          payload: tag,
        });
      })

      .catch((error) => {
        dispatch(tagFail(error));
      });
  } catch (error) {
    dispatch(tagFail(error));
  }
};

export const tagFail = (error) => (dispatch) => {
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
    cancelable: false,
  });

  dispatch({
    type: ERROR_TAG,
    payload: error,
  });
};

// Set loading to true
export const setLoading = () => (dispatch) => {
  dispatch({
    type: LOADING_TAG,
  });
};
