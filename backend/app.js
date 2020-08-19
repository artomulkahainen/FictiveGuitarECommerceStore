const express = require('express');
const app = express();
const mongoose = require('mongoose');
const config = require('./utils/config');
const cors = require('cors');
const guitarsRouter = require('./controllers/guitars');
const logger = require('./utils/logger');
const middleware = require('./utils/middleware');

mongoose
  .connect(config.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => logger.info('Succesful connection'))
  .catch(() => logger.error('Something went wrong with connection'));

mongoose.set('useFindAndModify', false);
app.use(cors());
app.use(express.json());

app.use('/api/guitars', guitarsRouter);
app.use(middleware.errorHandler);
app.use(middleware.unknownEndpoint);

module.exports = app;
