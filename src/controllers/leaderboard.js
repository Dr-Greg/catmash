const HTTP_CODE = require('http-status-codes');

const Cat = require('../models/Cat');

module.exports = async (_, res) => {
  const cats = await Cat.find({}, { _id: false, score: true, url: true });

  const leaderboard = cats.sort((a, b) => b.score - a.score);

  return res.status(HTTP_CODE.OK).json(leaderboard);
};
