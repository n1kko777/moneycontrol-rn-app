import axios from "axios";
import {
  REGISTER_SUCCESS,
  AUTH_START,
  AUTH_SUCCESS,
  AUTH_FAIL,
  AUTH_LOGOUT,
  REMIND_ME
} from "../types";

import { url, endpointAPI } from "../constants";
import { Alert, AsyncStorage } from "react-native";

export const authStart = () => {
  return {
    type: AUTH_START
  };
};

export const authSuccess = user => dispatch => {
  axios.defaults.headers.common["Authorization"] = "Token " + user.key;

  dispatch({
    type: AUTH_SUCCESS,
    payload: user
  });
};
export const registerSuccess = user => {
  Alert.alert(
    "Регистрация прошла успешно!",
    "Войдите в аккаунт.",
    [{ text: "Закрыть" }],
    {
      cancelable: false
    }
  );
  console.log("Регистрация прошла успешно!");

  return {
    type: REGISTER_SUCCESS,
    payload: user
  };
};

export const authFail = error => dispatch => {
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
    type: AUTH_FAIL,
    payload: error
  });
};

export const logout = navigation => {
  delete axios.defaults.headers.common["Authorization"];

  navigation.navigate("Login");

  return {
    type: AUTH_LOGOUT
  };
};

export const authLogin = (email, password, isRemindMe) => {
  return dispatch => {
    dispatch(authStart());

    axios
      .post(`${url}/rest-auth/login/`, {
        email: email,
        password: password
      })
      .then(res => {
        dispatch(authSuccess(res.data));
      })
      .catch(error => dispatch(authFail(error)));
  };
};

export const authSignUp = ({
  first_name,
  last_name,
  email,
  password1,
  password2
}) => {
  return dispatch => {
    dispatch(authStart());
    axios
      .post(`${url}/rest-auth/registration/`, {
        first_name,
        last_name,
        email,
        password1,
        password2
      })
      .then(res => {
        const authUser = {
          token: res.data.key,
          first_name,
          last_name,
          email,
          password1
        };
        dispatch(registerSuccess(authUser));
      })
      .catch(async err => await dispatch(authFail(err)));
  };
};

export const authCheckState = () => dispatch => {
  const user = JSON.parse(localStorage.getItem("user"));
  const periodData = JSON.parse(localStorage.getItem("periodData"));

  if (user === null) {
    dispatch(logout());
  } else {
    dispatch(authSuccess(user));
    if (periodData !== null) {
      dispatch(
        updatePeriod(periodData.period, moment(periodData.period_start))
      );
    } else {
      dispatch(updatePeriod("Месяц", moment().startOf("month")));
    }
  }
};
