import * as actionTypes from './actionTypes';

export const setAlert = (data) => {
  return { type: actionTypes.SET_ALERT, data: data };
};

export const removeAlert = () => {
  return { type: actionTypes.REMOVE_ALERT, data: null };
};
