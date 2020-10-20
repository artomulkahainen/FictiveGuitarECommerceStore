const cartReducer = (state = [], action) => {
  switch (action.type) {
    case 'ADD_ITEM':
      const newState = state;
      const findSimilarObject = newState.find((el) => el.id === action.data.id);
      if (!findSimilarObject) {
        let newObject = action.data;
        newObject.quantity = 1;
        newState.push(newObject);
      } else {
        findSimilarObject.quantity += 1;
      }
      return newState;
    case 'DELETE_ITEM':
      const newState2 = state;
      const findSameObject = newState2.find((el) => action.data.id === el.id);
      if (findSameObject.quantity > 1) {
        findSameObject.quantity--;
        return newState2;
      } else {
        newState2.filter((el) => el.id !== action.data.id);
      }
      return newState2;
    case 'REMOVE_ITEM_COMPLETELY':
      const newState3 = state;
      newState3.filter((el) => el.id !== action.data.id);
      return newState3;
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
