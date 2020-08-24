const guitarsRouter = require('express').Router();
const Guitar = require('../models/guitar');

// GET -METHODS
guitarsRouter.get('/', async (req, res) => {
  const guitars = await Guitar.find({});
  res.json(guitars.map((g) => g.toJSON()));
});

// GET BY ID
guitarsRouter.get('/:id', async (req, res) => {
  const guitar = await Guitar.findById(req.params.id);
  guitar ? res.json(guitar.toJSON()) : res.status(404).end();
});

// PUT -METHOD
guitarsRouter.put('/:id', async (req, res, next) => {
  const body = req.body;

  const guitar = {
    title: body.title,
    price: body.price,
  };

  await Guitar.findByIdAndUpdate(req.params.id, guitar, { new: true })
    .then((updatedGuitar) => {
      res.json(updatedGuitar.toJSON());
    })
    .catch((error) => next(error));
});

module.exports = guitarsRouter;
