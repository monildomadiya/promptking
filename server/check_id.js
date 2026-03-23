const db = require('./db');

async function checkId() {
  try {
    const [rows] = await db.execute("DESCRIBE prompts");
    const hasId = rows.some(r => r.Field === 'id');
    console.log("HAS_ID:", hasId);
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

checkId();
