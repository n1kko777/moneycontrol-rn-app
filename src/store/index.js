import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";

import { authReducer } from "./reducers/authReducer";
import { profileReducer } from "./reducers/profileReducer";
import { companyReducer } from "./reducers/companyReducer";

const rootReducer = combineReducers({
  auth: authReducer,
  profile: profileReducer,
  company: companyReducer
});

export default createStore(rootReducer, applyMiddleware(thunk));
