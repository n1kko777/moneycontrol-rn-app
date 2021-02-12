import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import moment from "moment";
import {
  GET_CATEGORY,
  CREATE_CATEGORY,
  LOADING_CATEGORY,
  ERROR_CATEGORY,
  DELETE_CATEGORY,
  UPDATE_CATEGORY,
  SET_CURRENT_CATEGORY,
  CLEAR_CURRENT_CATEGORY,
} from "../types";

import { endpointAPI } from "../constants";
import failHandler from "../failHandler";

// Set current category
export const setCurrentCategory = (category) => ({
  type: SET_CURRENT_CATEGORY,
  payload: category,
});

// Clear current account
export const clearCurrentCategory = () => ({
  type: CLEAR_CURRENT_CATEGORY,
});

// Get category from server
export const getCategory = () => async (dispatch) => {
  dispatch(setLoading());

  try {
    const token = await AsyncStorage.getItem("AUTH_TOKEN");

    return axios
      .get(`${endpointAPI}/category/`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Token " + token,
        },
      })
      .then((res) => {
        const category = res.data.filter((elem) => elem.is_active);

        dispatch({
          type: GET_CATEGORY,
          payload: category,
        });
      })
      .catch((error) => {
        dispatch(failHandler(error, ERROR_CATEGORY));
      });
  } catch (error) {
    dispatch(failHandler(error, ERROR_CATEGORY));
  }
};

// Create category from server
export const createCategory = (category) => async (dispatch) => {
  dispatch(setLoading());
  try {
    const token = await AsyncStorage.getItem("AUTH_TOKEN");

    return axios
      .post(
        `${endpointAPI}/category/`,
        {
          ...category,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Token " + token,
          },
        }
      )
      .then((res) => {
        const category = res.data;

        if (category["last_updated"] === undefined) {
          category["last_updated"] = moment();
        }

        dispatch({
          type: CREATE_CATEGORY,
          payload: category,
        });
      })

      .catch((error) => {
        dispatch(failHandler(error, ERROR_CATEGORY));
      });
  } catch (error) {
    dispatch(failHandler(error, ERROR_CATEGORY));
  }
};

// Update category from server
export const updateCategory = ({ id, category_name }) => async (dispatch) => {
  dispatch(setLoading());
  try {
    const token = await AsyncStorage.getItem("AUTH_TOKEN");

    return axios
      .put(
        `${endpointAPI}/category/${id}/`,
        {
          category_name,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Token " + token,
          },
        }
      )
      .then((res) => {
        const updatedCategory = res.data;

        dispatch({
          type: UPDATE_CATEGORY,
          payload: updatedCategory,
        });
      })

      .catch((error) => {
        dispatch(failHandler(error, ERROR_CATEGORY));
      });
  } catch (error) {
    dispatch(failHandler(error, ERROR_CATEGORY));
  }
};

// Delete category from server
export const hideCategory = (category) => async (dispatch) => {
  dispatch(setLoading());
  try {
    const token = await AsyncStorage.getItem("AUTH_TOKEN");

    axios
      .delete(`${endpointAPI}/category/${category.id}/`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Token " + token,
        },
      })
      .then(() => {
        dispatch({
          type: DELETE_CATEGORY,
          payload: category.id,
        });
      })

      .catch((error) => {
        dispatch(failHandler(error, ERROR_CATEGORY));
      });
  } catch (error) {
    dispatch(failHandler(error, ERROR_CATEGORY));
  }
};

// Set loading to true
export const setLoading = () => ({
  type: LOADING_CATEGORY,
});
