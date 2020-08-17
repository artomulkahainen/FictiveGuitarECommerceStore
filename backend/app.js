const express = require('express');
const app = express();
const mongoose = require('mongoose');
const config = require('./utils/config');

mongoose
  .connect(config.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => console.log('succesful connection'))
  .catch(() => console.log('unsuccesful connection'));

mongoose.set('useFindAndModify', false);
app.use(cors());
app.use(express.json());

/*app.get('/', (req, res) => {
  res.send('<p>Hello World!</p>');
});*/

module.exports = app;
