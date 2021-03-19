import { createStore, combineReducers, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";

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
  account: accountReducer,
  action: actionReducer,
  api: apiReducer,
  auth: authReducer,
  calendar: calendarReducer,
  category: categoryReducer,
  company: companyReducer,
  layout: layoutReducer,
  profile: profileReducer,
  tag: tagReducer,
  transaction: transactionReducer,
  transfer: transferReducer,
});

export default createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);
