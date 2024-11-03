const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');

//Configure Express
const app = express();

//Configure CORS
app.use(cors());


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Configure MySQL connection
const db = mysql.createConnection({
    host: 'localhost',     // Your MySQL host
    user: 'root',          // Your MySQL user
    password: 'root',  // Your MySQL password
    database: 'docker'     // Your MySQL database
});

// Connect to MySQL
db.connect((err) => {
    if (err) {
        console.error('Database connection failed:', err.stack);
        return;
    }
    console.log('Connected to MySQL database.');
});

// Basic GET route to fetch all entries from a sample table 'users'
app.get('/users', (req, res) => {
    const query = 'SELECT * FROM users';
    db.query(query, (err, results) => {
      if (err) {
        console.error('Error fetching users:', err);
        res.status(500).json({ success: false, error: 'Failed to retrieve users' });
      } else {
        res.json({ success: true, data: results });
      }
    });
});

// Basic POST route to add a new user
app.post('/users', (req, res) => {
    const { name, email } = req.body; // Expecting a JSON body with 'name' and 'email'
    const query = 'INSERT INTO users (name, email) VALUES (?, ?)';
    db.query(query, [name, email], (err, results) => {
        if (err) {
        console.error('Error adding user:', err);
        res.status(500).json({ success: false, error: 'Failed to add user' });
        } else {
        res.json({ success: true, message: 'User added successfully', userId: results.insertId });
        }
    });
});
  

app.get('/',function(req,res){
    res.json({success: true});
});