const cartReducer = (state = [], action) => {
  switch (action.type) {
    case 'ADD_ITEM':
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
    case 'DELETE_ITEM':
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
    case 'REMOVE_ITEM_COMPLETELY':
      let itemRemoveState = state;
      itemRemoveState = itemRemoveState.filter(
        (el) => el.id !== action.data.id
      );
      return itemRemoveState;
    case 'CLEAR_CART':
      return [];
    default:
      return state;
  }
};

export const addItem = (item) => {
  return (dispatch) => {
    dispatch({ type: 'ADD_ITEM', data: item });
  };
};

export const deleteItem = (item) => {
  return (dispatch) => {
    dispatch({ type: 'DELETE_ITEM', data: item });
  };
};

export const removeItemCompletely = (item) => {
  return (dispatch) => {
    dispatch({ type: 'REMOVE_ITEM_COMPLETELY', data: item });
  };
};

export const clearCart = () => {
  return (dispatch) => {
    dispatch({ type: 'CLEAR_CART' });
  };
};

export default cartReducer;
