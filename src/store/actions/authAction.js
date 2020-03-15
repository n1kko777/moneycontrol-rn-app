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
import { Alert } from "react-native";

export const authStart = () => {
  return {
    type: AUTH_START
  };
};

export const authSuccess = user => dispatch => {
  axios.defaults.headers.common["Authorization"] =
    "Token " + JSON.parse(localStorage.getItem("user")).token;

  dispatch(getUser(user));
  dispatch(getOperations());

  dispatch({
    type: AUTH_SUCCESS,
    payload: user
  });
};
export const registerSuccess = user => {
  Alert.alert("Регистрация прошла успешно!", "", [{ text: "Закрыть" }], {
    cancelable: false
  });
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
    errorObject.message = `${keys.join(",")}: ${error.response.data[keys[0]]}`;
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

export const logout = () => {
  localStorage.removeItem("user");
  localStorage.removeItem("periodData");
  delete axios.defaults.headers.common["Authorization"];

  Redirect("/");
  return {
    type: AUTH_LOGOUT
  };
};

export const authLogin = (email, password, isRemindMe) => {
  return dispatch => {
    dispatch(authStart());

    axios
      .post(`${endpointAPI}/api-token-auth/login/`, {
        email: email,
        password: password
      })
      .then(res => {
        if (isRemindMe) {
          localStorage.setItem("user", JSON.stringify(res.data));
        }
        const periodData = JSON.parse(localStorage.getItem("periodData"));

        if (periodData !== null) {
          dispatch(
            updatePeriod(periodData.period, moment(periodData.period_start))
          );
        } else {
          dispatch(updatePeriod("Месяц", moment().startOf("month")));
        }

        dispatch(authSuccess(res.data));
      })
      .catch(error => dispatch(authFail(error)));
  };
};

export const authSignUp = ({
  firstname,
  lastname,
  email,
  password1,
  password2
}) => {
  return dispatch => {
    dispatch(authStart());
    axios
      .post(`${url}/rest-auth/registration/`, {
        firstname,
        lastname,
        email,
        password1,
        password2
      })
      .then(res => {
        const user = res.data;
        dispatch(registerSuccess(user));
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
