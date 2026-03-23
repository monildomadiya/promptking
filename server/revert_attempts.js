const db = require('./db');

async function revert() {
  try {
    console.log("Checking for columns in prompts table...");
    const [cols] = await db.query('SHOW COLUMNS FROM prompts');
    const colNames = cols.map(c => c.Field);

    if (colNames.includes('correct_attempts')) {
      console.log("Dropping correct_attempts column...");
      await db.query('ALTER TABLE prompts DROP COLUMN correct_attempts');
    }
    if (colNames.includes('wrong_attempts')) {
      console.log("Dropping wrong_attempts column...");
      await db.query('ALTER TABLE prompts DROP COLUMN wrong_attempts');
    }

    console.log("Revert completed successfully.");
    process.exit(0);
  } catch (err) {
    console.error("Revert failed:", err);
    process.exit(1);
  }
}

revert();
