const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));

// Connect to DB
const db = new sqlite3.Database('./db.sqlite', (err) => {
  if (err) console.error(err.message);
  else console.log("Connected to SQLite DB.");
});

// Create table
db.run(`
  CREATE TABLE IF NOT EXISTS inventory (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    quantity INTEGER NOT NULL,
    price REAL NOT NULL
  )
`);

// Get all items
app.get('/api/items', (req, res) => {
  db.all('SELECT * FROM inventory', [], (err, rows) => {
    if (err) res.status(500).send(err.message);
    else res.json(rows);
  });
});

// Add item
app.post('/api/items', (req, res) => {
  const { name, quantity, price } = req.body;
  db.run('INSERT INTO inventory (name, quantity, price) VALUES (?, ?, ?)',
    [name, quantity, price],
    function(err) {
      if (err) return res.status(500).send(err.message);
      res.json({ id: this.lastID });
    }
  );
});

// Delete item
app.delete('/api/items/:id', (req, res) => {
  const id = req.params.id;
  db.run('DELETE FROM inventory WHERE id = ?', [id], function(err) {
    if (err) return res.status(500).send(err.message);
    res.sendStatus(200);
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
