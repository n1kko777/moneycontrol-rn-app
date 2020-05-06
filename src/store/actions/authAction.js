import axios from "axios";
import {
  REGISTER_SUCCESS,
  AUTH_START,
  AUTH_SUCCESS,
  AUTH_FAIL,
  AUTH_LOGOUT,
  REMIND_ME,
  CLEAR_PROFILE,
  CLEAR_COMPANY,
  CLEAR_ACCOUNT,
  CLEAR_TRANSACTION,
  CLEAR_ACTION,
  CLEAR_TRANSFER,
  CLEAR_CATEGORY,
  CLEAR_TAG,
  RESET_SUCCESS,
} from "../types";

import { url } from "../constants";
import { Alert, AsyncStorage } from "react-native";

export const authStart = () => (dispatch) => {
  dispatch({
    type: AUTH_START,
  });
};

export const authSuccess = (user) => async (dispatch) => {
  try {
    await AsyncStorage.setItem("AUTH_TOKEN", user.key);

    dispatch({
      type: AUTH_SUCCESS,
      payload: user,
    });
  } catch (error) {
    dispatch(authFail(error));
  }
};
export const registerSuccess = (user) => (dispatch) => {
  Alert.alert(
    "Регистрация прошла успешно!",
    "Войдите в аккаунт.",
    [{ text: "Закрыть" }],
    {
      cancelable: false,
    }
  );
  console.log("Регистрация прошла успешно!");

  dispatch({
    type: REGISTER_SUCCESS,
    payload: user,
  });
};

export const authFail = (error) => (dispatch) => {
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
    type: AUTH_FAIL,
    payload: error,
  });
};

export const logout = () => async (dispatch) => {
  try {
    await AsyncStorage.clear();
  } catch (error) {
    dispatch(authFail(error));
  }

  dispatch({
    type: AUTH_LOGOUT,
  });

  dispatch({
    type: CLEAR_PROFILE,
  });
  dispatch({
    type: CLEAR_COMPANY,
  });
  dispatch({
    type: CLEAR_ACCOUNT,
  });
  dispatch({
    type: CLEAR_TRANSACTION,
  });
  dispatch({
    type: CLEAR_ACTION,
  });
  dispatch({
    type: CLEAR_TRANSFER,
  });
  dispatch({
    type: CLEAR_CATEGORY,
  });
  dispatch({
    type: CLEAR_TAG,
  });
};

export const authLogin = (email, password, isRemindMe) => async (dispatch) => {
  dispatch(authStart());

  return await axios
    .post(`${url}/rest-auth/login/`, {
      email: email,
      password: password,
    })
    .then(async (res) => {
      await dispatch(authSuccess(res.data));
    })
    .catch(async (error) => await dispatch(authFail(error)));
};

export const authSignUp = ({
  first_name,
  last_name,
  email,
  password1,
  password2,
}) => async (dispatch) => {
  dispatch(authStart());
  return await axios
    .post(`${url}/rest-auth/registration/`, {
      first_name,
      last_name,
      email,
      password1,
      password2,
    })
    .then((res) => {
      const authUser = {
        token: res.data.key,
        first_name,
        last_name,
        email,
        password1,
      };
      dispatch(registerSuccess(authUser));
    })
    .catch((err) => dispatch(authFail(err)));
};

export const resetPass = ({ email }) => async (dispatch) => {
  dispatch(authStart());
  return await axios
    .post(`${url}/rest-auth/password/reset/`, {
      email,
    })
    .then((res) => {
      const { detail } = res.data;
      Alert.alert("Проверьте почту", `${detail}`, [{ text: "Закрыть" }], {
        cancelable: false,
      });
      dispatch({ type: RESET_SUCCESS });
    })
    .catch((err) => dispatch(authFail(err)));
};
