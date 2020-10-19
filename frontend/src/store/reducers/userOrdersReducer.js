import ordersService from '../../services/ordersService';

const userOrdersReducer = (state = null, action) => {
  switch (action.type) {
    case 'INIT_ORDERS':
      if (action.data && action.data.length !== 0) {
        return action.data;
      }
      return null;
    case 'CLEAR_ORDERS':
      return null;
    default:
      return state;
  }
};

export const initOrders = () => {
  return async (dispatch) => {
    const data = await ordersService.getUserOrders();
    dispatch({ type: 'INIT_ORDERS', data: data });
  };
};

export const clearOrders = () => {
  return (dispatch) => {
    dispatch({ type: 'CLEAR_ORDERS' });
  };
};

export default userOrdersReducer;
