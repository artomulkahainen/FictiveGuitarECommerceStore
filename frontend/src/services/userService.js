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

const createUser = async (userDetails) => {
  try {
    const res = await axios.post(baseUrl, {
      username: userDetails.username,
      password: userDetails.password,
      email: userDetails.email,
      details: {
        name: userDetails.details.name,
        address: userDetails.details.address,
        zipCode: userDetails.details.zipCode,
        city: userDetails.details.city,
        phoneNumber: userDetails.details.phoneNumber,
      },
    });
    return res.data;
  } catch (error) {
    return error.message;
  }
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

const changePassword = async (passwordObject) => {
  // CHECK IF USER IS LOGGED IN
  if (token) {
    const options = {
      headers: { Authorization: token },
    };

    try {
      const res = await axios.put(
        baseUrl + '/password',
        {
          oldPassword: passwordObject.oldPassword,
          newPassword: passwordObject.newPassword,
        },
        options
      );
      return res.data;
    } catch (error) {
      return error;
    }
  }
  return null;
};

export default {
  setToken,
  token,
  getUserDetails,
  modifyUserDetails,
  createUser,
  changePassword,
};
