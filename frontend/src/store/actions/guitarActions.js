import * as actionTypes from './actionTypes';
import guitarService from '../../services/guitarService';

export const initGuitars = () => {
  return async (dispatch) => {
    const guitars = await guitarService.getAll();
    dispatch({ type: actionTypes.INIT_GUITARS, data: guitars });
  };
};
