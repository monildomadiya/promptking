const db = require('./db');

async function checkSchema() {
  try {
    const [rows] = await db.execute("DESCRIBE prompts");
    rows.forEach(row => {
      console.log(`${row.Field} | ${row.Type} | ${row.Null} | ${row.Key} | ${row.Default} | ${row.Extra}`);
    });
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

checkSchema();
