const postgres = require('postgres');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });

const connectionString = process.env.DATABASE_URL;

const sql = postgres(connectionString, {
  prepare: false,
  
  connect_timeout: 20
});

// Minimal test that doesn't block boot
sql`SELECT 1`.then(() => console.log('DB Connected')).catch(err => console.error('DB Boot Error:', err.message));

module.exports = sql;
