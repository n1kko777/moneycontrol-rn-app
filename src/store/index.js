import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";

import { authReducer } from "./reducers/authReducer";
import { profileReducer } from "./reducers/profileReducer";
import { companyReducer } from "./reducers/companyReducer";
import { accountReducer } from "./reducers/accountReducer";
import { transactionReducer } from "./reducers/transactionReducer";
import { actionReducer } from "./reducers/actionReducer";
import { transferReducer } from "./reducers/transferReducer";
import { categoryReducer } from "./reducers/categoryReducer";
import { tagReducer } from "./reducers/tagReducer";

const rootReducer = combineReducers({
  auth: authReducer,
  profile: profileReducer,
  company: companyReducer,
  account: accountReducer,
  transaction: transactionReducer,
  action: actionReducer,
  transfer: transferReducer,
  category: categoryReducer,
  tag: tagReducer
});

export default createStore(rootReducer, applyMiddleware(thunk));
