const supertest = require('supertest');
const mongoose = require('mongoose');
const app = require('../app');
const api = supertest(app);

const User = require('../models/user');

describe('GET -methods', () => {
  beforeEach(async () => {
    await User.deleteOne({ username: 'testi' });
    const user = new User({
      username: 'testi',
      passwordHash: 'testi',
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

  test('User can be viewed', async () => {
    const user = await User.findOne({ username: 'testi' });

    await api
      .get(`/api/users/${user._id}`)
      .expect(200)
      .expect('Content-Type', /application\/json/);
  });
});

describe('DELETE -methods', () => {
  test('User can not be deleted without proper auth', async () => {
    const result = await api.delete(`/api/users/`);
    expect(result.body.error).toContain('token missing or invalid');
  });
});

afterAll(() => {
  mongoose.connection.close();
});
