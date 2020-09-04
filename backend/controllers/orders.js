const ordersRouter = require('express').Router();
const Order = require('../models/orders');
const User = require('../models/user');
const Guitar = require('../models/guitar');
const tokenValidator = require('../utils/tokenValidator');

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
  const id = tokenValidator(req);

  if (!id) {
    return res.status(401).json({ error: 'authorization failed' });
  }

  const body = req.body;
  const user = await User.findById(id);
  const guitars = await Guitar.find({});

  const filteredItems = body.products.map((p) => {
    const guitarToFind = guitars.find((g) => g.id === p.product);

    const newObject = {
      product: guitarToFind,
      quantity: p.quantity,
    };

    return newObject;
  });

  const newOrder = new Order({
    products: filteredItems,
    totalPrice: body.totalPrice,
    user: user,
  });

  const savedOrder = await newOrder.save();
  user.orders = user.orders.concat(savedOrder._id);
  await user.save();
  res.json(savedOrder);
});

// DELETE -METHODS
ordersRouter.delete('/:id', async (req, res, next) => {
  const user = await User.findById(req.body.userId);
  const newUsers = user.orders.filter(
    (order) => order.toString() !== req.params.id
  );
  user.orders = newUsers;
  await user.save();
  await Order.findByIdAndRemove(req.params.id)
    .then((el) => res.json(`item ${el.id} deleted`))
    .catch((error) => next(error));
});

module.exports = ordersRouter;
