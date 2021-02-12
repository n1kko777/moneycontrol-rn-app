import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  CREATE_TRANSACTION,
  LOADING_TRANSACTION,
  ERROR_TRANSACTION,
  DELETE_TRANSACTION,
} from "../types";

import { endpointAPI } from "../constants";
import failHandler from "../failHandler";

// Create transaction from server
export const createTransaction = (transaction) => async (dispatch) => {
  dispatch(setLoading());
  try {
    const token = await AsyncStorage.getItem("AUTH_TOKEN");

    return axios
      .post(
        `${endpointAPI}/transaction/`,
        {
          ...transaction,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Token " + token,
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
  }
};

// Delete transaction from server
export const hideTransaction = (transaction) => async (dispatch) => {
  dispatch(setLoading());

  try {
    const token = await AsyncStorage.getItem("AUTH_TOKEN");

    return axios
      .delete(`${endpointAPI}/transaction/${transaction}/`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Token " + token,
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
  }
};

// Set loading to true
export const setLoading = () => ({
  type: LOADING_TRANSACTION,
});
