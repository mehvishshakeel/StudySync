const bcrypt = require('bcrypt');
const mysql = require('mysql');
const { pool1 } = require('./database');
const { pool2 } = require('./database');

async function signUp(fname, lname, email, program, password) {
    const saltRounds = 10;
    // const hashedPassword = await bcrypt.hash(password, saltRounds);
    
    return new Promise((resolve, reject) => {
      pool1.getConnection(async (err, connection) => {
        if (err) reject(err);
        const sqlSearch = "SELECT * FROM User WHERE Email = ?";
        const searchQuery = mysql.format(sqlSearch, [email]);
        const sqlInsert = "INSERT INTO User (Fname, Lname, Email, Program, Password) VALUES (?, ?, ?, ?, ?)";
        const insertQuery = mysql.format(sqlInsert, [fname, lname, email, program, password]);
        
        connection.query(searchQuery, async (err, result) => {
          if (err) {
            console.error("Error searching for existing user:", err); // Log the error
            connection.release();
            reject(err);
          }
          if (result.length !== 0) {
            connection.release();
            resolve({ status: 409, message: "User already exists" });
          } else {
            await connection.query(insertQuery, (err, result) => {
              connection.release();
              if (err) {
                console.error("Error inserting new user:", err); // Log the error
                reject(err);
              }
              resolve({ status: 201, message: "User created successfully" });
            });
          }
        });
      });
    });
  }

  
  
  async function login(email, password) {
    return new Promise((resolve, reject) => {
      pool1.getConnection(async (err, connection) => {
        if (err) reject(err);
        const sqlSearch = "SELECT * FROM user WHERE Email = ?";
        const searchQuery = mysql.format(sqlSearch, [email]);
        
        connection.query(searchQuery, async (err, result) => {
          if (err) reject(err);
          if (result.length === 0) {
            connection.release();
            resolve({ status: 401, message: "Invalid email or password" });
          } else {
            const user = result[0];
            if (password === user.Password) {
              connection.release();
              resolve({ status: 200, message: "Login successful", userId: user.ID });
            } else {
              connection.release();
              resolve({ status: 401, message: "Invalid email or password" });
            }
          }
        });
      });
    });
  }
  

module.exports = { signUp, login };
