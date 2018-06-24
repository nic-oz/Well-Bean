const db = require('../database/db_connection');

const getChallenges = category =>
  db.query(
    `
  SELECT ch.id, ch.title, cat.name AS category 
  FROM challenges AS ch
  LEFT JOIN categories AS cat ON ch.category_id = cat.id
  WHERE cat.name = $1
  `,
    [category],
  );

module.exports = getChallenges;
