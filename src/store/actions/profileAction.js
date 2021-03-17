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

// Set loading to true
export const setLoading = () => ({
  type: LOADING_PROFILE,
});

// Get profile from server
export const getProfile = (onSuccess = null) => async (dispatch) => {
  try {
    dispatch(setLoading());
    const token = await AsyncStorage.getItem("AUTH_TOKEN");

    return axios
      .get(`${endpointAPI}/profile/`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
        },
      })
      .then((res) => {
        const profile = [null];

        if (res.data.length !== 0) {
          if (res.data.length > 1) {
            profile[0] = res.data.find((elem) => elem.is_admin);
          } else {
            [profile[0]] = res.data;
          }
        }

        dispatch({
          type: GET_PROFILE,
          payload: profile[0],
        });

        if (onSuccess !== null) {
          onSuccess(profile[0]);
        }
      })
      .catch((error) => {
        dispatch(failHandler(error, ERROR_PROFILE));
      });
  } catch (error) {
    dispatch(failHandler(error, ERROR_PROFILE));
    return Promise.reject();
  }
};

// Create profile from server
export const createProfile = (profile) => async (dispatch) => {
  try {
    dispatch(setLoading());
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
            Authorization: `Token ${token}`,
          },
        }
      )
      .then((res) => {
        const resProfile = res.data;

        dispatch({
          type: CREATE_PROFILE,
          payload: resProfile,
        });
      })

      .catch((error) => {
        dispatch(failHandler(error, ERROR_PROFILE));
      });
  } catch (error) {
    dispatch(failHandler(error, ERROR_PROFILE));
    return Promise.reject();
  }
};

// Update profile from server
export const updateProfile = (profile, id) => async (dispatch) => {
  try {
    dispatch(setLoading());
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
            Authorization: `Token ${token}`,
          },
        }
      )
      .then((res) => {
        const resProfile = res.data;

        if (resProfile.last_updated === undefined) {
          resProfile.last_updated = moment();
        }

        dispatch({
          type: UPDATE_PROFILE,
          payload: resProfile,
        });
      })

      .catch((error) => {
        dispatch(failHandler(error, ERROR_PROFILE));
      });
  } catch (error) {
    dispatch(failHandler(error, ERROR_PROFILE));
    return Promise.reject();
  }
};

// Update IMAGE profile from server
export const updateImageProfile = (profile, id) => async (dispatch) => {
  try {
    dispatch(setLoading());
    const token = await AsyncStorage.getItem("AUTH_TOKEN");

    return axios
      .put(`${endpointAPI}/profile/${id}/`, profile, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `Token ${token}`,
        },
      })
      .then((res) => {
        const resProfile = res.data;

        if (resProfile.last_updated === undefined) {
          resProfile.last_updated = moment();
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
    return Promise.reject();
  }
};

// Delete profile from server
export const hideProfile = (id, navigation) => async (dispatch) => {
  try {
    dispatch(setLoading());
    const token = await AsyncStorage.getItem("AUTH_TOKEN");

    return axios
      .delete(`${endpointAPI}/profile/${id}/`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
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
    return Promise.reject();
  }
};
