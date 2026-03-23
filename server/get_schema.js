const db = require('./db');

async function get_schema() {
  try {
    const [rows] = await db.execute("DESCRIBE prompts");
    console.log(JSON.stringify(rows, null, 2));
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

get_schema();
