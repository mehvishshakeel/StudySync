
# StudySync - Backend

This repository contains the *Backend code* for the StudySync Application.

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js installed on your local machine.
- npm or yarn package manager installed.
- SQL database management system installed (e.g., MySQL, PostgreSQL).

## Setup

To set up the project, follow these steps:

1. Clone the repository to your local machine:

   ```bash
   git clone https://github.com/your-username/StudySync.git
   ```

2. Navigate to the project directory:

   ```bash
   cd Backend
   ```

3. Install the dependencies:

   ```bash
   npm install
   ```

4. Create a `.env` file in the root directory and specify your environment variables. Here's an example:

   ```
   DB_HOST=localhost
   DB_USER= <Your connection username>
   DB_PASSWORD= <Your connection password>
   DB_PORT=3306
   ```

   Replace the values with your specific database configuration.

5. Initialize the SQL database:

   - Run the SQL scripts provided in the `Data` folder to create the necessary tables and schema.
   - You can use a database management tool like MySQL Workbench or command-line tools to execute the script.

## Running the Backend

To run the backend server, use the following command:

```bash
node app.js
```

The server will start running on the port specified in the `app.js` file, which is `http://localhost:3003`.


## *Congratulations!*

You should now have the Backend Up and Running!
