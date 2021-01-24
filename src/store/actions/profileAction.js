import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import moment from "moment";

import {
  GET_PROFILE,
  CREATE_PROFILE,
  UPDATE_PROFILE,
  LOADING_PROFILE,
  ERROR_PROFILE,
} from "../types";

import { endpointAPI } from "../constants";
import { logout } from "./authAction";
import failHandler from "../failHandler";

// Get profile from server
export const getProfile = () => async (dispatch) => {
  dispatch(setLoading());

  try {
    const token = await AsyncStorage.getItem("AUTH_TOKEN");

    return axios
      .get(`${endpointAPI}/profile/`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Token " + token,
        },
      })
      .then((res) => {
        const profile =
          res.data.length === 0
            ? null
            : res.data.length > 1
            ? res.data.find((elem) => elem.is_admin)
            : res.data[0];

        dispatch({
          type: GET_PROFILE,
          payload: profile,
        });
      })

      .catch((error) => {
        dispatch(failHandler(error, ERROR_PROFILE));
      });
  } catch (error) {
    dispatch(failHandler(error, ERROR_PROFILE));
  }
};

// Create profile from server
export const createProfile = (profile) => async (dispatch) => {
  dispatch(setLoading());

  try {
    const token = await AsyncStorage.getItem("AUTH_TOKEN");

    return axios
      .post(
        `${endpointAPI}/profile/`,
        {
          ...profile,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Token " + token,
          },
        }
      )
      .then((res) => {
        const profile = res.data;

        dispatch({
          type: CREATE_PROFILE,
          payload: profile,
        });
      })

      .catch((error) => {
        dispatch(failHandler(error, ERROR_PROFILE));
      });
  } catch (error) {
    dispatch(failHandler(error, ERROR_PROFILE));
  }
};

// Update profile from server
export const updateProfile = (profile, id) => async (dispatch) => {
  dispatch(setLoading());

  try {
    const token = await AsyncStorage.getItem("AUTH_TOKEN");

    return axios
      .put(
        `${endpointAPI}/profile/${id}/`,
        {
          ...profile,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Token " + token,
          },
        }
      )
      .then((res) => {
        const profile = res.data;

        if (profile["last_updated"] === undefined) {
          profile["last_updated"] = moment();
        }

        dispatch({
          type: UPDATE_PROFILE,
          payload: profile,
        });
      })

      .catch((error) => {
        dispatch(failHandler(error, ERROR_PROFILE));
      });
  } catch (error) {
    dispatch(failHandler(error, ERROR_PROFILE));
  }
};

// Update IMAGE profile from server
export const updateImageProfile = (profile, id) => async (dispatch) => {
  dispatch(setLoading());

  try {
    const token = await AsyncStorage.getItem("AUTH_TOKEN");

    return axios
      .put(`${endpointAPI}/profile/${id}/`, profile, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: "Token " + token,
        },
      })
      .then((res) => {
        const profile = res.data;

        if (profile["last_updated"] === undefined) {
          profile["last_updated"] = moment();
        }

        dispatch({
          type: UPDATE_PROFILE,
          payload: profile,
        });
      })

      .catch((error) => {
        dispatch(failHandler(error, ERROR_PROFILE));
      });
  } catch (error) {
    dispatch(failHandler(error, ERROR_PROFILE));
  }
};

// Delete profile from server
export const hideProfile = (id, navigation) => async (dispatch) => {
  dispatch(setLoading());
  try {
    const token = await AsyncStorage.getItem("AUTH_TOKEN");

    return axios
      .delete(`${endpointAPI}/profile/${id}/`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Token " + token,
        },
      })
      .then(() => {
        dispatch(logout(navigation));
      })
      .catch((error) => {
        dispatch(failHandler(error, ERROR_PROFILE));
      });
  } catch (error) {
    dispatch(failHandler(error, ERROR_PROFILE));
  }
};

// Set loading to true
export const setLoading = () => ({
  type: LOADING_PROFILE,
});
