import {
  GET_CATEGORY,
  CREATE_CATEGORY,
  LOADING_CATEGORY,
  ERROR_CATEGORY,
  CLEAR_CATEGORY,
  DELETE_CATEGORY,
  UPDATE_CATEGORY,
  SET_CURRENT_CATEGORY,
  CLEAR_CURRENT_CATEGORY,
} from '../types';

const initialState = {
  categories: [],
  current: null,
  error: null,
  loading: false,
};

export const categoryReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case SET_CURRENT_CATEGORY:
      return {
        ...state,
        current: payload,
      };
    case CLEAR_CURRENT_CATEGORY:
      return {
        ...state,
        current: null,
      };
    case GET_CATEGORY:
      return {
        ...state,
        categories: payload,
        loading: false,
        error: null,
      };
    case CREATE_CATEGORY:
      return {
        ...state,
        categories: [payload, ...state.categories],
        current: {
          title: payload.category_name,
          id: payload.id,
        },
        loading: false,
        error: null,
      };
    case UPDATE_CATEGORY:
      return {
        ...state,
        categories: state.categories.map((category) =>
          category.id === payload.id ? payload : category
        ),
        loading: false,
        error: null,
      };
    case DELETE_CATEGORY:
      return {
        ...state,
        categories: state.categories.filter((category) => category.id !== payload),
        loading: false,
        error: null,
      };
    case CLEAR_CATEGORY:
      return {
        ...state,
        categories: [],
        current: null,
        loading: false,
        error: null,
      };
    case LOADING_CATEGORY:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case ERROR_CATEGORY:
      return {
        ...state,
        loading: false,
        error: payload,
      };
    default:
      return state;
  }
};
