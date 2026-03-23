const db = require('./db');
const fs = require('fs');
async function run() {
  const [cols] = await db.execute("SHOW COLUMNS FROM prompts");
  fs.writeFileSync('schema_dump.json', JSON.stringify(cols, null, 2));
  process.exit(0);
}
run();
