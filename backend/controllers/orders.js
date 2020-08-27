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

  // TÄÄ TAPA TOIMII, MUTTA EI ERITTELE USEAMPIA SAMOJA TUOTTEITA
  const filteredItems = guitars.filter((g) => body.products.includes(g.id));

  console.log(`Body products length: ${body.products.length}`);

  // YRITYS2
  /*const filteredItems = [];

  body.products.forEach(function (p) {
    for (var i = 0; i < guitars.length; i++) {
      if (body.products.includes(guitars[i].id)) {
        filteredItems.push(guitars[i].id);
        break;
      }
    }
  });*/

  /*for (var i = 0; i < body.products.length; i++) {
    guitars.forEach((g) =>
      body.products.includes(g.id) ? filteredItems.push(g) : null
    );
  }*/

  // YRITYS 3
  /*const filteredItems = [];

  body.products.forEach((el) => {
    let specific = guitars.forEach((g) => g.id === el.id);
    console.log(`Specific guitar is found: ${specific}`);
    filteredItems.push(specific);
  });*/

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
