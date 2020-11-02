const ordersRouter = require('express').Router();
const Order = require('../models/orders');
const User = require('../models/user');
const Guitar = require('../models/guitar');
const tokenValidator = require('../utils/tokenValidator');

// GET USER'S OWN ORDERS
ordersRouter.get('/', async (req, res, next) => {
  const id = tokenValidator(req);

  if (!id) {
    return next({ name: 'JsonWebTokenError' });
  }

  const orders = await Order.find({ user: { $in: id } });
  orders
    ? res.json(orders.map((order) => order.toJSON()))
    : res.status(404).end();
});

// POST A NEW ORDER
ordersRouter.post('/', async (req, res, next) => {
  const id = tokenValidator(req);

  if (!id) {
    return next({ name: 'JsonWebTokenError' });
  }

  const user = await User.findById(id);
  const guitarIds = req.body.products.map((p) => p.product);
  const guitars = await Guitar.find({ _id: { $in: guitarIds } });

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
});

module.exports = ordersRouter;
