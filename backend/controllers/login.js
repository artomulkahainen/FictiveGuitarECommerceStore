const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const loginRouter = require('express').Router();
const User = require('../models/user');
const validationParams = require('../utils/validationParams');
const { validationResult } = require('express-validator');

loginRouter.post('/', validationParams.slice(1, 3), async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ error: errors.array() });
  }

  const user = await User.findOne({ username: req.body.username });
  console.log(user);
  const correctPassword = !user
    ? false
    : await bcrypt.compare(req.body.password, user.passwordHash);

  if (!(user && correctPassword)) {
    return next({ name: 'JsonWebTokenError' });
  }

  const userForToken = {
    username: user.username,
    id: user._id,
  };

  const token = jwt.sign(userForToken, process.env.SECRET);

  res.status(200).send({
    token,
    username: user.username,
    name: user.details.name,
    id: user.id,
  });
});

module.exports = loginRouter;
