const HTTP_CODE = require('http-status-codes');

const { DEV } = require('../config');
const Cat = require('../models/Cat');

module.exports = async (_, res) => {
  try {
    const cats = await Cat.find({}, { _id: false, score: true, url: true });
    if (!cats) return res.sendStatus(HTTP_CODE.INTERNAL_SERVER_ERROR);

    const leaderboard = cats.sort((a, b) => b.score - a.score);

    return res.status(HTTP_CODE.OK).json(leaderboard);
  } catch (err) {
    return DEV
      ? res.status(HTTP_CODE.INTERNAL_SERVER_ERROR).json(err)
      : res.sendStatus(HTTP_CODE.INTERNAL_SERVER_ERROR);
  }
};
