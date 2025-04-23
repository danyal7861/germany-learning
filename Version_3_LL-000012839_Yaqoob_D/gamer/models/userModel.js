import db from './db.js';  // Import the database connection (db.js file)
import bcrypt from 'bcryptjs';  // Import bcryptjs to hash passwords

// Define the User model
const User = {
  // Method to create a new user
  create: (user) => {
    const { name, email, password } = user;  // Extract name, email, and password from the user object
    const hashedPassword = bcrypt.hashSync(password, 10);  // Hash the password using bcrypt with a salt of 10
    const query = 'INSERT INTO users (name, email, password) VALUES (?, ?, ?)';  // SQL query to insert a new user
    return db.promise().query(query, [name, email, hashedPassword]);  // Execute the query using the db connection and return the result
  },

  // Method to find a user by their email
  findByEmail: (email) => {
    const query = 'SELECT * FROM users WHERE email = ?';  // SQL query to find a user by their email
    return db.promise().query(query, [email]);  // Execute the query and return the result
  },

  // Method to find a user by their ID
  findById: (id) => {
    const query = 'SELECT * FROM users WHERE id = ?';  // SQL query to find a user by their ID
    return db.promise().query(query, [id]);  // Execute the query and return the result
  }
};

// Export the User model to be used in other parts of the application
export default User;
