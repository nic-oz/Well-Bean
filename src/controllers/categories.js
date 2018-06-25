const { getCategories } = require('../model/queries/');

exports.get = (req, res, next) => {
  getCategories()
    .then(categories =>
      res.render('categories', {
        state: { challenges: true },
        categories,
      }))
    .catch(e => next(e));
};
