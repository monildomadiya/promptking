const mysql = require('mysql2/promise');
require('dotenv').config();

async function migrate() {
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
  });

  try {
    console.log('Adding is_premium column to prompts table...');
    await connection.execute(`
      ALTER TABLE prompts 
      ADD COLUMN is_premium TINYINT(1) DEFAULT 1 AFTER password
    `);
    console.log('Success!');
  } catch (err) {
    if (err.code === 'ER_DUP_COLUMN_NAME') {
      console.log('Column is_premium already exists.');
    } else {
      console.error('Migration failed:', err);
    }
  } finally {
    await connection.end();
  }
}

migrate();
