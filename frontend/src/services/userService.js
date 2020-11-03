import axios from 'axios';
const baseUrl = '/api/users';

let token = null;

const setToken = (newToken) => {
  newToken ? (token = `bearer ${newToken}`) : (token = null);
};

const getToken = () => {
  return token;
};

const getUserDetails = async () => {
  if (token) {
    const options = {
      headers: { Authorization: token },
    };
    try {
      const loggedUser = window.localStorage.getItem('loggedUser');
      const currentUser = JSON.parse(loggedUser);
      const res = await axios.get(baseUrl + `/${currentUser.id}`, options);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  }
  return null;
};

const createUser = (userDetails) => {
  const res = axios
    .post(baseUrl, {
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
    })
    .then((response) => response.data)
    .catch((error) => error.response.data);

  return res;
};

const modifyUserDetails = (modifiedUserDetails) => {
  if (token) {
    const options = {
      headers: { Authorization: token },
    };

    const res = axios
      .put(
        baseUrl,
        {
          username: modifiedUserDetails.username,
          email: modifiedUserDetails.email,
          details: modifiedUserDetails.details,
        },
        options
      )
      .then((response) => response.data)
      .catch((error) => error.response.data);
    return res;
  }
  return { error: 'Not authorized.' };
};

const changePassword = (passwordObject) => {
  // CHECK IF USER IS LOGGED IN
  if (token) {
    const options = {
      headers: { Authorization: token },
    };

    const response = axios
      .put(
        baseUrl + '/password',
        {
          oldPassword: passwordObject.oldPassword,
          newPassword: passwordObject.newPassword,
        },
        options
      )
      .then((res) => res.data)
      .catch((error) => error.response.data);

    return response;
  }
  return { error: 'Not authorized.' };
};

export default {
  setToken,
  getToken,
  getUserDetails,
  modifyUserDetails,
  createUser,
  changePassword,
};
