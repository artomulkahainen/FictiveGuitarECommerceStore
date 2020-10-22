import * as actionTypes from '../actions/actionTypes';

const userOrdersReducer = (state = [], action) => {
  switch (action.type) {
    case actionTypes.INIT_ORDERS:
      if (action.data.length > 0) {
        return state.concat(action.data);
      }
      return [];
    case actionTypes.UPDATE_ORDERS:
      return state.concat(action.data);
    case actionTypes.CLEAR_ORDERS:
      return [];
    default:
      return state;
  }
};

export default userOrdersReducer;
