const postgres = require('postgres');
require('dotenv').config();

const connectionString = process.env.DATABASE_URL;

if (!connectionString || connectionString.includes('user:password')) {
  console.error('ERROR: DATABASE_URL is not set or contains placeholders in .env');
}

const sql = postgres(connectionString, {
  connect_timeout: 10, // 10 seconds
  prepare: false, // Required for Supabase PgBouncer / pooler
  ssl: 'require', // Required for Supabase connections from external networks like Render
  onnotice: () => {},
});

// Test connection on startup
(async () => {
  try {
    await sql`SELECT 1`;
    console.log('Successfully connected to Supabase PostgreSQL!');
  } catch (err) {
    console.error('DATABASE CONNECTION ERROR:', err.message);
    if (err.message.includes('ETIMEDOUT')) {
      console.warn('TIP: If your network doesn\'t support IPv6, use the Supabase Connection Pooler URL (IPv4 compatible) instead of the direct connection.');
    }
  }
})();

module.exports = sql;
