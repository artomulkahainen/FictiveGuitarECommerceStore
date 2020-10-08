import axios from 'axios';
import token from './userService';
const baseUrl = 'http://localhost:3001/api/orders';

const getUserOrders = () => {
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
