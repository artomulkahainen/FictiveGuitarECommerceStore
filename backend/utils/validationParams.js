const { body } = require('express-validator');

const validationParams = [
  body(
    'oldPassword',
    'Password must contain only letters and numbers of 5 characters.'
  )
    .isLength({ min: 5 })
    .matches(/[a-zA-Z0-9]/, 'Password must contain only letters and numbers'),
  body(
    'newPassword',
    'Password must contain only letters and numbers of 5 characters.'
  )
    .isLength({ min: 5 })
    .matches(/[a-zA-Z0-9]/, 'Password must contain only letters and numbers'),
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
];

module.exports = validationParams;
