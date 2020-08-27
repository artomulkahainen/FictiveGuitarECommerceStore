const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const api = supertest(app);
const Guitar = require('../models/guitar');

describe('GET METHODS', () => {
  test('guitars are returned as json', async () => {
    await api
      .get('/api/guitars')
      .expect(200)
      .expect('Content-Type', /application\/json/);
  });
  test('ukulele is found', async () => {
    const res = await api.get('/api/guitars/');
    const guitars = res.body.map((r) => r.title);

    expect(guitars).toContain('Ukulele');
  });
  test('Les Paul is found', async () => {
    const res = await api.get('/api/guitars/');
    const guitars = res.body.map((r) => r.title);

    expect(guitars).toContain('Les Paul');
  });
});

describe('PUT -methods', () => {
  test('Guitar price can be updated', async () => {
    const guitar = await Guitar.findOne({ title: 'Telecaster' });

    const guitarToChange = {
      title: 'Telecaster',
      price: (guitar.price + 200).toFixed(1),
    };

    await api
      .put(`/api/guitars/${guitar._id}`)
      .send(guitarToChange)
      .expect(200)
      .expect('Content-Type', /application\/json/);
  });
});

afterAll(() => {
  mongoose.connection.close();
});
