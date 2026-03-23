const db = require('./db');

async function checkSchema() {
  try {
    const [rows] = await db.execute("DESCRIBE prompts");
    console.log("SCHEMA_START");
    console.log(JSON.stringify(rows));
    console.log("SCHEMA_END");
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

checkSchema();
