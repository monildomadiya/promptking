const postgres = require('postgres');
require('dotenv').config();

let connectionString = process.env.DATABASE_URL;

// Automatically handle unescaped '@' in passwords (common issue)
if (connectionString && !connectionString.includes('%40')) {
  // Try to find if there are multiple '@' symbols. If so, encode the password portion.
  const parts = connectionString.split('@');
  if (parts.length > 2) {
    // Format: postgresql://user:password@host:port/db
    // If multiple @ exist, the last one is the host delimiter.
    const hostPart = parts.pop();
    const userPassPart = parts.join('@');
    connectionString = `${userPassPart.replace(/:(.*)$/, (match, p1) => `:${encodeURIComponent(p1)}`)}@${hostPart}`;
  }
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
