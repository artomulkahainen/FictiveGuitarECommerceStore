const supertest = require('supertest');
const mongoose = require('mongoose');
const app = require('../app');
const api = supertest(app);

const User = require('../models/user');

let token = null;

beforeEach(async () => {
  await User.deleteOne({ username: 'testi' });
  await User.deleteOne({ username: 'testiAccount' });

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

  const loginUser = await api
    .post('/api/login')
    .send({
      username: 'testi',
      password: 'testi123',
    })
    .set('Accept', /application\/json/);

  token = `bearer ${loginUser.body.token}`;
});

describe('GET -methods', () => {
  test('User can be viewed', async () => {
    const user = await User.findOne({ username: 'testi' });

    await api
      .get(`/api/users/${user._id}`)
      .expect(200)
      .expect('Content-Type', /application\/json/);
  });
});

describe('POST -methods', () => {
  test('User without proper email is not possible to create', async () => {
    const newUser = {
      username: 'testiAccount',
      password: 'testi123',
      email: 'markoboisssss',
      details: {
        name: 'Marko Hirvimies',
        address: 'Kyöstinpolku 5',
        zipCode: '02600',
        city: 'Hirvensalmi',
        phoneNumber: '0455412234',
      },
    };

    const res = await api
      .post('/api/users')
      .set({ Accept: 'application/json', 'Content-Type': 'application/json' })
      .send(newUser)
      .expect(400);

    expect(res.body.errors[0].msg).toContain('Invalid value');
  });

  test('User can be created', async () => {
    const newUser = {
      username: 'testiAccount',
      password: 'testi123',
      email: 'markoboitsu2@gmail.com',
      details: {
        name: 'Marko Hirvimies',
        address: 'Kyöstinpolku 5',
        zipCode: '02600',
        city: 'Hirvensalmi',
        phoneNumber: '0455412234',
      },
    };

    await api
      .post('/api/users')
      .set({ Accept: 'application/json', 'Content-Type': 'application/json' })
      .send(newUser)
      .expect(200);
  });
});

describe('DELETE -methods', () => {
  test('User can not be deleted without proper auth', async () => {
    const result = await api.delete(`/api/users/`).set({
      Authorization: 'bearer fakeToken',
      Accept: 'application/json',
      'Content-Type': 'application/json',
    });
    expect(result.body.error).toContain('token missing or invalid');
  });
});

afterAll(() => {
  mongoose.connection.close();
});
