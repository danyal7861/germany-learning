// Import necessary libraries
import bcrypt from 'bcryptjs';  // For hashing and comparing passwords
import passport from 'passport';  // For handling authentication
import db from '../models/db.js';  // Database connection object

// Controller to render the login form
export const getLogin = (req, res) => {
    res.render('login', {
        user: req.user || null,  // Current logged-in user data (if any)
        registered: req.query.registered,  // A flag to indicate if registration was successful
        error: req.query.error  // Any error message passed via the query string
    });
};

// Function to validate password strength
const isValidPassword = (password) => {
    // The password must be at least 8 characters long and contain at least one special character
    return password.length >= 8 && /[!@#$%^&*(),.?":{}|<>]/g.test(password);
};

// Function to validate name length
const isValidName = (name) => {
    // The name must not exceed 255 characters
    return name && name.length <= 255;
};

// Controller to process the login form submission
export const postLogin = (req, res, next) => {
    // Use Passport's local strategy to authenticate the user
    passport.authenticate('local', {
        successRedirect: '/dashboard',  // Redirect to dashboard upon successful login
        failureRedirect: '/login?error=true'  // Redirect back to login with an error if authentication fails
    })(req, res, next);  // Call the Passport authentication function
};

// Controller to render the registration form
export const getRegister = (req, res) => {
    res.render('register', {
        user: req.user || null,  // Current logged-in user data (if any)
        error: req.query.error  // Any error message passed via the query string
    });
};

// Controller to process the registration form submission
export const postRegister = async (req, res) => {
    try {
        const { name, email, password, confirmPassword } = req.body;

        // Validation: Ensure name doesn't exceed 255 characters
        if (name.length > 255) {
            return res.redirect('/register?error=nameTooLong');
        }

        // Validation: Ensures password and confirmPassword match
        if (password !== confirmPassword) {
            return res.redirect('/register?error=passwordMismatch');
        }

        // Validates password strength
        if (!isValidPassword(password)) {
            return res.redirect('/register?error=invalidPassword');
        }

        // Check if the email is already in use
        const [existingUsers] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
        if (existingUsers.length > 0) {
            return res.redirect('/register?error=emailExists');
        }
        
        // Check if terms were accepted
        if (!req.body.acceptTerms) {
            return res.redirect('/register?error=termsNotAccepted');
        }
        // Hashes the password before storing it in the database
        const hashedPassword = await bcrypt.hash(password, 10);

        // Inserts the new user into the database
        await db.query(
            'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
            [name, email, hashedPassword]
        );

        // After successful registration, redirects user to the login page
        res.redirect('/login?registered=true');
    } catch (error) {
        console.error('Registration error:', error);
        res.redirect('/register?error=serverError');
    }
};
// Controller to handle user logout
export const logout = (req, res) => {
    req.logout((err) => {  // Log out the user
        if (err) console.error(err);  // Log any errors that occur during logout
        res.redirect('/');  // Redirect to the home page after logging out
    });
};
