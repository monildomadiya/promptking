const postgres = require('postgres');
require('dotenv').config();

const sql = postgres({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  // Automatically handles pooling
});

module.exports = sql;
