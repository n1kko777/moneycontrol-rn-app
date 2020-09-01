import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import logger from "redux-logger";

import { apiReducer } from "./reducers/apiReducer";
import { authReducer } from "./reducers/authReducer";
import { profileReducer } from "./reducers/profileReducer";
import { companyReducer } from "./reducers/companyReducer";
import { accountReducer } from "./reducers/accountReducer";
import { transactionReducer } from "./reducers/transactionReducer";
import { actionReducer } from "./reducers/actionReducer";
import { transferReducer } from "./reducers/transferReducer";
import { categoryReducer } from "./reducers/categoryReducer";
import { tagReducer } from "./reducers/tagReducer";
import { calendarReducer } from "./reducers/calendarReducer";
import { layoutReducer } from "./reducers/layoutReducer";

const rootReducer = combineReducers({
  api: apiReducer,
  layout: layoutReducer,
  auth: authReducer,
  profile: profileReducer,
  company: companyReducer,
  account: accountReducer,
  transaction: transactionReducer,
  action: actionReducer,
  transfer: transferReducer,
  category: categoryReducer,
  tag: tagReducer,
  calendar: calendarReducer,
});

export default createStore(rootReducer, applyMiddleware(thunk, logger));
