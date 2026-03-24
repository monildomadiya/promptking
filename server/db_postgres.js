const postgres = require('postgres');
require('dotenv').config();

const connectionString = process.env.DATABASE_URL;

const sql = postgres(connectionString, {
  prepare: false,
  ssl: 'require',
  connect_timeout: 20
});

// Minimal test that doesn't block boot
sql`SELECT 1`.then(() => console.log('DB Connected')).catch(err => console.error('DB Boot Error:', err.message));

module.exports = sql;
