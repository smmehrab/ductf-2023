const express = require('express');
const session = require('express-session');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const port = 5000;

const FLAG = 'duCTF{v4cc1n3s_4r3_4w3s0m3_$0_4r3_y0u}';

// Create SQLite database and user table
const db = new sqlite3.Database('users.db');
db.run(`
  CREATE TABLE IF NOT EXISTS users (
    user_id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE,
    password TEXT,
    status TEXT
  )
`);

app.use(bodyParser.json());
app.use(session({ secret: 'ductf-vaccinate-smmehrab', resave: false, saveUninitialized: false }));
app.use(express.static(path.join(__dirname, 'public')));

// Middleware to check if the user is authenticated
const requireAuth = (req, res, next) => {
  if (!req.session.username) {
    return res.redirect('/signin.html');
  }
  next();
};

app.get('/', (req, res) => {
  if (req.session.username) {
    return res.redirect('/profile.html');
  } else {
    return res.redirect('/signin.html');
  }
});

// Signout endpoint
app.get('/api/signout', requireAuth, (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ error: 'Error during signout' });
    }
    res.status(200).json({ ok: true, message: 'Signout successful' });
  });
});

// Signup endpoint
app.post('/api/signup', (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password are required' });
  }

  // WARNING: This code intentionally introduces a SQLite injection vulnerability
  const query = `INSERT INTO users (username, password, status) VALUES ('${username}', '${password}', 'infected')`;

  db.run(query, (err) => {
    if (err) {
      return res.status(500).json({ error: 'Error creating user' });
    }

    res.status(200).json({ message: 'User created successfully' });
  });
});

// Signin endpoint
app.post('/api/signin', (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password are required' });
  }

  const query = `SELECT * FROM users WHERE username = '${username}' AND password = '${password}'`;
  db.get(query, (err, row) => {
    if (err) {
      return res.status(500).json({ error: 'Error checking credentials' });
    }
  
    if (row) {
      req.session.username = row.username;
      res.status(200).json({ message: 'Signin successful' });
    } else {
      res.status(401).json({ error: 'Invalid username or password' });
    }
  });  
});

// Profile endpoint
app.get('/api/profile', requireAuth, (req, res) => {
  db.get('SELECT username, status FROM users WHERE username = ?', [req.session.username], (err, row) => {
    if (err) {
      return res.status(500).json({ error: 'Error fetching user data' });
    }

    if (!row) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Check if the status is 'vaccinated'
    const flag_value = row.status === 'vaccinated' ? FLAG : null;
    res.status(200).json({ username: row.username, status: row.status, flag: flag_value });
  });
});

// Change password endpoint
app.post('/api/change-pass', requireAuth, (req, res) => {
  const { username, oldPassword, newPassword } = req.body;

  if (!username || !oldPassword || !newPassword) {
    return res.status(400).json({ error: 'Username, old password, and new password are required' });
  }

  // Check if the old password is correct
  const checkPasswordQuery = `SELECT * FROM users WHERE username = '${username}' AND password = '${oldPassword}'`;
  db.get(checkPasswordQuery, (checkErr, checkRow) => {
    if (checkErr) {
      return res.status(500).json({ error: 'Error checking old password' });
    }

    if (!checkRow) {
      return res.status(401).json({ error: 'Invalid old password' });
    }

    // Update the password to the new password
    const updatePasswordQuery = `UPDATE users SET password = '${newPassword}' WHERE username = '${username}'`;
    console.log(updatePasswordQuery)
    db.run(updatePasswordQuery, (updateErr) => {
      console.log(updateErr)
      if (updateErr) {
        return res.status(500).json({ error: 'Error updating password' });
      }

      res.status(200).json({ message: 'Password changed successfully' });
    });
  });
});

app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
