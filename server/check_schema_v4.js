const db = require('./db');

async function checkSchema() {
  try {
    const [rows] = await db.execute("DESCRIBE prompts");
    for (const row of rows) {
      console.log(`FIELD: ${row.Field}, TYPE: ${row.Type}, KEY: ${row.Key}, EXTRA: ${row.Extra}`);
    }
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

checkSchema();
