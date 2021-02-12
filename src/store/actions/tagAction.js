import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import moment from "moment";
import {
  GET_TAG,
  CREATE_TAG,
  LOADING_TAG,
  ERROR_TAG,
  DELETE_TAG,
  UPDATE_TAG,
} from "../types";

import { endpointAPI } from "../constants";
import failHandler from "../failHandler";

// Get tag from server
export const getTag = () => async (dispatch) => {
  dispatch(setLoading());

  try {
    const token = await AsyncStorage.getItem("AUTH_TOKEN");

    return axios
      .get(`${endpointAPI}/tag/`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Token " + token,
        },
      })
      .then((res) => {
        const tag = res.data.filter((elem) => elem.is_active);

        dispatch({
          type: GET_TAG,
          payload: tag,
        });
      })

      .catch((error) => {
        dispatch(failHandler(error, ERROR_TAG));
      });
  } catch (error) {
    dispatch(failHandler(error, ERROR_TAG));
  }
};

// Create tag from server
export const createTag = (tag) => async (dispatch) => {
  dispatch(setLoading());
  try {
    const token = await AsyncStorage.getItem("AUTH_TOKEN");

    return axios
      .post(
        `${endpointAPI}/tag/`,
        {
          ...tag,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Token " + token,
          },
        }
      )
      .then((res) => {
        const tag = res.data;

        if (tag["last_updated"] === undefined) {
          tag["last_updated"] = moment();
        }

        dispatch({
          type: CREATE_TAG,
          payload: tag,
        });
      })

      .catch((error) => {
        dispatch(failHandler(error, ERROR_TAG));
      });
  } catch (error) {
    dispatch(failHandler(error, ERROR_TAG));
  }
};

// Create tag from server
export const updateTag = ({ id, tag_name }) => async (dispatch) => {
  dispatch(setLoading());
  try {
    const token = await AsyncStorage.getItem("AUTH_TOKEN");

    return axios
      .put(
        `${endpointAPI}/tag/${id}/`,
        {
          tag_name,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Token " + token,
          },
        }
      )
      .then((res) => {
        const updatedTag = res.data;

        if (updatedTag["last_updated"] === undefined) {
          updatedTag["last_updated"] = moment();
        }

        dispatch({
          type: UPDATE_TAG,
          payload: updatedTag,
        });
      })

      .catch((error) => {
        dispatch(failHandler(error, ERROR_TAG));
      });
  } catch (error) {
    dispatch(failHandler(error, ERROR_TAG));
  }
};

// Delete tag from server
export const hideTag = (tag) => async (dispatch) => {
  dispatch(setLoading());
  try {
    const token = await AsyncStorage.getItem("AUTH_TOKEN");

    return axios
      .delete(`${endpointAPI}/tag/${tag.id}/`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Token " + token,
        },
      })
      .then(() => {
        dispatch({
          type: DELETE_TAG,
          payload: tag.id,
        });
      })

      .catch((error) => {
        dispatch(failHandler(error, ERROR_TAG));
      });
  } catch (error) {
    dispatch(failHandler(error, ERROR_TAG));
  }
};

// Set loading to true
export const setLoading = () => ({
  type: LOADING_TAG,
});
