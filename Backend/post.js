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


async function deletePost(userId, postId) {
  return new Promise((resolve, reject) => {
    pool2.getConnection(async (err, connection) => {
      if (err) reject(err);
      const sqlDelete = "DELETE FROM content WHERE PostID = ? AND UserID = ?";
      const deleteQuery = mysql.format(sqlDelete, [postId, userId]);

      connection.query(deleteQuery, (err, result) => {
        connection.release();

        if (err) {
          console.error("Error deleting post:", err);
          reject(err);
        }

        if (result.affectedRows === 0) {
          resolve({ status: 404, message: "Post not found or unauthorized" });
        }

        resolve({ status: 200, message: "Post deleted successfully" });
      });
    });
  });
}


async function editPost(userId, postId, title, content) {
  return new Promise((resolve, reject) => {
    pool2.getConnection(async (err, connection) => {
      if (err) reject(err);
      const sqlUpdate = "UPDATE content SET Title = ?, Content = ? WHERE PostID = ? AND UserID = ?";
      const updateQuery = mysql.format(sqlUpdate, [title, content, postId, userId]);

      connection.query(updateQuery, (err, result) => {
        connection.release();

        if (err) {
          console.error("Error updating post:", err);
          reject(err);
        }

        if (result.affectedRows === 0) {
          resolve({ status: 404, message: "Post not found or unauthorized" });
        }

        resolve({ status: 200, message: "Post updated successfully" });
      });
    });
  });
}




// Modify the getPosts function in your backend to include the postId
async function getPosts(courseId) {
  return new Promise((resolve, reject) => {
    if (isNaN(courseId)) {
      reject("Invalid course ID");
      return;
    }

    pool2.getConnection(async (err, connection) => {
      if (err) reject(err);
      const sqlSearch = "SELECT PostID, UserID, Title, Content FROM content WHERE CourseID = ?";
      const searchQuery = mysql.format(sqlSearch, [courseId]);
      
      connection.query(searchQuery, async (err, result) => {
        if (err) reject(err);
        connection.release();

        if (result.length === 0) {
          resolve("No posts found under this course ID");
        } else {
          resolve(result); // Return posts including postId
        }
      });
    });
  });
}



async function getPostId(title, course, content) {
  return new Promise((resolve, reject) => {
    pool2.getConnection(async (err, connection) => {
      if (err) reject(err);
      const sqlSearch = "SELECT postID FROM Content WHERE Title = ? AND CourseID = ? AND TRIM(Content) = ?";
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

// Function to fetch post by ID
async function getPostById(postId) {
  return new Promise((resolve, reject) => {
    pool2.getConnection(async (err, connection) => {
      if (err) reject(err);
      const sqlSearch = "SELECT * FROM content WHERE PostID = ?";
      const searchQuery = mysql.format(sqlSearch, [postId]);

      connection.query(searchQuery, async (err, result) => {
        if (err) reject(err);
        connection.release();

        if (result.length === 0) {
          resolve(null); // Post not found
        } else {
          resolve(result[0]); // Return the post
        }
      });
    });
  });
}

// Assuming you have a function to check if the user is authorized
async function checkAuthorization(userId, postId) {
  return new Promise((resolve, reject) => {
    // Assuming you have a database query to check if the user is authorized
    pool2.getConnection(async (err, connection) => {
      if (err) reject(err);
      
      // Construct SQL query to check authorization
      const sqlQuery = "SELECT UserID FROM content WHERE PostID = ?";
      const formattedQuery = mysql.format(sqlQuery, [postId]);

      // Execute SQL query
      connection.query(formattedQuery, (err, results) => {
        connection.release();
        if (err) {
          console.error('Error checking authorization:', err);
          reject(err);
        } else {
          // Check if the userId associated with the postId matches the original userId
          if (results.length > 0 && results[0].UserID === userId) {
            // User is authorized
            resolve(true);
          } else {
            // User is not authorized
            resolve(false);
          }
        }
      });
    });
  });
}


module.exports = { createPost, deletePost, editPost, getPosts, getPostId , getPostById, checkAuthorization};
