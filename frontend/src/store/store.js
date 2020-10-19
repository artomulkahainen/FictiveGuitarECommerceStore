import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import guitarReducer from './reducers/guitarReducer';
import userLoggedReducer from './reducers/userLoggedReducer';
import userDetailsReducer from './reducers/userDetailsReducer';
import alertReducer from './reducers/alertReducer';
import userOrdersReducer from './reducers/userOrdersReducer';
//import cartReducer from './reducers/cartReducer';

const reducer = combineReducers({
  guitars: guitarReducer,
  userLogged: userLoggedReducer,
  userDetails: userDetailsReducer,
  userOrders: userOrdersReducer,
  alert: alertReducer,
});

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));

export default store;
