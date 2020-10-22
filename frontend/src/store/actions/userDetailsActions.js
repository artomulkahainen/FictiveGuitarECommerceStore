import * as actionTypes from './actionTypes';
import userService from '../../services/userService';

export const getUserDetails = () => {
  return async (dispatch) => {
    const details = await userService.getUserDetails();
    dispatch({ type: actionTypes.INIT_USER_DETAILS, data: details });
  };
};

export const updateUserDetails = (updatedObject) => {
  return { type: actionTypes.UPDATE_USER_DETAILS, data: updatedObject };
};

export const clearUserDetails = () => {
  return { type: actionTypes.CLEAR_USER_DETAILS };
};
