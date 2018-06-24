const db = require('../database/db_connection');

const getChallenges = category =>
  db.query(
    `
    SELECT ch.id as id, ch.title, u.username, cat.name AS category, 
    to_char(ch.added, 'Month DD, YYYY at HH12:MI pm') as time FROM challenges AS ch 
    LEFT JOIN categories AS cat ON ch.category_id = cat.id 
    LEFT JOIN users AS u ON ch.user_id = u.id 
    WHERE cat.name = $1
  `,
    [category],
  );

module.exports = getChallenges;
