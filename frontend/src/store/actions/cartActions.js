import * as actionTypes from './actionTypes';

export const addItem = (item) => {
  return {
    type: actionTypes.ADD_ITEM,
    data: item,
  };
};

export const deleteItem = (item) => {
  return {
    type: actionTypes.DELETE_ITEM,
    data: item,
  };
};

export const removeItemCompletely = (item) => {
  return {
    type: actionTypes.REMOVE_ITEM_COMPLETELY,
    data: item,
  };
};

export const clearCart = () => {
  return {
    type: actionTypes.CLEAR_CART,
  };
};
