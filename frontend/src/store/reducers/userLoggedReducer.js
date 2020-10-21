import * as actionTypes from '../actions/actionTypes';

const userLoggedReducer = (state = null, action) => {
  switch (action.type) {
    case actionTypes.CHECK_USER:
      return action.data;
    case actionTypes.LOGIN_USER:
      return action.data;
    default:
      return state;
  }
};

export default userLoggedReducer;
