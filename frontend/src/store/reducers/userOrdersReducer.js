import * as actionTypes from '../actions/actionTypes';

const userOrdersReducer = (state = null, action) => {
  switch (action.type) {
    case actionTypes.INIT_ORDERS:
      if (action.data && action.data.length !== 0) {
        return action.data;
      }
      return null;
    case actionTypes.CLEAR_ORDERS:
      return null;
    default:
      return state;
  }
};

export default userOrdersReducer;
