import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";

import { authReducer } from "./reducers/authReducer";
import { profileReducer } from "./reducers/profileReducer";
import { companyReducer } from "./reducers/companyReducer";
import { accountReducer } from "./reducers/accountReducer";
import { transactionReducer } from "./reducers/transactionReducer";

const rootReducer = combineReducers({
  auth: authReducer,
  profile: profileReducer,
  company: companyReducer,
  account: accountReducer,
  transaction: transactionReducer
});

export default createStore(rootReducer, applyMiddleware(thunk));
