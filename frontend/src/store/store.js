import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import guitarReducer from './reducers/guitarReducer';
import userLoggedReducer from './reducers/userLoggedReducer';
//import cartReducer from './reducers/cartReducer';

const reducer = combineReducers({
  guitars: guitarReducer,
  userLogged: userLoggedReducer,
});
const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));

export default store;
