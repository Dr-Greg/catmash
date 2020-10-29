const request = require('supertest');
const HTTP_CODE = require('http-status-codes');

const app = require('../src/app');
const { setupDB, getCatId } = require('./helpers');

describe('Vote', () => {
  setupDB();

  test('400 BAD REQUEST', async (done) => {
    const res = await request(app).put('/api/vote').set('Accept', 'application/json');

    expect(res.statusCode).toBe(HTTP_CODE.BAD_REQUEST);
    done();
  });

  test('500 INTERNAL SERVER ERROR', async (done) => {
    const res = await request(app)
      .put('/api/vote')
      .send({
        vote: [
          { _id: 'catId', score: 1000, win: true },
          { _id: 'catId', score: 1000, win: false },
        ],
      })
      .set('Accept', 'application/json');

    expect(res.statusCode).toBe(HTTP_CODE.INTERNAL_SERVER_ERROR);
    done();
  });

  test('201 CREATED', async (done) => {
    const catId = await getCatId();
    const res = await request(app)
      .put('/api/vote')
      .send({
        vote: [
          { _id: catId, score: 1000, win: true },
          { _id: catId, score: 1000, win: false },
        ],
      })
      .set('Accept', 'application/json');

    expect(res.statusCode).toBe(HTTP_CODE.CREATED);
    done();
  });
});
