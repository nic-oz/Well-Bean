const { getCategories } = require('../model/queries/');

exports.get = (req, res, next) => {
  getCategories()
    .then(categories =>
      res.render('categories', {
        categories,
      }))
    .catch(e => next(e));
};
