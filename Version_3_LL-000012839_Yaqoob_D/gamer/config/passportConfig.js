import passport from 'passport'; // Import passport for handling authentication
import { Strategy as LocalStrategy } from 'passport-local'; // Import LocalStrategy from passport-local to handle email/password login
import bcrypt from 'bcryptjs'; // Import bcrypt for hashing and comparing passwords
import db from '../models/db.js'; // Import the database connection for querying user data

// Configure the local strategy for passport
passport.use(new LocalStrategy(
  {
    usernameField: 'email',    // Specify that 'email' will be used as the username field (default is 'username')
    passwordField: 'password'  // Specify that 'password' will be used as the password field (default is 'password')
  },
  async (email, password, done) => {
    try {
      // Query the database to find a user with the provided email
      const [rows] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
      const user = rows[0];  // If a user is found, we use the first entry (there should be only one or none)
      
      // If no user is found with the given email, return an error message
      if (!user) {
        return done(null, false, { message: 'Incorrect email.' });
      }
      
      // Use bcrypt to compare the provided password with the stored hashed password
      const isMatch = await bcrypt.compare(password, user.password);
      
      // If the passwords don't match, return an error message
      if (!isMatch) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      
      // If email and password match, return the user object
      return done(null, user);
    } catch (err) {
      // If there is any error (e.g., database or bcrypt error), pass it to the callback function
      return done(err);
    }
  }
));

// Serialize user to store only the user ID in the session (this helps reduce the size of the session)
passport.serializeUser((user, done) => {
  done(null, user.id);  // Store only the user ID in the session
});

// Deserialize user by fetching the full user details from the database using the user ID stored in the session
passport.deserializeUser(async (id, done) => {
  try {
    // Query the database to retrieve the full user object using the ID stored in the session
    const [rows] = await db.query('SELECT * FROM users WHERE id = ?', [id]);
    const user = rows[0];  // Get the user object from the query result
    
    // Return the user object to be added to the session
    done(null, user);
  } catch (err) {
    // If there's any error (e.g., database error), pass it to the callback
    done(err);
  }
});

// Export the configured passport instance so it can be used in other parts of the application
export default passport;
