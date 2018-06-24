const bcrypt = require('bcryptjs');

const { getUser } = require('../model/queries/');

exports.get = (req, res) => {
  res.render('login', { layout: 'basic' });
};

exports.post = (req, res, next) => {
  const { inputUser, inputPassword } = req.body;
  getUser(inputUser)
    .then((user) => {
      if (user[0]) {
        const { id, username, password } = user[0];
        bcrypt.compare(inputPassword, password)
          .then((isMatch) => {
            if (isMatch) {
              req.session.userId = id;
              req.session.loggedIn = true;
              req.session.userName = username;
              res.redirect('/');
            } else {
              res.render('login', {
                layout: 'basic',
                error: 'Password is incorrect',
              });
            }
          })
          .catch(e => next(e));
      } else {
        res.render('login', {
          layout: 'basic',
          error: `User "${inputUser}" does not exist`,
        });
      }
    })
    .catch(e => next(e));
};
