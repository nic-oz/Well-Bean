const test = require('tape'); //eslint-disable-line
const request = require('supertest'); //eslint-disable-line
// require test database build script
const runDbBuild = require('../../model/database/db_build');
// require query functions
const { getCategories } = require('../../model/queries/');

test.only('Test getCategories query', (t) => {
  const expected = 'Fitness';
  runDbBuild()
    .then((res) => {
      t.ok(res);
      return getCategories();
    })
    .then((categories) => {
      t.equal(categories[0].category, expected, 'first category returned');
      t.end();
    })
    .catch((e) => {
      t.error(e);
      t.end();
    });
});
