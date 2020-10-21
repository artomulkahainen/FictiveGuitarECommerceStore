import * as actionTypes from './actionTypes';
import ordersService from '../../services/ordersService';

export const initOrders = () => {
  return async (dispatch) => {
    const data = await ordersService.getUserOrders();
    dispatch({ type: actionTypes.INIT_ORDERS, data: data });
  };
};

export const clearOrders = () => {
  return { type: actionTypes.CLEAR_ORDERS };
};
