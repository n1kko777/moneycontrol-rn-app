import axios from "axios";
import {
  GET_PROFILE,
  CREATE_PROFILE,
  UPDATE_PROFILE,
  LOADING_PROFILE,
  ERROR_PROFILE,
} from "../types";

import { endpointAPI } from "../constants";
import { Alert, AsyncStorage } from "react-native";

// Get profile from server
export const getProfile = () => async (dispatch) => {
  dispatch(setLoading());

  try {
    const token = await AsyncStorage.getItem("AUTH_TOKEN");

    return await axios
      .get(`${endpointAPI}/profile/`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Token " + token,
        },
      })
      .then((res) => {
        const profile = res.data[0];

        dispatch({
          type: GET_PROFILE,
          payload: profile,
        });
      })

      .catch((error) => {
        dispatch(profileFail(error));
      });
  } catch (error) {
    dispatch(profileFail(error));
  }
};

// Create profile from server
export const createProfile = (profile) => async (dispatch) => {
  dispatch(setLoading());

  try {
    const token = await AsyncStorage.getItem("AUTH_TOKEN");

    return await axios
      .post(
        `${endpointAPI}/profile/`,
        {
          ...profile,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Token " + token,
          },
        }
      )
      .then((res) => {
        const profile = res.data;

        dispatch({
          type: CREATE_PROFILE,
          payload: profile,
        });
      })

      .catch((error) => {
        dispatch(profileFail(error));
      });
  } catch (error) {
    dispatch(profileFail(error));
  }
};

// Update profile from server
export const updateProfile = (profile) => async (dispatch) => {
  dispatch(setLoading());

  console.log("profile :", profile);

  try {
    const token = await AsyncStorage.getItem("AUTH_TOKEN");

    return await axios
      .put(
        `${endpointAPI}/profile/${profile.id}/`,
        {
          ...profile,
        },
        {
          headers: {
            "Content-Type":
              profile.image !== null
                ? "multipart/form-data"
                : "application/json",
            Authorization: "Token " + token,
          },
        }
      )
      .then((res) => {
        const profile = res.data;

        dispatch({
          type: UPDATE_PROFILE,
          payload: profile,
        });
      })

      .catch((error) => {
        dispatch(profileFail(error));
      });
  } catch (error) {
    dispatch(profileFail(error));
  }
};

export const profileFail = (error) => (dispatch) => {
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
        ? `Не найдено`
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
    type: ERROR_PROFILE,
    payload: error,
  });
};

// Set loading to true
export const setLoading = () => (dispatch) => {
  dispatch({
    type: LOADING_PROFILE,
  });
};
