const mysql = require('mysql');
require("dotenv").config();

const DB_HOST = process.env.DB_HOST;
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_PORT = process.env.DB_PORT;

// Database configurations for each database
const userDBConfig = {
  connectionLimit: 100,
  host: DB_HOST,
  user: DB_USER,
  password: DB_PASSWORD,
  database: 'userDB', // Change this to match your userDB database
  port: DB_PORT
};

const postsDBConfig = {
  connectionLimit: 100,
  host: DB_HOST,
  user: DB_USER,
  password: DB_PASSWORD,
  database: 'Posts', // Change this to match your Posts database
  port: DB_PORT
};

const coursesDBConfig = {
  connectionLimit: 100,
  host: DB_HOST,
  user: DB_USER,
  password: DB_PASSWORD,
  database: 'Courses', // Change this to match your Courses database
  port: DB_PORT
};

// Create connection pools for each database
const pool1 = mysql.createPool(userDBConfig);
const pool2 = mysql.createPool(postsDBConfig);
const pool3 = mysql.createPool(coursesDBConfig);

module.exports = { pool1, pool2, pool3 };
