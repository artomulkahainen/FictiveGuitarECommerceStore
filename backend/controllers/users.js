const bcrypt = require('bcrypt');
const usersRouter = require('express').Router();
const User = require('../models/user');
const tokenValidator = require('../utils/tokenValidator');
const { body, validationResult } = require('express-validator');

// GET OWN DETAILS (protect and sanitize the route)
usersRouter.get('/:id', async (req, res) => {
  const user = await User.findById(req.params.id);
  user ? res.json(user.toJSON()) : res.status(404).end();
});

// CREATE USER
usersRouter.post(
  '/',
  [
    body('username', 'username min length is 3')
      .isString()
      .withMessage('username must be in string format')
      .not()
      .isEmpty()
      .withMessage("username can't be empty")
      .trim()
      .escape()
      .isLength({ min: 3 }),
    body(
      'password',
      'Password must contain only letters and numbers of 5 characters.'
    )
      .isLength({ min: 5 })
      .matches(/[a-zA-Z0-9]/, 'Password must contain only letters and numbers'),
    body('email').isEmail().normalizeEmail(),
    body('details.name')
      .isString()
      .withMessage('name must be in string format')
      .not()
      .isEmpty()
      .withMessage("name can't be empty")
      .trim()
      .escape(),
    body('details.address')
      .isString()
      .withMessage('address must be in string format')
      .not()
      .isEmpty()
      .withMessage("address can't be empty")
      .trim()
      .escape(),
    body('details.city')
      .isString()
      .withMessage('city must be in string format')
      .not()
      .isEmpty()
      .withMessage("city can't be empty")
      .trim()
      .escape(),
    body('details.zipCode')
      .isString()
      .withMessage('zipcode must be in string format')
      .not()
      .isEmpty()
      .withMessage("zipcode can't be empty")
      .trim()
      .escape(),
    body('details.phoneNumber')
      .isString()
      .withMessage('phoneNumber must be in string format')
      .not()
      .isEmpty()
      .withMessage("phoneNumber can't be empty")
      .trim()
      .escape(),
  ],
  async (req, res) => {
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

// PUT -METHOD FOR CHANGING ACCOUNT DETAILS (sanitizing needed)
usersRouter.put('/', async (req, res, next) => {
  const id = tokenValidator(req);

  if (!id) {
    return res.status(401).json({ error: 'token missing or invalid' });
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

// PUT -METHOD FOR CHANGING PASSWORD (sanitizing needed)
usersRouter.put('/password', async (req, res, next) => {
  const id = tokenValidator(req);

  if (!id) {
    return res.status(401).json({ error: 'token missing or invalid' });
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
    return res.status(401).send({ error: 'Old password was invalid' });
  }
});

module.exports = usersRouter;
