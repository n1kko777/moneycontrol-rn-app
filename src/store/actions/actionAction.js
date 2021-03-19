import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  CREATE_ACTION,
  LOADING_ACTION,
  ERROR_ACTION,
  DELETE_ACTION,
} from "../types";

import { endpointAPI } from "../constants";
import failHandler from "../failHandler";

// Set loading to true
export const setLoading = () => ({
  type: LOADING_ACTION,
});

// Create action from server
export const createAction = (action) => async (dispatch) => {
  try {
    dispatch(setLoading());
    const token = await AsyncStorage.getItem("AUTH_TOKEN");

    return axios
      .post(
        `${endpointAPI}/action/`,
        {
          ...action,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`,
          },
        }
      )
      .then(() => {
        dispatch({
          type: CREATE_ACTION,
        });
      })

      .catch((error) => {
        dispatch(failHandler(error, ERROR_ACTION));
      });
  } catch (error) {
    dispatch(failHandler(error, ERROR_ACTION));
    return Promise.reject();
  }
};

// Delete action from server
export const hideAction = (action) => async (dispatch) => {
  try {
    dispatch(setLoading());
    const token = await AsyncStorage.getItem("AUTH_TOKEN");

    return axios
      .delete(`${endpointAPI}/action/${action}/`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
        },
      })
      .then(() => {
        dispatch({
          type: DELETE_ACTION,
        });
      })

      .catch((error) => {
        dispatch(failHandler(error, ERROR_ACTION));
      });
  } catch (error) {
    dispatch(failHandler(error, ERROR_ACTION));
    return Promise.reject();
  }
};
