const postgres = require('postgres');
require('dotenv').config();

let connectionString = process.env.DATABASE_URL;

console.log('--- DATABASE INITIALIZATION ---');

const fixConnectionString = (url) => {
  if (!url || !url.startsWith('postgresql://')) return url;
  try {
    // 1. Split at protocol
    const [protocol, rest] = url.split('://');
    // 2. Split at last '@' to separate host
    const lastAtIdx = rest.lastIndexOf('@');
    if (lastAtIdx === -1) return url; // No credentials
    
    const credentials = rest.substring(0, lastAtIdx);
    const host = rest.substring(lastAtIdx + 1);
    
    // 3. Split credentials at first ':' to separate user and password
    const firstColonIdx = credentials.indexOf(':');
    if (firstColonIdx === -1) return url; // No password
    
    const user = credentials.substring(0, firstColonIdx);
    const pass = credentials.substring(firstColonIdx + 1);
    
    // 4. Encode only the password and reconstruct
    const encodedPass = encodeURIComponent(pass);
    return `${protocol}://${user}:${encodedPass}@${host}`;
  } catch (e) {
    console.error('Failed to auto-fix connection string:', e);
    return url;
  }
};

if (connectionString) {
  const maskedUrl = connectionString.replace(/:([^:@]+)@/, ':****@');
  console.log(`Connecting to: ${maskedUrl}`);
  
  if (!connectionString.includes('%40')) {
    const fixed = fixConnectionString(connectionString);
    if (fixed !== connectionString) {
      connectionString = fixed;
      console.log('Detected unescaped symbols in password, auto-encoded for safety.');
    }
  }
} else {
  console.error('CRITICAL: DATABASE_URL environment variable is missing!');
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
