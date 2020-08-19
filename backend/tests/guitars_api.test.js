const helper = require('./test_helper');
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
  test('a specific guitar is found', async () => {
    const res = await api.get('/api/guitars/');
    const guitars = res.body.map((r) => r.title);

    expect(guitars).toContain('Ukulele');
  });
  /*test('specific item can be viewed', async () => {
      const 
  });*/
});

afterAll(() => {
  mongoose.connection.close();
});
