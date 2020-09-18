const alertReducer = (state = [], action) => {
  if (action.type === 'SET_ALERT') {
    return action.data;
  } else if (action.type === 'REMOVE_ALERT') {
    return action.data;
  } else {
    return state;
  }
};

export const setAlert = (data) => {
  return (dispatch) => dispatch({ type: 'SET_ALERT', data: data });
};

export const removeAlert = () => {
  return (dispatch) => dispatch({ type: 'REMOVE_ALERT', data: null });
};

export default alertReducer;
