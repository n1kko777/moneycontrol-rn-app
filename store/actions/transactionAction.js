import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

import { endpointAPI } from '../constants';
import failHandler from '../failHandler';
import {
  CREATE_TRANSACTION,
  LOADING_TRANSACTION,
  ERROR_TRANSACTION,
  DELETE_TRANSACTION,
} from '../types';

// Set loading to true
export const setLoading = () => ({
  type: LOADING_TRANSACTION,
});

// Create transaction from server
export const createTransaction = (transaction) => async (dispatch) => {
  try {
    dispatch(setLoading());
    const token = await AsyncStorage.getItem('AUTH_TOKEN');

    return axios
      .post(
        `${endpointAPI}/transaction/`,
        {
          ...transaction,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Token ${token}`,
          },
        }
      )
      .then(() => {
        dispatch({
          type: CREATE_TRANSACTION,
        });
      })
      .catch((error) => {
        dispatch(failHandler(error, ERROR_TRANSACTION));
      });
  } catch (error) {
    dispatch(failHandler(error, ERROR_TRANSACTION));
    return Promise.reject();
  }
};

// Delete transaction from server
export const hideTransaction = (transaction) => async (dispatch) => {
  try {
    dispatch(setLoading());
    const token = await AsyncStorage.getItem('AUTH_TOKEN');

    return axios
      .delete(`${endpointAPI}/transaction/${transaction}/`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Token ${token}`,
        },
      })
      .then(() => {
        dispatch({
          type: DELETE_TRANSACTION,
        });
      })
      .catch((error) => {
        dispatch(failHandler(error, ERROR_TRANSACTION));
      });
  } catch (error) {
    dispatch(failHandler(error, ERROR_TRANSACTION));
    return Promise.reject();
  }
};
