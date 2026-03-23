const db = require('./db');

async function testUpdate() {
  try {
    // 1. Create a test row
    const testKey = 'TEST-PK-' + Date.now();
    await db.execute("INSERT INTO prompts (prompt_key, title, prompt_text) VALUES (?, ?, ?)", [testKey, 'Test', 'Test']);
    console.log("Created:", testKey);

    // 2. Update the key
    const newKey = testKey + '-UPDATED';
    const [result] = await db.execute("UPDATE prompts SET prompt_key = ? WHERE prompt_key = ?", [newKey, testKey]);
    console.log("Updated to:", newKey, "Rows affected:", result.affectedRows);

    // 3. Verify
    const [rows] = await db.execute("SELECT * FROM prompts WHERE prompt_key = ?", [newKey]);
    console.log("Verified:", rows.length > 0 ? "YES" : "NO");

    // 4. Cleanup
    await db.execute("DELETE FROM prompts WHERE prompt_key = ?", [newKey]);
    console.log("Cleaned up.");
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

testUpdate();
