const db = require('../database/db_connection');

const getActiveChallenge = userId =>
  db.query(
    `
  SELECT uc.id, ch.title, cat.name AS category 
  FROM challenges AS ch
  LEFT JOIN categories AS cat ON ch.category_id = cat.id
  INNER JOIN user_challenges AS uc
  ON ch.id = uc.challenge_id
  WHERE uc.user_id = $1 AND uc.status = 'active';
  `,
    [userId],
  );

module.exports = getActiveChallenge;
