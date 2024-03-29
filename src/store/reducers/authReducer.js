import {
  REGISTER_SUCCESS,
  AUTH_FAIL,
  AUTH_LOGOUT,
  AUTH_START,
  AUTH_SUCCESS,
  REMIND_ME,
} from '../types';

const initialState = {
  user: {},
  isRegister: false,
  isAuth: false,
  isRemindMe: true,
  error: null,
  loading: false,
};
export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case REGISTER_SUCCESS:
      return {
        ...state,
        user: action.payload,
        isRegister: action.payload.token !== null,
        loading: false,
        error: null,
      };
    case AUTH_START:
      return {
        ...state,
        error: null,
        isAuth: false,
        loading: true,
      };
    case AUTH_SUCCESS:
      return {
        ...state,
        user: action.payload,
        loading: false,
        isAuth: true,
        error: null,
      };
    case AUTH_FAIL:
      return {
        ...state,
        loading: false,
        isAuth: false,
        error: action.payload,
      };
    case AUTH_LOGOUT:
      return {
        ...state,
        isAuth: false,
        isRegister: false,
        user: {},
      };
    case REMIND_ME:
      return {
        ...state,
        isRemindMe: action.payload,
      };

    default:
      return state;
  }
};
