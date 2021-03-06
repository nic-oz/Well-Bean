const test = require('tape'); //eslint-disable-line
const request = require('supertest'); //eslint-disable-line
const router = require('../app.js');
// require test database build script
const runDbBuild = require('../model/database/db_build');
// require query functions
const {
  getAllChallenges,
  getChallenge,
  getMessages,
  postChallenge,
  postUserChallenge,
} = require('../model/queries/');

runDbBuild();

test('test tape', (t) => {
  t.pass('tape is working');
  t.end();
});

test('Test home route', (t) => {
  request(router)
    .get('/')
    .expect(200)
    .expect('Content-Type', /html/)
    .end((err, res) => {
      t.ok(res);
      t.error(err);
      t.ok(res.text.includes('Welcome'), 'response contains welcome message');
      t.end();
    });
});

test('Test add-challenge route', (t) => {
  request(router)
    .get('/add-challenge')
    .expect(200)
    .expect('Content-Type', /html/)
    .end((err, res) => {
      t.ok(res);
      t.error(err);
      t.ok(res.text.includes('Create a new challenge'), 'response contains page title');
      t.end();
    });
});

test('Test GET challenges list view route', (t) => {
  request(router)
    .get('/challenges')
    .expect(200)
    .expect('Content-Type', /html/)
    .end((err, res) => {
      t.error(err);
      t.ok(res.text.includes('Lunch walk'), 'response contains challenge from list');
      t.end();
    });
});

test('Test GET challenge detail view route', (t) => {
  request(router)
    .get('/challenge/1')
    .expect(200)
    .expect('Content-Type', /html/)
    .end((err, res) => {
      t.error(err);
      t.ok(res.text.includes('Morning'), 'response contains info about individual challenge');
      t.end();
    });
});

test('Test GET messages view route', (t) => {
  request(router)
    .get('/messages')
    .expect(200)
    .expect('Content-Type', /html/)
    .end((err, res) => {
      t.error(err);
      t.ok(res.text.includes('stuff'), 'response contains message from list');
      t.end();
    });
});

test('Test POST user challenge route', (t) => {
  request(router)
    .post('/user-challenge/1')
    .expect(302)
    .end((err, res) => {
      t.error(err);
      t.ok(res, 'response has something from query');
      t.end();
    });
});

test('Test POST add-challenge route', (t) => {
  request(router)
    .post('/add-challenge')
    .send({
      categoryId: 2,
      userId: 4,
      title: 'This is the Title',
      description: 'This is the description',
    })
    .expect(302)
    .end((err, res) => {
      t.error(err);
      t.ok(res, 'response has something from query');
      t.end();
    });
});

test('Test status for error 404', (t) => {
  request(router)
    .get('/blah')
    .expect(404)
    .expect('Content-Type', /html/)
    .end((err, res) => {
      t.error(err);
      t.ok(res.text.includes('found'), 'Returns 404 error message');
      t.end();
    });
});

// **********************************************
// **************database tests******************
// **********************************************

test('Test getAllChallenges query', (t) => {
  runDbBuild()
    .then((res) => {
      t.ok(res);
      return getAllChallenges();
    })
    .then((challenges) => {
      t.deepEqual(
        challenges[0].title,
        'Lunch walk',
        'getAllChallenges returns first challenge title in table',
      );
      t.end();
    })
    .catch((e) => {
      t.error(e);
      t.end();
    });
});

test('Test getChallenge query', (t) => {
  runDbBuild()
    .then((res) => {
      t.ok(res);
      return getChallenge(2);
    })
    .then((challenge) => {
      t.equal(typeof challenge[0], 'object', 'getChallenge returns an object');
      t.equal(challenge[0].title, 'Node Express', 'response contains object with title');
      t.end();
    })
    .catch((e) => {
      t.error(e);
      t.end();
    });
});

test('Test getMessages query', (t) => {
  const expected = 'Strut your stuff!';
  runDbBuild()
    .then((res) => {
      t.ok(res);
      return getMessages();
    })
    .then((messages) => {
      t.equal(messages[0].body, expected, 'first message in response is as expected');
      t.end();
    })
    .catch((e) => {
      t.error(e);
      t.end();
    });
});

test('Test postChallenge query', (t) => {
  runDbBuild()
    .then((res) => {
      t.ok(res);
      return postChallenge(4, 2, 'This is the Title', 'This is the description');
    })
    .then((UserChallenge) => {
      t.ok(UserChallenge[0].id, 'postChallenge returns an id');
      t.end();
    })
    .catch((e) => {
      t.error(e);
      t.end();
    });
});

test('Test postUserChallenge query', (t) => {
  runDbBuild()
    .then((res) => {
      t.ok(res);
      return postUserChallenge(2, 2);
    })
    .then((UserChallenge) => {
      t.ok(UserChallenge[0].id, 'postUserChallenge returns an id');
      t.end();
    })
    .catch((e) => {
      t.error(e);
      t.end();
    });
});
