import * as actionTypes from '../actions/actionTypes';

const cartReducer = (state = { totalPrice: 0, selectedItems: [] }, action) => {
  switch (action.type) {
    // ADD ITEM
    case actionTypes.ADD_ITEM:
      let findSimilarItem = state.selectedItems.find(
        (el) => el.id === action.data.id
      );
      if (!findSimilarItem) {
        let newObject = action.data;
        newObject.quantity = 1;
        return {
          totalPrice: state.totalPrice + parseFloat(newObject.price),
          selectedItems: [...state.selectedItems, newObject],
        };
      } else {
        const changedObject = {
          ...findSimilarItem,
          quantity: findSimilarItem.quantity + 1,
        };
        return {
          totalPrice: state.totalPrice + parseFloat(action.data.price),
          selectedItems: state.selectedItems.map((item) =>
            item.id !== action.data.id ? item : changedObject
          ),
        };
      }

    // DELETE ITEM
    case actionTypes.DELETE_ITEM:
      const findItem = state.selectedItems.find(
        (el) => action.data.id === el.id
      );
      if (findItem.quantity > 1) {
        const changedObject = {
          ...findItem,
          quantity: findItem.quantity - 1,
        };
        return {
          totalPrice: state.totalPrice - parseFloat(action.data.price),
          selectedItems: state.selectedItems.map((el) =>
            el.id !== action.data.id ? el : changedObject
          ),
        };
      } else {
        return {
          totalPrice:
            state.selectedItems.length === 1
              ? 0
              : state.totalPrice - parseFloat(action.data.price),
          selectedItems: state.selectedItems.filter(
            (el) => el.id !== action.data.id
          ),
        };
      }

    // REMOVE ITEM COMPLETELY
    case actionTypes.REMOVE_ITEM_COMPLETELY:
      return {
        totalPrice:
          state.selectedItems.length === 1
            ? 0
            : state.totalPrice -
              parseFloat(
                action.data.price *
                  state.selectedItems.find((el) => el.id === action.data.id)
                    .quantity
              ),
        selectedItems: state.selectedItems.filter(
          (el) => el.id !== action.data.id
        ),
      };

    // CLEAR CART
    case actionTypes.CLEAR_CART:
      return { totalPrice: 0, selectedItems: [] };

    default:
      return state;
  }
};

export default cartReducer;
