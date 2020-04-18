import {
  GET_CATEGORY,
  CREATE_CATEGORY,
  LOADING_CATEGORY,
  ERROR_CATEGORY,
  CLEAR_CATEGORY,
  DELETE_CATEGORY,
  UPDATE_CATEGORY,
} from "../types";

const initialState = {
  categories: [],
  error: null,
  loading: false,
};

export const categoryReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_CATEGORY:
      console.log("case GET_CATEGORY:");
      return {
        ...state,
        categories: payload,
        loading: false,
        error: null,
      };
    case CREATE_CATEGORY:
      console.log("case CREATE_CATEGORY:");
      return {
        ...state,
        categories: [payload, ...state.categories],
        loading: false,
        error: null,
      };
    case UPDATE_CATEGORY:
      console.log("case UPDATE_CATEGORY:");
      return {
        ...state,
        categories: state.categories.map((category) =>
          category.id === payload.id ? payload : category
        ),
        loading: false,
        error: null,
      };
    case DELETE_CATEGORY:
      console.log("case DELETE_CATEGORY:");
      return {
        ...state,
        categories: state.categories.filter(
          (category) => category.id !== payload.id
        ),
        loading: false,
        error: null,
      };
    case CLEAR_CATEGORY:
      console.log("case CLEAR_CATEGORY:");
      return {
        ...state,
        categories: [],
        loading: false,
        error: null,
      };
    case LOADING_CATEGORY:
      console.log("==========================");
      console.log("case LOADING_CATEGORY:");
      return {
        ...state,
        loading: true,
        error: null,
      };

    case ERROR_CATEGORY:
      console.log("ERROR_CATEGORY : " + payload);
      return {
        ...state,
        loading: false,
        error: payload,
      };
    default:
      return state;
  }
};
