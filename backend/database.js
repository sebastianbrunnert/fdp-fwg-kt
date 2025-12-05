const Database = require('better-sqlite3');
const bcrypt = require('bcryptjs');
const path = require('path');

const db = new Database(path.join(__dirname, 'database.db'));

// Enable foreign keys
db.pragma('foreign_keys = ON');

// Create tables
db.exec(`
  CREATE TABLE IF NOT EXISTS members (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    role TEXT NOT NULL,
    phone TEXT,
    email TEXT,
    image TEXT,
    order_position INTEGER DEFAULT 0,
    is_core_member BOOLEAN DEFAULT 1,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS news (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    date TEXT NOT NULL,
    excerpt TEXT NOT NULL,
    content TEXT NOT NULL,
    image TEXT,
    category TEXT DEFAULT 'Allgemein',
    author TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS admin_users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );
`);

const checkAdmin = db.prepare('SELECT * FROM admin_users WHERE username = ?');
const adminExists = checkAdmin.get('admin');

if (!adminExists) {
  const hashedPassword = bcrypt.hashSync('PXREFf6ghtNkVBaDkz0Y', 10);
  const insertAdmin = db.prepare('INSERT INTO admin_users (username, password_hash) VALUES (?, ?)');
  insertAdmin.run('admin', hashedPassword);
  console.log('✅ Default admin user created (username: admin, password: PXREFf6ghtNkVBaDkz0Y)');
}

console.log('✅ Database initialized successfully');

module.exports = db;
