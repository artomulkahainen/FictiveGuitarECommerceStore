let token = null;

const setToken = (newToken) => {
  newToken ? (token = `bearer ${newToken}`) : (token = null);
};

export default { setToken, token };
