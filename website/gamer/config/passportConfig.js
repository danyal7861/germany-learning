import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import bcrypt from 'bcryptjs';
import db from '../models/db.js';

// Configure the local strategy for passport
passport.use(new LocalStrategy(
  {
    usernameField: 'email',
    passwordField: 'password'
  },
  async (email, password, done) => {
    try {
      // Find user by email
      const [rows] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
      const user = rows[0];
      
      // No user found
      if (!user) {
        return done(null, false, { message: 'Incorrect email.' });
      }
      
      // Check password
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      
      // Successful login
      return done(null, user);
    } catch (err) {
      return done(err);
    }
  }
));

// Serialize user for session
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// Deserialize user from session
passport.deserializeUser(async (id, done) => {
  try {
    const [rows] = await db.query('SELECT * FROM users WHERE id = ?', [id]);
    const user = rows[0];
    done(null, user);
  } catch (err) {
    done(err);
  }
});

export default passport;