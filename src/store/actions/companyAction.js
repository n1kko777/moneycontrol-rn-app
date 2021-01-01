import axios from "axios";
import {
  GET_COMPANY,
  CREATE_COMPANY,
  LOADING_COMPANY,
  ERROR_COMPANY,
  UPDATE_COMPANY,
} from "../types";

import { endpointAPI } from "../constants";
import { Alert, AsyncStorage } from "react-native";

// Get company from server
export const getCompany = () => async (dispatch) => {
  dispatch(setLoading());

  try {
    const token = await AsyncStorage.getItem("AUTH_TOKEN");

    return axios
      .get(`${endpointAPI}/company/`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Token " + token,
        },
      })
      .then((res) => {
        const company = res.data.length > 0 ? res.data[0] : null;
        console.log("company :>> ", company);

        dispatch({
          type: GET_COMPANY,
          payload: company,
        });
      })

      .catch((error) => {
        dispatch(companyFail(error));
      });
  } catch (error) {
    dispatch(companyFail(error));
  }
};

// Create company from server
export const createCompany = (company) => async (dispatch) => {
  dispatch(setLoading());

  try {
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
            Authorization: "Token " + token,
          },
        }
      )
      .then((res) => {
        const company = res.data;

        dispatch({
          type: CREATE_COMPANY,
          payload: company,
        });
      })

      .catch((error) => {
        dispatch(companyFail(error));
      });
  } catch (error) {
    dispatch(companyFail(error));
  }
};
// Update company from server
export const updateCompany = (company) => async (dispatch) => {
  dispatch(setLoading());

  try {
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
            Authorization: "Token " + token,
          },
        }
      )
      .then((res) => {
        const company = res.data;

        dispatch({
          type: UPDATE_COMPANY,
          payload: company,
        });
      })

      .catch((error) => {
        dispatch(companyFail(error));
      });
  } catch (error) {
    dispatch(companyFail(error));
  }
};

export const companyFail = (error) => (dispatch) => {
  const errorObject = {};
  if (error.response) {
    // The request was made and the server responded with a status code
    const keys = [];

    for (const k in error.response.data) keys.push(k);

    console.log(
      `Код ошибки: ${error.response.status}. ${
        error.response.data[keys[0]]
      } Повторите попытку позже.`
    );

    errorObject.title = `Код ошибки: ${error.response.status}`;
    errorObject.message =
      error.response.status === 404
        ? `${error.response.data}`
        : `${keys.join(",")}: ${error.response.data[keys[0]]}`;
  } else if (error.request) {
    // The request was made but no response was received
    console.log("Не удалось соединиться с сервером. Повторите попытку позже.");

    errorObject.title = `Не удалось соединиться с сервером`;
    errorObject.message = `Повторите попытку позже`;
  } else {
    // Something happened in setting up the request that triggered an Error
    console.log("Что-то пошло не так... Повторите попытку позже.");

    errorObject.title = `Что-то пошло не так...`;
    errorObject.message = `Повторите попытку позже`;
  }

  Alert.alert(errorObject.title, errorObject.message, [{ text: "Закрыть" }], {
    cancelable: false,
  });

  dispatch({
    type: ERROR_COMPANY,
    payload: error,
  });
};

// Set loading to true
export const setLoading = () => ({
  type: LOADING_COMPANY,
});

// Invite Profile To Company
export const joinProfileToCompany = async (profile_id, profile_phone) => {
  try {
    const token = await AsyncStorage.getItem("AUTH_TOKEN");

    return axios.post(
      `${endpointAPI}/join-profile-to-company/`,
      {
        profile_id,
        profile_phone,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Token " + token,
        },
      }
    );
  } catch (error) {
    Alert.alert("Статус запроса", error.message, [{ text: "OK" }], {
      cancelable: false,
    });
  }
};

// Remove Profile To Company
export const removeProfileFromCompany = async (profile_id, profile_phone) => {
  try {
    const token = await AsyncStorage.getItem("AUTH_TOKEN");

    return axios.post(
      `${endpointAPI}/remove-profile-from-company/`,
      {
        profile_id,
        profile_phone,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Token " + token,
        },
      }
    );
  } catch (error) {
    Alert.alert("Статус запроса", error.message, [{ text: "OK" }], {
      cancelable: false,
    });
  }
};
