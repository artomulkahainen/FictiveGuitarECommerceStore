import userService from '../../services/userService';

const userDetailsReducer = (state = [], action) => {
  switch (action.type) {
    case 'INIT_USER_DETAILS':
      return action.data;
    case 'CLEAR_USER_DETAILS':
      return action.data;
    case 'UPDATE_USER_DETAILS':
      return action.data;
    default:
      return state;
  }
};

export const getUserDetails = () => {
  return async (dispatch) => {
    const details = await userService.getUserDetails();
    dispatch({ type: 'INIT_USER_DETAILS', data: details });
  };
};

export const updateUserDetails = (updatedObject) => {
  return (dispatch) => {
    dispatch({ type: 'UPDATE_USER_DETAILS', data: updatedObject });
  };
};

export const clearUserDetails = () => {
  return (dispatch) => {
    dispatch({ type: 'CLEAR_USER_DETAILS', data: null });
  };
};

export default userDetailsReducer;
