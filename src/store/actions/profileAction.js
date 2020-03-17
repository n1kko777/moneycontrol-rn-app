import axios from "axios";
import {
  GET_PROFILE,
  UPDATE_PROFILE,
  PROFILE_LOADING,
  PROFILE_ERROR
} from "../types";

import { logout } from "./authAction";

import { url, endpointAPI } from "../constants";
import { Alert, AsyncStorage } from "react-native";

// Get profile from server
export const getProfile = navigation => async dispatch => {
  setLoading();

  try {
    const token = await AsyncStorage.getItem("AUTH_TOKEN");

    axios
      .get(`${endpointAPI}/Profile/`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Token " + token
        }
      })
      .then(res => {
        const profile = res.data;

        console.log("profile :", profile);

        dispatch({
          type: GET_PROFILE,
          payload: profile
        });
      })

      .catch(error => {
        dispatch(logout(navigation));
        dispatch(profileFail(error));
      });
  } catch (error) {
    dispatch(authFail(error));
  }
};

export const profileFail = error => dispatch => {
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
    type: PROFILE_ERROR,
    payload: error
  });
};

// Set loading to true
export const setLoading = () => {
  return {
    type: PROFILE_LOADING
  };
};
