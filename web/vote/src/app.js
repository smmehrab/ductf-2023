const express = require('express');
const session = require('express-session');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const port = 5000;

// Create SQLite database and user table
const db = new sqlite3.Database('users.db');
db.run(`
  CREATE TABLE IF NOT EXISTS users (
    username TEXT PRIMARY KEY,
    password TEXT,
    vote_status TEXT
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
      return res.redirect('/vote.html');
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

  const voteStatus = [null, ...Array(9).fill('Abdullah')];

  db.run('INSERT INTO users (username, password, vote_status) VALUES (?, ?, ?)',
    [username, password, JSON.stringify(voteStatus)], (err) => {
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
  
    db.get('SELECT * FROM users WHERE username = ? AND password = ?', [username, password], (err, row) => {
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
  
// Signout endpoint
app.get('/api/signout', (req, res) => {
req.session.destroy();
res.status(200).json({ message: 'Signout successful' });
});

// Votes endpoint
app.get('/api/votes', requireAuth, (req, res) => {
  db.get('SELECT * FROM users WHERE username = ?', [req.session.username], (err, row) => {
    if (err) {
      return res.status(500).json({ error: 'Error fetching user data' });
    }

    if (!row) {
      return res.status(404).json({ error: 'User not found' });
    }

    const voteStatus = JSON.parse(row.vote_status);

    // Check if all 10 votes have either "Mahmud" or "Abdullah" as values
    if (voteStatus.length === 10 && voteStatus.every(vote => vote === 'Mahmud' || vote === 'Abdullah')) {
      const mahmudVotes = voteStatus.filter(vote => vote === 'Mahmud').length;
      const abdullahVotes = voteStatus.filter(vote => vote === 'Abdullah').length;

      // Check if Mahmud has more votes than Abdullah
      if (mahmudVotes > abdullahVotes) {
        return res.status(200).json({ ok: true, vote_status: voteStatus, flag: 'duCTF{80LA_1$_A$_DANG3R0U$_A$_380LA}' });
      }
    }

    // If conditions are not met, return the regular response
    res.status(200).json({ ok: true, vote_status: voteStatus });
  });
});

// Vote endpoint
app.post('/api/user/:index/vote', requireAuth, (req, res) => {
  const { index } = req.params;
  const { value } = req.body;

  if (index < 1 || index > 10 || (value !== 'Abdullah' && value !== 'Mahmud')) {
    return res.status(400).json({ error: 'Invalid index or value' });
  }

  db.get('SELECT * FROM users WHERE username = ?', [req.session.username], (err, row) => {
    if (err) {
      return res.status(500).json({ error: 'Error fetching user data' });
    }

    if (!row) {
      return res.status(404).json({ error: 'User not found' });
    }

    const voteStatus = JSON.parse(row.vote_status);
    voteStatus[index-1] = value;

    db.run('UPDATE users SET vote_status = ? WHERE username = ?',
      [JSON.stringify(voteStatus), req.session.username], (updateErr) => {
        if (updateErr) {
          return res.status(500).json({ error: 'Error updating vote status' });
        }

        res.status(200).json({ ok: true, message: 'Vote recorded successfully' });
      });
  });
});

app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
