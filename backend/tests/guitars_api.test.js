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
  test('Guitar price was found', async () => {
    const res = await api.get('/api/guitars');
    expect(res.body[0].price);
  });
});

afterAll(() => {
  mongoose.connection.close();
});
