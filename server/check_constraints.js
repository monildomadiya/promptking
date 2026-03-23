const db = require('./db');

async function checkConstraints() {
  try {
    const [rows] = await db.execute(`
      SELECT 
        TABLE_NAME, 
        COLUMN_NAME, 
        CONSTRAINT_NAME, 
        REFERENCED_TABLE_NAME, 
        REFERENCED_COLUMN_NAME
      FROM
        INFORMATION_SCHEMA.KEY_COLUMN_USAGE
      WHERE
        REFERENCED_TABLE_NAME = 'prompts'
        AND REFERENCED_COLUMN_NAME = 'prompt_key'
    `);
    console.log("CONSTRAINTS_START");
    console.log(JSON.stringify(rows, null, 2));
    console.log("CONSTRAINTS_END");
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

checkConstraints();
