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

module.exports = guitarsRouter;
