const { pool2 } = require('./database');
const mysql = require('mysql');


async function createPost(userId, title, content, courseId, program) {
  console.log("User ID received:", userId); // Add this line for debugging

  return new Promise((resolve, reject) => {
    pool2.getConnection(async (err, connection) => {
      if (err) reject(err);
      const sqlInsert = "INSERT INTO content (UserID, Title, Content, CourseID, Program) VALUES (?, ?, ?, ?, ?)";
      const insertQuery = mysql.format(sqlInsert, [userId, title, content, courseId, program]);

      connection.query(insertQuery, (err, result) => {
        connection.release();

        if (err) {
          console.error("Error creating post:", err);
          reject(err);
        }

        resolve({ status: 201, message: "Post created successfully" });
      });
    });
  });
}


async function deletePost(postId) {
  return new Promise((resolve, reject) => {
    pool2.getConnection(async (err, connection) => {
      if (err) reject(err);
      const sqlDelete = "DELETE FROM content WHERE PostID = ?";
      const deleteQuery = mysql.format(sqlDelete, [postId]);

      connection.query(deleteQuery, (err, result) => {
        connection.release();

        if (err) {
          console.error("Error deleting post:", err);
          reject(err);
        }

        if (result.affectedRows === 0) {
          resolve({ status: 404, message: "Post not found" });
        }

        resolve({ status: 200, message: "Post deleted successfully" });
      });
    });
  });
}

async function editPost(postId, title, content) {
  return new Promise((resolve, reject) => {
    pool2.getConnection(async (err, connection) => {
      if (err) reject(err);
      const sqlUpdate = "UPDATE content SET Title = ?, Content = ? WHERE PostID = ?";
      const updateQuery = mysql.format(sqlUpdate, [title, content, postId]);

      connection.query(updateQuery, (err, result) => {
        connection.release();

        if (err) {
          console.error("Error updating post:", err);
          reject(err);
        }

        if (result.affectedRows === 0) {
          resolve({ status: 404, message: "Post not found" });
        }

        resolve({ status: 200, message: "Post updated successfully" });
      });
    });
  });
}

async function getPosts(courseId) {
  return new Promise((resolve, reject) => {
    pool2.getConnection(async (err, connection) => {
      if (err) reject(err);
      const sqlSearch = "SELECT * FROM content WHERE CourseID = ?";
      const searchQuery = mysql.format(sqlSearch, [courseId]);

      connection.query(searchQuery, async (err, result) => {
        if (err) reject(err);
        connection.release();
        
        const posts = result.map(post => ({
          title: post.Title,
          course: post.Course,
          content: post.Content
        }));
        
        resolve(posts);
      });
    });
  });
}

async function getPostId(title, course, content) {
  return new Promise((resolve, reject) => {
    pool2.getConnection(async (err, connection) => {
      if (err) reject(err);
      const sqlSearch = "SELECT postID FROM Content WHERE Title = ? AND Course = ? AND Content = ?";
      const searchQuery = mysql.format(sqlSearch, [title, course, content]);

      connection.query(searchQuery, async (err, result) => {
        if (err) reject(err);
        connection.release();

        if (result.length === 0) {
          resolve({ status: 404, message: "Post not found" });
        } else {
          const postId = result[0].postID;
          resolve({ status: 200, postId });
        }
      });
    });
  });
}

module.exports = { createPost, deletePost, editPost, getPosts, getPostId };
