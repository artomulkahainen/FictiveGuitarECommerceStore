import userService from '../../services/userService';

const userDetailsReducer = (state = [], action) => {
  switch (action.type) {
    case 'INIT_USER_DETAILS':
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

export default userDetailsReducer;
