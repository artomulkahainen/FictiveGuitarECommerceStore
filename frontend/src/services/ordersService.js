import axios from 'axios';
import userService from './userService';
const baseUrl = 'http://localhost:3001/api/orders';

const getUserOrders = () => {
  const token = userService.getToken();

  if (token) {
    const options = {
      headers: { Authorization: token },
    };

    const res = axios
      .get(baseUrl, options)
      .then((response) => response.data)
      .catch((error) => error.response.data);

    return res;
  }
  return null;
};

const postOrder = (order) => {
  const token = userService.getToken();

  if (token) {
    const options = {
      headers: {
        Authorization: token,
      },
    };

    const res = axios
      .post(baseUrl, order, options)
      .then((response) => response.data)
      .catch((error) => error.response.data);

    return res;
  }
  return null;
};

export default { getUserOrders, postOrder };
