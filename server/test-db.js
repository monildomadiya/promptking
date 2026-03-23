const db = require('./db');
db.execute('SELECT 1').then(() => {
  console.log('DB Connected Successfully');
  process.exit(0);
}).catch(err => {
  console.error('DB Connection Failed:', err);
  process.exit(1);
});
