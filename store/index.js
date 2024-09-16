import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

import { accountReducer } from './reducers/accountReducer';
import { actionReducer } from './reducers/actionReducer';
import { apiReducer } from './reducers/apiReducer';
import { authReducer } from './reducers/authReducer';
import { calendarReducer } from './reducers/calendarReducer';
import { categoryReducer } from './reducers/categoryReducer';
import { companyReducer } from './reducers/companyReducer';
import { layoutReducer } from './reducers/layoutReducer';
import { profileReducer } from './reducers/profileReducer';
import { tagReducer } from './reducers/tagReducer';
import { transactionReducer } from './reducers/transactionReducer';
import { transferReducer } from './reducers/transferReducer';

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

export default createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));
