const bcrypt = require('bcrypt');
const usersRouter = require('express').Router();
const User = require('../models/user');

// GET -METHODS
usersRouter.get('/', async (req, res) => {
  const users = await User.find({});
  res.json(users.map((u) => u.toJSON()));
});

usersRouter.get('/:id', async (req, res) => {
  const user = await User.findById(req.params.id);
  user ? res.json((u = u.toJSON())) : res.status(404).end();
});

// POST -METHOD
usersRouter.post('/', async (req, res) => {
  const body = req.body;
  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(body.password, saltRounds);

  const newUser = new User({
    username: body.username,
    passwordHash,
    details: body.details,
    orders: [],
  });

  const savedUser = await newUser.save();
  res.json(savedUser);
});

module.exports = usersRouter;
