const supertest = require('supertest');
const mongoose = require('mongoose');
const app = require('../app');
const api = supertest(app);

beforeEach(async () => {});

describe('GET -METHODS', () => {
  test('Orders returns as json', async () => {
    await api
      .get('/api/orders')
      .expect(200)
      .expect('Content-Type', /application\/json/);
  });
});

describe('POST -METHODS', () => {
  test('Ordering is possible', async () => {
    const newOrder = {
      products: [
        '5f3a6b6cef870e426f81c9e2',
        '5f3a6c440e48b843de7855a9',
        '5f3a6b6cef870e426f81c9e2',
      ],
      userId: '5f477b8b3c6cb54184f86ced',
    };

    await api
      .post('/api/orders/')
      .send(newOrder)
      .expect(200)
      .expect('Content-Type', /application\/json/);
  });
});

afterAll(() => {
  mongoose.connection.close();
});
