import * as actionTypes from '../actions/actionTypes';

const cartReducer = (state = [], action) => {
  switch (action.type) {
    // ADD ITEM
    case actionTypes.ADD_ITEM:
      let findSimilarObject = state.find((el) => el.id === action.data.id);
      if (!findSimilarObject) {
        let newObject = action.data;
        newObject.quantity = 1;
        return state.concat(newObject);
      } else {
        const changedObject = {
          ...findSimilarObject,
          quantity: findSimilarObject.quantity + 1,
        };
        return state.map((item) =>
          item.id !== action.data.id ? item : changedObject
        );
      }

    // DELETE ITEM
    case actionTypes.DELETE_ITEM:
      const findItem = state.find((el) => action.data.id === el.id);
      if (findItem.quantity > 1) {
        const changedObject = {
          ...findItem,
          quantity: findItem.quantity - 1,
        };
        return state.map((el) =>
          el.id !== action.data.id ? el : changedObject
        );
      } else {
        return state.filter((el) => el.id !== action.data.id);
      }

    // REMOVE ITEM COMPLETELY
    case actionTypes.REMOVE_ITEM_COMPLETELY:
      return state.filter((el) => el.id !== action.data.id);

    // CLEAR CART
    case actionTypes.CLEAR_CART:
      return [];

    default:
      return state;
  }
};

const updateTotalPrice = (oldValue, price) => oldValue - price;

export default cartReducer;
