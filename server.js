const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware

app.use(bodyParser.json());
app.use(express.static('public')); 

// DATABASE
const db = new sqlite3.Database('./db.sqlite', (err) => {
  if (err) console.error(err.message);
  else console.log("✅ Connected to SQLite DB.");
});

// ────────────── TABLES ──────────────
db.run(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL,
    role TEXT DEFAULT 'user'
  )
`);

db.run(`
  CREATE TABLE IF NOT EXISTS profile (
    id INTEGER PRIMARY KEY,
    pic TEXT,
    name TEXT,
    position TEXT,
    firstName TEXT,
    middleName TEXT,
    lastName TEXT,
    email TEXT,
    phone TEXT
  )
`);

db.run(`
  CREATE TABLE IF NOT EXISTS programs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    program TEXT,
    port TEXT,
    cpu_sn TEXT,
    cpu_model TEXT,
    monitor1_sn TEXT,
    monitor1_model TEXT,
    monitor2_sn TEXT,
    monitor2_model TEXT,
    previous_user TEXT,
    latest_user TEXT
  )
`);

// ────────────── AUTH ROUTES ──────────────

// Signup
app.post('/api/signup', (req, res) => {
  const { username, password, role } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: "Username and password are required" });
  }

  db.get('SELECT * FROM users WHERE username = ?', [username], (err, row) => {
    if (err) return res.status(500).json({ message: err.message });
    if (row) return res.status(400).json({ message: "Username already exists" });

    bcrypt.hash(password, 10, (err, hash) => {
      if (err) return res.status(500).json({ message: err.message });

      const userRole = role || 'user'; 

    db.run(
  'INSERT INTO users (username, password, role) VALUES (?, ?, ?)',
  [username, hash, userRole],
  function(err) {
    if (err) return res.status(500).json({ message: err.message });
    res.json({ success: true, message: "Signup successful", id: this.lastID });
  }
);
    });
  });
});

// Login
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) return res.status(400).json({ message: "All fields are required" });

  db.get('SELECT * FROM users WHERE username = ?', [username], (err, row) => {
    if (err) return res.status(500).json({ message: err.message });
    if (!row) return res.status(401).json({ message: "Invalid username or password" });

    bcrypt.compare(password, row.password, (err, match) => {
      if (err) return res.status(500).json({ message: err.message });
      if (!match) return res.status(401).json({ message: "Invalid username or password" });

      // Return user info including role
      res.json({
        success: true,
        message: "Login successful",
        user: { id: row.id, username: row.username, role: row.role }
      });
    });
  });
});

// ────────────── FRONTEND PAGES ──────────────
app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'public', 'index.html')));
app.get('/signup', (req, res) => res.sendFile(path.join(__dirname, 'public', 'signup.html')));
app.get('/login', (req, res) => res.sendFile(path.join(__dirname, 'public', 'login.html')));

// ────────────── START SERVER ──────────────
app.listen(PORT, () => console.log(`🚀 Server running at http://localhost:${PORT}`));
