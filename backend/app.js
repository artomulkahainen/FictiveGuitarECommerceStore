const express = require('express');
const app = express();
const mongoose = require('mongoose');
const config = require('./utils/config');
const cors = require('cors');
const guitarsRouter = require('./controllers/guitars');
const usersRouter = require('./controllers/users');
const ordersRouter = require('./controllers/orders');
const loginRouter = require('./controllers/login');
const logger = require('./utils/logger');
const middleware = require('./utils/middleware');
const morgan = require('morgan');

mongoose
  .connect(config.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => logger.info('Successfully connected to MongoDB database'))
  .catch(() => logger.error('Something went wrong with connection to db'));

mongoose.set('useFindAndModify', false);

morgan.token('body', (req) => {
  return JSON.stringify(req.body);
});

app.use(cors());
app.use(express.json());
app.use(
  morgan(
    ':method :url :status :response-time ms - :res[content-length] :body - :req[content-length]'
  )
);

app.use('/api/guitars', guitarsRouter);
app.use('/api/users', usersRouter);
app.use('/api/orders', ordersRouter);
app.use('/api/login', loginRouter);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('build'));
}

app.use(middleware.errorHandler);
app.use(middleware.unknownEndpoint);

module.exports = app;
