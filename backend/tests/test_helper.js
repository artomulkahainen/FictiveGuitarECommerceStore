const Guitar = require('../models/guitar');

const guitars = [
  {
    title: 'Tele',
    price: 299.9,
  },
  {
    title: 'Lespa',
    price: 1999.8,
  },
];

const guitarsInDB = async () => {
  const guitars = await Guitar.find({});
  return guitars.map((g) => g.toJSON());
};

module.exports = { guitarsInDB };
