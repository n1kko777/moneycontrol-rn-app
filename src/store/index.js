import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";

import { authReducer } from "./reducers/authReducer";
import { profileReducer } from "./reducers/profileReducer";

const rootReducer = combineReducers({
  auth: authReducer,
  profile: profileReducer
});

export default createStore(rootReducer, applyMiddleware(thunk));
