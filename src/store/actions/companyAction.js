import axios from "axios";
import { Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  GET_COMPANY,
  CREATE_COMPANY,
  LOADING_COMPANY,
  ERROR_COMPANY,
  UPDATE_COMPANY,
  JOIN_PROFILE_TO_COMPANY,
  REMOVE_PROFILE_FROM_COMPANY,
} from "../types";

import { endpointAPI } from "../constants";
import failHandler from "../failHandler";

// Set loading to true
export const setLoading = () => ({
  type: LOADING_COMPANY,
});

// Get company from server
export const getCompany = () => async (dispatch) => {
  try {
    dispatch(setLoading());
    const token = await AsyncStorage.getItem("AUTH_TOKEN");

    return axios
      .get(`${endpointAPI}/company/`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
        },
      })
      .then((res) => {
        const company = res.data.length > 0 ? res.data[0] : null;

        dispatch({
          type: GET_COMPANY,
          payload: company,
        });
      })

      .catch((error) => {
        dispatch(failHandler(error, ERROR_COMPANY));
      });
  } catch (error) {
    dispatch(failHandler(error, ERROR_COMPANY));
    return Promise.reject();
  }
};

// Create company from server
export const createCompany = (company) => async (dispatch) => {
  try {
    dispatch(setLoading());
    const token = await AsyncStorage.getItem("AUTH_TOKEN");

    return axios
      .post(
        `${endpointAPI}/company/`,
        {
          ...company,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`,
          },
        }
      )
      .then((res) => {
        const resCompany = res.data;

        dispatch({
          type: CREATE_COMPANY,
          payload: resCompany,
        });
      })

      .catch((error) => {
        dispatch(failHandler(error, ERROR_COMPANY));
      });
  } catch (error) {
    dispatch(failHandler(error, ERROR_COMPANY));
    return Promise.reject();
  }
};
// Update company from server
export const updateCompany = (company) => async (dispatch) => {
  try {
    dispatch(setLoading());
    const token = await AsyncStorage.getItem("AUTH_TOKEN");

    return axios
      .put(
        `${endpointAPI}/company/${company.id}/`,
        {
          company_name: company.company_name,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`,
          },
        }
      )
      .then((res) => {
        const resCompany = res.data;

        dispatch({
          type: UPDATE_COMPANY,
          payload: resCompany,
        });
      })
      .catch((error) => {
        dispatch(failHandler(error, ERROR_COMPANY));
      });
  } catch (error) {
    dispatch(failHandler(error, ERROR_COMPANY));
    return Promise.reject();
  }
};

// Invite Profile To Company
export const joinProfileToCompany = (profile_id, profile_phone) => async (
  dispatch
) => {
  try {
    dispatch(setLoading());
    const token = await AsyncStorage.getItem("AUTH_TOKEN");

    return axios
      .post(
        `${endpointAPI}/join-profile-to-company/`,
        {
          profile_id,
          profile_phone,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`,
          },
        }
      )
      .then((res) => {
        Alert.alert("Статус запроса", res.data.detail, [{ text: "OK" }], {
          cancelable: false,
        });

        dispatch({
          type: JOIN_PROFILE_TO_COMPANY,
        });
      })
      .catch((error) => {
        dispatch(failHandler(error, ERROR_COMPANY));
      });
  } catch (error) {
    dispatch(failHandler(error, ERROR_COMPANY));
    return Promise.reject();
  }
};

// Remove Profile To Company
export const removeProfileFromCompany = (profile_id, profile_phone) => async (
  dispatch
) => {
  try {
    dispatch(setLoading());
    const token = await AsyncStorage.getItem("AUTH_TOKEN");

    return axios
      .post(
        `${endpointAPI}/remove-profile-from-company/`,
        {
          profile_id,
          profile_phone,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`,
          },
        }
      )
      .then((res) => {
        Alert.alert("Статус запроса", res.data.detail, [{ text: "OK" }], {
          cancelable: false,
        });

        dispatch({
          type: REMOVE_PROFILE_FROM_COMPANY,
        });
      })
      .catch((error) => {
        dispatch(failHandler(error, ERROR_COMPANY));
      });
  } catch (error) {
    dispatch(failHandler(error, ERROR_COMPANY));
    return Promise.reject();
  }
};
