import guitarService from '../../services/guitarService';

const guitarReducer = (state = [], action) => {
  if (action.type === 'INIT_GUITARS') {
    return action.data;
  } else {
    return state;
  }
};

export const initGuitars = () => {
  return async (dispatch) => {
    const guitars = await guitarService.getAll();
    dispatch({ type: 'INIT_GUITARS', data: guitars });
  };
};

export default guitarReducer;
