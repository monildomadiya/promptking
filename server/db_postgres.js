const postgres = require('postgres');
require('dotenv').config();

let connectionString = process.env.DATABASE_URL;

console.log('--- DATABASE INITIALIZATION ---');
if (!connectionString) {
  console.error('CRITICAL: DATABASE_URL environment variable is missing!');
} else {
  const maskedUrl = connectionString.replace(/:([^:@]+)@/, ':****@');
  console.log(`Connecting to: ${maskedUrl}`);
}

// Automatically handle unescaped '@' in passwords (common issue)
if (connectionString && !connectionString.includes('%40')) {
  const parts = connectionString.split('@');
  if (parts.length > 2) {
    const hostPart = parts.pop();
    const userPassPart = parts.join('@');
    connectionString = `${userPassPart.replace(/:(.*)$/, (match, p1) => `:${encodeURIComponent(p1)}`)}@${hostPart}`;
    console.log('Detected unescaped @ in password, auto-encoded for safety.');
  }
}

let sql;
try {
  sql = postgres(connectionString, {
    connect_timeout: 15,
    prepare: false,
    ssl: { rejectUnauthorized: false }, // Most flexible for Supabase/Render
    onnotice: () => {},
  });
} catch (initErr) {
  console.error('SYNCHRONOUS DB INIT ERROR:', initErr);
}

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
