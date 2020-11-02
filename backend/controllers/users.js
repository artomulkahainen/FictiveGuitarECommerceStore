const bcrypt = require('bcrypt');
const usersRouter = require('express').Router();
const User = require('../models/user');
const tokenValidator = require('../utils/tokenValidator');
const { validationResult } = require('express-validator');
const validationParams = require('../utils/validationParams');

// GET OWN DETAILS
usersRouter.get('/:id', async (req, res, next) => {
  const id = tokenValidator(req);

  if (!id) {
    return next({ name: 'JsonWebTokenError' });
  }

  const user = await User.findById(id);
  user ? res.json(user.toJSON()) : res.status(404).end();
});

// CREATE USER
usersRouter.post('/', validationParams.slice(1), async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ error: errors.array() });
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
});

// DELETE -METHOD
usersRouter.delete('/', async (req, res, next) => {
  const id = tokenValidator(req);

  if (!id) {
    return next({ name: 'JsonWebTokenError' });
  }

  await User.findByIdAndRemove(id)
    .then((deletedUser) => res.json(deletedUser))
    .catch((error) => next(error));
});

// PUT -METHOD FOR CHANGING ACCOUNT DETAILS
usersRouter.put('/', validationParams.slice(3), async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ error: errors.array() });
  }

  const id = tokenValidator(req);

  if (!id) {
    return next({ name: 'JsonWebTokenError' });
  }

  await User.findByIdAndUpdate(
    id,
    {
      $set: {
        email: req.body.email,
        details: req.body.details,
      },
    },
    { new: true }
  )
    .then((updatedUser) => res.json(updatedUser))
    .catch((error) => res.json({ error: error }));
});

// PUT -METHOD FOR CHANGING PASSWORD
usersRouter.put(
  '/password',
  validationParams.slice(0, 1),
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: errors.array() });
    }
    const id = tokenValidator(req);

    if (!id) {
      return next({ name: 'JsonWebTokenError' });
    }

    const user = await User.findById(id);

    const correctPassword = await bcrypt.compare(
      req.body.oldPassword,
      user.passwordHash
    );

    if (correctPassword) {
      const saltRounds = 10;
      const passwordHash = await bcrypt.hash(req.body.newPassword, saltRounds);

      await User.findByIdAndUpdate(
        id,
        { $set: { passwordHash: passwordHash } },
        { new: true }
      )
        .then((updatedUser) => res.json(updatedUser))
        .catch((e) => next(e));
    } else {
      res.status(401).json({ error: 'old password was invalid' });
    }
  }
);

module.exports = usersRouter;
