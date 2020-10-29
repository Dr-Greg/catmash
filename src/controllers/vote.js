const HTTP_CODE = require('http-status-codes');
const mongoose = require('mongoose');

const { DEV } = require('../config');
const { rating } = require('../helpers');
const Cat = require('../models/Cat');

module.exports = async (req, res) => {
  try {
    const { vote } = req.body;
    if (!vote)
      return res.status(HTTP_CODE.BAD_REQUEST).json({ error: 'a key "vote:[]" is expected' });

    const { rateA, rateB } = rating(vote[0].score, vote[1].score, 20, vote[0].win);

    vote[0].score = rateA;
    vote[1].score = rateB;

    if (
      !mongoose.Types.ObjectId.isValid(vote[0]._id) ||
      !mongoose.Types.ObjectId.isValid(vote[1]._id)
    )
      return res.sendStatus(HTTP_CODE.INTERNAL_SERVER_ERROR);

    await Cat.updateOne({ _id: vote[0]._id }, { $set: { score: vote[0].score } });
    await Cat.updateOne({ _id: vote[1]._id }, { $set: { score: vote[1].score } });

    return res.status(HTTP_CODE.CREATED).json(vote);
  } catch (err) {
    return DEV
      ? res.status(HTTP_CODE.INTERNAL_SERVER_ERROR).json(err)
      : res.sendStatus(HTTP_CODE.INTERNAL_SERVER_ERROR);
  }
};
