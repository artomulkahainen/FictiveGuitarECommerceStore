import axios from 'axios';
const baseUrl = 'http://localhost:3001/api/users';

let token = null;

const setToken = (newToken) => {
  newToken ? (token = `bearer ${newToken}`) : (token = null);
};

const getUserDetails = async () => {
  console.log('token after getting userDetails');
  console.log(token);
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

const modifyUserDetails = async (modifiedUserDetails) => {
  /*
  console.log('token before modifying details:');
  console.log(token);*/
  if (token) {
    const options = {
      headers: { Authorization: token },
    };
    /*
    console.log('options:');
    console.log(options);*/

    try {
      const res = await axios.put(
        baseUrl,
        {
          username: modifiedUserDetails.username,
          email: modifiedUserDetails.email,
          details: modifiedUserDetails.details,
        },
        options
      );
      return res.data;
    } catch (error) {
      console.log(error);
    }
  }
  return null;
};

export default { setToken, token, getUserDetails, modifyUserDetails };
