const db = require('../database/db_connection');

const getCategories = () =>
  db.query(`
  SELECT cat.id, cat.name AS category FROM categories AS cat
  `);

module.exports = getCategories;
