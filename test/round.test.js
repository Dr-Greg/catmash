const request = require('supertest');
const HTTP_CODE = require('http-status-codes');

const app = require('../src/app');
const { setupDB } = require('./helpers');

describe('Vote', () => {
  setupDB();

  test('400 BAD REQUEST', async (done) => {
    const res = await request(app).post('/api/round').set('Accept', 'application/json');

    expect(res.statusCode).toBe(HTTP_CODE.BAD_REQUEST);
    done();
  });

  test('500 INTERNAL SERVER ERROR', async (done) => {
    const res = await request(app)
      .post('/api/round')
      .send({
        previous: ['qd,sf', 'qd,sf'],
      })
      .set('Accept', 'application/json');

    expect(res.statusCode).toBe(HTTP_CODE.INTERNAL_SERVER_ERROR);
    done();
  });

  test('200 OK', async (done) => {
    const res = await request(app)
      .post('/api/round')
      .send({
        previous: [],
      })
      .set('Accept', 'application/json');

    expect(res.statusCode).toBe(HTTP_CODE.OK);
    done();
  });
});
