const db = require('./db');
async function check() {
  const [cols] = await db.query('SHOW COLUMNS FROM prompts');
  console.log(JSON.stringify(cols, null, 2));
  process.exit();
}
check();
