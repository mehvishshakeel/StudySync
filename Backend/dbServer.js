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


app.delete("/delete-post/:postId", async (req, res) => {
  const postId = req.params.postId;
  
  // Get a connection from the pool
  db2.getConnection(async (err, connection) => {
    if (err) throw err;

    // Delete post from database
    const sqlDelete = "DELETE FROM content WHERE PostID = ?";
    const deleteQuery = mysql.format(sqlDelete, [postId]);

    connection.query(deleteQuery, (err, result) => {
      connection.release();

      if (err) {
        console.error("Error deleting post:", err);
        return res.status(500).json({ message: "Failed to delete post" });
      }

      if (result.affectedRows === 0) {
        return res.status(404).json({ message: "Post not found" });
      }

      res.status(200).json({ message: "Post deleted successfully" });
    });
  });
});

app.put("/edit-post/:postId", async (req, res) => {
  const postId = req.params.postId;
  const { title, content } = req.body;

  // Validate input
  if (!title || !content) {
    return res.status(400).json({ message: "Please provide title and content" });
  }

  // Get a connection from the pool
  db2.getConnection(async (err, connection) => {
    if (err) throw err;

    // Update post in database
    const sqlUpdate = "UPDATE content SET Title = ?, Content = ? WHERE PostID = ?";
    const updateQuery = mysql.format(sqlUpdate, [title, content, postId]);

    connection.query(updateQuery, (err, result) => {
      connection.release();

      if (err) {
        console.error("Error updating post:", err);
        return res.status(500).json({ message: "Failed to update post" });
      }

      if (result.affectedRows === 0) {
        return res.status(404).json({ message: "Post not found" });
      }

      res.status(200).json({ message: "Post updated successfully" });
    });
  });
});

app.get("/posts/:courseId", async (req, res) => {
  const { courseId } = req.params;

  db2.getConnection(async (err, connection) => {
    if (err) throw err;
    
    const sqlSearch = "SELECT * FROM content WHERE Course = ?";
    const searchQuery = mysql.format(sqlSearch, [courseId]);

    await connection.query(searchQuery, async (err, result) => {
      if (err) throw err;
      connection.release();
      
      // Map the results to include only the required fields
      const posts = result.map(post => ({
        title: post.Title,
        course: post.Course,
        content: post.Content
      }));
      
      res.status(200).json(posts);
    });
  });
});

app.post("/postId", async (req, res) => {
  const { title, course, content } = req.body;

  db2.getConnection(async (err, connection) => {
    if (err) throw err;
    
    const sqlSearch = "SELECT postID FROM Content WHERE Title = ? AND Course = ? AND Content = ?";
    const searchQuery = mysql.format(sqlSearch, [title, course, content]);

    await connection.query(searchQuery, async (err, result) => {
      if (err) throw err;
      connection.release();

      if (result.length === 0) {
        res.status(404).json({ message: "Post not found" });
      } else {
        const postId = result[0].postID;
        res.status(200).json({ postId });
      }
    });
  });
});



const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
