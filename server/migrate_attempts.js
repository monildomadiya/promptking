const db = require('./db');

async function migrate() {
  try {
    console.log("Checking for columns in prompts table...");
    const [cols] = await db.query('SHOW COLUMNS FROM prompts');
    const colNames = cols.map(c => c.Field);

    if (!colNames.includes('correct_attempts')) {
      console.log("Adding correct_attempts column...");
      await db.query('ALTER TABLE prompts ADD COLUMN correct_attempts INT DEFAULT 0');
    }
    if (!colNames.includes('wrong_attempts')) {
      console.log("Adding wrong_attempts column...");
      await db.query('ALTER TABLE prompts ADD COLUMN wrong_attempts INT DEFAULT 0');
    }

    console.log("Migration completed successfully.");
    process.exit(0);
  } catch (err) {
    console.error("Migration failed:", err);
    process.exit(1);
  }
}

migrate();
