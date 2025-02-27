import Database from 'better-sqlite3';

const db = new Database('database.sqlite');

// Create users table
db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE,
    password TEXT
  )
`);

// Create files table
db.exec(`
  CREATE TABLE IF NOT EXISTS files (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    userId INTEGER,
    filename TEXT,
    uploadDate TEXT,
    filePath TEXT,
    FOREIGN KEY(userId) REFERENCES users(id)
  )
`);

// Insert a test user (run this once or in a separate script)
const insertUser = db.prepare('INSERT OR IGNORE INTO users (username, password) VALUES (?, ?)');
import('bcryptjs').then((bcrypt) => {
  bcrypt.hash('password123', 10).then((hashedPassword) => {
    insertUser.run('user1', hashedPassword);
  });
});

export default db;