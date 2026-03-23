const db = require('./db');

async function inspectData() {
  try {
    const [rows] = await db.execute("SELECT * FROM prompts LIMIT 3");
    console.log("DATA_START");
    console.log(JSON.stringify(rows, null, 2));
    console.log("DATA_END");
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

inspectData();
