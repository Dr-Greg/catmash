const request = require('supertest');
const HTTP_CODE = require('http-status-codes');
const joi = require('joi');

const app = require('../src/app');
const { setupDB } = require('./helpers');

describe('Vote', () => {
  setupDB();

  test('200 OK', async (done) => {
    const res = await request(app).get('/api/leaderboard');

    const joiSchema = joi.array().items(
      joi.object({
        score: joi.number().required(),
        url: joi.string().required(),
      })
    );

    const { error } = joiSchema.validate(res.body);
    expect(res.statusCode).toBe(HTTP_CODE.OK);
    expect(error).toBe(undefined);
    done();
  });
});
