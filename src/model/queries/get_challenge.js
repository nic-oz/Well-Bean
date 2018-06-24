const db = require('../database/db_connection');

const getChallenge = challengeID =>
  db.query(
    `
  SELECT ch.id, ch.title, ch.description, u.username, to_char(ch.added, 'Month DD, YYYY at HH12:MI pm') AS time, cat.name AS category
  FROM challenges AS ch
  LEFT JOIN categories AS cat ON ch.category_id = cat.id
  LEFT JOIN users AS u ON ch.user_id = u.id    
  WHERE ch.id = $1;
  `,
    [challengeID],
  );

module.exports = getChallenge;
