const express = require('express');
const bodyParser = require('body-parser');
const { signUp, login } = require('./auth');
const { getUserDetailsByEmail, getUserCourses } = require('./courses');
const { createPost, deletePost, editPost, getPosts, getPostId } = require('./post');
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
  const { userId, title, content, course } = req.body;
  try {
    const result = await createPost(userId, title, content, course);
    res.status(result.status).json({ message: result.message });
  } catch (error) {
    console.error("Error creating post:", error);
    res.status(500).json({ message: "Failed to create post" });
  }
});

app.delete("/delete-post/:postId", async (req, res) => {
  const postId = req.params.postId;
  try {
    const result = await deletePost(postId);
    res.status(result.status).json({ message: result.message });
  } catch (error) {
    console.error("Error deleting post:", error);
    res.status(500).json({ message: "Failed to delete post" });
  }
});

app.put("/edit-post/:postId", async (req, res) => {
  const postId = req.params.postId;
  const { title, content } = req.body;
  try {
    const result = await editPost(postId, title, content);
    res.status(result.status).json({ message: result.message });
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
  } catch (error) {
    console.error("Error getting posts:", error);
    res.status(500).json({ message: "Failed to get posts" });
  }
});

app.post("/postId", async (req, res) => {
  const { title, course, content } = req.body;
  try {
    const result = await getPostId(title, course, content);
    res.status(result.status).json({ postId: result.postId });
  } catch (error) {
    console.error("Error getting postId:", error);
    res.status(500).json({ message: "Failed to get postId" });
  }
});


// Endpoint for user details
app.post('/user-details', async (req, res) => {
  const { email } = req.body;
  try {
    const userDetails = await getUserDetailsByEmail(email);
    res.json(userDetails);
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



const PORT = process.env.PORT || 3003;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
