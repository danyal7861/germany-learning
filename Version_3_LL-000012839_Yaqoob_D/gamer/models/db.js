import mysql from 'mysql2/promise';  // Import the mysql2 library with promise support
import dotenv from 'dotenv';  // Import dotenv to load environment variables from a .env file

dotenv.config();  // Load environment variables from a .env file into process.env

// Create a connection pool
const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',  // Database host, defaults to 'localhost' if not provided in the .env file
  user: process.env.DB_USER || 'root',  // Database user, defaults to 'root'
  password: process.env.DB_PASSWORD || '',  // Database password, defaults to an empty string if not provided
  database: process.env.DB_NAME || 'rolsa_technoligies',  // Database name, defaults to 'rolsa_technoligies'
  waitForConnections: true,  // Allow the pool to wait for connections if all are in use
  connectionLimit: 10,  // Limit the number of simultaneous connections to 10
  queueLimit: 0  // Unlimited queue size (no limit on pending requests)
});

// Test the connection to the database
const testConnection = async () => {
  try {
    const connection = await pool.getConnection();  // Get a connection from the pool
    console.log('Database connected successfully');  // Log success message
    connection.release();  // Release the connection back to the pool after use
  } catch (error) {
    console.error('Database connection failed:', error);  // Log any connection errors
  }
};

// Test the connection to the database when the script runs
testConnection();

// Export the connection pool for use in other parts of the application
export default pool;
