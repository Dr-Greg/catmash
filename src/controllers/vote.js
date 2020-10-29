const HTTP_CODE = require('http-status-codes');

const { rating } = require('../helpers');
const Cat = require('../models/Cat');

module.exports = async (req, res) => {
  const { vote } = req.body;

  if (!vote) return res.status(HTTP_CODE.BAD_REQUEST);

  const { rateA, rateB } = rating(vote[0].score, vote[1].score, 20, vote[0].win);

  vote[0].score = rateA;
  vote[1].score = rateB;

  vote.forEach(async (v) => {
    await Cat.updateOne({ _id: v._id }, { $set: { score: v.score } });
  });

  return res.status(HTTP_CODE.OK).json(vote);
};
