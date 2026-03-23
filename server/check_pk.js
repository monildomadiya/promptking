const db = require('./db');

async function checkPK() {
  try {
    const [rows] = await db.execute("DESCRIBE prompts");
    const pk = rows.find(r => r.Key === 'PRI');
    console.log("PRIMARY_KEY:", pk ? pk.Field : "NONE");
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

checkPK();
