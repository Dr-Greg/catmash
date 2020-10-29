const HTTP_CODE = require('http-status-codes');
const Cat = require('../models/Cat');

module.exports = async (req, res) => {
  const { previous } = req.body;

  if (!previous)
    return res.status(HTTP_CODE.BAD_REQUEST).json({ error: 'a key "previous:[]" is expected' });

  const rounds = await Cat.find({ _id: { $nin: previous } });
  if (!rounds) return res.sendStatus(HTTP_CODE.INTERNAL_SERVER_ERROR);

  let randA = 0;
  let randB = 0;

  while (randA === randB) {
    randA = Math.floor(Math.random() * rounds.length);
    randB = Math.floor(Math.random() * rounds.length);
  }

  const round = [rounds[randA], rounds[randB]];

  return res.status(HTTP_CODE.OK).json(round);
};
