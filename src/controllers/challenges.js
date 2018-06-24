const { getChallenges } = require('../model/queries/');

exports.get = (req, res, next) => {
  getChallenges(req.params.category)
    .then(challenges =>
      res.render('challenges', {
        state: { challenges: true },
        challenges,
      }))
    .catch(e => next(e));
};
