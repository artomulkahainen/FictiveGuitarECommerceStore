import * as actionTypes from '../actions/actionTypes';

const guitarReducer = (state = [], action) => {
  if (action.type === actionTypes.INIT_GUITARS) {
    return action.data;
  } else {
    return state;
  }
};

export default guitarReducer;
