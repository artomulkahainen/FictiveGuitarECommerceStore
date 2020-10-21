import * as actionTypes from './actionTypes';

export const loginUser = (user) => {
  return { type: actionTypes.LOGIN_USER, data: user };
};

export const checkUser = (user) => {
  return { type: actionTypes.CHECK_USER, data: user };
};
