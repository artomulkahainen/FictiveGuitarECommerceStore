const ordersRouter = require('express').Router();
const Order = require('../models/orders');
const User = require('../models/user');
const Guitar = require('../models/guitar');

// GET -METHODS
ordersRouter.get('/', async (req, res) => {
  const orders = await Order.find({});
  res.json(orders.map((order) => order.toJSON()));
});

ordersRouter.get('/:id', async (req, res) => {
  const order = await Order.findById(req.params.id);
  order ? res.json(order.toJSON()) : res.status(404).end();
});

// POST -METHODS
ordersRouter.post('/', async (req, res) => {
  const body = req.body;
  const user = await User.findById(req.body.userId);
  const guitars = await Guitar.find({});
  const filteredItems = guitars.filter((g) => body.products.includes(g.id));

  const newOrder = new Order({
    products: filteredItems,
    user: user,
  });

  const savedOrder = await newOrder.save();
  user.orders = user.orders.concat(savedOrder._id);
  await user.save();
  res.json(savedOrder);
});

// DELETE -METHODS
ordersRouter.delete('/:id', async (req, res, next) => {
  await Order.findByIdAndRemove(req.params.id)
    .then((el) => res.json(`item ${el.id} deleted`))
    .catch((error) => next(error));
});

module.exports = ordersRouter;
