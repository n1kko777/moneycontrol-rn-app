import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

import { endpointAPI } from '../constants';
import failHandler from '../failHandler';
import { CREATE_TRANSFER, LOADING_TRANSFER, ERROR_TRANSFER, DELETE_TRANSFER } from '../types';

// Set loading to true
export const setLoading = () => ({
  type: LOADING_TRANSFER,
});

// Create transfer from server
export const createTransfer = (transfer) => async (dispatch) => {
  try {
    dispatch(setLoading());
    const token = await AsyncStorage.getItem('AUTH_TOKEN');

    return axios
      .post(
        `${endpointAPI}/transfer/`,
        {
          ...transfer,
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
          type: CREATE_TRANSFER,
        });
      })
      .catch((error) => {
        dispatch(failHandler(error, ERROR_TRANSFER));
      });
  } catch (error) {
    dispatch(failHandler(error, ERROR_TRANSFER));
    return Promise.reject();
  }
};

// Delete transfer from server
export const hideTransfer = (transfer) => async (dispatch) => {
  try {
    dispatch(setLoading());
    const token = await AsyncStorage.getItem('AUTH_TOKEN');

    return axios
      .delete(`${endpointAPI}/transfer/${transfer}/`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Token ${token}`,
        },
      })
      .then(() => {
        dispatch({
          type: DELETE_TRANSFER,
        });
      })
      .catch((error) => {
        dispatch(failHandler(error, ERROR_TRANSFER));
      });
  } catch (error) {
    dispatch(failHandler(error, ERROR_TRANSFER));
    return Promise.reject();
  }
};
