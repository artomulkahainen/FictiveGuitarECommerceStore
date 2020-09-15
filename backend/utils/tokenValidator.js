const jwt = require('jsonwebtoken');

const getTokenFrom = (request) => {
  const authorization = request.get('authorization');
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    return authorization.substring(7);
  }
  return null;
};

const validate = (req) => {
  const token = getTokenFrom(req);
  let decodedToken = null;

  try {
    decodedToken = jwt.verify(token, process.env.SECRET);
  } catch (error) {
    console.log(error);
  }

  if (!token || !decodedToken) {
    return null;
  }

  return decodedToken.id;
};

module.exports = validate;
