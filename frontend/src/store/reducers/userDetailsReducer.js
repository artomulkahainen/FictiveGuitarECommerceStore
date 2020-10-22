import * as actionTypes from '../actions/actionTypes';

const userDetailsReducer = (state = [], action) => {
  switch (action.type) {
    case actionTypes.INIT_USER_DETAILS:
      return action.data;
    case actionTypes.CLEAR_USER_DETAILS:
      return [];
    case actionTypes.UPDATE_USER_DETAILS:
      return action.data;
    default:
      return state;
  }
};

export default userDetailsReducer;
