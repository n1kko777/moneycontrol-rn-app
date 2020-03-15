import {
  REGISTER_SUCCESS,
  AUTH_FAIL,
  AUTH_LOGOUT,
  AUTH_START,
  AUTH_SUCCESS,
  REMIND_ME
} from "../types";

const initialState = {
  user: {},
  isRegister: false,
  isRemindMe: true,
  error: null,
  loading: false
};
export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case REGISTER_SUCCESS:
      return {
        ...state,
        user: action.payload,
        isRegister: action.payload.token !== null,
        loading: false,
        error: null
      };
    case AUTH_START:
      return {
        ...state,
        error: null,
        loading: true
      };
    case AUTH_SUCCESS:
      return {
        ...state,
        user: action.payload,
        loading: false,
        error: null
      };
    case AUTH_FAIL:
      console.log("AUTH_FAIL : " + action.payload);
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    case AUTH_LOGOUT:
      return {
        ...state,
        user: {}
      };
    case REMIND_ME:
      return {
        ...state,
        isRemindMe: action.payload
      };

    default:
      return state;
  }
};
