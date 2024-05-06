const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Create MySQL connection
const connection = mysql.createConnection({
  host: '10.0.2.54',
  user: 'poridhi_user',
  password: 'poridhi_24',
  database: 'poridhi'
});

// Connect to MySQL
connection.connect((err) => {
  if (err) throw err;
  console.log('Connected to MySQL database');
});

// Body parser middleware
app.use(bodyParser.json());

// POST route to insert data
app.post('/users', (req, res) => {
  const userData = req.body;
  const query = 'INSERT INTO users SET ?';
  connection.query(query, userData, (error, results, fields) => {
    if (error) {
      console.error('Error inserting user:', error);
      res.status(500).send('Error inserting user');
      return;
    }
    res.status(201).send('User added successfully!');
  });
});

// GET route to fetch data
app.get('/users', (req, res) => {
  const query = 'SELECT * FROM users';
  connection.query(query, (error, results, fields) => {
    if (error) {
      console.error('Error fetching users:', error);
      res.status(500).send('Error fetching users');
      return;
    }
    res.json(results);
  });
});
// Test route
app.get('/test', (req, res) => {
    res.send('This is a test route!');
  });

// Start the server
app.listen(port, () => {
  console.log(`Express server listening on port ${port}`);
});
