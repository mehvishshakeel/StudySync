const mysql = require('mysql');
const { pool1 } = require('./database');
const { pool3 } = require('./database');

// Function to fetch user ID based on email
async function getUserIdByEmail(email) {
    return new Promise((resolve, reject) => {
        pool1.getConnection(async (err, connection) => {
            if (err) reject(err);

            // Construct SQL query to fetch user ID based on email
            const sqlQuery = 'SELECT year FROM user WHERE Email = ?';
            const formattedQuery = mysql.format(sqlQuery, [email]);

            // Execute SQL query
            connection.query(formattedQuery, (err, results) => {
                connection.release();
                if (err) reject(err);
                if (results.length === 0) {
                    reject(new Error('User not found'));
                } else {
                    resolve(results[0].year);
                }
            });
        });
    });
}

async function getUserDetailsByEmail(email) {
    return new Promise((resolve, reject) => {
      pool1.getConnection(async (err, connection) => {
        if (err) reject(err);
  
        // Construct SQL query to fetch user details based on email
        const sqlQuery = 'SELECT YEAR, Program FROM user WHERE Email = ?';
        const formattedQuery = mysql.format(sqlQuery, [email]);
  
        // Execute SQL query
        connection.query(formattedQuery, (err, results) => {
          connection.release();
          if (err) {
            console.error('Error executing query:', err);
            reject(err);
          } else {
            console.log('Query results:', results); // Add this line for debugging
            if (results.length === 0) {
              reject(new Error('User not found'));
            } else {
              const userDetails = {
                year: results[0].YEAR,
                program: results[0].Program
              };
              resolve(userDetails);
            }
          }
        });
      });
    });
  }
  


// Function to fetch user courses from the database based on year, program, and user ID
async function getUserCourses(email, program) {
    return new Promise(async (resolve, reject) => {
        try {
            const userDetails = await getUserDetailsByEmail(email);
            console.log(userDetails.year); // Output the year
            console.log(userDetails.program); // Output the program
            
            pool3.getConnection(async (err, connection) => {
                if (err) reject(err);

                let tableName;
                switch (userDetails.program) {
                    case 'Engineering':
                        tableName = 'Engineering';
                        break;
                    case 'Mechanical Engineering':
                        tableName = 'Mechanical_Engineering';
                        break;
                    case 'Electrical Engineering':
                        tableName = 'Electrical_Engineering';
                        break;
                    case 'Civil Engineering':
                        tableName = 'Civil_Engineering';
                        break;
                    case 'Software Engineering':
                        tableName = 'Software_Engineering';
                        break;
                    case 'Chemical Engineering':
                        tableName = 'Chemical_Engineering';
                        break;
                    case 'Energy Engineering':
                        tableName = 'Energy_Engineering';
                        break;
                    case 'Biomedical Engineering':
                        tableName = 'Biomedical_Engineering';
                        break;
                    case 'Geomatics Engineering':
                        tableName = 'Geomatics_Engineering';
                        break;
                    case 'Sustainable Systems Engineering':
                        tableName = 'Sustainable_Systems_Engineering';
                        break;
                    case 'Engineering Physics':
                        tableName = 'Engineering_Physics';
                        break;
                    default:
                        // Handle invalid program more gracefully
                        resolve([]);
                        return;
                }

                console.log('Table Name:', tableName);

                // Construct SQL query to fetch user courses based on year, program, and user ID
                const sqlQuery = `SELECT * FROM ${tableName} WHERE year = ?`;
                const formattedQuery = mysql.format(sqlQuery, [userDetails.year]);
                console.log('SQL Query:', formattedQuery);

                // Execute SQL query
                connection.query(formattedQuery, (err, results) => {
                    connection.release();
                    if (err) {
                        console.error('Error executing query:', err);
                        reject(err);
                    } else {
                        console.log('Query results:', results);
                        resolve(results);
                    }
                });
            });
        } catch (error) {
            reject(error);
        }
    });
}

module.exports = { getUserCourses , getUserDetailsByEmail};
