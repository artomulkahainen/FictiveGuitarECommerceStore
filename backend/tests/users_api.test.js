const supertest = require('supertest');
const mongoose = require('mongoose');
const app = require('../app');
const api = supertest(app);
const bcrypt = require('bcrypt');

const User = require('../models/user');

let token = null;

// ****************** BEFORE EACH TESTS *************** //
// **************************************************** //

beforeEach(async () => {
  await User.deleteOne({ username: 'testi' });
  await User.deleteOne({ username: 'testiAccount' });

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

// ******************** GET METHODS ******************* //
// **************************************************** //

describe('GET -methods', () => {
  test('Logged users can view their details', async () => {
    const user = await User.findOne({ username: 'testi' });
    console.log('console logign user');
    console.log(user);

    console.log('console logging token');
    console.log(token);

    await api
      .get(`/api/users/${user._id}`)
      .set({
        Authorization: token,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      })
      .expect(200)
      .expect('Content-Type', /application\/json/);
  });
});

// ******************* POST METHODS ******************* //
// **************************************************** //

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

    await api
      .post('/api/users')
      .set({ Accept: 'application/json', 'Content-Type': 'application/json' })
      .send(newUser)
      .expect(400);
  });

  test("User with wrong name can't be created", async () => {
    const newUser = {
      username: 'testiAccount',
      password: 'testi123',
      email: 'markoboitsu2@gmail.com',
      details: {
        name: '',
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
      .expect(400);
  });

  test('User can be created', async () => {
    const newUser = {
      username: 'testiAccount',
      password: 'testi123',
      email: 'markoboitsu2@gmail.com',
      details: {
        name: 'Marko Boi Bottuvoi',
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

// ****************** DELETE METHODS ****************** //
// **************************************************** //

describe('DELETE -methods', () => {
  test('User can not be deleted without proper auth', async () => {
    const result = await api.delete(`/api/users/`).set({
      Authorization: 'bearer fakeToken',
      Accept: 'application/json',
      'Content-Type': 'application/json',
    });
    expect(result.body.error).toContain('invalid token');
  });
});

afterAll(() => {
  mongoose.connection.close();
});
