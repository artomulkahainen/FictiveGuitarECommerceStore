import axios from 'axios';
const baseUrl = 'http://localhost:3001/api/users';

let token = null;

const setToken = (newToken) => {
  newToken ? (token = `bearer ${newToken}`) : (token = null);
};

const getUserDetails = async () => {
  if (token) {
    try {
      const loggedUser = window.localStorage.getItem('loggedUser');
      const currentUser = JSON.parse(loggedUser);
      const res = await axios.get(baseUrl + `/${currentUser.id}`);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  }
  return null;
};

export default { setToken, token, getUserDetails };
