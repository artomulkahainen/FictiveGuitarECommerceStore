const bcrypt = require('bcrypt');
const usersRouter = require('express').Router();
const User = require('../models/user');
const tokenValidator = require('../utils/tokenValidator');
const { body, validationResult } = require('express-validator');

// GET -METHODS
usersRouter.get('/', async (req, res) => {
  const users = await User.find({});
  users ? res.json(users.map((u) => u.toJSON())) : res.status(404).end();
});

usersRouter.get('/:id', async (req, res) => {
  const user = await User.findById(req.params.id);
  user ? res.json(user.toJSON()) : res.status(404).end();
});

// POST -METHOD

usersRouter.post(
  '/',
  [
    body('username')
      .isString()
      .withMessage('username must be in string format')
      .not()
      .isEmpty()
      .withMessage("username can't be empty")
      .trim()
      .escape(),
    body('password', 'password min length is 5').isLength({ min: 5 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(req.body.password, saltRounds);

    const newUser = new User({
      username: req.body.username,
      passwordHash,
      email: req.body.email,
      details: req.body.details,
      orders: [],
    });

    try {
      const savedUser = await newUser.save();
      res.json(savedUser);
    } catch (error) {
      res.status(400).json({ error: error.errors });
    }
  }
);

// DELETE -METHOD
usersRouter.delete('/', async (req, res, next) => {
  const id = tokenValidator(req);

  if (!id) {
    return res.status(401).json({ error: 'token missing or invalid' });
  }

  await User.findByIdAndRemove(id)
    .then((deletedUser) => res.json(deletedUser))
    .catch((error) => next(error));
});

// PUT -METHOD
usersRouter.put('/', async (req, res, next) => {
  const id = tokenValidator(req);

  if (!id) {
    return res.status(401).json({ error: 'token missing or invalid' });
  }

  await User.findByIdAndUpdate(
    id,
    {
      $set: {
        username: req.body.username,
        email: req.body.email,
        details: req.body.details,
      },
    },
    { new: true }
  )
    .then((updatedUser) => res.json(updatedUser))
    .catch((error) => next(error));
});

module.exports = usersRouter;
