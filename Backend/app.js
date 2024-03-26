const express = require('express');
const bodyParser = require('body-parser');
const { signUp, login } = require('./auth');
const { getUserDetailsByEmail, getUserCourses } = require('./courses');
const { createPost, deletePost, editPost, getPosts, getPostId, checkAuthorization, getPostById } = require('./post');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors()); // Enable CORS for all routes



// Signup Endpoint
app.post('/signup', async (req, res) => {
  const { fname, lname, email, program, password, year } = req.body; // Extract user data from request body
  try {
    // Call the signUp function with user data
    const result = await signUp(fname, lname, email, program, password, year);
    res.status(result.status).json({ message: result.message });
  } catch (error) {
    console.error("Error signing up:", error);
    res.status(500).json({ message: "Failed to sign up" });
  }
});

// Login Endpoint
app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const result = await login(email, password);
    res.status(result.status).json({ message: result.message, userId: result.userId });
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).json({ message: "Failed to login" });
  }
});

// Post Endpoints
app.post("/create-post", async (req, res) => {
  const { userId, title, content, courseId, program } = req.body;

  try {
    const result = await createPost(userId, title, content, courseId, program);
    res.status(result.status).json({ message: result.message });
  } catch (error) {
    console.error("Error creating post:", error);
    res.status(500).json({ message: "Failed to create post" });
  }
});


// Delete Post Endpoint
app.delete("/delete-post/:userId/:postId", async (req, res) => {
  const userId = req.params.userId;
  const postId = req.params.postId;
  try {
    const isAuthorized = await checkAuthorization(userId, postId); // Check if user is authorized to delete this post
    if (isAuthorized) {
      const result = await deletePost(userId, postId); // Call deletePost function to delete the post
      res.status(result.status).json({ message: result.message });
    } else {
      res.status(403).json({ message: "Unauthorized to delete this post" });
    }
  } catch (error) {
    console.error("Error deleting post:", error);
    res.status(500).json({ message: "Failed to delete post" });
  }
});


// Add/Edit Post Endpoint
app.put("/edit-post/:userId/:postId", async (req, res) => {
  const userId = req.params.userId;
  const postId = req.params.postId;
  const { title, content } = req.body;
  try {
    // Check authorization before proceeding to edit the post
    const isAuthorized = await checkAuthorization(userId, postId);
    if (isAuthorized) {
      // If user is authorized, proceed with editing the post
      const result = await editPost(userId, postId, title, content);
      res.status(result.status).json({ message: result.message });
    } else {
      // If user is not authorized, return a 403 Forbidden status
      res.status(403).json({ message: "Unauthorized to edit this post" });
    }
  } catch (error) {
    console.error("Error editing post:", error);
    res.status(500).json({ message: "Failed to edit post" });
  }
});


app.get("/posts/:courseId", async (req, res) => {
  const courseId = req.params.courseId;
  try {
    const posts = await getPosts(courseId);
    res.status(200).json(posts);
    console.log("Posts Fetched!")
  } catch (error) {
    console.error("Error getting posts:", error);
    res.status(500).json({ message: "Failed to get posts" });
  }
});

// Endpoint to fetch post ID
app.post('/postId', async (req, res) => {
  try {
    const { userId,title, content, courseId } = req.body;
    const result = await getPostId(title, courseId, content);
    console.log(result);
    res.status(result.status).json({ postId: result.postId });
  } catch (error) {
    console.error('Error fetching post ID:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// // Endpoint for user details
app.post('/user-details', async (req, res) => {
  const { email } = req.body;
  try {
    const userDetails = await getUserDetailsByEmail(email);
    res.json(userDetails);
    console.log(userDetails);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


// Endpoint for user courses
app.post('/user-courses', async (req, res) => {
  const { email } = req.body;
  try {
    const userDetails = await getUserDetailsByEmail(email);
    const { program, year } = userDetails;
    const courses = await getUserCourses(email, program, year);
    res.json(courses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Check Authorization Endpoint
app.get("/check-authorization/:userId/:postId", async (req, res) => {
  const userId = req.params.userId;
  const postId = req.params.postId;
  try {
    const isAuthorized = await checkAuthorization(userId, postId); // Check if user is authorized to edit this post
    if (isAuthorized) {
      // User is authorized
      res.status(200).send('Authorized');
    } else {
      // User is not authorized
      res.status(403).send('Unauthorized');
    }
  } catch (error) {
    console.error("Error checking authorization:", error);
    res.status(500).json({ message: "Failed to check authorization" });
  }
});

const PORT = process.env.PORT || 3003;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
