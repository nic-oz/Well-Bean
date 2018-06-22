const test = require('tape'); //eslint-disable-line
const request = require('supertest'); //eslint-disable-line
const router = require('../../app.js');
// require test database build script
const runDbBuild = require('../../model/database/db_build');

test('Test select challenge POST route', (t) => {
  runDbBuild()
    .then((dbRes) => {
      t.ok(dbRes, 'database built');
      request(router)
        .post('/user-challenge/1')
        .expect(302)
        .end((err, res) => {
          t.error(err);
          t.ok(res, 'response has something from query');
          t.end();
        });
    })
    .catch((e) => {
      t.error(e);
      t.end();
    });
});

test('Test select challenge POST route with invalid challenge id', (t) => {
  runDbBuild()
    .then((dbRes) => {
      t.ok(dbRes, 'database built');
      request(router)
        .post('/user-challenge/one')
        .expect(500)
        .expect('Content-Type', /html/)
        .end((err, res) => {
          t.error(err);
          t.ok(res.text.includes('500'), 'response contains 500 error message');
          t.end();
        });
    })
    .catch((e) => {
      t.error(e);
      t.end();
    });
});
