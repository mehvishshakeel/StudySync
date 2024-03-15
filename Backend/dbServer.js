const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const mysql = require('mysql');
require("dotenv").config();

const app = express();
app.use(bodyParser.json());

const DB_HOST = process.env.DB_HOST;
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_DATABASE1 = process.env.DB_DATABASE;
const DB_DATABASE2 = process.env.DB_DATABASE2;

const DB_PORT = process.env.DB_PORT;

const db = mysql.createPool({
  connectionLimit: 100,
  host: DB_HOST,
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_DATABASE1,
  port: DB_PORT
});

const db2 = mysql.createPool({
  connectionLimit: 100,
  host: DB_HOST,
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_DATABASE2,
  port: DB_PORT
});

app.post("/signup", async (req, res) => {
  const { fname, lname, email, program, password } = req.body;
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);
 
  db.getConnection(async (err, connection) => {
    if (err) throw err;
    const sqlSearch = "SELECT * FROM User WHERE Email = ?";
    const searchQuery = mysql.format(sqlSearch, [email]);
    const sqlInsert = "INSERT INTO User (Fname, Lname, Email, Program, Password) VALUES (?, ?, ?, ?, ?)";
    const insertQuery = mysql.format(sqlInsert, [fname, lname, email, program, hashedPassword]);
    
    await connection.query(searchQuery, async (err, result) => {
      if (err) throw err;
      if (result.length !== 0) {
        connection.release();
        res.status(409).json({ message: "User already exists" });
      } else {
        await connection.query(insertQuery, (err, result) => {
          connection.release();
          if (err) throw err;
          res.status(201).json({ message: "User created successfully" });
        });
      }
    });
  });
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  
  db.getConnection(async (err, connection) => {
    if (err) throw err;
    const sqlSearch = "SELECT * FROM User WHERE Email = ?";
    const searchQuery = mysql.format(sqlSearch, [email]);
    
    await connection.query(searchQuery, async (err, result) => {
      if (err) throw err;
      if (result.length === 0) {
        connection.release();
        res.status(401).json({ message: "Invalid email or password" });
      } else {
        const user = result[0];
        const isPasswordValid = await bcrypt.compare(password, user.Password);
        if (isPasswordValid) {
          // Password is correct
          connection.release();
          res.status(200).json({ message: "Login successful", userId: user.ID });
        } else {
          // Password is incorrect
          connection.release();
          res.status(401).json({ message: "Invalid email or password" });
        }
      }
    });
  });
});


app.post("/create-post", async (req, res) => {
  const { userId, title, content, course } = req.body;
  
  // Validate input
  if (!userId || !title || !content || !course) {
    return res.status(400).json({ message: "Please provide userId, title, content, and course" });
  }

  // Get a connection from the pool
  db2.getConnection(async (err, connection) => {
    if (err) throw err;

    // Insert post into database with course
    const sqlInsert = "INSERT INTO content (UserID, Title, Content, Course) VALUES (?, ?, ?, ?)";
    const insertQuery = mysql.format(sqlInsert, [userId, title, content, course]);

    connection.query(insertQuery, (err, result) => {
      connection.release();

      if (err) {
        console.error("Error creating post:", err);
        return res.status(500).json({ message: "Failed to create post" });
      }

      res.status(201).json({ message: "Post created successfully" });
    });
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
