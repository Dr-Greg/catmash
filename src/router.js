const router = require('express').Router({ caseSensitive: true, strict: true });

const round = require('./controllers/round');
const vote = require('./controllers/vote');
const leaderboard = require('./controllers/leaderboard');

router.route('/leaderboard').get(leaderboard);
router.route('/round').post(round);
router.route('/vote').put(vote);

module.exports = router;
