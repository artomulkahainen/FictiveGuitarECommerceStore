const userLoggedReducer = (state = null, action) => {
  switch (action.type) {
    case 'CHECK_USER':
      return action.data;
    case 'LOGIN_USER':
      return action.data;
    default:
      return state;
  }
};

export const loginUser = (user) => {
  return (dispatch) => {
    dispatch({ type: 'LOGIN_USER', data: user });
  };
};

export const checkUser = (user) => {
  return (dispatch) => {
    dispatch({ type: 'CHECK_USER', data: user });
  };
};

export default userLoggedReducer;
