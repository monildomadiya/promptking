const db = require('./db');
async function run() {
  try {
    console.log("Adding unlock_count column...");
    await db.execute("ALTER TABLE prompts ADD COLUMN unlock_count INT DEFAULT 0 AFTER copy_count");
    
    console.log("Adding like_count column...");
    await db.execute("ALTER TABLE prompts ADD COLUMN like_count INT DEFAULT 0 AFTER unlock_count");
    
    console.log("Initializing like_count from user_likes table...");
    await db.execute(`
      UPDATE prompts p
      SET like_count = (
        SELECT COUNT(*) 
        FROM user_likes ul 
        WHERE ul.prompt_key = p.prompt_key
      )
    `);
    
    console.log("Migration successful!");
    process.exit(0);
  } catch (err) {
    if (err.code === 'ER_DUP_FIELDNAME') {
      console.log("Columns already exist, skipping...");
      process.exit(0);
    }
    console.error("Migration failed:", err);
    process.exit(1);
  }
}
run();
