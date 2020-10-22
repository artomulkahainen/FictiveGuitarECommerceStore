import * as actionTypes from './actionTypes';
import ordersService from '../../services/ordersService';

export const initOrders = () => {
  return async (dispatch) => {
    const data = await ordersService.getUserOrders();
    dispatch({ type: actionTypes.INIT_ORDERS, data: data });
  };
};

export const updateOrders = (newOrder) => {
  return { type: 'UPDATE_ORDERS', data: newOrder };
};

export const clearOrders = () => {
  return { type: actionTypes.CLEAR_ORDERS };
};
