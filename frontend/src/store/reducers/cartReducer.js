import * as actionTypes from '../actions/actionTypes';

const cartReducer = (state = [], action) => {
  switch (action.type) {
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
    case actionTypes.DELETE_ITEM:
      let deleteItemState = state;
      let findSameObject = deleteItemState.find(
        (el) => action.data.id === el.id
      );
      if (findSameObject.quantity > 1) {
        findSameObject.quantity--;
        return deleteItemState;
      } else {
        deleteItemState = deleteItemState.filter(
          (el) => el.id !== action.data.id
        );
      }
      return deleteItemState;
    case actionTypes.REMOVE_ITEM_COMPLETELY:
      let itemRemoveState = state;
      itemRemoveState = itemRemoveState.filter(
        (el) => el.id !== action.data.id
      );
      return itemRemoveState;
    case actionTypes.CLEAR_CART:
      return [];
    default:
      return state;
  }
};

export default cartReducer;
