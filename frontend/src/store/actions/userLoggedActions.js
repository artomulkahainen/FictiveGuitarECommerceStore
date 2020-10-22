import * as actionTypes from './actionTypes';

export const loginUser = (user) => {
  return { type: actionTypes.LOGIN_USER, data: user };
};

export const logoutUser = () => {
  return { type: actionTypes.LOGOUT_USER };
};
