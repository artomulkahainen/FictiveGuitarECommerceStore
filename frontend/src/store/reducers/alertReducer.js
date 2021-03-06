import * as actionTypes from '../actions/actionTypes';

const alertReducer = (state = [], action) => {
  if (action.type === actionTypes.SET_ALERT) {
    return state.concat(action.data);
  } else if (action.type === actionTypes.REMOVE_ALERT) {
    return state.filter((el) => el.id !== action.data);
  } else {
    return state;
  }
};

export default alertReducer;
