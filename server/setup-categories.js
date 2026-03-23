const db = require('./db');

async function setup() {
  try {
    // 1. Create categories table
    await db.execute(`
      CREATE TABLE IF NOT EXISTS categories (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        slug VARCHAR(255) NOT NULL UNIQUE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // 2. Insert default categories if none exist
    const [existing] = await db.execute("SELECT COUNT(*) as count FROM categories");
    if (existing[0].count === 0) {
      await db.execute("INSERT INTO categories (name, slug) VALUES ('ChatGPT', 'chatgpt'), ('Gemini', 'gemini'), ('Midjourney', 'midjourney')");
    }

    // 3. Update prompts table rename ai_type to category_id (optional, but better to keep for now for compatibility)
    // For now, let's keep ai_type as a string but we will fetch it from categories table.
    // Or we could eventually migrate. Let's stick to string matching for now to avoid massive migration today.

    console.log("Database updated successfully");
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

setup();
