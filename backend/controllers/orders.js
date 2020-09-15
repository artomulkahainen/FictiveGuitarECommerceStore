const ordersRouter = require('express').Router();
const Order = require('../models/orders');
const User = require('../models/user');
const Guitar = require('../models/guitar');
const tokenValidator = require('../utils/tokenValidator');
const { param, body, validationResult } = require('express-validator');

// GET -METHODS
ordersRouter.get('/', async (req, res) => {
  const orders = await Order.find({});
  orders
    ? res.json(orders.map((order) => order.toJSON()))
    : res.status(404).end();
});

ordersRouter.get(
  '/:id',
  param('id').customSanitizer((value) => ObjectId(value)),
  async (req, res) => {
    const order = await Order.findById(req.params.id);
    order ? res.json(order.toJSON()) : res.status(404).end();
  }
);

// POST -METHODS
ordersRouter.post(
  '/',
  [
    body('quantity').isInt().withMessage('quantity must be an integer'),
    body('totalPrice').isFloat().withMessage('totalPrice must be float value'),
  ],
  async (req, res) => {
    const id = tokenValidator(req);

    if (!id) {
      return res.status(401).json({ error: 'authorization failed' });
    }

    const user = await User.findById(id);
    const guitars = await Guitar.find({});

    const filteredItems = req.body.products.map((p) => {
      const guitarToFind = guitars.find((g) => g.id === p.product);

      const newObject = {
        product: guitarToFind,
        quantity: p.quantity,
      };

      return newObject;
    });

    const newOrder = new Order({
      products: filteredItems,
      totalPrice: req.body.totalPrice,
      user: user,
    });

    try {
      const savedOrder = await newOrder.save();
      user.orders = user.orders.concat(savedOrder._id);
      await user.save();
      res.json(savedOrder);
    } catch (error) {
      res.status(400).json({ error: error });
    }
  }
);

// DELETE -METHODS
ordersRouter.delete('/:id', async (req, res, next) => {
  const user = await User.findById(req.body.userId);
  const newUsers = user.orders.filter(
    (order) => order.toString() !== req.params.id
  );

  try {
    user.orders = newUsers;
    await user.save();
    await Order.findByIdAndRemove(req.params.id)
      .then((el) => res.json(`item ${el.id} deleted`))
      .catch((error) => next(error));
  } catch (error) {
    res.status(400).json({ error: error });
  }
});

module.exports = ordersRouter;
