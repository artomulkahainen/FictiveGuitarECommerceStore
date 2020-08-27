const supertest = require('supertest');
const mongoose = require('mongoose');
const app = require('../app');
const api = supertest(app);

const User = require('../models/user');

describe('GET -methods', () => {
  beforeEach(async () => {
    await User.deleteOne({ username: 'marko' });
    const user = new User({
      username: 'marko',
      passwordHash: 'marko123',
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
  });

  test('users are returned as json', async () => {
    await api
      .get('/api/users')
      .expect(200)
      .expect('Content-Type', /application\/json/);
  });

  test('User can be viewed', async () => {
    const user = await User.findOne({ username: 'marko' });

    await api
      .get(`/api/users/${user._id}`)
      .expect(200)
      .expect('Content-Type', /application\/json/);
  });
});

describe('DELETE -methods', () => {
  test('User can be deleted', async () => {
    const user = await User.findOne({ username: 'marko' });

    const result = await api.delete(`/api/users/${user._id}`);

    expect(result.body.username).toContain('marko');
  });
});

afterAll(() => {
  mongoose.connection.close();
});
