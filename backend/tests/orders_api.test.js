const supertest = require('supertest');
const mongoose = require('mongoose');
const app = require('../app');
const api = supertest(app);
const bcrypt = require('bcrypt');

const User = require('../models/user');

let token = null;

beforeEach(async () => {
  await User.deleteOne({ username: 'testi' });
  const saltRounds = 10;
  const passwordHash = await bcrypt.hash('testi123', saltRounds);
  const user = new User({
    username: 'testi',
    passwordHash,
    email: 'markoboi@gmail.com',
    details: {
      name: 'Marko Hirvimies',
      address: 'Kyöstinpolku 5',
      zipCode: '02600',
      city: 'Hirvensalmi',
      phoneNumber: '0455412234',
    },
  });
  await user.save();

  const loginUser = await api
    .post('/api/login')
    .send({
      username: 'testi',
      password: 'testi123',
    })
    .set('Accept', /application\/json/);

  token = `bearer ${loginUser.body.token}`;
});

describe('GET -METHODS', () => {
  test('Orders returns as json', async () => {
    await api
      .get('/api/orders')
      .set({
        Authorization: token,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      })
      .expect(200)
      .expect('Content-Type', /application\/json/);
  });

  test('Getting orders is not possible without proper authentication', async () => {
    const res = await api
      .get('/api/orders')
      .set({
        Authorization: `bearer testingSendingOrderWithWrongToken`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      })
      .expect(401)
      .expect('Content-Type', /application\/json/);

    expect(res.body.error).toContain('token missing or invalid');
  });
});

describe('POST -METHODS', () => {
  test('Ordering is possible', async () => {
    const newOrder = {
      products: [
        { product: '5f3a6b6cef870e426f81c9e2', quantity: 2 },
        { product: '5f3a6c440e48b843de7855a9', quantity: 1 },
        { product: '5f3a6b6cef870e426f81c9e2', quantity: 3 },
      ],
      totalPrice: 6500.9,
    };

    const res = await api
      .post('/api/orders/')
      .send(newOrder)
      .set({
        Authorization: token,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      })
      .expect(200)
      .expect('Content-Type', /application\/json/);
  });

  test('Ordering is not possible without proper authentication', async () => {
    const newOrder = {
      products: [
        { product: '5f3a6b6cef870e426f81c9e2', quantity: 2 },
        { product: '5f3a6c440e48b843de7855a9', quantity: 1 },
        { product: '5f3a6b6cef870e426f81c9e2', quantity: 3 },
      ],
      totalPrice: 6500.9,
    };

    const res = await api
      .post('/api/orders/')
      .send(newOrder)
      .set({
        Authorization: 'bearer tryingToSendAFakeToken',
        Accept: 'application/json',
        'Content-Type': 'application/json',
      })
      .expect(401)
      .expect('Content-Type', /application\/json/);

    expect(res.body.error).toContain('authorization failed');
  });
});

afterAll(async () => {
  mongoose.connection.close();
});
