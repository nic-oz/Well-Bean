const { postUserChallenge } = require('../model/queries/');

exports.post = (req, res, next) => {
  const { userId } = req.session;
  const challengeId = req.params.id;

  postUserChallenge(userId, challengeId)
    .then(() => res.redirect('/'))
    .catch(e => next(e));
};
