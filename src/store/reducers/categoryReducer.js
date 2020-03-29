import {
  GET_CATEGORY,
  CREATE_CATEGORY,
  LOADING_CATEGORY,
  ERROR_CATEGORY,
  CLEAR_CATEGORY
} from "../types";

const initialState = {
  categories: [],
  error: null,
  loading: false
};

export const categoryReducer = (state = initialState, category) => {
  const { type, payload } = category;
  switch (type) {
    case GET_CATEGORY:
      console.log("case GET_CATEGORY:");
      return {
        ...state,
        categories: payload,
        loading: false
      };
    case CREATE_CATEGORY:
      console.log("case CREATE_CATEGORY:");
      return {
        ...state,
        categories: payload,
        loading: false
      };
    case CLEAR_CATEGORY:
      console.log("case CLEAR_CATEGORY:");
      return {
        ...state,
        categories: [],
        loading: false
      };
    case LOADING_CATEGORY:
      console.log("==========================");
      console.log("case LOADING_CATEGORY:");
      return {
        ...state,
        loading: true
      };

    case ERROR_CATEGORY:
      console.log("ERROR_CATEGORY : " + payload);
      return {
        ...state,
        loading: false,
        error: payload
      };
    default:
      return state;
  }
};
