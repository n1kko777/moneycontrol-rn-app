import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { alert } from 'utils';

import { url } from '../constants';
import failHandler from '../failHandler';
import {
  REGISTER_SUCCESS,
  AUTH_START,
  AUTH_SUCCESS,
  AUTH_FAIL,
  AUTH_LOGOUT,
  CLEAR_PROFILE,
  CLEAR_COMPANY,
  CLEAR_ACCOUNT,
  CLEAR_TRANSACTION,
  CLEAR_ACTION,
  CLEAR_TRANSFER,
  CLEAR_CATEGORY,
  CLEAR_TAG,
  RESET_SUCCESS,
  CLEAR_HOME_DATA,
  CLEAR_OPERATION_DATA,
  CLEAR_PROFILE_DATA,
  CLEAR_LAYOUT,
} from '../types';

export const authStart = () => (dispatch) => {
  dispatch({
    type: AUTH_START,
  });
};

export const authSuccess = (user) => async (dispatch) => {
  try {
    await AsyncStorage.setItem('AUTH_TOKEN', user.key);

    dispatch({
      type: AUTH_SUCCESS,
      payload: user,
    });
  } catch (error) {
    dispatch(failHandler(error, AUTH_FAIL));
  }
};
export const registerSuccess = (user) => (dispatch) => {
  alert('Регистрация прошла успешно!', 'Войдите в аккаунт.', [{ text: 'Закрыть' }], {
    cancelable: false,
  });

  dispatch({
    type: REGISTER_SUCCESS,
    payload: user,
  });
};

export const logout = (navigation) => async (dispatch) => {
  await navigation.navigate('Login');

  try {
    await AsyncStorage.clear();
  } catch (error) {
    dispatch(failHandler(error, AUTH_FAIL));
  }

  dispatch({
    type: AUTH_LOGOUT,
  });
  dispatch({
    type: CLEAR_LAYOUT,
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
  dispatch({
    type: CLEAR_HOME_DATA,
  });
  dispatch({
    type: CLEAR_OPERATION_DATA,
  });
  dispatch({
    type: CLEAR_PROFILE_DATA,
  });
};

export const authLogin = (email, password) => async (dispatch) => {
  try {
    dispatch(authStart());
    return axios
      .post(`${url}/dj-rest-auth/login/`, {
        email,
        password,
      })
      .then(async (res) => {
        await dispatch(authSuccess(res.data));
      })
      .catch((error) => {
        dispatch(failHandler(error, AUTH_FAIL));
      });
  } catch (error) {
    dispatch(failHandler(error, AUTH_FAIL));
    return Promise.reject();
  }
};

export const authSignUp =
  ({ first_name, last_name, email, password1, password2 }) =>
  async (dispatch) => {
    try {
      dispatch(authStart());
      return axios
        .post(`${url}/dj-rest-auth/registration/`, {
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
        .catch((error) => {
          dispatch(failHandler(error, AUTH_FAIL));
        });
    } catch (error) {
      dispatch(failHandler(error, AUTH_FAIL));
      return Promise.reject();
    }
  };

export const resetPass =
  ({ email }, onSuccess) =>
  async (dispatch) => {
    try {
      dispatch(authStart());
      return axios
        .post(`${url}/dj-rest-auth/password/reset/`, {
          email,
        })
        .then((res) => {
          onSuccess();
          const { detail } = res.data;
          alert('Проверьте почту', `${detail}`, [{ text: 'Закрыть' }], {
            cancelable: false,
          });
          dispatch({ type: RESET_SUCCESS });
        })
        .catch((error) => {
          dispatch(failHandler(error, AUTH_FAIL));
        });
    } catch (error) {
      dispatch(failHandler(error, AUTH_FAIL));
      return Promise.reject();
    }
  };
